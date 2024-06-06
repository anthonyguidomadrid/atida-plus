import type { Entry, Asset } from 'contentful'
import { normalizeRichText, normalizeLink } from '~domains/contentful'
import { CmsContentTypes } from '~config/content-types'
import type { Document } from '@contentful/rich-text-types'
import type { Link, ContentfulLink } from './link'
import { HeroBannerFragment, Link as GraphQLLink } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'
import { removeUndefinedPropertiesFromObject } from '~helpers'

export type HeroBanner = {
  contentType: CmsContentTypes.HERO_BANNER
  title: string
  searchPlaceholder?: string
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  link?: Link
  text?: string
  image?: {
    title: string
    alt: string
    url: string
  }
}

export type ContentfulHeroBanner = Entry<{
  title: string
  searchPlaceholder: string
  isSponsoredContent?: boolean
  link?: ContentfulLink
  text?: Document
  imageAsset: Asset
}>

const normalizeHeroBannerRest = (heroBlock: ContentfulHeroBanner): HeroBanner =>
  removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.HERO_BANNER,
    title: heroBlock?.fields?.title ?? undefined,
    searchPlaceholder: heroBlock?.fields?.searchPlaceholder ?? undefined,
    isSponsoredContent: heroBlock?.fields?.isSponsoredContent ?? false,
    link: normalizeLink(heroBlock?.fields?.link) ?? undefined,
    text: normalizeRichText(heroBlock?.fields?.text) ?? undefined,
    image: heroBlock?.fields?.imageAsset?.fields?.file?.url
      ? {
          title: heroBlock?.fields?.imageAsset?.fields?.title,
          alt: heroBlock?.fields?.imageAsset?.fields?.description,
          url: heroBlock?.fields?.imageAsset?.fields?.file?.url
        }
      : undefined
  })

const normalizeHeroBannerGraphQL = (
  heroBlock: HeroBannerFragment
): HeroBanner | undefined =>
  heroBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.HERO_BANNER as const,
        title: heroBlock?.heroBannerTitle ?? '',
        searchPlaceholder: heroBlock?.searchPlaceholder ?? undefined,
        isSponsoredContent: heroBlock?.isSponsoredContent ?? false,
        link: normalizeLink(heroBlock?.link as GraphQLLink),
        text: normalizeRichText(heroBlock?.text?.json),
        image: heroBlock?.imageAsset?.url
          ? {
              title: heroBlock?.imageAsset?.title ?? '',
              alt: heroBlock?.imageAsset?.description ?? '',
              url: heroBlock?.imageAsset?.url
            }
          : undefined
      })
    : undefined

export const normalizeHeroBanner = (
  heroBlock: ContentfulHeroBanner | HeroBannerFragment
): HeroBanner | undefined => {
  if (checkIfGraphQLResponse(heroBlock)) {
    return normalizeHeroBannerGraphQL(heroBlock)
  }

  return normalizeHeroBannerRest(heroBlock)
}
