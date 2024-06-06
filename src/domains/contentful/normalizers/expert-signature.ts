import type { Entry } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import { Asset, normalizeAsset } from './asset'
import { checkIfGraphQLResponse } from '../helpers'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ExpertSignature as ExpertSignatureGraphQL } from '~generated-graphql'

export type ExpertSignature = {
  image?: Asset
  categories: {
    id?: string
    title?: string
  }
  name?: string
  jobTitle?: string
  jobDescription?: string
}

export type ContentfulExpertSignature = Entry<{
  image?: Asset
  categories: {
    id?: string
    title?: string
  }
  name?: string
  jobTitle?: string
  jobDescription?: string
}>

const normalizeExpertSignatureGraphQL = (
  expertSignature: ExpertSignatureGraphQL
): ExpertSignature | undefined =>
  expertSignature
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.EXPERT_SIGNATURE,
        image: expertSignature.image
          ? normalizeAsset(expertSignature.image)
          : undefined,
        categories: expertSignature.categories
          ? {
              id: expertSignature.categories.id ?? undefined,
              title: expertSignature.categories.title ?? undefined
            }
          : undefined,
        name: expertSignature.name ?? undefined,
        jobTitle: expertSignature.jobTitle ?? undefined,
        jobDescription: expertSignature.jobDescription ?? undefined
      } as ExpertSignature)
    : undefined

export const normalizeExpertSignature = (
  expertSignature: ContentfulExpertSignature | ExpertSignatureGraphQL
): ExpertSignature | undefined => {
  if (checkIfGraphQLResponse(expertSignature)) {
    return normalizeExpertSignatureGraphQL(expertSignature)
  }
  return undefined
}
