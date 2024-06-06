// Imports
import dayjs from 'dayjs'
import dotenv from 'dotenv'
import fileSystem from 'fs'
import minimist from 'minimist'
import parse from 'csv-parse/lib/sync.js' // eslint-disable-line
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Import contentful utility
import {
  environmentExists,
  extractStatusFromSys,
  getContentType,
  getEntryById,
  getEntryIdByUniqueId,
  getEnvironmentSingleton,
  publishEntry,
  uploadAsset,
  getDefaultLocale
} from '../helpers/index.mjs'
// eslint-disable-next-line
import contentfulManagement from 'contentful-management'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

// Default values
let environmentId = null
let sourceCsvFile = null
let csvSeparator = ','
let startFromId = null
let linkEntries = null

let parsedArgs = minimist(process.argv.slice(2))

if (parsedArgs.hasOwnProperty('from')) {
  sourceCsvFile = parsedArgs.from
} else {
  console.error('@@ERROR: A FROM source file should be specified')
  process.exit(1)
}

if (parsedArgs.hasOwnProperty('to')) {
  environmentId = parsedArgs.to
} else {
  console.error('@@ERROR: A TO environment should be specified')
  process.exit(1)
}

if (parsedArgs.hasOwnProperty('start-from')) {
  startFromId = parsedArgs['start-from']
}

if (parsedArgs.hasOwnProperty('separator')) {
  csvSeparator = parsedArgs.separator
}

if (parsedArgs.hasOwnProperty('link-entries')) {
  linkEntries = parsedArgs['link-entries']
}

await execute(
  contentfulManagement,
  envValues.CMS_MANAGEMENT_TOKEN,
  envValues.CMS_SPACE_ID,
  environmentId,
  sourceCsvFile,
  envValues.CMS_LOCALE_DEFAULT,
  csvSeparator,
  startFromId
)

/**
 *
 * @param {contentfulManagement} contentfulClass
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @param {String} sourceCsvFile
 * @param {String} defaultLocale
 * @param {String} csvSeparator
 * @param {String|null} startFromId
 * @return {Promise<void>}
 */
