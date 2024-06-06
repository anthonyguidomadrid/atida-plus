/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {Number} verbosityLevel
 * @param {Number} limit
 * @returns {Promise<import("contentful-management/dist/typings/entities/entry").Entry[]>}
 */
export async function getAssetsAsEntries(
  environmentSingleton,
  verbosityLevel = 0,
  limit = 100
) {
  const environmentId = environmentSingleton?.sys?.id

  if (environmentId === undefined) {
    return []
  }

  if (verbosityLevel > 1) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Get all the Assets for Environment: ' +
        environmentId
    )
  }

  // Default pagination values
  let assetsArray = [],
    shouldLoop = true,
    skip = 0

  do {
    const mediaArray = await environmentSingleton
      ?.getAssets({
        skip,
        limit
      })
      .catch(error => console.error('@@ERROR: ' + error))

    // @ts-ignore
    if (mediaArray?.items && mediaArray?.items?.length > 0) {
      assetsArray = assetsArray.concat(mediaArray?.items)
      skip += limit
    } else {
      shouldLoop = false
    }
  } while (shouldLoop)

  if (verbosityLevel > 0) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Retrieved ' +
        assetsArray.length +
        ' Assets' +
        (verbosityLevel === 1 ? ' - environment: ' + environmentId : '')
    )
  }

  return assetsArray
}
