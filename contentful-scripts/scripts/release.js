// Imports
import minimist from 'minimist'
import dotenv from 'dotenv'
import { orderBy } from 'natural-orderby'
import keypress from 'keypress'

// Import contentful utility
// eslint-disable-next-line
import contentful from 'contentful-management'

import {
  environmentExists,
  deleteEnvironment,
  enableCdaKey,
  populateFromEntriesByContentType,
  saveContentTypesToDb,
  getRequiredLinkedEntries,
  getAllContentTypes,
  getContentTypes,
  getEnvironmentSingleton,
  buildLinkedEntriesTree,
  populateToEntriesByContentType,
  computeEntriesToUpdate,
  printChangeSummary,
  createDatabase,
  syncEntries,
  getDefaultLocale,
  getListOfAllLocales
} from '../helpers/index.mjs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Database from 'better-sqlite3'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

let environmentId = null
let previousReleaseEnvironmentId = null
let masterEnvironmentId = 'master'
let releaseNaming = 'release'
keypress(process.stdin)

let parsedArgs = minimist(process.argv.slice(2))

if (parsedArgs.hasOwnProperty('duplicate-master')) {
  if (parsedArgs.hasOwnProperty('to')) {
    environmentId = parsedArgs.to
  } else {
    console.error('@@ERROR: A TO environment should be specified')
    process.exit(1)
  }

  await duplicateEnvironment(
    contentful,
    envValues.CMS_MANAGEMENT_TOKEN,
    envValues.CMS_SPACE_ID,
    environmentId,
    masterEnvironmentId
  )
} else if (parsedArgs.hasOwnProperty('link-master')) {
  if (parsedArgs.hasOwnProperty('to')) {
    environmentId = parsedArgs.to
  } else {
    console.error('@@ERROR: A TO environment should be specified')
    process.exit(1)
  }

  const deleteOldRelease = parsedArgs.hasOwnProperty('delete-old-releases')
  const argForceYes = parsedArgs.hasOwnProperty('force-yes')

  await linkMasterToEnvironment(
    contentful,
    envValues.CMS_MANAGEMENT_TOKEN,
    envValues.CMS_SPACE_ID,
    environmentId,
    masterEnvironmentId,
    deleteOldRelease,
    releaseNaming,
    argForceYes
  )
} else if (parsedArgs.hasOwnProperty('sync-scheduling')) {
  if (parsedArgs.hasOwnProperty('from')) {
    previousReleaseEnvironmentId = parsedArgs.from
  } else {
    console.error(
      '@@ERROR: A FROM environment should be specified for the Schedule Sync'
    )
    process.exit(1)
  }

  await syncScheduledActions(
    contentful,
    envValues.CMS_MANAGEMENT_TOKEN,
    envValues.CMS_SPACE_ID,
    previousReleaseEnvironmentId
  )
} else if (parsedArgs.hasOwnProperty('sync-current-master')) {
  if (parsedArgs.hasOwnProperty('from')) {
    previousReleaseEnvironmentId = parsedArgs.from
  } else {
    console.error(
      '@@ERROR: A FROM environment should be specified for the Promotion Sync'
    )
    process.exit(1)
  }

  await syncCurrentMaster(
    contentful,
    envValues.CMS_MANAGEMENT_TOKEN,
    envValues.CMS_SPACE_ID,
    previousReleaseEnvironmentId
  )
}

