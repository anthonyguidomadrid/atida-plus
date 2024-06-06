import type { Entry } from 'contentful'
import { Color as GraphQLColor } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'

export type Color = string

export type ContentfulColor = Entry<{
  ref: Color
}>

const normalizeColorRest = (color?: ContentfulColor): Color | undefined =>
  color?.fields?.ref ?? undefined

const normalizeColorGraphQL = (
  color?: Partial<GraphQLColor>
): Color | undefined => color?.ref ?? undefined

export const normalizeColor = (
  color?: ContentfulColor | Partial<GraphQLColor>
): Color | undefined => {
  if (checkIfGraphQLResponse(color)) {
    return normalizeColorGraphQL(color)
  }

  return normalizeColorRest(color)
}
