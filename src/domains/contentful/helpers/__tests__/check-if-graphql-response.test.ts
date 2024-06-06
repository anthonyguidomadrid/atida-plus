import { checkIfGraphQLResponse } from '../check-if-graphql-response'

describe(checkIfGraphQLResponse, () => {
  it('it returns true when given a valid GraphQL response', () => {
    expect(checkIfGraphQLResponse({ __typename: 'SomeType' })).toBe(true)
  })

  it('it returns false when given a valid REST response', () => {
    const mock = {
      sys: {
        contentType: {
          sys: { id: 'entry' }
        }
      },
      fields: {
        title: 'Some entry'
      }
    }
    expect(checkIfGraphQLResponse(mock)).toBe(false)
  })

  it('returns false when given an erroneous response', () => {
    expect(checkIfGraphQLResponse({})).toBe(false)
  })

  it('returns false for non-object response', () => {
    // @ts-expect-error
    expect(checkIfGraphQLResponse(5)).toBe(false)
  })

  it('returns false when given no value', () => {
    expect(checkIfGraphQLResponse(undefined)).toBe(false)
    // @ts-expect-error
    expect(checkIfGraphQLResponse(null)).toBe(false)
  })
})
