import {
  Asset,
  Category,
  CategoryLink,
  checkIfGraphQLResponse,
  ContentfulCategory,
  normalizeAsset,
  normalizeCategory,
  normalizePromotion,
  Promotion
} from '~domains/contentful'
import { CategoryCopFragment, PromotionFragment } from '~generated-graphql'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import type { Entry } from 'contentful'

export type ContentfulCategoryCop = Entry<{
  title?: string
  linkedCategory?: Category
}>

export type CategoryCop = {
  title?: string
  category?: {
    id?: string
    title?: string
    subcategories?: CategoryLink[]
    image?: Asset
  }
  categoryPageSlug?: string
  color?: string
  linkedPromotions?: Promotion[]
}

const normalizeCopLink = (cop?: ContentfulCategoryCop): Category | undefined =>
  normalizeCategory(
    (cop?.fields?.linkedCategory as ContentfulCategory) ?? undefined
  )

const normalizeCopRest = (
  cop?: ContentfulCategoryCop
): CategoryCop | undefined =>
  cop
    ? removeUndefinedPropertiesFromObject({
        title: cop?.fields?.title ?? undefined,
        category: cop?.fields?.linkedCategory ?? undefined
      })
    : undefined

const normalizeCopGraphql = (
  cop?: CategoryCopFragment
): CategoryCop | undefined =>
  cop
    ? removeUndefinedPropertiesFromObject({
        title: cop?.title ?? undefined,
        category: removeUndefinedPropertiesFromObject({
          id: cop?.linkedCategory?.id ?? undefined,
          title: cop?.linkedCategory?.title ?? undefined,
          subcategories:
            cop?.linkedCategory?.subcategoriesCollection?.items.map(sub => {
              const slug = sub?.linkedFrom?.pageCollection?.items?.[0]?.slug

              return removeUndefinedPropertiesFromObject({
                id: sub?.id ?? undefined,
                title: sub?.title ?? undefined,
                url: prependURLWithSlash(slug ?? undefined)
              })
            }) ?? undefined,
          image: normalizeAsset(cop?.linkedCategory?.image ?? undefined)
        }),
        color: cop?.linkedCategory?.color?.ref ?? undefined,
        categoryPageSlug:
          cop?.linkedCategory?.categoryPageSlug?.pageCollection?.items[0]
            ?.slug ?? undefined,
        linkedPromotions: cop?.linkedPromotionsCollection?.items?.map(
          promotion => normalizePromotion(promotion as PromotionFragment) ?? {}
        )
      })
    : undefined

export const normalizeCategoryCop = (
  cop?: ContentfulCategoryCop | CategoryCopFragment,
  isLink = false
): CategoryCop | Category | undefined => {
  if (isLink) {
    return normalizeCopLink(cop as ContentfulCategoryCop)
  }

  return checkIfGraphQLResponse(cop)
    ? normalizeCopGraphql(cop)
    : normalizeCopRest(cop)
}
