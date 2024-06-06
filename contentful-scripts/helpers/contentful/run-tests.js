import {
  addEntryTag,
  deleteEnvironment,
  environmentExists,
  extractStatusFromSys,
  getContentType,
  getContentTypes,
  getEntriesByContentType,
  getEntryById,
  getEntryIdByUniqueId,
  getEntryTag,
  getEnvironmentSingleton,
  publishEntry,
  removeEntryTag
} from '../index.mjs'

const FgRed = '\x1b[31m'
const FgGreen = '\x1b[32m'
let passedTests = 0
let failedTests = 0

// ##################################################################
// ##################################################################
let createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return environmentId
          }
        }
      }
    }
  }
}

let environmentId = 'fake-env'
let result = await getEnvironmentSingleton(
  createLocalClient,
  'fake-token',
  'fake-space',
  environmentId
)

console.log()
if (result === environmentId) {
  console.log(
    FgGreen,
    '✅ Test 01 - getEnvironmentSingleton - Can retrieve an environment'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 01 - getEnvironmentSingleton - Can retrieve an environment'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return null
          }
        }
      }
    }
  }
}

environmentId = 'fake-env'
result = await getEnvironmentSingleton(
  createLocalClient,
  'fake-token',
  'fake-space',
  environmentId
)

if (result === null) {
  console.log(
    FgGreen,
    '✅ Test 02 - getEnvironmentSingleton - Environment is null'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 02 - getEnvironmentSingleton - Environment is null'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return undefined
      }
    }
  }
}

environmentId = 'fake-env'
let environmentSpaceResult,
  errorSpaceThrown = false
try {
  environmentSpaceResult = await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  )
} catch (e) {
  errorSpaceThrown = true
  if (e instanceof Error) {
    console.log(
      FgGreen,
      '✅ Test 03 - getEnvironmentSingleton - Space is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 03 - getEnvironmentSingleton - Space is undefined - throw exception'
    )
    failedTests++
  }
}

if (!errorSpaceThrown) {
  if (environmentSpaceResult === null) {
    console.log(
      FgGreen,
      '✅ Test 03 - getEnvironmentSingleton - Space is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 03 - getEnvironmentSingleton - Space is undefined - throw exception'
    )
    failedTests++
  }
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return undefined
  }
}

environmentId = 'fake-env'
let environmentCmaResult,
  errorCmaThrown = false
try {
  environmentCmaResult = await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  )
} catch (e) {
  errorCmaThrown = true
  if (e instanceof Error) {
    console.log(
      FgGreen,
      '✅ Test 04 - getEnvironmentSingleton - Client is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 04 - getEnvironmentSingleton - Client is undefined - throw exception'
    )
    failedTests++
  }
}

