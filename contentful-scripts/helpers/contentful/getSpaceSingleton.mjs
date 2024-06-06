/**
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {Boolean} isVerbose
 * @returns {Promise<import("contentful-management/dist/typings/entities/space").Space|null>}
 */
export async function getSpaceSingleton(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  isVerbose = false
) {
  const clientCma = contentfulManagement.createClient({
    accessToken: contentfulToken
  })

  try {
    return await clientCma.getSpace(contentfulSpaceId)
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)

    return null
  }
}
