/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} contentTypeId
 * @param {Number} verbosityLevel
 * @param {Number} limit
 * @returns {Promise<import("contentful-management/dist/typings/entities/entry").Entry[]>}
 */
export async function getEntriesByContentType(
  environmentSingleton,
  contentTypeId,
  verbosityLevel = 0,
  limit = 100
) {
  const environmentId = environmentSingleton?.sys?.id

  if (environmentId === undefined) {
    return []
  }

  if (verbosityLevel > 1) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Get Entries by Content-type: ' +
        contentTypeId +
        ' on Environment: ' +
        environmentId
    )
  }

  // Default pagination values
  let entriesArray = [],
    shouldLoop = true,
    skip = 0

  do {
    const contentTypesArray = await environmentSingleton
      ?.getEntries({
        content_type: contentTypeId,
        skip,
        limit
      })
      .catch(error => console.error('@@ERROR: ' + error))

    // @ts-ignore
    if (contentTypesArray?.items && contentTypesArray?.items?.length > 0) {
      entriesArray = entriesArray.concat(contentTypesArray?.items)
      skip += limit
    } else {
      shouldLoop = false
    }
  } while (shouldLoop)

  if (verbosityLevel > 0) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Retrieved ' +
        entriesArray.length +
        ' Entries' +
        (verbosityLevel === 1
          ? ' of type: ' + contentTypeId + ' - environment: ' + environmentId
          : '')
    )
  }

  return entriesArray
}
