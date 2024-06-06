import type { Entry } from 'contentful'
import { normalizeRichText } from '~domains/contentful'
import { CmsContentTypes } from '~config/content-types'
import type { Document } from '@contentful/rich-text-types'
import { StaticContentBlockFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ContentfulIcon, Icon, normalizeIcon } from './icon'

export type StaticContentBlock = {
  contentType: CmsContentTypes.STATIC_CONTENT_BLOCK
  title?: string
  content?: string
  icon?: Icon
  header?: string
}

export type ContentfulStaticContentBlock = Entry<{
  title?: string
  content?: Document
  icon?: ContentfulIcon
}>

const normalizeStaticContentBlockRest = (
  staticContentBlock: ContentfulStaticContentBlock
): StaticContentBlock | undefined =>
  staticContentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.STATIC_CONTENT_BLOCK as const,
        title: staticContentBlock?.fields?.title ?? undefined,
        content: normalizeRichText(staticContentBlock?.fields?.content) ?? null,
        icon: normalizeIcon(staticContentBlock?.fields?.icon)
      })
    : undefined

export const normalizeStaticContentBlockGraphQL = (
  staticContentBlock: StaticContentBlockFragment
): StaticContentBlock | undefined =>
  staticContentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.STATIC_CONTENT_BLOCK as const,
        title: staticContentBlock?.title ?? undefined,
        content: normalizeRichText(staticContentBlock?.content?.json),
        icon: normalizeIcon(staticContentBlock?.icon ?? undefined)
      })
    : undefined

export const normalizeStaticContentBlock = (
  StaticContentBlock: ContentfulStaticContentBlock | StaticContentBlockFragment
): StaticContentBlock | undefined => {
  if (checkIfGraphQLResponse(StaticContentBlock)) {
    return normalizeStaticContentBlockGraphQL(StaticContentBlock)
  }

  return normalizeStaticContentBlockRest(StaticContentBlock)
}
