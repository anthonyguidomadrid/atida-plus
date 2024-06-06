import { getEnvironmentSingleton } from './getEnvironmentSingleton.mjs'

export const ForbiddenEnvironments = {
  dev: 'dev',
  uat: 'uat',
  staging: 'staging',
  master: 'master'
}

/**
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @param {Boolean} isVerbose
 * @returns {Promise<boolean>}
 */
export async function deleteEnvironment(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId,
  isVerbose = true
) {
  if (Object.values(ForbiddenEnvironments).includes(contentfulEnvironmentId)) {
    isVerbose &&
      console.error(
        "@ERROR: Environment '" + contentfulEnvironmentId + "' is protected"
      )
    isVerbose && console.error('@ERROR: It will NOT be deleted!')
    return false
  }

  try {
    const environment = await getEnvironmentSingleton(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      contentfulEnvironmentId
    )

    if (environment === null) {
      isVerbose &&
        console.error(
          "@@ERROR: TypeError: Cannot read property 'delete' of null"
        )
      return false
    }

    await environment?.delete()
    isVerbose &&
      console.log(
        '##DEBUG: Environment ' + contentfulEnvironmentId + ' deleted!'
      )

    return true
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)
  }

  return false
}
