/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {Boolean} isVerbose
 * @returns {Promise<import("contentful-management/dist/typings/common-types").Collection<import("contentful-management/dist/typings/entities/content-type").ContentType, import("contentful-management/dist/typings/entities/content-type").ContentTypeProps> | null>}
 */
export async function getContentTypes(environmentSingleton, isVerbose = false) {
  isVerbose &&
    console.log(
      '\x1b[32m##LOG:\x1b[0m Getting the Content-types from Contentful'
    )

  try {
    const contentTypes = await environmentSingleton.getContentTypes()

    isVerbose &&
      contentTypes?.items?.length > 0 &&
      console.log(
        '\x1b[32m##LOG:\x1b[0m Content-types list retrieved successfully!'
      )

    return contentTypes
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)

    return null
  }
}
