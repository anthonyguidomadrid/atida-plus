/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} entryId
 * @param {String} tagId
 * @param {Boolean} isVerbose
 * @returns {Promise<boolean>}
 */
export async function removeEntryTag(
  environmentSingleton,
  entryId,
  tagId,
  isVerbose = false
) {
  try {
    const entry = await environmentSingleton.getEntry(entryId)
    const existingTags = entry?.metadata?.tags || []
    const keepTags = existingTags.filter(tag => tag?.sys?.id !== tagId)

    if (entry?.metadata?.tags) {
      entry.metadata.tags = keepTags
      isVerbose && console.log(entry)

      await entry.update()
      return true
    } else {
      isVerbose && console.log('@@ERROR: Entry is empty or missing tags')
    }
  } catch (error) {
    isVerbose && console.log(`@@ERROR: ${error}`)
  }

  return false
}
