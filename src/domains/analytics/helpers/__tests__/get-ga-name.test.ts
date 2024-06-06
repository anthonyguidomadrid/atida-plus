import { getGAName } from '../get-ga-name'

describe(getGAName, () => {
  it('returns the expected value', () => {
    expect(getGAName()).toEqual('_ga')
  })
})
