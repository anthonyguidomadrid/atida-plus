import type { Entry, Asset } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { CategoryGridFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'

export type CategoryGrid = {
  contentType: CmsContentTypes.CATEGORY_GRID
  title: string
  items?: {
    title?: string
    color?: string
    image?: {
      title: string
      alt: string
      url: string
    }
    url?: string
    titleColor?: string
  }[]
  viewType: 'Slider' | 'Grid'
}

export type ContentfulCategoryGrid = Entry<{
  title: string
  items: Entry<{
    title: string
    color: string
    imageAsset: Asset
    url: string
    titleColor: {
      ref: string
    }
  }>[]
  viewType: 'Slider' | 'Grid' | null
}>

const normalizeCategoryGridRest = (
  categoryGridBlock?: ContentfulCategoryGrid
): CategoryGrid =>
  removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.CATEGORY_GRID as const,
    title: categoryGridBlock?.fields?.title ?? '',
    items: categoryGridBlock?.fields?.items
      ? categoryGridBlock?.fields?.items.map(item => {
          return removeUndefinedPropertiesFromObject({
            title: item?.fields?.title ?? '',
            color: item?.fields?.color ?? '',
            image: item?.fields?.imageAsset?.fields?.file?.url
              ? {
                  title: item?.fields?.imageAsset?.fields?.title ?? '',
                  alt: item?.fields?.imageAsset?.fields?.description ?? '',
                  url: item?.fields?.imageAsset?.fields?.file?.url
                }
              : undefined,
            url: prependURLWithSlash(item?.fields?.url ?? ''),
            titleColor: item?.fields?.titleColor?.ref ?? undefined
          })
        })
      : undefined,
    viewType: categoryGridBlock?.fields?.viewType ?? 'Slider'
  })

const normalizeCategoryGridGraphQL = (
  categoryGridBlock?: CategoryGridFragment
): CategoryGrid =>
  removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.CATEGORY_GRID as const,
    title: categoryGridBlock?.title ?? '',
    items: (categoryGridBlock?.itemsCollection?.items ?? []).map(item => {
      return removeUndefinedPropertiesFromObject({
        title: item?.title ?? '',
        color: item?.color ?? '',
        image: item?.imageAsset?.url
          ? {
              title: item.imageAsset?.title ?? '',
              alt: item.imageAsset?.description ?? '',
              url: item.imageAsset.url
            }
          : undefined,
        url: prependURLWithSlash(item?.url ?? ''),
        titleColor: item?.titleColor?.ref ?? undefined
      })
    }),
    viewType: (categoryGridBlock?.viewType as 'Slider' | 'Grid') ?? 'Slider'
  })

export const normalizeCategoryGrid = (
  categoryGrid?: ContentfulCategoryGrid | CategoryGridFragment
): CategoryGrid => {
  if (checkIfGraphQLResponse(categoryGrid)) {
    return normalizeCategoryGridGraphQL(categoryGrid)
  }

  return normalizeCategoryGridRest(categoryGrid)
}
