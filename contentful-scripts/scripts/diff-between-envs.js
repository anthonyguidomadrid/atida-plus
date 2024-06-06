import dotenv from 'dotenv'
import minimist from 'minimist'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { diffString } from 'json-diff'
import fs from 'fs'
// Import contentful utility
import {
  environmentExists,
  getEnvironmentSingleton,
  getContentType,
  getContentTypes
} from '../helpers/index.mjs'
// eslint-disable-next-line
import contentfulManagement from 'contentful-management'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const migrationsPath = `${__dirname}/../migration/script/`

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }
const contentfulToken = envValues.CMS_MANAGEMENT_TOKEN
const contentfulSpaceId = envValues.CMS_SPACE_ID

let environmentIdFrom = null
let environmentIdTo = null
let contentTypes = []
let fileName = 'diff-result'
let migration = false
let migrationFile = 'migration'

let parsedArgs = minimist(process.argv.slice(2))
let isVerbose = false

if (parsedArgs.hasOwnProperty('verbose')) {
  isVerbose = true
}

if (parsedArgs.hasOwnProperty('from')) {
  environmentIdFrom = parsedArgs.from
} else {
  console.error('@@ERROR: A FROM environment should be specified')
  process.exit(1)
}

if (parsedArgs.hasOwnProperty('to')) {
  environmentIdTo = parsedArgs.to
} else {
  console.error('@@ERROR: A TO environment should be specified')
  process.exit(1)
}

if (environmentIdFrom === environmentIdTo) {
  console.error('@@ERROR: The FROM and TO environments cannot be the same')
  process.exit(1)
}

if (parsedArgs.hasOwnProperty('ct')) {
  contentTypes.push(parsedArgs.ct)
} else {
  console.log('##INFO: No Content Type Specified, comparing all Content Types')
}

if (parsedArgs.hasOwnProperty('filename')) {
  fileName = parseFilename(parsedArgs.filename)
}
console.log(`##INFO: Saving results to ${fileName}.txt`)

if (parsedArgs.hasOwnProperty('migration')) {
  migration = true
  if (parsedArgs.hasOwnProperty('migrationFile')) {
    migrationFile = parseFilename(parsedArgs.migrationFile)
  }
  console.log(`##INFO: Migration file will be named ${migrationFile}.cjs`)
}

await execute()

async function execute() {
  await environmentCheck()
  const fromEnvironmentSingleton = await fetchEnvironmentSingleton(
    environmentIdFrom
  )
  const toEnvironmentSingleton = await fetchEnvironmentSingleton(
    environmentIdTo
  )

  if (contentTypes.length === 0) {
    //fetch all contentTypes from both envs and merge into an array
    contentTypes = [
      ...new Set([
        ...(await getAllContentTypesForEnv(fromEnvironmentSingleton)),
        ...(await getAllContentTypesForEnv(toEnvironmentSingleton))
      ])
    ]
  }

  const textfileStream = createTextfileStream(fileName)
  const migrationFileStream = createMigrationStream(migrationFile)

  for (let contentTypeId of contentTypes) {
    const contentTypeFrom = await getContentTypeForEnv(
      fromEnvironmentSingleton,
      contentTypeId
    )
    const contentTypeTo = await getContentTypeForEnv(
      toEnvironmentSingleton,
      contentTypeId
    )

    if (contentTypeFrom !== null && contentTypeTo === null) {
      recordContentTypeCreation(
        textfileStream,
        migrationFileStream,
        contentTypeFrom
      )
      continue
    }
    if (contentTypeFrom === null && contentTypeTo !== null) {
      recordContentTypeDeletion(
        textfileStream,
        migrationFileStream,
        contentTypeId
      )
      continue
    }
    if (contentTypeFrom === null && contentTypeTo === null) {
      console.log(
        `##INFO: Content Type does not exists in any environment, skipping`
      )
      continue
    }
    checkAndRecordExistingDifferences(
      contentTypeFrom,
      contentTypeTo,
      textfileStream,
      migrationFileStream
    )
  }
  endRecord(textfileStream, migrationFileStream)
}

