import { LinkBlockFragment } from '~generated-graphql'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { CmsContentTypes } from '~config/content-types'

export type LinkBlock = {
  contentType: CmsContentTypes.LINK_BLOCK
  title?: string
  label?: string
  url?: string
  icon?: string
  isCTA?: boolean
}

const normalizeLinkBlockGraphql = (
  contentBlock?: LinkBlockFragment
): LinkBlock | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.LINK_BLOCK as const,
        title: contentBlock?.title ?? undefined,
        label: contentBlock?.link?.label ?? undefined,
        url:
          prependURLWithSlash(contentBlock?.link?.url as string) ?? undefined,
        icon: contentBlock?.link?.icon?.ref ?? undefined,
        isCTA: contentBlock?.isCta ?? undefined
      })
    : undefined

export const normalizeLinkBlock = (
  contentBlock?: LinkBlockFragment
): LinkBlock | undefined => {
  return normalizeLinkBlockGraphql(contentBlock)
}
