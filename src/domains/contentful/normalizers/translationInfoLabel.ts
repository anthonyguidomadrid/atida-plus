import type { EntryCollection } from 'contentful'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { normalizeIcon } from '.'
import { normalizeColor } from './color'
import { TranslationInfoLabel as ContentfulTranslationInfoLabel } from '../../../generated/graphql'

export type TranslationInfoLabel = {
  translation?: string
  key?: string
  textColor?: string
  backgroundColor?: string
  icon?: string
}

export const normalizeTranslationInfoLabel = (
  label: ContentfulTranslationInfoLabel
): TranslationInfoLabel =>
  removeUndefinedPropertiesFromObject({
    translation: label?.translation ?? '',
    key: label?.labelKey ?? '',
    icon: normalizeIcon(label?.icon ?? undefined),
    backgroundColor: normalizeColor(label?.backgroundColor ?? undefined),
    textColor: normalizeColor(label?.textColor ?? undefined)
  })

export const normalizeCampaignLabels = (
  response: EntryCollection<ContentfulTranslationInfoLabel>
): TranslationInfoLabel[] =>
  response?.items?.map(i => normalizeTranslationInfoLabel(i.fields))
