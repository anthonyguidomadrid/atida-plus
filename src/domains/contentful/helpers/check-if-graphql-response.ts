import type { Asset, Entry } from 'contentful'
import { hasOwnProperty } from '~helpers'

export const checkIfGraphQLResponse = <
  GraphQLFragment extends Record<string | number | symbol, unknown>,
  RestEntry extends Entry<unknown> | Asset
>(
  block?: GraphQLFragment | RestEntry
): block is GraphQLFragment => {
  if (hasOwnProperty(block ?? {}, '__typename')) {
    return true
  }

  return false
}
