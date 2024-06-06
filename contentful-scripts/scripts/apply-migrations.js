// Imports
import minimist from 'minimist'
import dotenv from 'dotenv'
import fileSystem from 'fs'
import path, { dirname } from 'path'
import async from 'async'
import keypress from 'keypress'

// Import contentful utility
import {
  environmentExists,
  getEnvironmentSingleton
} from '../helpers/index.mjs'
import { runMigration } from 'contentful-migration'
// eslint-disable-next-line
import contentfulManagement from 'contentful-management'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

// Default values
let environmentId = 'dev'
let alwaysYes = false
let folderMigrationScript = __dirname + '/../migration/script/'
let counterEntryId = envValues.CMS_DEFAULT_COUNTER_ID
let defaultLocale = envValues.CMS_DEFAULT_COUNTER_LOCALE

async function execute() {
  let parsedArgs = minimist(process.argv.slice(2))
  if (parsedArgs.hasOwnProperty('to')) {
    environmentId = parsedArgs.to
  } else {
    console.error('@@ERROR: An environment should be specified')
    process.exit(1)
  }

  if (parsedArgs.hasOwnProperty('force-yes')) {
    alwaysYes = true
  }

  if (parsedArgs.hasOwnProperty('counter-entry-id')) {
    counterEntryId = parsedArgs['counter-entry-id']
  }

  if (
    !(await environmentExists(
      contentfulManagement,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentId
    ))
  ) {
    console.error(
      '@@ERROR: Destination environment ' + environmentId + ' does not exist!'
    )
    process.exit(1)
  }

  console.log('##INFO: Applying migrations to environment: ' + environmentId)

  // Retrieve the counter
  // eslint-disable-next-line
  const client = contentfulManagement.createClient(
    {
      accessToken: envValues.CMS_MANAGEMENT_TOKEN
    },
    { type: 'plain' }
  )

  let counterEntry = await client.entry
    .get({
      spaceId: envValues.CMS_SPACE_ID,
      environmentId: environmentId,
      entryId: counterEntryId
    })
    .catch(e => {
      console.error('@@ERROR: Impossible to retrieve the Counter entry!')
      process.exit(1)
    })

  let counterIndex = counterEntry?.fields?.value[defaultLocale] ?? false

  if (!counterIndex) {
    console.error('@@ERROR: Impossible to retrieve the Counter entry!')
    process.exit(1)
  }

  // Compute the array of files to run migration
  let files = fileSystem.readdirSync(folderMigrationScript)
  let migrationArray = []
  let arrayLength = files.length
  let finalCounter = 0
  let latestCounter = 0

  for (let i = 0; i < arrayLength; i++) {
    let fileIndexValue = parseInt(files[i].substring(0, 4))

    if (fileIndexValue === undefined || !Number.isInteger(fileIndexValue)) {
      console.error('@@ERROR: There is an invalid migration:')
      console.error('@@ERROR: ' + folderMigrationScript + files[i])
      process.exit(1)
    }

    if (fileIndexValue > counterIndex) {
      migrationArray.push(files[i])

      if (fileIndexValue === latestCounter) {
        console.error('@@ERROR: There are duplicated migrations!')
        console.error('@@ERROR: ' + folderMigrationScript + files[i])
        process.exit(1)
      } else {
        latestCounter = fileIndexValue
      }
    } else {
      finalCounter++
    }
  }

  let migrationLength = migrationArray.length
  console.log('##INFO: ' + migrationLength + ' will be executed')
  console.log(migrationArray)

  // Loop and run migrations
  async.eachSeries(migrationArray, function (migrationScript, callback) {
    let options = {
      spaceId: envValues.CMS_SPACE_ID,
      environmentId: environmentId,
      accessToken: envValues.CMS_MANAGEMENT_TOKEN,
      yes: alwaysYes
    }

    process.stdin.on('keypress', function (ch, key) {
      if (key && key.name === 'n') {
        process.exit(1)
      }
    })

    if (
      fileSystem.readFileSync(folderMigrationScript + migrationScript)
        .length === 0
    ) {
      console.error('@@ERROR: The following migration is empty')
      console.error('@@ERROR: ' + folderMigrationScript + migrationScript)
      process.exit(1)
    }

    runMigration({
      ...options,
      ...{
        filePath: path.resolve(folderMigrationScript + migrationScript)
      }
    })
      .then(async () => {
        console.log('##INFO: Migration ' + migrationScript + ' Done!')

        // Update counter value
        finalCounter++
        let zeroFilled = ('0000' + finalCounter).slice(-4)

        // Write new Count into Entry
        let entrySavingCounter,
          environmentInUse = await getEnvironmentSingleton(
            contentfulManagement,
            envValues.CMS_MANAGEMENT_TOKEN,
            envValues.CMS_SPACE_ID,
            environmentId
          )

        await environmentInUse
          .getEntry(counterEntryId)
          .then(entry => (entrySavingCounter = entry))
          .catch(e => console.error('@@ERROR: ' + e))

        entrySavingCounter.fields.value[defaultLocale] = zeroFilled

        entrySavingCounter
          .update()
          .then(callback())
          .catch(e => console.error('@@ERROR: ' + e))
      })
      .catch(e =>
        console.error(
          '@@ERROR ' +
            e +
            ' - while running the migration: ' +
            folderMigrationScript +
            migrationScript
        )
      )
  })
}

await execute()
