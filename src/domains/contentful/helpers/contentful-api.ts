import { ContentfulClientApi, EntryCollection } from 'contentful'
import fileSystem from 'fs'
import {
  getCountryTagFromLocale,
  transformLocaleToUppercase,
  logger
} from '~helpers'
import getConfig from 'next/config'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import copy from 'fast-copy'
import jsonStringifySafe from 'json-stringify-safe'

// The path is calculated from the root of the repository
const { serverRuntimeConfig } = getConfig()
const webhookStorage =
  serverRuntimeConfig.cmsWebhookStorage ?? '/app/storage/json/'

/**
 * @param {ContentfulClientApi} contentfulClient
 */
export const createLocalClient = (
  contentfulClient: ContentfulClientApi
): {
  getContentfulEntries: <T>(
    contentTypes: string[],
    locale: string,
    include?: number,
    skip?: number,
    limit?: number,
    fieldName?: string,
    fieldValue?: any
  ) => Promise<EntryCollection<T>>
} => {
  /**
   * It looks for a filename based on the variables passed
   * Or it calls the getEntries endpoint from Contentful
   *
   * Filename Structure:
   *  - {contentTypes}_{locale}_{include}_{skip}_{limit}_[fieldName|fieldValue].json
   * The last pair name,value is optional
   * Examples:
   *  - promotion_es-ES_10_0_500.json
   *  - brand_pt-PT_3_0_1000.json
   *  - translation_es-ES_1_1000_1000.json
   *  - category_pt-PT_1_0_1000_id|nivea.json
   *  - translation,richTextTranslation_pt-PT_1_0_1000.json
   *
   * @param {string[]} contentTypes
   * @param {string} locale
   * @param {number} include
   * @param {number} skip
   * @param {number} limit
   * @param {string} fieldName
   * @param {any} fieldValue
   * @return {Promise<EntryCollection<T>>}
   */
  const getContentfulEntries = async <T>(
    contentTypes: string[],
    locale: string,
    include = 1,
    skip = 0,
    limit = 1000,
    fieldName = '',
    fieldValue: any = ''
  ): Promise<EntryCollection<T>> => {
    let response = null

    const contentfulWebhookFlag =
      FeatureFlag.CONTENTFUL_REPLACE_CDA_CALLS_WITH_WEBHOOKS
    const featureFlags = await loadFeatureFlags(locale, [contentfulWebhookFlag])
    const isCdaReplacedByWebhooks = featureFlags?.[contentfulWebhookFlag]

    if (isCdaReplacedByWebhooks) {
      const normalizedContentTypes = contentTypes.join(','),
        normalizedLocale = transformLocaleToUppercase(locale),
        fields = fieldName ? `_fields.${fieldName}|${fieldValue}` : ''

      const filePath =
        webhookStorage +
        `${normalizedContentTypes}_${normalizedLocale}_${include}_${skip}_${limit}${fields}.json`

      logger.debug(
        {
          webhooksEnabled: isCdaReplacedByWebhooks,
          filePath: filePath
        },
        `Contentful CDA Webhooks are enabled`
      )

      let jsonPayload = null
      try {
        // Read the Json
        jsonPayload = fileSystem.readFileSync(filePath, 'utf8')

        if (jsonPayload !== undefined) {
          // Hydrate it
          // response = await contentfulClient.parseEntries<T>(jsonPayload)
          response = await parseValidEntries<T>(jsonPayload)
        }
      } catch (err) {
        // Ignore the error. Will continue with normal API call
      }
    }

    if (response === null) {
      // Otherwise do the Contentful call
      const ctFilter =
        contentTypes.length > 1
          ? { 'sys.contentType.sys.id[in]': contentTypes.join(',') }
          : { content_type: contentTypes[0] }

      const fieldFilter = { [`fields.${fieldName}`]: fieldValue }

      const options = {
        locale: transformLocaleToUppercase(locale),
        'metadata.tags.sys.id[in]': getCountryTagFromLocale(locale),
        include,
        skip,
        limit,
        ...ctFilter,
        ...(fieldName !== '' && fieldFilter)
      }

      response = await contentfulClient.getEntries<T>(options)
    }

    return response
  }

  return {
    getContentfulEntries
  }
}

const parseValidEntries = async <T>(
  payload: string
): Promise<EntryCollection<T>> => {
  const data = JSON.parse(payload)
  const wrappedData = mixinStringifySafe(toPlainObject(copy(data)))
  return freezeSys(wrappedData)
}

const mixinStringifySafe = (data: any) => {
  return Object.defineProperty(data, 'stringifySafe', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (serializer = null, indent = '') {
      return jsonStringifySafe(
        this,
        serializer,
        indent,
        (key: any, value: any) => {
          return {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: value?.sys?.id,
              circular: true
            }
          }
        }
      )
    }
  })
}
