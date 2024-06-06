import { CampaignHeroBannerFragment } from '~generated-graphql'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { CmsContentTypes } from '~config/content-types'
import { Asset, normalizeAsset, normalizeRichText } from '~domains/contentful'

export type CampaignHeroBanner = {
  contentType: CmsContentTypes.CAMPAIGN_HERO_BANNER
  title?: string
  description?: string
  altTitle?: string
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  finishingDate?: string
  backgroundColor?: string
  image?: Asset
  url?: string
}

const normalizeCampaignHeroBannerGraphql = (
  contentBlock?: CampaignHeroBannerFragment
): CampaignHeroBanner | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.CAMPAIGN_HERO_BANNER as const,
        title: contentBlock?.title ?? undefined,
        description:
          normalizeRichText(contentBlock?.description?.json) ?? undefined,
        altTitle: contentBlock?.altTitle ?? undefined,
        isSponsoredContent: contentBlock?.isSponsoredContent ?? false,
        finishingDate: contentBlock?.finishingDate ?? undefined,
        backgroundColor: contentBlock?.backgroundColor?.ref ?? undefined,
        image: normalizeAsset(contentBlock?.image as Asset),
        url:
          prependURLWithSlash(contentBlock?.campaignUrl as string) ?? undefined
      })
    : undefined

export const normalizeCampaignHeroBanner = (
  contentBlock?: CampaignHeroBannerFragment
): CampaignHeroBanner | undefined => {
  return normalizeCampaignHeroBannerGraphql(contentBlock)
}