if (!errorCmaThrown) {
  if (environmentCmaResult === null) {
    console.log(
      FgGreen,
      '✅ Test 04 - getEnvironmentSingleton - Client is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 04 - getEnvironmentSingleton - Client is undefined - throw exception'
    )
    failedTests++
  }
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async entryId => {
                return {
                  metadata: {
                    tags: [
                      {
                        sys: {
                          type: 'Link',
                          linkType: 'Tag',
                          id: 'oldTag'
                        }
                      }
                    ]
                  },
                  update: async () => {
                    return {
                      success: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

let log = []
const oldConsoleLog = console.log
const oldConsoleError = console.error
console.log = function (d) {
  log.push(d)
}

environmentId = 'fake-env'
await addEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  ),
  'fake-entry',
  'newTag',
  true
)

console.log = oldConsoleLog
let entryTagResult = log.pop()

if (
  entryTagResult?.metadata?.tags[0]?.sys?.id === 'oldTag' &&
  entryTagResult?.metadata?.tags[1]?.sys?.id === 'newTag'
) {
  console.log(
    FgGreen,
    '✅ Test 05 - addEntryTag - Add a new Tag (old Tag exist)'
  )
  passedTests++
} else {
  console.log(FgRed, '❌ Test 05 - addEntryTag - Add a new Tag (old Tag exist)')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async entryId => {
                return {
                  metadata: {
                    tags: []
                  },
                  update: async () => {
                    return {
                      success: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log = function (d) {
  log.push(d)
}

environmentId = 'fake-env'
await addEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  ),
  'fake-entry',
  'newTag',
  true
)

console.log = oldConsoleLog

entryTagResult = log.pop()

if (entryTagResult?.metadata?.tags[0]?.sys?.id === 'newTag') {
  console.log(
    FgGreen,
    '✅ Test 06 - addEntryTag - Add a new Tag (Tag was empty)'
  )
  passedTests++
} else {
  console.log(FgRed, '❌ Test 06 - addEntryTag - Add a new Tag (Tag was empty)')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return null
          }
        }
      }
    }
  }
}

let addTagResult,
  errorAddTagThrown = false
try {
  environmentId = 'fake-env'
  addTagResult = await addEntryTag(
    await getEnvironmentSingleton(
      createLocalClient,
      'fake-token',
      'fake-space',
      environmentId
    ),
    'fake-entry',
    'newTag'
  )
} catch (e) {
  errorAddTagThrown = true
  if (e instanceof Error) {
    console.log(
      FgGreen,
      '✅ Test 07 - addEntryTag - Add Tag, but Environment is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 07 - addEntryTag - Add Tag, but Environment is undefined - throw exception'
    )
    failedTests++
  }
}

if (!errorAddTagThrown) {
  if (addTagResult === false) {
    console.log(
      FgGreen,
      '✅ Test 07 - addEntryTag - Add Tag, but Environment is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 07 - addEntryTag - Add Tag, but Environment is undefined - throw exception'
    )
    failedTests++
  }
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async entryId => {
                return {
                  metadata: {
                    tags: [
                      {
                        sys: {
                          type: 'Link',
                          linkType: 'Tag',
                          id: 'existingTag1'
                        }
                      },
                      {
                        sys: {
                          type: 'Link',
                          linkType: 'Tag',
                          id: 'existingTag2'
                        }
                      }
                    ]
                  },
                  update: async () => {
                    return {
                      success: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log = function (d) {
  log.push(d)
}

environmentId = 'fake-env'
await removeEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  ),
  'fake-entry',
  'existingTag1',
  true
)

console.log = oldConsoleLog
entryTagResult = log.pop()

if (entryTagResult?.metadata?.tags[0]?.sys?.id === 'existingTag2') {
  console.log(
    FgGreen,
    '✅ Test 08 - removeEntryTag - Removing a Tag from entry'
  )
  passedTests++
} else {
  console.log(FgRed, '❌ Test 08 - removeEntryTag - Removing a Tag from entry')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async entryId => {
                return {
                  metadata: {
                    tags: [
                      {
                        sys: {
                          type: 'Link',
                          linkType: 'Tag',
                          id: 'existingTag1'
                        }
                      }
                    ]
                  },
                  update: async () => {
                    return {
                      success: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
console.log = function (d) {
  log.push(d)
}

environmentId = 'fake-env'
await removeEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  ),
  'fake-entry',
  'existingTag1',
  true
)

console.log = oldConsoleLog
entryTagResult = log.pop()

if (entryTagResult?.metadata?.tags.length === 0) {
  console.log(
    FgGreen,
    '✅ Test 09 - removeEntryTag - Remove tag, tags header should be empty'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 09 - removeEntryTag - Remove tag, tags header should be empty'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return null
          }
        }
      }
    }
  }
}

let removeTagResult,
  errorTagThrown = false
try {
  environmentId = 'fake-env'
  removeTagResult = await removeEntryTag(
    await getEnvironmentSingleton(
      createLocalClient,
      'fake-token',
      'fake-space',
      environmentId
    ),
    'fake-entry',
    'newTag'
  )
} catch (e) {
  errorTagThrown = true
  if (e instanceof Error) {
    console.log(
      FgGreen,
      '✅ Test 10 - removeEntryTag - Environment is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 10 - removeEntryTag - Environment is undefined - throw exception'
    )
    failedTests++
  }
}

if (!errorTagThrown) {
  if (removeTagResult === false) {
    console.log(
      FgGreen,
      '✅ Test 10 - removeEntryTag - Environment is undefined - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 10 - removeEntryTag - Environment is undefined - throw exception'
    )
    failedTests++
  }
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async entryId => {
                return null
              }
            }
          }
        }
      }
    }
  }
}

console.log = function (d) {
  log.push(d)
}

environmentId = 'fake-env'
await removeEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    environmentId
  ),
  'fake-entry',
  'newTag',
  true
)

console.log = oldConsoleLog
entryTagResult = log.pop()

if (entryTagResult === '@@ERROR: Entry is empty or missing tags') {
  console.log(FgGreen, '✅ Test 11 - removeEntryTag - geEntry fails gracefully')
  passedTests++
} else {
  console.log(FgRed, '❌ Test 11 - removeEntryTag - geEntry fails gracefully')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              sys: {
                id: environmentId
              }
            }
          }
        }
      }
    }
  }
}

