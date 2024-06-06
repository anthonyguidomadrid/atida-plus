import type { Entry } from 'contentful'
import type { Document } from '@contentful/rich-text-types'
import { ContentfulIcon, Icon, normalizeIcon } from './icon'
import {
  prependURLWithSlash,
  removeUndefinedPropertiesFromObject
} from '~helpers'
import type { Link as GraphQLLink } from '~generated-graphql'
import { normalizeRichText } from './rich-text'
import { checkIfGraphQLResponse } from '../helpers'
import { Category } from './category'

export type Link = {
  label?: string
  url?: string
  icon?: Icon
  content?: string
  category?: Category
}

export type ContentfulLink = Entry<{
  label: string
  url: string
  icon?: ContentfulIcon
  content?: Document
}>

const normalizeLinkRest = (link?: ContentfulLink): Link | undefined =>
  link
    ? removeUndefinedPropertiesFromObject({
        label: link?.fields?.label,
        url: prependURLWithSlash(link?.fields?.url),
        icon: normalizeIcon(link?.fields?.icon),
        content: normalizeRichText(link?.fields?.content)
      })
    : undefined

const normalizeLinkGraphQL = (link?: Partial<GraphQLLink>): Link | undefined =>
  link
    ? removeUndefinedPropertiesFromObject({
        label: link?.label ?? undefined,
        url: prependURLWithSlash(link?.url ?? undefined),
        icon: normalizeIcon(link?.icon ?? undefined),
        content: normalizeRichText(link?.content?.json)
      })
    : undefined

export const normalizeLink = (
  link?: ContentfulLink | Partial<GraphQLLink>
): Link | undefined => {
  if (checkIfGraphQLResponse(link)) {
    return normalizeLinkGraphQL(link)
  }

  return normalizeLinkRest(link)
}
