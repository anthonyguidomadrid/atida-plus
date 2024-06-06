import AbortController from 'abort-controller'
import fetch, { Response } from 'node-fetch'
import { getDefaultLocale } from '../locales/getDefaultLocale.mjs'

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} fieldImageUrl
 * @param {String} locale
 * @return {Promise<String|{sys: {linkType: String, id: (String|boolean), type: String}}>}
 */
export async function uploadAsset(
  environmentSingleton,
  fieldImageUrl,
  locale = getDefaultLocale()
) {
  const uploadedImageId = await newImage(
    environmentSingleton,
    fieldImageUrl,
    locale
  )

  if (uploadedImageId) {
    return {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id: uploadedImageId
      }
    }
  } else {
    return ''
  }
}

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} imageUrl
 * @param {String} locale
 * @return {Promise<String|Boolean>}
 */
async function newImage(environmentSingleton, imageUrl, locale) {
  const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
  const loadResponse = await fetchWithTimeout(imageUrl)
  const defaultLocale = getDefaultLocale()

  if (loadResponse && loadResponse instanceof Response) {
    const mimeType = loadResponse.headers.get('content-type') ?? 'image/jpeg'

    console.log('Image: ' + imageUrl + ' / Status: ' + loadResponse.status)

    if (loadResponse.status === 200) {
      try {
        const asset = await environmentSingleton.createAsset({
          fields: {
            title: {
              [defaultLocale]: imageName,
              [locale]: imageName
            },
            file: {
              [defaultLocale]: {
                contentType: mimeType,
                fileName: imageName,
                upload: imageUrl
              },
              [locale]: {
                contentType: mimeType,
                fileName: imageName,
                upload: imageUrl
              }
            }
          }
        })

        const processedAsset = await asset.processForAllLocales({
          processingCheckWait: 5000
        })

        const publishedAsset = await processedAsset.publish()

        if (publishedAsset && publishedAsset.sys && publishedAsset.sys.id) {
          return publishedAsset.sys.id
        } else {
          return false
        }
      } catch (err) {
        console.error('@@ERROR: ' + err)

        return false
      }
    }
  }

  return false
}

/**
 * @param {String} resource
 * @param {Object} options
 * @param {Number} timeout
 * @return {Promise<Response|boolean>}
 */
async function fetchWithTimeout(resource, options, timeout = 3000) {
  try {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(id)

    return response
  } catch (err) {
    console.error('@@ERROR: ' + err)
    return false
  }
}
