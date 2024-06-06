import { getDefaultLocale } from '../locales/getDefaultLocale.mjs'

/**
 * @param {import("contentful-management/dist/typings/entities/environment").Environment} environmentSingleton
 * @param {String} contentTypeId
 * @param {String} fieldId
 * @param fieldValue
 * @param {String} fieldLocale
 * @returns {Promise<string | null>}
 */
export async function getEntryIdByUniqueId(
  environmentSingleton,
  contentTypeId,
  fieldId,
  fieldValue,
  fieldLocale = getDefaultLocale()
) {
  const options = {
    content_type: contentTypeId,
    ['fields.' + fieldId]: fieldValue,
    locale: fieldLocale,
    limit: 1
  }

  try {
    const entries = await environmentSingleton.getEntries(options)

    return entries?.items?.[0]?.sys?.id ?? null
  } catch (error) {
    console.log(`@@ERROR: ${error}`)

    return null
  }
}
