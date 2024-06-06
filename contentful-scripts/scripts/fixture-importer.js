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
  getEntryById,
  environmentExists,
  getEnvironmentSingleton,
  getContentType,
  publishEntry,
  getEntryTag,
  addEntryTag,
  getDefaultLocale
} from '../helpers/index.mjs'
// eslint-disable-next-line
import contentfulManagement from 'contentful-management'
import async from 'async'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

// Default values
let environmentId = null
let spaceId = envValues.CMS_SPACE_ID
let csvFixtureFolder = __dirname + '/../migration/fixture/' + spaceId + '/'

let parsedArgs = minimist(process.argv.slice(2))
let isVerbose = false

if (parsedArgs.hasOwnProperty('verbose')) {
  isVerbose = true
}

if (parsedArgs.hasOwnProperty('to')) {
  environmentId = parsedArgs.to
} else {
  console.error('@@ERROR: A TO environment should be specified')
  process.exit(1)
}

await execute(
  contentfulManagement,
  envValues.CMS_MANAGEMENT_TOKEN,
  spaceId,
  environmentId,
  csvFixtureFolder,
  envValues.CMS_DEFAULT_COUNTER_ID,
  envValues.CMS_DEFAULT_FIXTURE_LOCALE,
  isVerbose
)

/**
 *
 * @param {contentfulManagement} contentfulClass
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @param {String} csvFixtureFolder
 * @param {String} defaultCounterId
 * @param {String} defaultCounterLocale
 * @param {Boolean} isVerbose
 * @return {Promise<void>}
 */

async function execute(
  contentfulClass,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId,
  csvFixtureFolder,
  defaultCounterId,
  defaultCounterLocale,
  isVerbose
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
  if (!fileSystem.existsSync(csvFixtureFolder)) {
    console.error(
      '@@ERROR: CSV Fixture folder does not exist or is not accessible!'
    )
    process.exit(1)
  }
  // Create a list of files in the folder
  let listOfFile = fileSystem.readdirSync(csvFixtureFolder)

  // Read in the counter-id/locale the latest imported ID
  let counterEntry = await getEntryById(environmentSingleton, defaultCounterId)
  let counterIndex = counterEntry?.fields?.value[defaultCounterLocale] ?? false

  if (!counterIndex) {
    console.error('@@ERROR: Impossible to retrieve the Counter entry!')
    process.exit(1)
  }

  // Compute the list of files that needs to be imported
  let fixturesArray = []
  let arrayLength = listOfFile.length
  let finalCounter = 0
  let latestCounter = 0

  for (let i = 0; i < arrayLength; i++) {
    let fileIndexValue = parseInt(listOfFile[i].substring(0, 6))

    if (fileIndexValue === undefined || !Number.isInteger(fileIndexValue)) {
      console.error('@@ERROR: There is an invalid fixture:')
      console.error('@@ERROR: ' + csvFixtureFolder + listOfFile[i])
      process.exit(1)
    }

    if (fileIndexValue > counterIndex) {
      console.log(
        '##INFO: Fixture importer is running for environment "' +
          contentfulEnvironmentId +
          '"'
      )
      fixturesArray.push(listOfFile[i])

      if (fileIndexValue === latestCounter) {
        console.error('@@ERROR: There are duplicated migrations!')
        console.error('@@ERROR: ' + csvFixtureFolder + listOfFile[i])
        process.exit(1)
      } else {
        latestCounter = fileIndexValue
      }
    } else {
      finalCounter++
    }
  }

  let fixtureLength = fixturesArray.length
  console.log('##INFO: ' + fixtureLength + ' fixtures will be imported')

  // Loop and run migrations
  async.eachSeries(fixturesArray, async function (
    fixtureCsvFile // For each file
  ) {
    console.log('##INFO: Start importing data for fixture: ' + fixtureCsvFile)
    // run function 'importEntriesFromCsv'
    await importEntriesFromCsv(
      environmentSingleton,
      csvFixtureFolder + fixtureCsvFile,
      isVerbose
    )
    // Update counter value
    finalCounter++
    let zeroFilled = ('000000' + finalCounter).slice(-6)

    // Update the counter to the latest ID
    let entrySavingCounter = await getEntryById(
      environmentSingleton,
      defaultCounterId
    )
    entrySavingCounter.fields.value[defaultCounterLocale] = zeroFilled

    await entrySavingCounter
      .update()
      .then(entry =>
        console.log(
          '##INFO: Fixture number ' + zeroFilled + ' ran successfully!'
        )
      )
      .catch(e => console.error('@@ERROR: ' + e))
  })
}