environmentId = 'fake-env'
result = await environmentExists(
  createLocalClient,
  'fake-token',
  'fake-space',
  environmentId
)

if (result === true) {
  console.log(
    FgGreen,
    '✅ Test 12 - environmentExists - Can verify an Environment exists'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 12 - environmentExists - Can verify an Environment exists'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return null
          }
        }
      }
    }
  }
}

environmentId = 'fake-env'
result = await environmentExists(
  createLocalClient,
  'fake-token',
  'fake-space',
  environmentId
)

if (result === false) {
  console.log(
    FgGreen,
    '✅ Test 13 - environmentExists - Environment does not exist'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 13 - environmentExists - Environment does not exist'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
result = await environmentExists(
  createLocalClient,
  'fake-token',
  'fake-space',
  ''
)

if (result === false) {
  console.log(
    FgGreen,
    '✅ Test 14 - environmentExists - Pass empty environmentId fails'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 14 - environmentExists - Pass empty environmentId fails'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              environment: true,
              delete: async => {
                return true
              }
            }
          }
        }
      }
    }
  }
}

result = await deleteEnvironment(
  createLocalClient,
  'fake-token',
  'fake-space',
  'fake-env',
  false
)

if (result === true) {
  console.log(
    FgGreen,
    "✅ Test 15 - deleteEnvironment - It's possible to delete an environment"
  )
  passedTests++
} else {
  console.log(
    FgRed,
    " ❌ Test 15 - deleteEnvironment - It's possible to delete an environment"
  )
  failedTests++
}

// ##################################################################
// ##################################################################
result = await deleteEnvironment(
  createLocalClient,
  'fake-token',
  'fake-space',
  'staging',
  false
)

if (result === false) {
  console.log(
    FgGreen,
    '✅ Test 16 - deleteEnvironment - Not possible to delete protected Environment'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 16 - deleteEnvironment - Not possible to delete protected Environment'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return null
          }
        }
      }
    }
  }
}

console.error = function (d) {
  log.push(d)
}

const deleteFailResult = await deleteEnvironment(
  createLocalClient,
  'fake-token',
  'fake-space',
  'fake-env',
  true
)

console.error = oldConsoleError
const deleteEnvResults = log.pop()

