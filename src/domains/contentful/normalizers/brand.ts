import type { Entry, Asset as ContentfulAsset } from 'contentful'
import { Asset, normalizeAsset } from './asset'
import { checkIfGraphQLResponse } from '../helpers'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { BrandFragment } from '~generated-graphql'

export type ContentfulBrand = Entry<{
  title?: string
  id: string
  image?: ContentfulAsset
  logoImage?: ContentfulAsset
}>

export type Brand = {
  title?: string
  id?: string
  image?: Asset
  logoImage?: Asset
  url?: string
}

export type BrandData = {
  data?: { total?: number }
  includes?: Brand[]
}

export type Brands = {
  total?: number
  items?: Brand[]
}

export const normalizeBrandRest = (
  brand?: ContentfulBrand,
  url?: string
): Partial<Brand> | undefined =>
  brand
    ? removeUndefinedPropertiesFromObject({
        title: brand?.fields?.title,
        id: brand?.fields?.id,
        url: prependURLWithSlash(url)
      })
    : undefined

const normalizeBrandGraphQL = (
  brand?: BrandFragment,
  url?: string
): Brand | undefined => {
  return brand
    ? removeUndefinedPropertiesFromObject({
        title: brand?.title ?? undefined,
        id: brand?.id ?? undefined,
        image: normalizeAsset(brand?.image ?? undefined),
        logoImage: normalizeAsset(brand?.logoImage ?? undefined),
        url: prependURLWithSlash(url)
      })
    : undefined
}

export const normalizeBrandData = (data?: BrandData): Brands =>
  removeUndefinedPropertiesFromObject({
    total: data?.data?.total,
    items: data?.includes
  })

export const normalizeBrand = (
  brand?: ContentfulBrand | BrandFragment
): Brand | undefined => {
  if (checkIfGraphQLResponse(brand)) {
    return normalizeBrandGraphQL(brand)
  }
  return normalizeBrandRest(brand)
}

export const normalizeBrandPage = (
  brand?: BrandFragment,
  url?: string | undefined
): Brand | undefined => {
  return normalizeBrandGraphQL(brand, url)
}
