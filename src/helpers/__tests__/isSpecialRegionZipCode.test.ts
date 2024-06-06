import { isSpecialRegionZipCode } from '~helpers/isTaxRegionValidByZipcodes'

describe(isSpecialRegionZipCode, () => {
  describe('Special region zip codes', () => {
    it('should return true with special region zip code', () => {
      expect(isSpecialRegionZipCode('38329')).toEqual(true)
      expect(isSpecialRegionZipCode('51080')).toEqual(true)
      expect(isSpecialRegionZipCode('35013')).toEqual(true)
      expect(isSpecialRegionZipCode('52000')).toEqual(true)
    })

    it('should return false with non-special region zip code', () => {
      expect(isSpecialRegionZipCode('01001')).toEqual(false)
    })
  })
})
