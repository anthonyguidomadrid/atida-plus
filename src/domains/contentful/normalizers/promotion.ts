import { Category, normalizeCategory } from './category'
import type { Entry, Asset as ContentfulAsset } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { checkIfGraphQLResponse } from '../helpers'
import { Asset, normalizeAsset } from './asset'
import { Color, ContentfulColor, normalizeColor } from './color'
import { normalizeRichText } from './rich-text'
import { PromotionFragment } from '~generated-graphql'
import { CmsContentTypes } from '~config/content-types'
import { CmsPageTypes } from '~config/page-types'
import { ProductLabelWrapper } from '~domains/product'
import { InfoLabelEnum } from '~domains/product/types'

export type ContentfulPromotion = Entry<{
  title?: string
  id: string
  description?: Document
  teaserDescription?: string
  sponsored?: boolean
  teaserType: boolean
  color?: ContentfulColor
  image?: ContentfulAsset
  itemsToFilterBy?: string[]
}>

export type Promotion = {
  createdAt?: string
  title?: string
  id?: string
  description?: string
  teaserDescription?: string
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  isContentWithImage?: boolean
  color?: Color
  image?: Asset
  teaserImage?: Asset
  contentType?: CmsContentTypes.PROMOTION
  url?: string
  labels?: ProductLabelWrapper[]
  validFrom?: string
  validTo?: string
  categories?: Category[]
  promoInformation?: string
}

export type PromotionData = {
  data?: { total?: number }
  includes?: Promotion[]
}

export type Promos = {
  total?: number
  items?: Promotion[]
}

export const normalizePromotionRest = (
  promotion?: ContentfulPromotion
): Partial<Promotion> | undefined =>
  promotion
    ? removeUndefinedPropertiesFromObject({
        title: promotion?.fields?.title,
        id: promotion?.fields?.id,
        description: normalizeRichText(promotion?.fields?.description),
        teaserDescription: promotion?.fields?.teaserDescription,
        isSponsoredContent: promotion?.fields?.sponsored,
        isContentWithImage: promotion?.fields?.teaserType,
        color: normalizeColor(promotion?.fields?.color),
        image: normalizeAsset(promotion?.fields?.image),
        itemsToFilterBy: promotion?.fields?.itemsToFilterBy,
        contentType: CmsContentTypes.PROMOTION as const
      })
    : undefined

const getPromoPageUrl = (promotion: PromotionFragment): string | undefined => {
  const pages = promotion?.url?.pageCollection?.items
  const promoId = promotion.id
  if (pages && pages.length) {
    const promoCandidates = pages.filter(page => {
      return (
        page?.referencedContent !== null &&
        page?.referencedContent?.__typename === CmsPageTypes.PROMOTION &&
        page?.referencedContent?.id === promoId
      )
    })

    return prependURLWithSlash(promoCandidates[0]?.slug as string)
  }
  return ''
}
export const normalizePromotionGraphQL = (
  promotion?: PromotionFragment
): Promotion | undefined =>
  promotion
    ? removeUndefinedPropertiesFromObject({
        createdAt: promotion?.sys?.firstPublishedAt ?? undefined,
        title: promotion?.title ?? undefined,
        id: promotion?.id ?? undefined,
        description: normalizeRichText(promotion?.description?.json),
        teaserDescription: promotion?.teaserDescription ?? undefined,
        isSponsoredContent: promotion?.sponsored ?? false,
        isContentWithImage: promotion?.isContentWithImage ?? false,
        color: normalizeColor(promotion?.color ?? undefined),
        image: normalizeAsset(promotion?.image ?? undefined),
        teaserImage: normalizeAsset(promotion?.teaserImage ?? undefined),
        contentType: CmsContentTypes.PROMOTION as const,
        url: getPromoPageUrl(promotion),
        validFrom: promotion?.validFrom,
        validTo: promotion?.validTo,
        labels:
          promotion?.labelsCollection?.items.map(item => {
            const isCampaignPromo =
              item &&
              item.key &&
              item.key.includes(InfoLabelEnum.CampaignPromotion)
            return {
              type: isCampaignPromo
                ? InfoLabelEnum.CampaignPromotion
                : InfoLabelEnum.Promotion,
              label: isCampaignPromo
                ? String(item?.key)
                : String(item?.value) ?? ''
            }
          }) ?? [],
        categories: (promotion?.categoriesCollection?.items ?? [])
          .map(category => normalizeCategory(category ?? undefined))
          .filter((category): category is Category => !!category),
        itemsToFilterBy: promotion?.itemsToFilterBy,
        promoInformation: normalizeRichText(promotion?.promoInformation?.json)
      })
    : undefined

export const normalizePromotionData = (data?: PromotionData): Promos => {
  return removeUndefinedPropertiesFromObject({
    total: data?.data?.total,
    items: data?.includes
  })
}

export const normalizePromotion = (
  promotion?: ContentfulPromotion | PromotionFragment
): Promotion | undefined => {
  if (checkIfGraphQLResponse(promotion)) {
    return normalizePromotionGraphQL(promotion)
  }
  return normalizePromotionRest(promotion)
}
