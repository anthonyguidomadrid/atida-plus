import type { ContentfulClientApi, EntryCollection } from 'contentful'
import { createContentfulClient } from '~domains/contentful/helpers/client'
import { createLocalClient } from '~domains/contentful/helpers/contentful-api'
import { normalizeRichText } from '~domains/contentful'
import type {
  ContentfulTranslation,
  Translations,
  ContentfulTranslationResult,
  ContentfulCategoryTitle,
  SupportedTranslationTypes
} from '../types'
import { logger } from '~helpers'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'
import { I18nNamespace } from '~config/constants/i18n-namespaces'

if (typeof window !== 'undefined') {
  throw new Error('This file should not be called client-side')
}

const LIMIT = 1000

const normalizeTranslations = (
  response: EntryCollection<SupportedTranslationTypes>
): Translations => {
  const result: ContentfulTranslationResult[] = []

  response.items.map(item => {
    result.push({
      ...item.fields,
      // difficult to type this part correctly
      contentType: item?.sys?.contentType?.sys?.id as any
    })
  })

  return result
    .map(item => item)
    .reduce((translations, fields) => {
      if (fields.contentType === 'category') {
        return {
          ...translations,
          [fields.id]: fields.title
        }
      }

      if (fields.contentType === 'richTextTranslation') {
        return {
          ...translations,
          [fields.key]: normalizeRichText(fields.value)
        }
      }

      return {
        ...translations,
        [fields.key]: fields.value
      }
    }, {})
}

const getFetcher = (
  namespace: I18nNamespace
): ((
  client: ContentfulClientApi,
  locale: string,
  skip?: number | null
) => Promise<EntryCollection<SupportedTranslationTypes>>) => {
  switch (namespace) {
    case I18nNamespace.CATEGORY_TITLE:
      return (client, locale, skip = 0) =>
        createLocalClient(client).getContentfulEntries<ContentfulCategoryTitle>(
          ['category'],
          locale,
          1,
          skip ?? 0,
          LIMIT
        )
    default:
      return (client, locale, skip = 0) =>
        createLocalClient(client).getContentfulEntries<ContentfulTranslation>(
          ['translation', 'richTextTranslation'],
          locale,
          1,
          skip ?? 0,
          LIMIT
        )
  }
}

export const fetchTranslations = async (
  locale: string,
  namespace: I18nNamespace
): Promise<Translations> => {
  logger.trace(`fetching ${locale} translations for namespace ${namespace}`)

  const client = createContentfulClient()
  const fetcher = getFetcher(namespace)

  const [shouldPaginate, response] = await Promise.all([
    loadFeatureFlag(locale, FeatureFlag.TRANSLATIONS_ENABLE_API_PAGINATION),
    fetcher(client, locale)
  ])

  if (shouldPaginate && response.total > LIMIT) {
    const leftToFetch = response.total - LIMIT
    const remainingPages = Math.ceil(leftToFetch / LIMIT)
    const pageRequests = new Array(remainingPages)
      .fill(0)
      .map((_value, idx) => fetcher(client, locale, LIMIT * (idx + 1)))
    const pageResponses = await Promise.all(pageRequests)

    return pageResponses.reduce(
      (all, page) => ({
        ...all,
        ...normalizeTranslations(page)
      }),
      normalizeTranslations(response)
    )
  } else {
    return normalizeTranslations(response)
  }
}
