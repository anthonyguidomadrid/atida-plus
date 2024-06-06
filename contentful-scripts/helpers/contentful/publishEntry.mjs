/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} entryId
 * @param {Boolean} isVerbose
 * @returns {Promise<Boolean>}
 */
export async function publishEntry(
  environmentSingleton,
  entryId,
  isVerbose = false
) {
  try {
    const entry = await environmentSingleton.getEntry(entryId)
    await entry.publish()

    isVerbose &&
      console.log('Re-publish of entry-id: ' + entryId + ' was successful')

    return true
  } catch (error) {
    isVerbose && console.error(`@@ERROR: ${error}`)

    return false
  }
}
