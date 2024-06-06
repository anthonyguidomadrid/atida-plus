import { PROVINCES } from './../isTaxRegionValidByProvinces'
import { isTaxRegionValid } from './../isTaxRegionValid'

describe(isTaxRegionValid, () => {
  describe('Canary Island zip codes', () => {
    it('Tenerife for shipping and Las Palmas for billing should match', () => {
      expect(
        isTaxRegionValid(
          { province: PROVINCES.TENERIFE, zipCode: '38329' },
          { province: PROVINCES.LAS_PALMAS, zipCode: '35013' },
          'es-es'
        )
      ).toEqual(true)
    })

    it('Madrid for shipping and Las Palmas for billing should not match', () => {
      expect(
        isTaxRegionValid(
          { province: 'Madrid', zipCode: '28015' },
          { province: PROVINCES.LAS_PALMAS, zipCode: '35013' },
          'es-es'
        )
      ).toEqual(false)
    })

    it('Ceuta for shipping and Las Palmas for billing should not match', () => {
      expect(
        isTaxRegionValid(
          { province: PROVINCES.CEUTA, zipCode: '35013' },
          { province: PROVINCES.LAS_PALMAS, zipCode: '51080' },
          'es-es'
        )
      ).toEqual(false)
    })
  })

  describe('Melilla & Ceuta zip codes', () => {
    it('Ceuta for shipping and Ceuta for billing should match', () => {
      expect(
        isTaxRegionValid(
          { province: PROVINCES.MELILLA, zipCode: '51080' },
          { province: PROVINCES.CEUTA, zipCode: '51001' },
          'es-es'
        )
      ).toEqual(true)
    })

    it('Melilla for shipping and Melilla for billing should match', () => {
      expect(
        isTaxRegionValid(
          { province: PROVINCES.MELILLA, zipCode: '52000' },
          { province: PROVINCES.MELILLA, zipCode: '52080' },
          'es-es'
        )
      ).toEqual(true)
    })

    it('Ceuta for shipping and Melilla for billing should match', () => {
      expect(
        isTaxRegionValid(
          { province: PROVINCES.CEUTA, zipCode: '51080' },
          { province: PROVINCES.MELILLA, zipCode: '52080' },
          'es-es'
        )
      ).toEqual(true)
    })

    it('Madrid for shipping and Melilla for billing should not match', () => {
      expect(
        isTaxRegionValid(
          { province: 'Madrid', zipCode: '28015' },
          { province: PROVINCES.MELILLA, zipCode: '52080' },
          'es-es'
        )
      ).toEqual(false)
    })
  })

  describe('Not special region zip codes', () => {
    it('Madrid for billing and Barcelona for shipping should match', () => {
      expect(
        isTaxRegionValid(
          { province: 'Madrid', zipCode: '28015' },
          { province: 'Barcelona', zipCode: '08001' },
          'es-es'
        )
      ).toEqual(true)
    })
  })

  describe('Other cases', () => {
    it('Madrid for billing and Barcelona for shipping should return true', () => {
      expect(
        isTaxRegionValid(
          { province: 'Madrid', zipCode: '28015' },
          { province: 'Barcelona', zipCode: '08001' },
          'es-es'
        )
      ).toEqual(true)
    })

    it('Madrid for subdivision and Barcelona for shipping should return true', () => {
      expect(
        isTaxRegionValid(
          { subdivision: 'Madrid', zipCode: '28015' },
          { province: 'Barcelona', zipCode: '08001' },
          'es-es'
        )
      ).toEqual(true)
    })

    it('Madrid for billing and Barcelona for subdivision should return true', () => {
      expect(
        isTaxRegionValid(
          { province: 'Madrid', zipCode: '28015' },
          { subdivision: 'Barcelona', zipCode: '08001' },
          'es-es'
        )
      ).toEqual(true)
    })
  })
})
