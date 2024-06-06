import type { Entry } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { normalizePromotion } from './promotion'
import { normalizeMarketingTeaser } from './marketing-teaser'
import {
  ContainerOfContentBlocksFragment,
  MarketingTeaserFragment,
  PromotionFragment
} from '~generated-graphql'
import type { ContainerContentBlock } from '~domains/page'

export type ContainerOfContentBlocks = {
  contentType: CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS
  title?: string
  displayTitle: boolean
  hasSmallMargin: boolean
  blocks?: ContainerContentBlock[]
}

type ContentfulContentBlock = PromotionFragment | MarketingTeaserFragment

export type ContentfulContainerOfContentBlocks = Entry<{
  title?: string
  contentBlocks?: ContentfulContentBlock[]
}>

export const isPromotion = (
  toBeChecked: ContentfulContentBlock
): toBeChecked is PromotionFragment => toBeChecked?.__typename === 'Promotion'

export const isMarketingTeaser = (
  toBeChecked: ContentfulContentBlock
): toBeChecked is MarketingTeaserFragment =>
  toBeChecked?.__typename === 'MarketingTeaser'

const normalizeContainerOfContentBlocksGraphQL = (
  contentBlock: ContainerOfContentBlocksFragment
): ContainerOfContentBlocks | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS as const,
        title: contentBlock?.title ?? undefined,
        displayTitle: contentBlock.showTitle ?? false,
        hasSmallMargin: contentBlock.hasMargin ?? false,
        blocks:
          contentBlock?.contentCollection?.items &&
          contentBlock?.contentCollection?.items
            .map(block => {
              if (!block) {
                return null
              }
              if (isMarketingTeaser(block as ContentfulContentBlock))
                return (
                  normalizeMarketingTeaser(block as MarketingTeaserFragment) ??
                  null
                )
              if (isPromotion(block as PromotionFragment))
                return normalizePromotion(block as PromotionFragment) ?? null
              return null
            })
            .filter((block): block is ContainerContentBlock => !!block)
      })
    : undefined

export const normalizeContainerOfContentBlocks = (
  containerOfContentBlocks: ContainerOfContentBlocksFragment
): ContainerOfContentBlocks | undefined => {
  return normalizeContainerOfContentBlocksGraphQL(containerOfContentBlocks)
}
