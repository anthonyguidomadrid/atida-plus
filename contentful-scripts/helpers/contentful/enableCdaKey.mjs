import { environmentExists } from './environmentExists.mjs'

/**
 * cdaKeyName and environment with the same name should exist
 *
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} cdaKeyName
 * @param {String} targetEnvironmentId
 * @returns {Promise<Boolean>}
 */
export async function enableCdaKey(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  cdaKeyName,
  targetEnvironmentId
) {
  if (
    !(await environmentExists(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      cdaKeyName
    ))
  ) {
    console.error(
      '@@ERROR: ' + cdaKeyName + ' CDA Key environment does not exist!'
    )
    return false
  }

  if (
    !(await environmentExists(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      targetEnvironmentId
    ))
  ) {
    console.error(
      '@@ERROR: ' + targetEnvironmentId + ' target environment does not exist!'
    )
    return false
  }

  const clientCma = contentfulManagement.createClient({
    accessToken: contentfulToken
  })

  let mySpace, myApiKeys, mySingleApiKey
  try {
    mySpace = await clientCma.getSpace(contentfulSpaceId)
  } catch (exception) {
    console.error('@@ERROR: ' + exception)
    return false
  }

  try {
    myApiKeys = await mySpace.getApiKeys()
  } catch (exception) {
    console.error('@@ERROR: ' + exception)
    return false
  }

  // The name of the API Key has to match the environment-id
  // Example 'master' environment has 'Master' API Key
  const masterApiKey = myApiKeys.items.find(
    item => item.name.toLowerCase() === cdaKeyName.toLowerCase()
  )?.sys?.id

  if (masterApiKey) {
    try {
      mySingleApiKey = await mySpace.getApiKey(masterApiKey)
    } catch (exception) {
      console.error('@@ERROR: ' + exception)
      return false
    }

    const newEnvironment = {
      sys: {
        type: 'Link',
        linkType: 'Environment',
        id: targetEnvironmentId
      }
    }

    mySingleApiKey.environments.push(newEnvironment)
    try {
      const updatedKey = await mySingleApiKey.update()
      return updatedKey?.name.toLowerCase() === cdaKeyName.toLowerCase()
    } catch (exception) {
      console.error('@@ERROR: ' + exception)
      return false
    }
  } else {
    return false
  }
}