async function execute(
  contentfulClass,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId,
  sourceCsvFile,
  defaultLocale = getDefaultLocale(),
  csvSeparator = ',',
  startFromId = null
) {
  // Check Environment exists
  if (
    !(await environmentExists(
      contentfulClass,
      contentfulToken,
      contentfulSpaceId,
      contentfulEnvironmentId
    ))
  ) {
    console.error(
      '@@ERROR: Destination environment ' +
        contentfulEnvironmentId +
        ' does not exist!'
    )
    process.exit(1)
  }

  const environmentSingleton = await getEnvironmentSingleton(
    contentfulClass,
    contentfulToken,
    contentfulSpaceId,
    contentfulEnvironmentId
  )

  // Check source file exist
  if (!fileSystem.existsSync(sourceCsvFile)) {
    console.error(
      '@@ERROR: Source CSV file does not exist or is not accessible!'
    )
    process.exit(1)
  }
  let csvInput = fileSystem.readFileSync(sourceCsvFile)

  // Instantiate CSV with separator
  let csvData = parse(csvInput, {
    columns: true,
    skip_empty_lines: true,
    delimiter: csvSeparator
  })

  // Define content-type and primary key to use
  let csvColumnsKey = Object.keys(csvData[0])
  let csvPrimaryKey = csvColumnsKey[0]
  let myContentType = csvPrimaryKey.split('.')[0]
  let myPrimaryKey = csvPrimaryKey.substring(csvPrimaryKey.indexOf('.') + 1)

  console.log('##INFO - Content-type: ' + myContentType)
  console.log('##INFO - Primary-Key: ' + myPrimaryKey)

  // Retrieve content-type structure to map to the input data
  let contentTypeDefinition = await getContentType(
    environmentSingleton,
    myContentType
  )

  let mappingArray = {
    Text: String,
    Asset: String, // Asset is set as String, because it runs its own function
    Boolean: Boolean,
    Integer: parseInt,
    Symbol: trimString,
    RichText: getRichTextObject,
    Date: parseDate,
    Entry: linkEntry
  }

  // For each row
  let shouldSkipElement = true
  for (let i = 0; i < csvData.length; i++) {
    console.log('##INFO - Processing element: ' + i)

    // Use startFromId with primary-key to skip elements
    if (startFromId !== null && shouldSkipElement) {
      shouldSkipElement = csvData[i][csvPrimaryKey] !== startFromId
    } else {
      shouldSkipElement = false
    }

    if (shouldSkipElement === true) {
      continue
    }

    // ###################################
    // CSV Naming Convention
    // ###################################
    // 1st field / either brand.sys.id (entry-id) or brand.primary.slug[.en-GB]
    //           / If not entry-id, it should be a unique and mandatory field
    // Other fields, they will be the one to be updated
    // Example: brand.fields.title.pt-PT
    // Structure: (content-type).fields.(field-name)[.(locale)]
    // Locale is optional, it takes en-GB as default
    let entryId = csvData[i][csvPrimaryKey]
    let primaryKeyLocale = myPrimaryKey.split('.')[2] ?? defaultLocale

    console.log('##INFO - Locale: ' + primaryKeyLocale)

    if (myPrimaryKey !== 'sys.id') {
      const primaryKeyField = myPrimaryKey.split('.')[1] ?? 'id'

      entryId = await getEntryIdByUniqueId(
        environmentSingleton,
        myContentType,
        primaryKeyField,
        csvData[i][csvPrimaryKey],
        primaryKeyLocale
      )

      if (entryId === false) {
        continue
      }
    }

    if (linkEntries !== null) {
      entryId = await resolveEntryPath(
        environmentSingleton,
        entryId,
        linkEntries
      )

      console.log('Resolved Entry-id: ' + entryId)

      if (entryId === false) {
        continue
      }

      let csvSecondKey = csvColumnsKey[1]
      let destContentType = csvSecondKey.split('.')[0]

      contentTypeDefinition = await getContentType(
        environmentSingleton,
        destContentType
      )
    }

    console.log('##INFO - Entry-Id: ' + entryId)

    let entryToUpdate = await getEntryById(environmentSingleton, entryId)

    let entryStatus = await extractStatusFromSys(entryToUpdate?.sys)

    console.log('##INFO - Entry Original Status: ' + entryStatus)

    // Loop trough each field to map the right importer
    for (let j = 1; j < csvColumnsKey.length; j++) {
      let fieldName = csvColumnsKey[j].split('.')[2]
      let fieldLocale = csvColumnsKey[j].split('.')[3] ?? defaultLocale
      let fieldValue = csvData[i][csvColumnsKey[j]]
      let fieldDefinition = contentTypeDefinition.fields.find(
        ({ id }) => id === fieldName
      ).type

      console.log('##INFO  >>>  Field Name: ' + fieldName)
      console.log('##INFO  >>>  Field Locale: ' + fieldLocale)
      console.log(
        '##INFO  >>>  Field Value: ' +
          fieldValue.substring(0, 60).replace(/(\r\n|\n|\r)/gm, '. ')
      )
      console.log('##INFO  >>>  Field Definition: ' + fieldDefinition)

      // If type Link we need to know if an Asset or Entry
      if (fieldDefinition === 'Link') {
        fieldDefinition = contentTypeDefinition.fields.find(
          ({ id }) => id === fieldName
        ).linkType
      }

      // Fields can be passed/mapped as following:
      // - 1/0 or true/false if the field is boolean
      // - Integer number
      // - Short text (255)
      // - Long text (255-50K)
      // - Rich-text
      // - Dates
      // - URL (to upload assets)
      // - Reference
      if (mappingArray[fieldDefinition] !== undefined) {
        let parsedFieldValue = await mappingArray[fieldDefinition](fieldValue)

        // In case is an Asset, needs to upload it and link it with its own function
        if (fieldDefinition === 'Asset') {
          parsedFieldValue = await uploadAsset(
            environmentSingleton,
            fieldValue,
            fieldLocale
          )
        }

        // we need the fieldName if it's missing
        if (entryToUpdate.fields[fieldName] === undefined) {
          entryToUpdate.fields[fieldName] = {
            [fieldLocale]: ''
          }
        }
        entryToUpdate.fields[fieldName][fieldLocale] = parsedFieldValue
      }
    }

    // Commit the update
    await entryToUpdate.update()

    // Republish already published/changed entry
    if (entryStatus === 'published' || entryStatus === 'changed') {
      await publishEntry(environmentSingleton, entryToUpdate?.sys?.id)
    }
  }
}

