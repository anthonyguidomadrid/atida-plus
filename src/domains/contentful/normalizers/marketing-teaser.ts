import { Asset, normalizeAsset } from './asset'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { MarketingTeaserFragment } from '~generated-graphql'
import { Color, normalizeColor } from './color'
import { CmsContainerContentTypes } from '~config/content-types'

export type MarketingTeaser = {
  title?: string
  description?: string
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  logo?: Asset
  labelText?: string
  labelColor?: Color
  image?: Asset
  backgroundColor?: Color
  hasButton: boolean
  url?: string
  contentType?: CmsContainerContentTypes.MARKETING_TEASER
}

const normalizeMarketingTeaserGraphQL = (
  marketingTeaser: MarketingTeaserFragment
): MarketingTeaser | undefined => {
  return marketingTeaser
    ? removeUndefinedPropertiesFromObject({
        title: marketingTeaser?.title ?? undefined,
        description: marketingTeaser?.teaserDescription ?? undefined,
        isSponsoredContent: marketingTeaser?.sponsored ?? false,
        logo: normalizeAsset(marketingTeaser?.logo ?? undefined),
        labelText: marketingTeaser?.text ?? undefined,
        labelColor: normalizeColor(marketingTeaser?.color ?? undefined),
        isFullWidthImage: marketingTeaser?.fullWidth ?? false,
        image: normalizeAsset(marketingTeaser?.image ?? undefined),
        backgroundColor: normalizeColor(marketingTeaser?.bgColor ?? undefined),
        hasButton: marketingTeaser?.button ?? false,
        url: prependURLWithSlash(marketingTeaser?.slug ?? undefined),
        contentType: CmsContainerContentTypes.MARKETING_TEASER as const
      })
    : undefined
}

export const normalizeMarketingTeaser = (
  marketingTeaser: MarketingTeaserFragment
): MarketingTeaser | undefined => {
  return normalizeMarketingTeaserGraphQL(marketingTeaser)
}
