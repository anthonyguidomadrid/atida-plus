import type { Entry } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import { StaticRecommendationBlockFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export type StaticRecommendationBlock = {
  contentType: CmsContentTypes.STATIC_RECOMMENDATION_BLOCK
  title?: string
  shouldDisplayTitle?: boolean
  listOfSkus: string[]
  viewType?: 'Slider' | 'Grid'
  shouldDisplayCountdown?: boolean
  countdownExpiration?: string
}

export type ContentfulStaticRecommendationBlock = Entry<{
  title?: string
  showTitle?: boolean
  skuList: string[]
  view?: string
  showCount?: boolean
  countExpire?: string
}>

const normalizeStaticRecommendationBlockGraphQL = (
  StaticRecommendationBlock: StaticRecommendationBlockFragment
): StaticRecommendationBlock | undefined =>
  StaticRecommendationBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.STATIC_RECOMMENDATION_BLOCK as const,
        title: StaticRecommendationBlock?.title ?? undefined,
        shouldDisplayTitle: StaticRecommendationBlock?.showTitle ?? undefined,
        listOfSkus: StaticRecommendationBlock?.skuList ?? undefined,
        viewType: StaticRecommendationBlock?.view ?? undefined,
        shouldDisplayCountdown:
          StaticRecommendationBlock?.showCount ?? undefined,
        countdownExpiration: StaticRecommendationBlock?.countExpire ?? undefined
      } as StaticRecommendationBlock)
    : undefined

export const normalizeStaticRecommendationBlock = (
  StaticRecommendationBlock:
    | ContentfulStaticRecommendationBlock
    | StaticRecommendationBlockFragment
): StaticRecommendationBlock | undefined => {
  if (checkIfGraphQLResponse(StaticRecommendationBlock)) {
    return normalizeStaticRecommendationBlockGraphQL(StaticRecommendationBlock)
  }
  return undefined
}