/**
 * @param {String} normalText
 * @returns {Promise<{data: {}, nodeType: string, content: [{data: {}, nodeType: string, content: [{data: {}, marks: *[], nodeType: string, value}]}]}>}
 */
async function getRichTextObject(normalText) {
  return {
    content: [
      {
        nodeType: 'paragraph',
        data: {},
        content: [
          {
            value: normalText,
            nodeType: 'text',
            marks: [],
            data: {}
          }
        ]
      }
    ],
    data: {},
    nodeType: 'document'
  }
}

/**
 * @param {String} normalString
 * @returns {Promise<String>}
 */
async function trimString(normalString) {
  return String(normalString.substring(0, 256))
}

/**
 * @param {String} dateString
 * @returns {Promise<String>}
 */
async function parseDate(dateString) {
  let parsedDate = dayjs(dateString)
  return parsedDate.format('YYYY-MM-DDTHH:mm:ss[Z]')
}

/**
 * @param entryId
 * @return {Promise<{sys: {linkType: string, id: String, type: string}}>}
 */
async function linkEntry(entryId) {
  return {
    sys: {
      type: 'Link',
      linkType: 'Entry',
      id: entryId
    }
  }
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} entryId
 * @param {String} linkEntries
 * @return {Promise<{String}|{Boolean}>}
 */
async function resolveEntryPath(environmentSingleton, entryId, linkEntries) {
  const re = new RegExp(/[a-zA-Z]+([<>])?/, 'g')
  let match = re.exec(linkEntries)

  if (match === null) {
    return false
  }

  const action = match[1] ?? null
  match = re.exec(linkEntries)

  if (match === null || match?.length < 2) {
    return false
  }

  const destCt = match[0].split(match[1])[0]
  const leftOver = linkEntries.slice(match['index'])
  const recursiveCall = leftOver.includes('>') || leftOver.includes('<')

  let newEntryId
  if (action === '>') {
    newEntryId = await getEntryIdOfChild(environmentSingleton, destCt, entryId)
  } else if (action === '<') {
    newEntryId = await getEntryIdOfParent(environmentSingleton, destCt, entryId)
  } else {
    return false
  }

  if (recursiveCall) {
    return await resolveEntryPath(environmentSingleton, newEntryId, leftOver)
  } else {
    return newEntryId
  }
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} destCt
 * @param {String} entryId
 * @return {Promise<{String}|{Boolean}>}
 */
async function getEntryIdOfChild(environmentSingleton, destCt, entryId) {
  let myEntries

  await environmentSingleton
    .getEntryReferences(entryId, { include: 1 })
    .then(entries => (myEntries = entries))
    .catch(e => console.error('@@ERROR: ' + e))

  for (let i = 0; i < myEntries?.includes?.Entry?.length; i++) {
    if (myEntries?.includes?.Entry[i]?.sys?.contentType?.sys?.id === destCt) {
      return myEntries?.includes?.Entry[i]?.sys?.id ?? false
    }
  }

  return false
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} destCt
 * @param {String} entryId
 * @return {Promise<{String}|{Boolean}>}
 */
async function getEntryIdOfParent(environmentSingleton, destCt, entryId) {
  let myEntries

  await environmentSingleton
    .getEntries({
      'sys.contentType.sys.id': destCt,
      links_to_entry: entryId,
      limit: 1
    })
    .then(entries => (myEntries = entries))
    .catch(e => console.error('@@ERROR: ' + e))

  return myEntries?.items[0]?.sys?.id ?? false
}
