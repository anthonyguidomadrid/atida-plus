import type { Entry } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import { StaticHeaderBlockFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export type StaticHeaderBlock = {
  contentType: CmsContentTypes.STATIC_HEADER_BLOCK
  title?: string
}

export type ContentfulStaticHeaderBlock = Entry<{
  title?: string
}>

const normalizeStaticHeaderBlockRest = (
  StaticHeaderBlock: ContentfulStaticHeaderBlock
): StaticHeaderBlock | undefined => ({
  contentType: CmsContentTypes.STATIC_HEADER_BLOCK as const,
  title: StaticHeaderBlock?.fields?.title ?? undefined
})

const normalizeStaticHeaderBlockGraphQL = (
  StaticHeaderBlock: StaticHeaderBlockFragment
): StaticHeaderBlock | undefined =>
  StaticHeaderBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.STATIC_HEADER_BLOCK as const,
        title: StaticHeaderBlock?.title ?? undefined
      })
    : undefined

export const normalizeStaticHeaderBlock = (
  StaticHeaderBlock: ContentfulStaticHeaderBlock | StaticHeaderBlockFragment
): StaticHeaderBlock | undefined => {
  if (checkIfGraphQLResponse(StaticHeaderBlock)) {
    return normalizeStaticHeaderBlockGraphQL(StaticHeaderBlock)
  }

  return normalizeStaticHeaderBlockRest(StaticHeaderBlock)
}
