import type { Entry } from 'contentful'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { CmsContentTypes } from '~config/content-types'
import {
  DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY,
  RECOMMENDATIONS_TYPES
} from '~config/constants/recommendations'
import { checkIfGraphQLResponse } from '~domains/contentful'
import { ExponeaRecommendationFragment } from '~generated-graphql'

export type ExponeaRecommendation = {
  contentType?: CmsContentTypes.EXPONEA_RECOMMENDATION
  title?: string
  altTitle?: string
  recommendationId?: string
  recommendationType?: typeof RECOMMENDATIONS_TYPES[keyof typeof RECOMMENDATIONS_TYPES]
  isProductSlider?: boolean
  itemsQuantity?: number
}

export type ContentfulExponeaRecommendation = Entry<{
  title?: string
  altTitle?: string
  id: string
  isSlider?: boolean
  quantity?: string
}>

const normalizeExponeaFeedRest = (
  contentBlock?: ContentfulExponeaRecommendation
): ExponeaRecommendation => {
  return removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.EXPONEA_RECOMMENDATION as const,
    title: contentBlock?.fields?.title ?? '',
    altTitle: contentBlock?.fields?.altTitle ?? '',
    recommendationId: contentBlock?.fields?.id ?? '',
    isProductSlider: contentBlock?.fields?.isSlider ?? false,
    itemsQuantity: contentBlock?.fields?.quantity
      ? parseInt(contentBlock?.fields?.quantity)
      : DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY
  })
}

const normalizeExponeaFeedGraphQL = (
  contentBlock?: ExponeaRecommendationFragment
): ExponeaRecommendation | undefined => {
  return contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.EXPONEA_RECOMMENDATION as const,
        title: contentBlock?.title ?? '',
        altTitle: contentBlock?.altTitle ?? '',
        recommendationId: contentBlock?.id ?? '',
        isProductSlider: contentBlock?.isSlider ?? false,
        itemsQuantity: contentBlock?.quantity
          ? parseInt(contentBlock?.quantity)
          : DEFAULT_PRODUCT_RECOMMENDATIONS_QUANTITY
      })
    : undefined
}

export const normalizeExponeaFeed = (
  contentBlock?: ContentfulExponeaRecommendation | ExponeaRecommendationFragment
): ExponeaRecommendation | undefined => {
  if (checkIfGraphQLResponse(contentBlock)) {
    return normalizeExponeaFeedGraphQL(contentBlock)
  }

  return normalizeExponeaFeedRest(contentBlock)
}
