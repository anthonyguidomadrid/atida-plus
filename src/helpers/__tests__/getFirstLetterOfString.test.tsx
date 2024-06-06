import { getFirstLetter } from '../getFirstLetterOfString'

describe(getFirstLetter, () => {
  it('returns the first letter of any word', () => {
    expect(getFirstLetter('Atida')).toEqual('A')
  })
})