async function environmentCheck() {
  console.log('##INFO: Checking if the environments exists')
  for (let environmentId of [environmentIdFrom, environmentIdTo]) {
    // Check the environment From exists
    if (
      !(await environmentExists(
        contentfulManagement,
        contentfulToken,
        contentfulSpaceId,
        environmentId
      ))
    ) {
      console.error(
        '@@ERROR: Environment ' + environmentId + ' does not exist!'
      )
      process.exit(1)
    }
  }
  console.log('##INFO: Environments are OK')
}

/**
 *
 * @param {String} environmentId
 * @return {Promise<void>}
 */
async function fetchEnvironmentSingleton(environmentId) {
  return await getEnvironmentSingleton(
    contentfulManagement,
    contentfulToken,
    contentfulSpaceId,
    environmentId,
    true
  )
}

/**
 *
 * @param {String} contentTypeId
 * @param {Object} environmentSingleton
 * @return {Object|null}
 */
async function getContentTypeForEnv(environmentSingleton, contentTypeId) {
  const environmentName = environmentSingleton.name
  console.log(
    `##INFO: Checking if content-type '${contentTypeId}' exists at: ${environmentName}`
  )

  let selectedContentType = await getContentType(
    environmentSingleton,
    contentTypeId
  )

  if (selectedContentType === null) {
    console.error(
      `##INFO: content-type '${contentTypeId}' does not exist at: ${environmentName}`
    )
    return null
  }

  console.log(
    `##INFO: content-type '${contentTypeId}' exists at: ${environmentName}`
  )
  //Remove unnecesary system metadata to not polute the comparaison
  selectedContentType.sys = { id: selectedContentType.sys.id }
  //Order fields alphabetically to enforce proper JSON comparaison
  selectedContentType.fields.sort(sortAlphabeticallyByKey)
  return selectedContentType
}

/**
 *
 * @param {Object} environmentSingleton
 * @return {Object[]}
 */
async function getAllContentTypesForEnv(environmentSingleton) {
  return (await getContentTypes(environmentSingleton)).items.map(
    contentType => contentType.sys.id
  )
}

/**
 *
 * @param {Object} migrationFile
 * @return {Object|null}
 */
function createMigrationStream(migrationFile) {
  if (migration !== false) {
    const migrationFileStream = fs.createWriteStream(
      `${migrationsPath}${migrationFile}.cjs`,
      { flags: 'a' }
    )
    migrationFileStream.write('//Migration Generated Automatically.\n')
    migrationFileStream.write(
      'module.exports = async function (migration, context) {\n'
    )
    migrationFileStream.write(`  const fnUsedLocales = await import(\n`)
    migrationFileStream.write(
      `    '../../helpers/locales/getListOfUsedLocales.mjs'\n`
    )
    migrationFileStream.write(`  )\n\n`)
    migrationFileStream.write(`  const fnDefaultValues = await import(\n`)
    migrationFileStream.write(
      `    '../../helpers/locales/getDefaultValuesForLocales.mjs'\n`
    )
    migrationFileStream.write(`  )\n\n`)
    migrationFileStream.write(`  const fnDefaultLocale = await import(\n`)
    migrationFileStream.write(
      `    '../../helpers/locales/getDefaultLocale.mjs'\n`
    )
    migrationFileStream.write(`  )\n\n`)

    return migrationFileStream
  }

  return null
}

/**
 *
 * @param {string} fileName
 * @return {Object}
 */
function createTextfileStream(fileName) {
  const textfileStream = fs.createWriteStream(`${fileName}.txt`, { flags: 'a' })
  textfileStream.write(
    '\n=====================================================\n'
  )
  textfileStream.write(
    `##INFO: Generating entry with difference between ${environmentIdFrom} and ${environmentIdTo}\n`
  )
  textfileStream.write(`##INFO: Date ${new Date().toISOString()}\n`)
  return textfileStream
}

