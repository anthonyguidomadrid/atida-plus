import {
  isTaxRegionValidByProvinces,
  PROVINCES
} from '../isTaxRegionValidByProvinces'

describe(isTaxRegionValidByProvinces, () => {
  describe('Canary Island zip codes', () => {
    it('Tenerife for shipping and Las Palmas for billing should match', () => {
      expect(
        isTaxRegionValidByProvinces(PROVINCES.TENERIFE, PROVINCES.LAS_PALMAS)
      ).toEqual(true)
    })

    it('Madrid for shipping and Las Palmas for billing should not match', () => {
      expect(
        isTaxRegionValidByProvinces('Madrid', PROVINCES.LAS_PALMAS)
      ).toEqual(false)
    })

    it('Ceuta for shipping and Las Palmas for billing should not match', () => {
      expect(
        isTaxRegionValidByProvinces(PROVINCES.CEUTA, PROVINCES.LAS_PALMAS)
      ).toEqual(false)
    })
  })

  describe('Melilla & Ceuta zip codes', () => {
    it('Ceuta for shipping and Ceuta for billing should match', () => {
      expect(
        isTaxRegionValidByProvinces(PROVINCES.CEUTA, PROVINCES.CEUTA)
      ).toEqual(true)
    })

    it('Melilla for shipping and Melilla for billing should match', () => {
      expect(
        isTaxRegionValidByProvinces(PROVINCES.MELILLA, PROVINCES.MELILLA)
      ).toEqual(true)
    })

    it('Ceuta for shipping and Melilla for billing should match', () => {
      expect(
        isTaxRegionValidByProvinces(PROVINCES.CEUTA, PROVINCES.MELILLA)
      ).toEqual(true)
    })

    it('Madrid for shipping and Melilla for billing should not match', () => {
      expect(isTaxRegionValidByProvinces('Madrid', PROVINCES.MELILLA)).toEqual(
        false
      )
    })
  })

  describe('Not special region zip codes', () => {
    it('Madrid for billing and Barcelona for shipping should match', () => {
      expect(isTaxRegionValidByProvinces('Madrid', 'Barcelona')).toEqual(true)
    })
  })
})
