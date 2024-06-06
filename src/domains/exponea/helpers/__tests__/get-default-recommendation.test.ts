import { getDefaultRecommendation } from '../get-default-recommendation'

describe(getDefaultRecommendation, () => {
  it('returns the default recommendationId', () => {
    expect(getDefaultRecommendation('pt-pt')).toEqual(
      'someDefaultRecommendationPT'
    )
  })
  it('returns the default recommendationId', () => {
    expect(getDefaultRecommendation('es-es')).toEqual(
      'someDefaultRecommendationES'
    )
  })

  it('returns the default recommendationId', () => {
    expect(getDefaultRecommendation('en-gb')).toEqual(
      'someDefaultRecommendationGB'
    )
  })
})
