import type { Asset as ContentfulAsset } from 'contentful'
import type { Asset as GraphQLAsset } from '~generated-graphql'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { checkIfGraphQLResponse } from '../helpers'

export type Asset = {
  title?: string
  description?: string
  url?: string
  type?: string
}

const normalizeAssetRest = (asset?: ContentfulAsset): Asset | undefined =>
  asset
    ? removeUndefinedPropertiesFromObject({
        title: asset?.fields?.title,
        description: asset?.fields?.description,
        url: asset?.fields?.file?.url,
        type: asset?.fields?.file?.contentType
      })
    : undefined

const normalizeAssetGraphQL = (
  asset?: Partial<GraphQLAsset>
): Asset | undefined =>
  asset
    ? removeUndefinedPropertiesFromObject({
        title: asset?.title ?? undefined,
        description: asset?.description ?? undefined,
        url: asset?.url ?? undefined,
        type: asset?.contentType ?? undefined
      })
    : undefined

export const normalizeAsset = (
  asset?: ContentfulAsset | Partial<GraphQLAsset>
): Asset | undefined => {
  if (checkIfGraphQLResponse(asset)) {
    return normalizeAssetGraphQL(asset)
  }

  return normalizeAssetRest(asset)
}
