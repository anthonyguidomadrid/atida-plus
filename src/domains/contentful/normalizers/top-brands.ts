import { TopBrandsFragment } from '~generated-graphql'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import { CmsContentTypes } from '~config/content-types'
import { Brand } from '~domains/contentful/normalizers/brand'
import { Asset } from '~domains/contentful'

export type TopBrands = {
  contentType: CmsContentTypes.TOP_BRANDS
  title?: string
  items?: Brand[]
}

const normalizeTopBrandsGraphql = (
  contentBlock?: TopBrandsFragment
): TopBrands | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.TOP_BRANDS as const,
        title: contentBlock?.title ?? undefined,
        items: (contentBlock?.brandsCollection?.items ?? []).map(block => {
          const slug = block?.url?.pageCollection?.items?.[0]?.slug
          return removeUndefinedPropertiesFromObject({
            title: block?.title ?? undefined,
            url: prependURLWithSlash(slug ?? undefined),
            logoImage: (block?.logoImage as Asset) ?? undefined
          })
        })
      })
    : undefined

export const normalizeTopBrands = (
  contentBlock?: TopBrandsFragment
): TopBrands | undefined => {
  return normalizeTopBrandsGraphql(contentBlock)
}
