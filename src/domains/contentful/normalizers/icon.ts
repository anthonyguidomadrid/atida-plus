import type { Entry } from 'contentful'
import { Icon as GraphQLIcon } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'

export type Icon = string

export type ContentfulIcon = Entry<{
  ref: Icon
}>

export const normalizeIconRest = (icon?: ContentfulIcon): Icon | undefined =>
  icon?.fields?.ref

const normalizeIconGraphQL = (icon?: Partial<GraphQLIcon>): Icon | undefined =>
  icon?.ref ?? undefined

export const normalizeIcon = (
  icon?: ContentfulIcon | Partial<GraphQLIcon>
): Icon | undefined => {
  if (checkIfGraphQLResponse(icon)) {
    return normalizeIconGraphQL(icon)
  }

  return normalizeIconRest(icon)
}
