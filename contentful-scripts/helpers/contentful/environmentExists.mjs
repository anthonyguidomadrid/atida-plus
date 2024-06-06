import { getEnvironmentSingleton } from './getEnvironmentSingleton.mjs'

/**
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @returns {Promise<Boolean>}
 */
export async function environmentExists(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId
) {
  if (contentfulEnvironmentId === '') {
    return false
  }

  const myEnvironment = await getEnvironmentSingleton(
    contentfulManagement,
    contentfulToken,
    contentfulSpaceId,
    contentfulEnvironmentId
  )

  return myEnvironment?.sys?.id === contentfulEnvironmentId
}
