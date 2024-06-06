import type { Entry } from 'contentful'
import { ContentfulIcon, Icon, normalizeIcon } from './icon'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { CmsContentTypes } from '~config/content-types'
import { UspFragment, UspsCardFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'

export type USPsCard = {
  title: string
  items?: USP[]
  contentType?: CmsContentTypes.USPS_CARD
}
export type USP = {
  icon?: Icon
  text?: string
}

export type ContentfulUSPsCard = Entry<{
  title?: string
  usps: ContentfulUSP[]
}>

export type ContentfulUSP = Entry<{
  text?: string
  icon?: ContentfulIcon
}>

const normalizeUSPsCardRest = (
  contentBlock?: ContentfulUSPsCard
): USPsCard | undefined => {
  return removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.USPS_CARD as const,
    title: contentBlock?.fields?.title ?? '',
    items: contentBlock?.fields?.usps
      ?.map(normalizeUSP)
      ?.filter((usp): usp is USP => !!usp)
  })
}

const normalizeUSPRest = (contentBlock?: ContentfulUSP): USP => {
  return removeUndefinedPropertiesFromObject({
    icon: normalizeIcon(contentBlock?.fields?.icon),
    text: contentBlock?.fields?.text ?? ''
  })
}

const normalizeUSPsCardGraphQL = (
  contentBlock?: UspsCardFragment
): USPsCard | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.USPS_CARD as const,
        title: contentBlock?.title ?? '',
        items: (contentBlock?.uspsCollection?.items ?? [])
          .map(usp => normalizeUSP(usp ?? undefined))
          .filter((usp): usp is USP => !!usp)
      })
    : undefined

const normalizeUSPGraphQL = (contentBlock?: UspFragment): USP | undefined =>
  contentBlock
    ? removeUndefinedPropertiesFromObject({
        icon: normalizeIcon(contentBlock?.icon ?? undefined),
        text: contentBlock?.text ?? ''
      })
    : undefined

export const normalizeUSP = (
  contentBlock?: ContentfulUSP | UspFragment
): USP | undefined => {
  if (checkIfGraphQLResponse(contentBlock)) {
    return normalizeUSPGraphQL(contentBlock ?? undefined)
  }

  return normalizeUSPRest(contentBlock ?? undefined)
}
export const normalizeUSPsCard = (
  contentBlock?: ContentfulUSPsCard | UspsCardFragment
): USPsCard | undefined => {
  if (checkIfGraphQLResponse(contentBlock)) {
    return normalizeUSPsCardGraphQL(contentBlock)
  }

  return normalizeUSPsCardRest(contentBlock)
}
