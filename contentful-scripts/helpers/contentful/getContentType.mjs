/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} contentTypeId
 * @param {Boolean} isVerbose
 * @returns {Promise<import("contentful-management/dist/typings/entities/content-type").ContentType|null>}
 */
export async function getContentType(
  environmentSingleton,
  contentTypeId,
  isVerbose = false
) {
  isVerbose &&
    console.log(
      '##LOG: Getting the Content-type ' + contentTypeId + ' from Contentful'
    )

  try {
    const contentType = await environmentSingleton.getContentType(contentTypeId)

    isVerbose &&
      contentType?.sys?.id &&
      console.log(
        '##LOG: Content-type ' + contentTypeId + ' retrieved successfully!'
      )

    return contentType
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)

    return null
  }
}
