import type { Entry } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  GroupOfStaticContentBlocksFragment,
  StaticContentBlockFragment,
  ContentBlockWithImage as ContentBlockWithImageFragment
} from '~generated-graphql'
import {
  StaticContentBlock,
  normalizeStaticContentBlockGraphQL
} from './static-content-block'
import {
  ContentBlockWithImage,
  normalizeContentBlockWithImageGraphQL
} from './content-block-with-image'

export type GroupOfStaticContentBlocks = {
  contentType: CmsContentTypes.GROUP_OF_STATIC_CONTENT_BLOCKS
  title?: string
  blocks?: (StaticContentBlock | ContentBlockWithImage)[]
  type: string
}
export type GroupOfStaticContentBlocksTypes =
  | 'Bullet points'
  | 'Accordion'
  | 'Slider'
export type ContentfulGroupOfStaticContentBlocks = Entry<{
  title?: string
  contentBlocks?: (StaticContentBlockFragment | ContentBlockWithImageFragment)[]
  type: GroupOfStaticContentBlocksTypes
}>

const normalizeGroupOfStaticContentBlocksGraphQL = (
  contentBlock: GroupOfStaticContentBlocksFragment
): GroupOfStaticContentBlocks | undefined => {
  return contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.GROUP_OF_STATIC_CONTENT_BLOCKS as const,
        title: contentBlock?.title ?? undefined,
        blocks:
          contentBlock?.staticContentBlocksCollection?.items &&
          contentBlock?.staticContentBlocksCollection?.items
            .map(block => {
              if (!block) {
                return null
              }
              if (
                (contentBlock.type === 'Accordion' ||
                  contentBlock.type === 'Bullet points') &&
                block.__typename === 'StaticContentBlock'
              ) {
                return normalizeStaticContentBlockGraphQL(block) ?? null
              }
              if (
                contentBlock.type === 'Slider' &&
                block.__typename === 'ContentBlockWithImage'
              ) {
                return normalizeContentBlockWithImageGraphQL(block) ?? null
              }
            })
            .filter(
              (block): block is StaticContentBlock | ContentBlockWithImage =>
                !!block
            ),
        type: contentBlock.type ?? ''
      })
    : undefined
}

export const normalizeGroupOfStaticContentBlocks = (
  groupOfStaticContentBlocks: GroupOfStaticContentBlocksFragment
): GroupOfStaticContentBlocks | undefined => {
  return normalizeGroupOfStaticContentBlocksGraphQL(groupOfStaticContentBlocks)
}
