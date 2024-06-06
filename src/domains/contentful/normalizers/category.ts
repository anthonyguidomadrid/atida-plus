import type { Entry, Asset as ContentfulAsset } from 'contentful'
import { CategoryFragment } from '~generated-graphql'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { checkIfGraphQLResponse } from '../helpers'
import { Asset, normalizeAsset } from './asset'
import { Color, ContentfulColor, normalizeColor } from './color'

export type ContentfulCategory = Entry<{
  title: string
  id: string
  color: ContentfulColor
  image: ContentfulAsset
  level: number
}>

export type CategoryLink = {
  id?: string
  title?: string
  url?: string
  level?: number
}

export type Category = {
  id?: string
  title?: string
  color?: Color
  image?: Asset
  level?: number
  subcategories?: CategoryLink[]
  path?: {
    id0?: string
    id1?: string
    id2?: string
    title0?: string
    title1?: string
    title2?: string
    slug0?: string
    slug1?: string
    slug2?: string
  }
}

const normalizeCategoryRest = (
  category?: ContentfulCategory
): Category | undefined =>
  category
    ? removeUndefinedPropertiesFromObject({
        id: category?.fields?.id,
        color: normalizeColor(category?.fields?.color),
        image: normalizeAsset(category?.fields?.image),
        level: category?.fields?.level
      })
    : undefined

const normalizeCategoryGraphQL = (
  category?: CategoryFragment
): Category | undefined =>
  category
    ? removeUndefinedPropertiesFromObject({
        id: category?.id ?? undefined,
        title: category?.title ?? undefined,
        color: normalizeColor(category?.color ?? undefined),
        image: normalizeAsset(category?.image ?? undefined),
        level: category?.level ?? undefined,
        subcategories: category?.subcategories?.items?.map(subcategory => {
          const slug = subcategory?.linkedFrom?.pageCollection?.items?.[0]?.slug
          return removeUndefinedPropertiesFromObject({
            id: subcategory?.id ?? undefined,
            title: subcategory?.title ?? undefined,
            url: prependURLWithSlash(slug ?? undefined),
            level: subcategory?.level ?? undefined
          })
        }),
        path:
          category?.level === 2
            ? removeUndefinedPropertiesFromObject({
                id0:
                  category?.linkedFrom?.categoryCollection?.items[0]?.linkedFrom
                    ?.categoryCollection?.items[0]?.id ?? undefined,
                id1:
                  category?.linkedFrom?.categoryCollection?.items[0]?.id ??
                  undefined,
                id2: category?.id ?? undefined,
                title0:
                  category?.linkedFrom?.categoryCollection?.items[0]?.linkedFrom
                    ?.categoryCollection?.items[0]?.title ?? undefined,
                title1:
                  category?.linkedFrom?.categoryCollection?.items[0]?.title ??
                  undefined,
                title2: category?.title ?? undefined,
                slug0:
                  category?.linkedFrom?.categoryCollection?.items[0]?.linkedFrom
                    ?.categoryCollection?.items[0]?.linkedFrom?.pageCollection
                    ?.items[0]?.slug ?? undefined,
                slug1:
                  category?.linkedFrom?.categoryCollection?.items[0]?.linkedFrom
                    ?.pageCollection?.items[0]?.slug ?? undefined,
                slug2:
                  category?.linkedFrom?.pageCollection?.items?.[0]?.slug ??
                  undefined
              })
            : category?.level === 1
            ? removeUndefinedPropertiesFromObject({
                id0:
                  category?.linkedFrom?.categoryCollection?.items[0]?.id ??
                  undefined,
                id1: category?.id ?? undefined,
                title0:
                  category?.linkedFrom?.categoryCollection?.items[0]?.title ??
                  undefined,
                title1: category?.title ?? undefined,
                slug0:
                  category?.linkedFrom?.categoryCollection?.items[0]?.linkedFrom
                    ?.pageCollection?.items[0]?.slug ?? undefined,
                slug1:
                  category?.linkedFrom?.pageCollection?.items?.[0]?.slug ??
                  undefined
              })
            : removeUndefinedPropertiesFromObject({
                id0: category?.id ?? undefined,
                title0: category?.title ?? undefined,
                slug0:
                  category?.linkedFrom?.pageCollection?.items?.[0]?.slug ??
                  undefined
              })
      })
    : undefined

export const normalizeCategory = (
  category?: ContentfulCategory | CategoryFragment
): Category | undefined => {
  if (checkIfGraphQLResponse(category)) {
    return normalizeCategoryGraphQL(category)
  }

  return normalizeCategoryRest(category)
}