/**
 *
 * @param {Object} textfileStream
 * @param {Object} migrationFileStream
 * @param {Object} contentType
 */
function recordContentTypeCreation(
  textfileStream,
  migrationFileStream,
  contentType
) {
  console.log(
    `##INFO: Content Type does not exists in Destination environment, so it should be created`
  )
  console.log(diffString({}, { ...contentType }, {}))

  textfileStream.write(
    `---\n'${contentType.name} (${contentType.sys.id})' should be created in Destination environment\n`
  )
  textfileStream.write(diffString({}, { ...contentType }, { color: false }))
  createContentTypeMigration(migrationFileStream, contentType, 'create')
  createFieldsMigration(migrationFileStream, contentType, 'create')
}

/**
 *
 * @param {Object} migrationFileStream
 * @param {Object} contentType
 * @param {string} action
 */
function createContentTypeMigration(migrationFileStream, contentType, action) {
  if (migrationFileStream === null) {
    return
  }
  const contentTypeId = contentType.sys.id
  migrationFileStream.write(
    `  const ${contentTypeId} = migration.${action}ContentType('${contentTypeId}', {\n`
  )
  migrationFileStream.write(
    `    name: '${escapeSpecialChars(contentType.name)}',\n`
  )
  migrationFileStream.write(
    `    description: '${escapeSpecialChars(contentType.description)}',\n`
  )
  if ('displayField' in contentType) {
    migrationFileStream.write(
      `    displayField: '${contentType.displayField}'\n`
    )
  }
  migrationFileStream.write(`  })\n`)
}

/**
 *
 * @param {Object} migrationFileStream
 * @param {Object} contentType
 * @param {string} action
 */
function createFieldsMigration(migrationFileStream, contentType, action) {
  if (migrationFileStream === null) {
    return
  }
  const contentTypeId = contentType.sys.id
  contentType.fields.map(field => {
    createFieldMigration(migrationFileStream, contentTypeId, field, action)
  })
}

/**
 *
 * @param {Object} migrationFileStream
 * @param {string} contentTypeId
 * @param {Object} field
 * @param {string} action
 */
function createFieldMigration(
  migrationFileStream,
  contentTypeId,
  field,
  action
) {
  migrationFileStream.write(`  ${contentTypeId}\n`)
  migrationFileStream.write(`    .${action}Field('${field.id}')\n`)
  migrationFileStream.write(`    .name('${escapeSpecialChars(field.name)}')\n`)
  migrationFileStream.write(`    .type('${field.type}')\n`)
  if (field.type === 'Link') {
    migrationFileStream.write(`    .linkType('${field.linkType}')\n`)
  }
  migrationFileStream.write(`    .localized(${field.localized})\n`)
  if ('defaultValue' in field) {
    defineDefaultValues(
      migrationFileStream,
      field.defaultValue['en-GB'],
      field.localized
    )
  }
  migrationFileStream.write(`    .required(${field.required})\n`)
  migrationFileStream.write(`    .disabled(${field.disabled})\n`)
  migrationFileStream.write(`    .omitted(${field.omitted})\n`)
  migrationFileStream.write(
    `    .validations(${JSON.stringify(field.validations)})\n`
  )
  if ('items' in field) {
    migrationFileStream.write(`    .items(${JSON.stringify(field.items)})\n`)
  }
  migrationFileStream.write(`\n`)
}

/**
 *
 * @param {Object} migrationFileStream
 * @param {boolean} defaultValue
 * @param {boolean} localized
 */
function defineDefaultValues(
  migrationFileStream,
  defaultValue,
  localized = false
) {
  let value = `{[fnDefaultLocale.getDefaultLocale()]: ${defaultValue}}`
  if (localized === true) {
    value = `fnDefaultValues.getDefaultValuesForLocales(${defaultValue})`
  }
  migrationFileStream.write(`    .defaultValue(${value})\n`)
}

/**
 *
 * @param {Object} textfileStream
 * @param {Object} migrationStream
 * @param {string} contentTypeId
 */
