/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} entryId
 * @returns {Promise<import("contentful-management/dist/typings/entities/entry").Entry|null>}
 */
export async function getEntryById(environmentSingleton, entryId) {
  try {
    return await environmentSingleton.getEntry(entryId)
  } catch (error) {
    console.error('@@ERROR: ' + error)

    return null
  }
}
