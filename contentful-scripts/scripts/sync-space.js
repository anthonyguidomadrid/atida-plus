// Imports
import minimist from 'minimist'
import dotenv from 'dotenv'
// eslint-disable-next-line
import contentful from 'contentful-management'
import Database from 'better-sqlite3'

import { syncSpaceConf } from './sync-space-conf.mjs'
// Local Helpers
import {
  checkCounter,
  computeEntriesToUpdate,
  createDatabase,
  environmentExists,
  getAllContentTypes,
  getContentTypes,
  getEnvironmentSingleton,
  populateFromEntriesByContentType,
  populateToEntriesByContentType,
  printChangeSummary,
  saveContentTypesToDb,
  syncEntries
} from '../helpers/index.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fileSystem from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

let toConfigFile = null
let parsedArgs = minimist(process.argv.slice(2))
if (parsedArgs.hasOwnProperty('to-config')) {
  toConfigFile = parsedArgs['to-config']
} else {
  console.error("@@ERROR: A 'TO' Config file should be specified")
  process.exit(1)
}

// Get the data from 'to' config file - we assume from the root of the contentful-scripts
let envDestinationValues = dotenv.config({
  path: __dirname + '/../' + toConfigFile
}).parsed

// Default values
let fromCmaToken = envValues.CMS_MANAGEMENT_TOKEN
let fromSpaceId = envValues.CMS_SPACE_ID
let fromEnvironmentId = null
let fromCounterEntryId = envValues.CMS_DEFAULT_COUNTER_ID
let fromCounterLocale = envValues.CMS_DEFAULT_COUNTER_LOCALE

let toCmaToken = envDestinationValues.CMS_MANAGEMENT_TOKEN
let toSpaceId = envDestinationValues.CMS_SPACE_ID
let toEnvironmentId = null
let toCounterEntryId = envDestinationValues.CMS_DEFAULT_COUNTER_ID
let toCounterLocale = envDestinationValues.CMS_DEFAULT_COUNTER_LOCALE

let defaultLocale = envValues.CMS_LOCALE_DEFAULT

// Default Args
let argOnlyPublished = false
let argIgnoreCounter = false
let argVerbose = false
let argVerbosityLevel = 0
let argDryRun = false
let argTags = ''
let argDbPath = __dirname + '/'

if (parsedArgs.hasOwnProperty('from')) {
  fromEnvironmentId = parsedArgs.from
} else {
  console.error('@@ERROR: A FROM environment should be specified')
  process.exit(1)
}

if (parsedArgs.hasOwnProperty('to')) {
  toEnvironmentId = parsedArgs.to
} else {
  console.error('@@ERROR: A TO environment should be specified')
  process.exit(1)
}

if (parsedArgs.hasOwnProperty('only-published')) {
  argOnlyPublished = true
}

if (parsedArgs.hasOwnProperty('ignore-counter')) {
  argIgnoreCounter = true
}

if (parsedArgs.hasOwnProperty('verbose')) {
  argVerbose = true
  if (Number.isInteger(parsedArgs.verbose)) {
    argVerbosityLevel = parseInt(parsedArgs.verbose)
  } else {
    argVerbosityLevel = 1
  }
}

if (parsedArgs.hasOwnProperty('dry-run')) {
  argDryRun = true
}

if (parsedArgs.hasOwnProperty('tags')) {
  argTags = parsedArgs.tags
}

if (!fileSystem.existsSync(argDbPath)) {
  console.error(
    '@@ERROR: Destination DB path does not exist or not accessible!'
  )
  process.exit(1)
}

