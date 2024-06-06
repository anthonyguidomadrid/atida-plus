// Imports
import minimist from 'minimist'
import dotenv from 'dotenv'
// eslint-disable-next-line
import contentful from 'contentful-management'
import Database from 'better-sqlite3'

// Local Helpers
import { syncEnvConf } from './sync-env-conf.mjs'
import {
  checkCounter,
  createDatabase,
  saveContentTypesToDb,
  getRequiredLinkedEntries,
  getContentTypes,
  getAllContentTypes,
  populateFromEntriesByContentType,
  populateToEntriesByContentType,
  syncAssets,
  syncEntries,
  buildLinkedEntriesTree,
  computeEntriesToUpdate,
  extractExcludedFromConf,
  printChangeSummary,
  environmentExists,
  getEnvironmentSingleton
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

// Default values
let environmentIdFrom = null
let environmentIdTo = null
let counterEntryId = envValues.CMS_DEFAULT_COUNTER_ID
let counterEntryLocale = envValues.CMS_DEFAULT_COUNTER_LOCALE
let defaultLocale = envValues.CMS_LOCALE_DEFAULT

// Default Args
let argOnlyInsert = false
let argOnlyPublished = false
let argExcludeContentTypes = []
let argIgnoreCounter = false
let argIncludeAssets = false
let argVerbose = false
let argVerbosityLevel = 1
let argDryRun = false
let argDbPath = null

let parsedArgs = minimist(process.argv.slice(2))
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

if (parsedArgs.hasOwnProperty('only-insert')) {
  argOnlyInsert = true
}

if (parsedArgs.hasOwnProperty('only-published')) {
  argOnlyPublished = true
}

if (parsedArgs.hasOwnProperty('include-assets')) {
  argIncludeAssets = true
}

if (!argOnlyPublished && parsedArgs.hasOwnProperty('exclude-ct')) {
  argExcludeContentTypes = parsedArgs['exclude-ct'].split(',')
}

if (parsedArgs.hasOwnProperty('save-db-in')) {
  argDbPath = parsedArgs['save-db-in']
} else {
  argDbPath = __dirname + '/'
}

if (argDbPath.endsWith('/') && !fileSystem.existsSync(argDbPath)) {
  console.error(
    '@@ERROR: Destination DB path does not exist or not accessible!'
  )
  process.exit(1)
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

console.log(
  '\x1b[33m##INFO:\x1b[0m Sync is gonna run with the following configuration'
)
console.log(
  '\x1b[33m##INFO:\x1b[0m From Environment: \x1b[35m%s\x1b[0m',
  environmentIdFrom
)
console.log(
  '\x1b[33m##INFO:\x1b[0m To Environment: \x1b[35m%s\x1b[0m',
  environmentIdTo
)
console.log(
  '\x1b[33m##INFO:\x1b[0m Default Locale: \x1b[35m%s\x1b[0m',
  defaultLocale
)
console.log(
  '\x1b[33m##INFO:\x1b[0m Insertion mode: \x1b[35m%s\x1b[0m',
  argOnlyInsert ? 'Only insert new entries' : 'Update existing entries'
)
console.log(
  '\x1b[33m##INFO:\x1b[0m Entry type: \x1b[35m%s\x1b[0m',
  argOnlyPublished ? 'Only published' : 'All (published, drafts, archived)'
)
console.log(
  '\x1b[33m##INFO:\x1b[0m Excluded Content-types: \x1b[35m%s\x1b[0m',
  argExcludeContentTypes
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

async function execute() {
  let envConfVar = await syncEnvConf()

  if (
    !(await environmentExists(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdFrom
    ))
  ) {
    console.error(
      '@@ERROR: Source environment ' + environmentIdFrom + ' does not exist!'
    )
    process.exit(1)
  }
  if (
    !(await environmentExists(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdTo
    ))
  ) {
    console.error(
      '@@ERROR: Destination environment ' + environmentIdTo + ' does not exist!'
    )
    process.exit(1)
  }

  await checkCounter(
    argIgnoreCounter,
    await getEnvironmentSingleton(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdFrom
    ),
    counterEntryId,
    counterEntryLocale,
    await getEnvironmentSingleton(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdTo
    ),
    counterEntryId,
    counterEntryLocale,
    argVerbose
  )

  let dbFilePath = argDbPath.endsWith('/')
    ? argDbPath + 'sync-env.db'
    : argDbPath
  let dbInstance = new Database(dbFilePath)

  let defaultExcluded = await extractExcludedFromConf(envConfVar)
  argExcludeContentTypes = argExcludeContentTypes.concat(defaultExcluded)

  await createDatabase(dbInstance, argVerbose)

  const contentTypesInUse = await getContentTypes(
    await getEnvironmentSingleton(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdFrom
    ),
    argVerbose
  )

  await saveContentTypesToDb(contentTypesInUse, dbInstance, argVerbose)
  await getRequiredLinkedEntries(contentTypesInUse, dbInstance, argVerbose)

  let contentTypesList = await getAllContentTypes(dbInstance, argVerbose)

  await populateFromEntriesByContentType(
    await getEnvironmentSingleton(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdFrom
    ),
    contentTypesList,
    dbInstance,
    envConfVar,
    argExcludeContentTypes,
    defaultLocale,
    argIncludeAssets,
    argVerbose,
    argVerbosityLevel
  )

  await buildLinkedEntriesTree(
    dbInstance,
    envConfVar,
    argExcludeContentTypes,
    defaultLocale,
    argVerbose
  )

  await populateToEntriesByContentType(
    await getEnvironmentSingleton(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdTo
    ),
    contentTypesList,
    dbInstance,
    envConfVar,
    argExcludeContentTypes,
    defaultLocale,
    argIncludeAssets,
    argVerbose,
    argVerbosityLevel
  )

  await computeEntriesToUpdate(
    dbInstance,
    envConfVar,
    argOnlyInsert,
    argOnlyPublished,
    argVerbose
  )

  if (argVerbose) {
    await printChangeSummary(dbInstance, argVerbosityLevel)
  }

  // // If NOT dry-run, then execute the sync
  if (!argDryRun) {
    if (argIncludeAssets) {
      await syncAssets(
        contentful,
        envValues.CMS_MANAGEMENT_TOKEN,
        envValues.CMS_SPACE_ID,
        environmentIdTo,
        dbInstance,
        argVerbose,
        argVerbosityLevel
      )
    }

    await syncEntries(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentIdTo,
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

await execute()