function recordContentTypeDeletion(
  textfileStream,
  migrationStream,
  contentTypeId
) {
  console.log(
    `##INFO: Content Type does not exists in Origin environment, so it should be deleted in Destination environment`
  )
  textfileStream.write(
    `---\n ${contentTypeId} should be deleted from Destination environment`
  )

  if (migrationStream === null) {
    return
  }
  migrationStream.write(`  migration.deleteContentType('${contentTypeId}')\n`)
}

/**
 *
 * @param {Object} contentTypeFrom
 * @param {Object} contentTypeTo
 * @param {Object} textfileStream
 * @param {Object} migrationFileStream
 */
function checkAndRecordExistingDifferences(
  contentTypeFrom,
  contentTypeTo,
  textfileStream,
  migrationFileStream
) {
  console.log(
    `##INFO: Checking differences for '${contentTypeFrom.name} (${contentTypeFrom.sys.id})' content type between environments:`
  )

  if (diffString(contentTypeFrom, contentTypeTo)) {
    console.log(
      '##INFO: Following differences were found between environments into given content type:\n',
      diffString(contentTypeTo, contentTypeFrom, { full: true }),
      `##INFO: Recording differences in ${fileName}.txt`
    )
    textfileStream.write(`---\n`)
    textfileStream.write(
      `Differences for '${contentTypeFrom.name} (${contentTypeFrom.sys.id})' content-type:\n`
    )
    textfileStream.write(
      diffString(contentTypeTo, contentTypeFrom, { color: false, full: true })
    )
    createContentTypeMigration(migrationFileStream, contentTypeFrom, 'edit')
    createFieldsEditionMigration(
      migrationFileStream,
      contentTypeFrom,
      contentTypeTo
    )
    return
  }

  console.log(
    '##INFO: No differences were found between environments into given content type'
  )
}

/**
 *
 * @param {Object} migrationFileStream
 * @param {Object} contentTypeFrom
 * @param {Object} contentTypeTo
 */
function createFieldsEditionMigration(
  migrationFileStream,
  contentTypeFrom,
  contentTypeTo
) {
  if (migrationFileStream === null) {
    return
  }

  let fieldsTo = contentTypeTo.fields
  contentTypeFrom.fields.map(fieldFrom => {
    const contentTypeToFilteredFields = fieldsTo.filter(
      fieldTo => fieldFrom.id === fieldTo.id
    )

    let action = 'edit'
    if (diffString(fieldFrom, contentTypeToFilteredFields[0])) {
      if (contentTypeToFilteredFields.length === 0) {
        action = 'create'
      }
      createFieldMigration(
        migrationFileStream,
        contentTypeFrom.sys.id,
        fieldFrom,
        action
      )
    }
    fieldsTo = fieldsTo.filter(field => field.id !== fieldFrom.id)
  })
  //Items left in fieldsTo should be deleted since they don't exist in From env
  fieldsTo.map(field => {
    migrationFileStream.write(
      `  ${contentTypeFrom.sys.id}.deleteField('${field.id}')\n\n`
    )
  })
}

/**
 * @param {Object} textfileStream
 * @param {Object} migrationFileStream
 */
function endRecord(textfileStream, migrationFileStream) {
  textfileStream.write(`\n---------------------- END ----------------------\n`)
  textfileStream.end()
  if (migrationFileStream === null) {
    return
  }
  migrationFileStream.write('}\n')
  migrationFileStream.end()
}

//TODO extend this method to other special characters
/**
 * @param {string} contentTypeName
 */
function escapeSpecialChars(contentTypeName) {
  return contentTypeName.replace("'", "\\'")
}

/**
 * @param {string} filename
 */
function parseFilename(filename) {
  return filename.replace(/[\W]+/, '-')
}

function sortAlphabeticallyByKey(a, b) {
  if (a.id < b.id) {
    return -1
  }
  if (a.id > b.id) {
    return 1
  }
  return 0
}