async function importEntriesFromCsv(
  environmentSingleton,
  csvFilePath,
  isVerbose
) {
  // Check source file exist
  if (!fileSystem.existsSync(csvFilePath)) {
    console.error(
      '@@ERROR: Source CSV file does not exist or is not accessible!'
    )
    process.exit(1)
  }
  let csvInput = fileSystem.readFileSync(csvFilePath)

  // Instantiate CSV with separator
  let csvData = parse(csvInput, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
  })

  // Read all the headers of the CSV >> variable
  const headerArray = csvData[0]

  // First check, take the first header and take the 'content-type' from there
  // We purposely ignore if the content-type name is different for the other columns
  let csvColumnsKey = Object.keys(headerArray)
  let csvPrimaryKey = csvColumnsKey[0]
  let csvTagKey = csvColumnsKey[5]
  let myContentType = csvPrimaryKey.split('.')[0]

  console.log('##INFO - Content-type: ' + myContentType)

  // Then we retrieve the content-type definition of that content-type
  // Retrieve content-type structure to map to the input data
  const contentTypeDefinition = await getContentType(
    environmentSingleton,
    myContentType
  )

  // Loop trough each line (from the second one)
  for (let i = 0; i < csvData.length; i++) {
    isVerbose && console.log('## DEBUG: Processing row ' + (i + 1))
    // function processRow
    await processRow(environmentSingleton, contentTypeDefinition, csvData[i])
  }
}

async function processRow(
  environmentSingleton,
  contentTypeDefinition,
  rowArray
) {
  let mappingArray = {
    Text: String,
    Boolean: Boolean,
    Integer: parseInt,
    Symbol: trimString,
    RichText: getRichTextObject,
    Date: parseDate
  }

  // First create empty payload for entry (array/object)
  let fieldArray = {}
  let tagArr
  // Loop for each column
  async.forEachOf(
    rowArray,
    async (value, key, callback) => {
      if (key === 'sys.tags') {
        tagArr = value.split('|')
      }
      let fieldName = key.split('.')[1]
      let fieldLocale = key.split('.')[2] ?? getDefaultLocale()
      let fieldValue = value
      let fieldDefinition = contentTypeDefinition.fields.find(
        ({ id }) => id === fieldName
      ).type

      // Map that further to the mappingFunctions
      if (mappingArray[fieldDefinition] !== undefined) {
        // Ingest the single cell value into the mapping Function
        const parsedFieldValue = await mappingArray[fieldDefinition](fieldValue)

        if (fieldArray[fieldName] !== undefined) {
          fieldArray = {
            ...fieldArray,
            [fieldName]: {
              ...fieldArray[fieldName],
              [fieldLocale]: parsedFieldValue
            }
          }
        } else {
          fieldArray = {
            ...fieldArray,
            [fieldName]: {
              [fieldLocale]: parsedFieldValue
            }
          }
        }
      }
      callback()
    },
    async function done() {
      // Create new entry from payload
      const newEntry = await environmentSingleton.createEntry(
        contentTypeDefinition?.sys?.id,
        {
          fields: fieldArray
        }
      )
      isVerbose && console.log('##INFO - Created entry: ' + newEntry?.sys?.id)

      if (tagArr.length >= 1) {
        // Loop trough each tag
        for (let i = 0; i < tagArr.length; i++) {
          // Check the tag exist
          let selectedTag = await getEntryTag(environmentSingleton, tagArr[i])
          if (selectedTag?.sys?.id !== tagArr[i]) {
            console.error(
              '@@ERROR: Destination tag ' + tagArr[i] + ' does not exist!'
            )
            process.exit(1)
          }
          // Apply the Tag
          const addTagResult = await addEntryTag(
            environmentSingleton,
            newEntry?.sys?.id,
            tagArr[i]
          )
          isVerbose &&
            addTagResult &&
            console.log(
              '@@DEBUG - Adding tag for Entry ID: ' + newEntry?.sys?.id
            )
        }
      }
      // Publish entry
      const publishEntryResult = await publishEntry(
        environmentSingleton,
        newEntry?.sys?.id
      )
      isVerbose &&
        publishEntryResult &&
        console.log(
          '@@DEBUG - Successfully published Entry ID: ' + newEntry?.sys?.id
        )
    }
  )
}

/**
 * @param {String} normalString
 * @returns {Promise<String>}
 */
async function trimString(normalString) {
  return String(normalString.substring(0, 256))
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
 * @param {String} dateString
 * @returns {Promise<String>}
 */
async function parseDate(dateString) {
  let parsedDate = dayjs(dateString)
  return parsedDate.format('YYYY-MM-DDTHH:mm:ss[Z]')
}
