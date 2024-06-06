/**
 * @jest-environment node
 */
// @ts-ignore
import {
  ExponeaAllRecommendationsResponse,
  ExponeaAllRecommendationsResponseUndefined,
  recommendationsCollection,
  recommendationsCollectionUndefined
} from '~domains/exponea/__mocks__/recommendation'
import { fetchAllRecommendations } from '../fetch-all-recommendations'
import axios from 'axios'

describe(fetchAllRecommendations, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue(
      ExponeaAllRecommendationsResponse
    )
  })

  it('passes the correct parameters to contentful request', async () => {
    await fetchAllRecommendations('en-gb', 'PDP')

    expect(axios.post).toHaveBeenCalledWith('', {
      query: `
    query exponeaRecommendationsCollectionQuery($locale: String!, $type: String!) {
  exponeaRecommendationCollection(locale: $locale, where: {type_contains: $type}) {
    items {
      title
      altTitle
      id
      type
      isSlider
      quantity
    }
  }
}
    `,
      variables: {
        locale: 'en-GB',
        type: 'PDP'
      }
    })
  })

  it('passes the default parameters to contentful request when type is missing', async () => {
    await fetchAllRecommendations('en-gb', '')

    expect(axios.post).toHaveBeenCalledWith('', {
      query: `
    query exponeaRecommendationsCollectionQuery($locale: String!, $type: String!) {
  exponeaRecommendationCollection(locale: $locale, where: {type_contains: $type}) {
    items {
      title
      altTitle
      id
      type
      isSlider
      quantity
    }
  }
}
    `,
      variables: {
        locale: 'en-GB',
        type: ''
      }
    })
  })

  it('returns the normalized recommendations response', async () => {
    const response = await fetchAllRecommendations('en-gb', 'PDP')
    expect(response).toStrictEqual(recommendationsCollection)
  })

  it('does not break when items is undefiend', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue(
      ExponeaAllRecommendationsResponseUndefined
    )
    const response = await fetchAllRecommendations('en-gb', 'PDP')
    expect(response).toStrictEqual(recommendationsCollectionUndefined)
  })
})