async function execute() {
  // Print recap with data (console info log)
  await printRecap()
  // Check from and to space/env exists
  await checkEnvironmentsExist()

  // Create FROM and TO Environment Singleton objects
  const fromEnvironmentSingleton = await getEnvironmentSingleton(
    contentful,
    fromCmaToken,
    fromSpaceId,
    fromEnvironmentId
  )

  const toEnvironmentSingleton = await getEnvironmentSingleton(
    contentful,
    toCmaToken,
    toSpaceId,
    toEnvironmentId
  )

  // Check the counter (change method)
  await checkCounter(
    argIgnoreCounter,
    fromEnvironmentSingleton,
    fromCounterEntryId,
    fromCounterLocale,
    toEnvironmentSingleton,
    toCounterEntryId,
    toCounterLocale,
    argVerbose
  )

  // Load the Config file
  let envConfVar = await syncSpaceConf()

  // Create the database
  let dbFilePath = argDbPath + 'sync-space.db'
  let dbInstance = new Database(dbFilePath)
  await createDatabase(dbInstance, argVerbose)

  // Save content-type list
  const relevantContentTypes = [
    'address',
    'color',
    'deliverySteps',
    'icon',
    'linkBlock',
    'link',
    'organization',
    'richTextTranslation',
    'translation',
    'translationInfoLabel',
    'uspsCard',
    'usp',
    'footerProvidersBlock'
  ]

  const contentTypesInUse = await getContentTypes(
    fromEnvironmentSingleton,
    argVerbose
  )

  const filteredContentTypes = {
    items: contentTypesInUse.items
      .filter(item => relevantContentTypes.includes(item?.sys?.id))
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  await saveContentTypesToDb(filteredContentTypes, dbInstance, argVerbose)
  let contentTypesList = await getAllContentTypes(dbInstance, argVerbose)

  // Populate FROM environment data
  await populateFromEntriesByContentType(
    fromEnvironmentSingleton,
    contentTypesList,
    dbInstance,
    envConfVar,
    [],
    defaultLocale,
    false,
    argVerbose,
    argVerbosityLevel
  )

  // TO-DO CLEANUP Function for only en-GB data and new Tags
  await cleanupFromData(
    dbInstance,
    envConfVar,
    defaultLocale,
    argTags,
    argVerbose,
    argVerbosityLevel
  )

  // Populate TO environment data
  await populateToEntriesByContentType(
    toEnvironmentSingleton,
    contentTypesList,
    dbInstance,
    envConfVar,
    [],
    defaultLocale,
    false,
    argVerbose,
    argVerbosityLevel
  )

  await computeEntriesToUpdate(
    dbInstance,
    envConfVar,
    false,
    argOnlyPublished,
    argVerbose
  )

  if (argVerbose) {
    await printChangeSummary(dbInstance, argVerbosityLevel)
  }

  // // If NOT dry-run, then execute the sync
  if (!argDryRun) {
    await syncEntries(
      contentful,
      toCmaToken,
      toSpaceId,
      toEnvironmentId,
      dbInstance,
      argVerbose,
      argVerbosityLevel
    )
  } else {
    console.log(
      '\x1b[33m##INFO:\x1b[0m Re-run without --dry-run to perform the sync!'
    )
  }

  dbInstance.close()
}

async function printRecap() {
  console.log(
    '\x1b[33m##INFO:\x1b[0m Space Sync is gonna run with the following configuration'
  )
  console.log(
    '\x1b[33m##INFO:\x1b[0m From Space: \x1b[35m%s\x1b[0m',
    fromSpaceId
  )
  console.log(
    '\x1b[33m##INFO:\x1b[0m From Environment: \x1b[35m%s\x1b[0m',
    fromEnvironmentId
  )
  console.log('\x1b[33m##INFO:\x1b[0m To Space: \x1b[35m%s\x1b[0m', toSpaceId)
  console.log(
    '\x1b[33m##INFO:\x1b[0m To Environment: \x1b[35m%s\x1b[0m',
    toEnvironmentId
  )
  console.log(
    '\x1b[33m##INFO:\x1b[0m Default Locale: \x1b[35m%s\x1b[0m',
    defaultLocale
  )
  console.log(
    '\x1b[33m##INFO:\x1b[0m Entry type: \x1b[35m%s\x1b[0m',
    argOnlyPublished ? 'Only published' : 'All (published, drafts, archived)'
  )
  console.log(
    '\x1b[33m##INFO:\x1b[0m Ignore Migration Counter: \x1b[35m%s\x1b[0m',
    argIgnoreCounter
  )
  console.log(
    '\x1b[33m##INFO:\x1b[0m Verbose Output: \x1b[35m%s\x1b[0m',
    argVerbose
  )
  console.log('\x1b[33m##INFO:\x1b[0m Dry run: \x1b[35m%s\x1b[0m', argDryRun)
}

async function checkEnvironmentsExist() {
  if (
    !(await environmentExists(
      contentful,
      fromCmaToken,
      fromSpaceId,
      fromEnvironmentId
    ))
  ) {
    console.error(
      '@@ERROR: Source environment ' + fromEnvironmentId + ' does not exist!'
    )
    process.exit(1)
  }
  if (
    !(await environmentExists(
      contentful,
      toCmaToken,
      toSpaceId,
      toEnvironmentId
    ))
  ) {
    console.error(
      '@@ERROR: Destination environment ' + toEnvironmentId + ' does not exist!'
    )
    process.exit(1)
  }
}

async function cleanupFromData(
  databaseInstance,
  envConfVar,
  defaultLocale,
  argTags,
  isVerbose,
  verbosityLevel
) {
  // argTags (country-de)
  // defaultLocale (en-GB)
  if (isVerbose) {
    console.log('\x1b[32m##LOG:\x1b[0m Cleanup FROM entries in Database...')
  }

  // Queries for entries in DB
  const selectQuery =
    'SELECT ' +
    'id, ' +
    'from_json_data, ' +
    'from_entry_tags ' +
    'FROM contentful_entries ' +
    "WHERE content_type != 'contentfulAsset';"

  const updateQuery =
    'UPDATE contentful_entries SET ' +
    'from_entry_tags = @entryTags, ' +
    'from_json_data = @jsonData ' +
    ' WHERE ' +
    'id = @entryId'

  const updatePreparedStatement = databaseInstance.prepare(updateQuery)

  let entryArray = databaseInstance.prepare(selectQuery).all()

  // Check if there is any result
  if (entryArray?.length > 0) {
    if (isVerbose) {
      console.log(
        '\x1b[32m##LOG:\x1b[0m Cleaning up ' + entryArray?.length + ' entries'
      )
    }

    // For each entry
    for (let i = 0; i < entryArray?.length; i++) {
      // Extract from_json_data to Object
      let fromRowId = entryArray[i].id
      let fromJsonData = JSON.parse(entryArray[i].from_json_data)
      let resultJsonData = {}

      // Parse fields (level 0) and only keep 'defaultLocale' ones
      for (let key in fromJsonData) {
        // 2.2.2 Save the JSON data back in Database
        if (
          fromJsonData[key] !== undefined &&
          fromJsonData[key].hasOwnProperty(defaultLocale)
        ) {
          resultJsonData[key] = {}
          resultJsonData[key][defaultLocale] = fromJsonData[key][defaultLocale]
        }
      }

      // 2.3 Commit changes for the row
      await updatePreparedStatement.run({
        entryTags: argTags,
        jsonData: JSON.stringify(resultJsonData),
        entryId: fromRowId
      })
    }
  }
}

await execute()
