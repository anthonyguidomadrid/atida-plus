import type { Document } from '@contentful/rich-text-types'

export type ContentfulTranslation = {
  key: string
  value: Document
  complete: boolean
}

export type ContentfulCategoryTitle = {
  id: string
  title: string
}

export type SupportedTranslationTypes =
  | ContentfulCategoryTitle
  | ContentfulTranslation

export type ContentfulTranslationResult =
  | (ContentfulCategoryTitle & { contentType: 'category' })
  | (ContentfulTranslation & {
      contentType: 'translation' | 'richTextTranslation'
    })

export type Translations = Record<string, string>
