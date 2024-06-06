import { isTaxRegionValidByZipcodes } from '../isTaxRegionValidByZipcodes'

describe(isTaxRegionValidByZipcodes, () => {
  describe('Canary Island zip codes', () => {
    it('Tenerife for shipping and Las Palmas for billing should match', () => {
      expect(isTaxRegionValidByZipcodes('38329', '35013')).toEqual(true)
    })

    it('Madrid for shipping and Las Palmas for billing should not match', () => {
      expect(isTaxRegionValidByZipcodes('28015', '35013')).toEqual(false)
    })

    it('Ceuta for shipping and Las Palmas for billing should not match', () => {
      expect(isTaxRegionValidByZipcodes('35013', '51080')).toEqual(false)
    })
  })

  describe('Melilla & Ceuta zip codes', () => {
    it('Ceuta for shipping and Ceuta for billing should match', () => {
      expect(isTaxRegionValidByZipcodes('51080', '51001')).toEqual(true)
    })

    it('Melilla for shipping and Melilla for billing should match', () => {
      expect(isTaxRegionValidByZipcodes('52000', '52080')).toEqual(true)
    })

    it('Ceuta for shipping and Melilla for billing should match', () => {
      expect(isTaxRegionValidByZipcodes('51080', '52080')).toEqual(true)
    })

    it('Madrid for shipping and Melilla for billing should not match', () => {
      expect(isTaxRegionValidByZipcodes('28015', '52080')).toEqual(false)
    })
  })

  describe('Not special region zip codes', () => {
    it('Madrid for billing and Barcelona for shipping should match', () => {
      expect(isTaxRegionValidByZipcodes('28015', '08001')).toEqual(true)
    })
  })
})