async function duplicateEnvironment(
  contentful,
  cmaToken,
  cmaSpaceId,
  environmentId,
  masterEnvironmentId
) {
  let excludedEnvironments = ['empty-DO-NOT-DELETE', 'dev', 'uat', 'master']
  let regex = new RegExp(releaseNaming + '-[0-9]+[\\.]*[0-9]*[\\.]*[0-9]*', 'g')

  if (environmentId === '' || excludedEnvironments.includes(environmentId)) {
    console.error(
      '@@ERROR: The destination environment is either empty or reserved!'
    )
    process.exit(1)
  }

  if (!environmentId.match(regex)) {
    console.error(
      "@@ERROR: The destination environment should be named 'release-x.y.z'"
    )
    process.exit(1)
  }

  // Add Check master environment exists
  if (
    !(await environmentExists(
      contentful,
      cmaToken,
      cmaSpaceId,
      masterEnvironmentId
    ))
  ) {
    console.error('@@ERROR: Master environment does not exist!')
    process.exit(1)
  }

  // eslint-disable-next-line
  const clientCma = contentful.createClient({
    accessToken: cmaToken
  })

  let spc, myEnvironment
  await clientCma
    .getSpace(cmaSpaceId)
    .then(space => (spc = space))
    .catch(e => console.error('@@ERROR: ' + e))
  await spc
    .createEnvironmentWithId(
      environmentId,
      { name: environmentId },
      masterEnvironmentId
    )
    .then(environment => (myEnvironment = environment))
    .catch(e => {
      console.error(
        '@@ERROR: There was a problem creating the environment ' + environmentId
      )
      console.error(
        'It might be that an environment with that name already exists'
      )
      console.error(
        "Or you don't have any free environment slots to create a new one!"
      )
      process.exit(1)
    })

  // Enable the CDA 'master' key for the new release environment
  let creationKeyResult = await enableCdaKey(
    contentful,
    cmaToken,
    cmaSpaceId,
    masterEnvironmentId,
    environmentId
  )

  console.log(
    "CDA '" +
      masterEnvironmentId +
      "' Key " +
      (creationKeyResult ? '' : 'NOT ') +
      'assigned to environment ' +
      environmentId
  )

  // Wait few seconds before checking if environment exist, might not
  let timerId = setInterval(() => {
    myEnvironment
      .getEntries({ limit: 1 })
      .then(entries => {
        console.log(
          '##INFO: ' +
            environmentId +
            ' successfully duplicated from ' +
            masterEnvironmentId
        )

        // Success, therefore clear the interval
        clearInterval(timerId)
      })
      .catch(e => {
        console.log(
          'Waiting to retrieve the newly created environment ' + environmentId
        )
      })
  }, 1000)
}

async function syncScheduledActions(
  contentful,
  cmaToken,
  cmaSpaceId,
  previousReleaseEnvironmentId
) {
  let masterEnvironmentName = 'master'
  // eslint-disable-next-line
  const clientCma = contentful.createClient({
    accessToken: cmaToken
  })

  if (
    previousReleaseEnvironmentId === '' ||
    !(await environmentExists(
      contentful,
      cmaToken,
      cmaSpaceId,
      previousReleaseEnvironmentId
    ))
  ) {
    console.error(
      '@@ERROR: ' +
        previousReleaseEnvironmentId +
        ' environment does not exist!'
    )
    process.exit(0)
  }

  let spc,
    limit = 500,
    scheduledActions = null

  await clientCma
    .getSpace(cmaSpaceId)
    .then(space => (spc = space))
    .catch(e => console.error('@@ERROR: ' + e))

  await spc
    .getScheduledActions({
      'environment.sys.id': previousReleaseEnvironmentId,
      'sys.status': 'scheduled',
      limit: limit
    })
    .then(actions => (scheduledActions = actions))
    .catch(e => console.error('@@ERROR: ' + e))

  // Leaving this for debugging purpose in the CI output
  console.log('PREVIOUS ENVIRONMENT: ' + previousReleaseEnvironmentId)
  console.log('TOTAL SCHEDULED ACTIONS: ' + scheduledActions?.items?.length)

  for (let i = 0; i < scheduledActions?.items?.length; i++) {
    let scheduledItem = scheduledActions?.items[i]

    if (scheduledItem !== undefined) {
      spc
        .createScheduledAction({
          entity: {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: scheduledItem?.entity?.sys?.id
            }
          },
          environment: {
            sys: {
              type: 'Link',
              linkType: 'Environment',
              id: masterEnvironmentName
            }
          },
          action: scheduledItem?.action,
          scheduledFor: {
            datetime: scheduledItem?.scheduledFor?.datetime,
            timezone: scheduledItem?.scheduledFor?.timezone
          }
        })
        .then(scheduledAction => console.log(scheduledAction))
        .catch(e => console.error('@@ERROR: ' + e))
    }
  }
}

