/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} tagId
 * @param {Boolean} isVerbose
 * @returns {Promise<import("contentful-management/dist/typings/entities/tag").Tag | null>}
 */
export async function getEntryTag(
  environmentSingleton,
  tagId,
  isVerbose = false
) {
  try {
    return await environmentSingleton.getTag(tagId)
  } catch (error) {
    isVerbose && console.log(`@@ERROR: ${error}`)

    return null
  }
}