if (
  deleteEnvResults ===
  "@@ERROR: TypeError: Cannot read property 'delete' of null"
) {
  console.log(
    FgGreen,
    '✅ Test 17 - deleteEnvironment - Environment is null - Return error'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 17 - deleteEnvironment - Environment is null - Return error'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
const fakeArchivedEntry = {
  archivedAt: '2022-01-28 19:00:00',
  publishedCounter: 1,
  publishedAt: '2022-01-24 14:30:00',
  updatedAt: '2022-01-28 19:00:00'
}

const archivedResult = await extractStatusFromSys(fakeArchivedEntry)

if (archivedResult === 'archived') {
  console.log(
    FgGreen,
    '✅ Test 18 - extractStatusFromSys - Entry status is Archived'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 18 - extractStatusFromSys - Entry status is Archived'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
const fakeDraftEntry = {
  archivedAt: undefined,
  publishedCounter: 0,
  publishedAt: undefined,
  updatedAt: '2022-01-28 19:00:00'
}

const draftResult = await extractStatusFromSys(fakeDraftEntry)

if (draftResult === 'draft') {
  console.log(
    FgGreen,
    '✅ Test 19 - extractStatusFromSys - Entry status is Draft'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 19 - extractStatusFromSys - Entry status is Draft'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
const fakePublishedEntry = {
  archivedAt: undefined,
  publishedCounter: 1,
  publishedAt: '2022-01-28 19:00:00',
  updatedAt: '2022-01-28 19:00:00'
}

const publishedResult = await extractStatusFromSys(fakePublishedEntry)

if (publishedResult === 'published') {
  console.log(
    FgGreen,
    '✅ Test 20 - extractStatusFromSys - Entry status is Published'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 20 - extractStatusFromSys - Entry status is Published'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
const fakeChangedEntry = {
  archivedAt: undefined,
  publishedCounter: 1,
  publishedAt: '2022-01-28 19:00:00',
  updatedAt: '2022-01-28 20:00:00'
}

const changedResult = await extractStatusFromSys(fakeChangedEntry)

if (changedResult === 'changed') {
  console.log(
    FgGreen,
    '✅ Test 21 - extractStatusFromSys - Entry status is Changed'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 21 - extractStatusFromSys - Entry status is Changed'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
const fakeEmptyEntry = {}
const emptyResult = await extractStatusFromSys(fakeEmptyEntry)

if (emptyResult === 'unknown') {
  console.log(
    FgGreen,
    '✅ Test 22 - extractStatusFromSys - Entry status is Unknown'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 22 - extractStatusFromSys - Entry status is Unknown'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              environment: true,
              getEntry: async entryId => {
                return {
                  entry: true,
                  publish: async => {
                    return true
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

console.log = function (d) {
  log.push(d)
}
await publishEntry(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-entry',
  true
)

console.log = oldConsoleLog
let publishResult = log.pop()

if (publishResult === 'Re-publish of entry-id: test-entry was successful') {
  console.log(FgGreen, '✅ Test 23 - publishEntry - Entry is re-published')
  passedTests++
} else {
  console.log(FgRed, '❌ Test 23 - publishEntry - Entry is re-published')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              environment: true,
              getEntry: async entryId => {
                return undefined
              }
            }
          }
        }
      }
    }
  }
}

console.error = function (d) {
  log.push(d)
}
await publishEntry(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-entry',
  true
)

console.error = oldConsoleError
let notPublishResult = log.pop()

if (
  notPublishResult ===
  "@@ERROR: TypeError: Cannot read property 'publish' of undefined"
) {
  console.log(
    FgGreen,
    '✅ Test 24 - publishEntry - Entry is undefined - throw exception'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 24 - publishEntry - Entry is undefined - throw exception'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return null
          }
        }
      }
    }
  }
}

let errorPublishResult,
  errorThrown = false

try {
  errorPublishResult = await publishEntry(
    await getEnvironmentSingleton(
      createLocalClient,
      'fake-token',
      'fake-space',
      'fake-env'
    ),
    'test-entry',
    false
  )
} catch (e) {
  errorThrown = true
  if (e instanceof Error) {
    console.log(
      FgGreen,
      '✅ Test 25 - publishEntry - Environment is null - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 25 - publishEntry - Environment is null - throw exception'
    )
    failedTests++
  }
}

if (!errorThrown) {
  if (errorPublishResult === false) {
    console.log(
      FgGreen,
      '✅ Test 25 - publishEntry - Environment is null - throw exception'
    )
    passedTests++
  } else {
    console.log(
      FgRed,
      '❌ Test 25 - publishEntry - Environment is null - throw exception'
    )
    failedTests++
  }
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getTag: async tagId => {
                return {
                  sys: {
                    type: 'Link',
                    linkType: 'Tag',
                    id: tagId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const getTagResult = await getEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'myOwnTag'
)

if (getTagResult?.sys?.id === 'myOwnTag') {
  console.log(
    FgGreen,
    '✅ Test 26 - getEntryTag - Tag is retrieved successfully'
  )
  passedTests++
} else {
  console.log(FgRed, '❌ Test 26 - getEntryTag - Tag is retrieved successfully')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getTag: async tagId => {
                return null
              }
            }
          }
        }
      }
    }
  }
}

const getInvalidTagResult = await getEntryTag(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'myOwnTag'
)

if (getInvalidTagResult === null) {
  console.log(FgGreen, '✅ Test 27 - getEntryTag - Tag does not exist')
  passedTests++
} else {
  console.log(FgRed, '❌ Test 27 - getEntryTag - Tag does not exist')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getContentType: async contentTypeId => {
                return {
                  sys: {
                    id: contentTypeId
                  },
                  fields: [
                    {
                      id: 'field-1-1',
                      required: true,
                      disabled: false,
                      omitted: false
                    },
                    {
                      id: 'field-1-2',
                      required: true,
                      disabled: false,
                      omitted: false
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
}

const singleCt = await getContentType(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-ct'
)

if (singleCt?.sys?.id === 'test-ct') {
  console.log(
    FgGreen,
    '✅ Test 28 - getContentType - Retrieve Test Content-type'
  )
  passedTests++
} else {
  console.log(FgRed, '❌ Test 28 - getContentType - Retrieve Test Content-type')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getContentType: async contentTypeId => {
                return null
              }
            }
          }
        }
      }
    }
  }
}

const singleCtNull = await getContentType(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  ''
)