async function syncCurrentMaster(
  contentful,
  cmaToken,
  cmaSpaceId,
  previousReleaseEnvironmentId
) {
  // We are only going to sync only Promotions and related entries
  const relevantContentTypes = [
    'translation',
    'translationInfoLabel',
    'page',
    'promotion',
    'brand',
    'category'
  ]
  let masterEnvironmentName = 'master'
  let argVerbose = true
  let argVerbosityLevel = 2
  let defaultLocale = getDefaultLocale()
  let dbFilePath = __dirname + '/sync-master.db'
  let envConfVar = await syncEnvConf()
  let dbInstance = new Database(dbFilePath)

  console.log(
    "##LOG: Syncing data from '" +
      previousReleaseEnvironmentId +
      "' to '" +
      masterEnvironmentName +
      "'"
  )

  // Source branch: release-x.y.k
  if (
    previousReleaseEnvironmentId === '' ||
    !(await environmentExists(
      contentful,
      cmaToken,
      cmaSpaceId,
      previousReleaseEnvironmentId
    ))
  ) {
    console.error(
      '@@ERROR: ' +
        previousReleaseEnvironmentId +
        ' environment does not exist!'
    )
    process.exit(0)
  }

  const previousEnvironmentSingleton = await getEnvironmentSingleton(
    contentful,
    cmaToken,
    cmaSpaceId,
    previousReleaseEnvironmentId
  )

  const oldContentTypesInUse = await getContentTypes(
    previousEnvironmentSingleton,
    argVerbose
  )

  const masterEnvironmentSingleton = await getEnvironmentSingleton(
    contentful,
    cmaToken,
    cmaSpaceId,
    masterEnvironmentName
  )

  const newContentTypesInUse = await getContentTypes(
    masterEnvironmentSingleton,
    argVerbose
  )

  // Select only the Content-types you need
  const oldFilteredContentTypes = {
    items: oldContentTypesInUse.items
      .filter(item => relevantContentTypes.includes(item?.sys?.id))
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  const newFilteredContentTypes = {
    items: newContentTypesInUse.items
      .filter(item => relevantContentTypes.includes(item?.sys?.id))
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  }

  for (let i = 0; i < newFilteredContentTypes?.items?.length; i++) {
    for (
      let j = 0;
      j < newFilteredContentTypes?.items[i]?.fields?.length;
      j++
    ) {
      if (
        newFilteredContentTypes?.items[i]?.fields[j]?.id !==
        oldFilteredContentTypes?.items[i]?.fields[j]?.id
      ) {
        console.log(
          '##WARN: The Content-types are different in the two environments'
        )
        console.log('##WARN: Skipping the Sync')
        return
      }
    }
  }

  await createDatabase(dbInstance, argVerbose)
  await saveContentTypesToDb(newFilteredContentTypes, dbInstance, argVerbose)
  await getRequiredLinkedEntries(
    newFilteredContentTypes,
    dbInstance,
    argVerbose
  )

  let contentTypesList = await getAllContentTypes(dbInstance, argVerbose)

  await populateFromEntriesByContentType(
    previousEnvironmentSingleton,
    contentTypesList,
    dbInstance,
    envConfVar,
    [],
    defaultLocale,
    false,
    argVerbose,
    argVerbosityLevel
  )

  await buildLinkedEntriesTree(
    dbInstance,
    envConfVar,
    [],
    defaultLocale,
    argVerbose
  )

  await populateToEntriesByContentType(
    masterEnvironmentSingleton,
    contentTypesList,
    dbInstance,
    envConfVar,
    [],
    defaultLocale,
    false,
    argVerbose,
    argVerbosityLevel
  )

  await computeEntriesToUpdate(dbInstance, envConfVar, false, false, argVerbose)

  if (argVerbose) {
    await printChangeSummary(dbInstance, argVerbosityLevel)
  }

  await syncEntries(
    contentful,
    cmaToken,
    cmaSpaceId,
    masterEnvironmentName,
    dbInstance,
    argVerbose,
    argVerbosityLevel
  )

  dbInstance.close()
}

async function syncEnvConf() {
  return {
    page: {
      mode: 1,
      unique: 'slug',
      locale: getListOfAllLocales().join(',')
    },
    translation: {
      mode: 1,
      unique: 'key',
      locale: getListOfAllLocales().join(',')
    },
    translationInfoLabel: {
      mode: 1,
      unique: 'key',
      locale: getListOfAllLocales().join(',')
    },
    promotion: {
      mode: 1,
      unique: 'id',
      locale: getListOfAllLocales().join(','),
      linked: 'translation'
    },
    brand: {
      mode: 1,
      unique: 'id',
      locale: getListOfAllLocales().join(',')
    },
    category: {
      mode: 1,
      unique: 'id',
      locale: getListOfAllLocales().join(',')
    }
  }
}

async function linkMasterToEnvironment(
  contentful,
  cmaToken,
  cmaSpaceId,
  environmentId,
  masterEnvironmentId,
  deleteOldReleases,
  releaseNaming = 'release',
  forceYes = false
) {
  let excludedEnvironments = ['empty-DO-NOT-DELETE', 'dev', 'uat', 'master']
  let regex = new RegExp(releaseNaming + '-[0-9]+[\\.]*[0-9]*[\\.]*[0-9]*', 'g')

  if (environmentId === '' || excludedEnvironments.includes(environmentId)) {
    console.error(
      '@@ERROR: The destination environment is either empty or reserved!'
    )
    process.exit(1)
  }

  if (!environmentId.match(regex)) {
    console.error(
      "@@ERROR: The destination environment should be named 'release-x.y.z'"
    )
    process.exit(1)
  }

  // Add Check master environment exists
  if (
    !(await environmentExists(
      contentful,
      cmaToken,
      cmaSpaceId,
      masterEnvironmentId
    ))
  ) {
    console.error('@@ERROR: Master environment does not exist!')
    process.exit(1)
  }

  // Add Check destination environment exists
  if (
    !(await environmentExists(contentful, cmaToken, cmaSpaceId, environmentId))
  ) {
    console.error('@@ERROR: Destination environment does not exist!')
    process.exit(1)
  }

  // eslint-disable-next-line
  const clientCma = contentful.createClient({
    accessToken: cmaToken
  })

  let spc
  await clientCma
    .getSpace(cmaSpaceId)
    .then(space => (spc = space))
    .catch(e => console.error('@@ERROR: ' + e))
  await spc
    .getEnvironmentAlias(masterEnvironmentId)
    .then(alias => {
      alias.environment.sys.id = environmentId
      return alias.update()
    })
    .then(alias =>
      console.log(
        '##INFO: Alias ' +
          masterEnvironmentId +
          ' to ' +
          environmentId +
          ' updated.'
      )
    )
    .catch(e => console.error('@@ERROR: ' + e))

  if (deleteOldReleases) {
    await pruneOldReleases(
      contentful,
      envValues.CMS_MANAGEMENT_TOKEN,
      envValues.CMS_SPACE_ID,
      environmentId,
      releaseNaming,
      forceYes
    )
  }
}

async function pruneOldReleases(
  contentful,
  cmaToken,
  cmaSpaceId,
  newReleaseEnvironment = null,
  releaseNaming = 'release',
  forceYes = false
) {
  console.log(
    '##INFO: Deleting old ' + releaseNaming.toUpperCase() + ' environments'
  )

  // eslint-disable-next-line
  const clientCma = contentful.createClient({
    accessToken: cmaToken
  })

  let excludedEnvironments = ['empty-DO-NOT-DELETE', 'dev', 'uat', 'master']
  let regex = new RegExp(releaseNaming + '-[0-9]+[\\.]*[0-9]*[\\.]*[0-9]*', 'g')
  let environmentList
  let releaseList = []
  let spc

  // // Get list of all environments
  await clientCma
    .getSpace(cmaSpaceId)
    .then(space => (spc = space))
    .catch(e => console.error('@@ERROR: ' + e))
  await spc
    .getEnvironments()
    .then(response => (environmentList = response.items))
    .catch(e => console.error('@@ERROR: ' + e))

  console.log('##INFO: Processing the list of all environments')
  for (let i = 0; i < environmentList.length; i++) {
    if (
      environmentList[i].name.match(regex) &&
      environmentList[i].sys.aliasedEnvironment === undefined &&
      !excludedEnvironments.includes(environmentList[i].name)
    ) {
      releaseList.push(environmentList[i].name)
    } else {
      let isAliased = ''
      if (environmentList[i].sys.aliasedEnvironment) {
        isAliased = ' aliased by ' + environmentList[i].sys.id
      }
      console.log(
        '##INFO: This environment will NOT be deleted: ' +
          environmentList[i].name +
          isAliased
      )
    }
  }

  const sortedReleases = orderBy(releaseList, [], ['desc'])

  // Exclude the latest release
  let latestRelease = sortedReleases.shift()
  // That also has to match the parameter we just passed
  if (latestRelease === newReleaseEnvironment) {
    // If so, we exclude the previous release for rollback
    let beforeLastEnvironment = sortedReleases.shift()

    console.log('##INFO: List of Release environments that will be kept:')
    console.log(latestRelease)
    console.log(beforeLastEnvironment)

    console.log('##INFO: List of Release environments that will be deleted:')

    let environmentsToBeDeleted = []
    // And then we can remove all the older releases (if any)
    for (let j = 0; j < sortedReleases.length; j++) {
      // Delete the environment here
      console.log(sortedReleases[j])
      environmentsToBeDeleted.push(sortedReleases[j])
    }

    if (environmentsToBeDeleted.length > 0) {
      if (forceYes) {
        for (let z = 0; z < environmentsToBeDeleted.length; z++) {
          // CMA Call to delete
          console.log(
            '##DEBUG: Environment ' +
              environmentsToBeDeleted[z] +
              ' is going to be deleted!'
          )
          await deleteEnvironment(
            contentful,
            cmaToken,
            cmaSpaceId,
            environmentsToBeDeleted[z]
          )
        }
      } else {
        console.log(
          '## ARE YOU SURE YOU WANT TO DELETE THE OLD RELEASES? PRESS "Y" to confirm ##'
        )
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.on('keypress', function (ch, key) {
          if (key && key.name === 'y') {
            process.stdin.pause()
            for (let z = 0; z < environmentsToBeDeleted.length; z++) {
              // CMA Call to delete
              console.log(
                '##DEBUG: Environment ' +
                  environmentsToBeDeleted[z] +
                  ' is going to be deleted!'
              )
              deleteEnvironment(
                contentful,
                cmaToken,
                cmaSpaceId,
                environmentsToBeDeleted[z]
              )
            }
          } else {
            console.log('##INFO: Nothing to delete')
            process.exit(1)
          }
        })
      }
    } else {
      console.log('##INFO: Nothing to delete')
    }
  } else {
    console.log(
      '##INFO: The created Release environment is not the latest Release'
    )
    console.log('##INFO: We are not gonna delete any environment!')
  }
}
