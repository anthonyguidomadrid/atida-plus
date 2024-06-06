/**
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @param {Boolean} isVerbose
 * @returns {Promise<import("contentful-management/dist/typings/entities/environment").Environment|null>}
 */
export async function getEnvironmentSingleton(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId,
  isVerbose = false
) {
  const clientCma = contentfulManagement.createClient({
    accessToken: contentfulToken
  })

  try {
    const space = await clientCma.getSpace(contentfulSpaceId)

    return await space.getEnvironment(contentfulEnvironmentId)
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)

    return null
  }
}