if (singleCtNull === null) {
  console.log(
    FgGreen,
    '✅ Test 29 - getContentType - Test Content-type not retrieved'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 29 - getContentType - Test Content-type not retrieved'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getContentTypes: async contentTypeId => {
                return {
                  items: [
                    {
                      sys: {
                        id: 'content-type-1'
                      },
                      fields: [
                        {
                          id: 'field-1-1',
                          required: true,
                          disabled: false,
                          omitted: false
                        },
                        {
                          id: 'field-1-2',
                          required: true,
                          disabled: false,
                          omitted: false
                        }
                      ]
                    },
                    {
                      sys: {
                        id: 'content-type-2'
                      },
                      fields: [
                        {
                          id: 'field-2-1',
                          required: true,
                          disabled: false,
                          omitted: false
                        },
                        {
                          id: 'field-2-2',
                          required: true,
                          disabled: false,
                          omitted: false
                        }
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
}

const cts = await getContentTypes(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  )
)

if (cts?.items?.length === 2) {
  console.log(
    FgGreen,
    '✅ Test 30 - getContentTypes - Retrieve 2 Content-types'
  )
  passedTests++
} else {
  console.log(FgRed, '❌ Test 30 - getContentTypes - Retrieve 2 Content-types')
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getContentTypes: async contentTypeId => {
                return null
              }
            }
          }
        }
      }
    }
  }
}

const ctsNull = await getContentTypes(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  )
)

if (ctsNull === null) {
  console.log(
    FgGreen,
    '✅ Test 31 - getContentTypes - No Content-types to retrieve'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 31 - getContentTypes - No Content-types to retrieve'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async sysId => {
                return {
                  sys: {
                    id: sysId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const entryById = await getEntryById(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-sys-id'
)

if (entryById?.sys?.id === 'test-sys-id') {
  console.log(
    FgGreen,
    '✅ Test 32 - getEntryById (former: getEntryBySysId) - Get the Entry successfully'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 32 - getEntryById (former: getEntryBySysId) - Get the Entry successfully'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntry: async sysId => {
                return null
              }
            }
          }
        }
      }
    }
  }
}

const entryNull = await getEntryById(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-sys-id'
)

if (entryNull === null) {
  console.log(
    FgGreen,
    '✅ Test 33 - getEntryById (former: getEntryBySysId) - No entry found'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 33 - getEntryById (former: getEntryBySysId) - No entry found'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntries: async sysId => {
                return {
                  items: [
                    {
                      sys: {
                        id: 'test-success'
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
}

const uniqueIdResult = await getEntryIdByUniqueId(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-ct',
  'title',
  'myTest'
)

if (uniqueIdResult === 'test-success') {
  console.log(
    FgGreen,
    '✅ Test 34 - getEntryIdByUniqueId - Get the Entry by Field-id successfully'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 34 - getEntryIdByUniqueId - Get the Entry by Field-id successfully'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              getEntries: async sysId => {
                return null
              }
            }
          }
        }
      }
    }
  }
}

const uniqueFailResult = await getEntryIdByUniqueId(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-ct',
  'title',
  'myTest'
)

if (!uniqueFailResult) {
  console.log(
    FgGreen,
    '✅ Test 35 - getEntryIdByUniqueId - Get the Entry unsuccessful'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 35 - getEntryIdByUniqueId - Get the Entry unsuccessful'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
createLocalClient = {
  createClient: accessToken => {
    return {
      getSpace: async spaceId => {
        return {
          getEnvironment: async environmentId => {
            return {
              sys: {
                id: environmentId
              },
              getEntries: async options => {
                if (options?.skip === 0) {
                  return {
                    items: [
                      {
                        id: 'entry-1'
                      },
                      {
                        id: 'entry-2'
                      }
                    ]
                  }
                } else {
                  return {
                    items: []
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const entriesResult = await getEntriesByContentType(
  await getEnvironmentSingleton(
    createLocalClient,
    'fake-token',
    'fake-space',
    'fake-env'
  ),
  'test-content-type'
)

if (entriesResult[0]?.id === 'entry-1' && entriesResult[1]?.id === 'entry-2') {
  console.log(
    FgGreen,
    '✅ Test 36 - getEntriesByContentType - Retrieve all Entries'
  )
  passedTests++
} else {
  console.log(
    FgRed,
    '❌ Test 36 - getEntriesByContentType - Retrieve all Entries'
  )
  failedTests++
}

// ##################################################################
// ##################################################################
console.log('\n')
console.log(FgGreen, 'Passed Tests: ' + passedTests)
console.log(failedTests ? FgRed : FgGreen, 'Failed Tests: ' + failedTests)
console.log('\n')
