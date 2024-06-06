import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'

describe(formatContentSizeFactor, () => {
  it('adds contentSizeFactor if passed', () => {
    const unitVolume = '10 g'
    const contentSizeFactor = 10
    expect(formatContentSizeFactor(unitVolume, contentSizeFactor)).toEqual(
      '10x10 g'
    )
  })

  it('returns only unitVolume if contentSizeFactor = undefined', () => {
    const unitVolume = '10 g'
    const contentSizeFactor = undefined
    expect(formatContentSizeFactor(unitVolume, contentSizeFactor)).toEqual(
      '10 g'
    )
  })
})
