import { getEnvironmentSingleton } from '../contentful/getEnvironmentSingleton.mjs'

/**
 * @param {import("contentful-management")} contentfulManagement
 * @param {String} contentfulToken
 * @param {String} contentfulSpaceId
 * @param {String} contentfulEnvironmentId
 * @param {Database<import("better-sqlite3")>} databaseInstance
 * @param {Boolean} isVerbose
 * @param {Integer} verbosityLevel
 * @returns {Promise<void>}
 */
export async function syncAssets(
  contentfulManagement,
  contentfulToken,
  contentfulSpaceId,
  contentfulEnvironmentId,
  databaseInstance,
  isVerbose = false,
  verbosityLevel = 0
) {
  // Get list of Assets from Database
  if (isVerbose) {
    console.log(
      '\x1b[32m##LOG:\x1b[0m Syncing entries from Database to Contentful'
    )
  }

  let preparedStatement =
    'SELECT ' +
    'content_type, ' +
    'from_entry_id, ' +
    'from_json_data, ' +
    'from_entry_tags, ' +
    'to_entry_tags, ' +
    'to_entry_id, ' +
    'from_current_status, ' +
    'to_current_status, ' +
    'from_updated_at, ' +
    'to_updated_at, ' +
    'from_published_at, ' +
    'to_published_at ' +
    'FROM contentful_entries ' +
    'WHERE to_be_synced = 1 ' +
    "AND content_type = 'contentfulAsset' " +
    'AND to_current_version IS NULL;'

  let assetArray = databaseInstance.prepare(preparedStatement).all()

  if (assetArray?.length > 0) {
    if (isVerbose) {
      console.log(
        '\x1b[32m##LOG:\x1b[0m Syncing ' + assetArray?.length + ' assets'
      )
    }

    let environmentSingleton = await getEnvironmentSingleton(
      contentfulManagement,
      contentfulToken,
      contentfulSpaceId,
      contentfulEnvironmentId
    )

    // Loop trough each new ones (no updates)
    for (let i = 0; i < assetArray?.length; i++) {
      if (
        assetArray[i] !== undefined &&
        assetArray[i]?.from_entry_id !== undefined &&
        assetArray[i]?.from_json_data !== undefined
      ) {
        let imageObject = JSON.parse(assetArray[i]?.from_json_data)
        const tagArray = assetArray[i]?.from_entry_tags.split(',') ?? ''

        if (imageObject['file'] !== undefined) {
          Object.keys(imageObject['file']).forEach(function (locale) {
            const localizedObject = imageObject['file'][locale]
            localizedObject.upload = 'https:' + localizedObject.url
            delete localizedObject.details
            delete localizedObject.url
            imageObject['file'][locale] = localizedObject
          })

          isVerbose &&
            console.log(
              '\x1b[32m##LOG:\x1b[0m Asset with id:  ' +
                assetArray[i]?.from_entry_id +
                ' syncing'
            )

          await uploadImage(
            environmentSingleton,
            assetArray[i]?.from_entry_id,
            imageObject,
            tagArray,
            verbosityLevel
          )
        }
      }
    }
  }
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} assetId
 * @param {Object} imageObject
 * @param {Array} tagArray
 * @param {Integer} verbosityLevel
 * @return {Promise<String|Boolean>}
 */
async function uploadImage(
  environmentSingleton,
  assetId,
  imageObject,
  tagArray = [],
  verbosityLevel = 0
) {
  try {
    if (verbosityLevel > 1) {
      console.log('\x1b[32m##LOG:\x1b[0m Uploading Asset...')
    }
    const asset = await environmentSingleton.createAssetWithId(assetId, {
      fields: imageObject
    })

    for (let i = 0; i < tagArray?.length; i++) {
      if (tagArray[i].trim()) {
        if (verbosityLevel > 1) {
          console.log('\x1b[32m##LOG:\x1b[0m Adding tags to Image...')
        }

        await addEntryTag(
          environmentSingleton,
          asset?.sys?.id,
          tagArray[i].trim(),
          verbosityLevel
        )
      }
    }

    if (verbosityLevel > 1) {
      console.log('\x1b[32m##LOG:\x1b[0m Processing the Image...')
    }
    const processedAsset = await asset.processForAllLocales({
      processingCheckWait: 5000
    })

    if (verbosityLevel > 1) {
      console.log('\x1b[32m##LOG:\x1b[0m Publishing the Image...')
    }
    const publishedAsset = await processedAsset.publish()

    if (publishedAsset && publishedAsset.sys && publishedAsset.sys.id) {
      return publishedAsset.sys.id
    }
  } catch (err) {
    console.error('@@ERROR: ' + err)
  }

  return false
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} assetId
 * @param {String} tagId
 * @param {Boolean} isVerbose
 * @returns {Promise<Boolean>}
 */
async function addEntryTag(
  environmentSingleton,
  assetId,
  tagId,
  isVerbose = false
) {
  try {
    const asset = await environmentSingleton.getAsset(assetId)
    const tag = {
      sys: {
        type: 'Link',
        linkType: 'Tag',
        id: tagId
      }
    }

    if (asset?.metadata?.tags) {
      asset.metadata.tags.push(tag)
      await asset.update()

      return true
    } else {
      isVerbose && console.log('@@ERROR: Entry is empty or missing tags')
    }
  } catch (error) {
    isVerbose && console.error('@@ERROR: ' + error)
  }

  return false
}
