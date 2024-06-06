/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} entryId
 * @param {String} tagId
 * @param {Boolean} isVerbose
 * @returns {Promise<Boolean>}
 */
export async function addEntryTag(
  environmentSingleton,
  entryId,
  tagId,
  isVerbose = false
) {
  try {
    const entry = await environmentSingleton.getEntry(entryId)
    const tag = {
      sys: {
        type: 'Link',
        linkType: 'Tag',
        id: tagId
      }
    }

    if (entry?.metadata?.tags) {
      entry.metadata.tags.push(tag)
      isVerbose && console.log(entry)

      await entry.update()

      return true
    } else {
      isVerbose && console.log('@@ERROR: Entry is empty or missing tags')
    }
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)
  }

  return false
}
