import { calculatePricePerUnit } from '..'

const locale = 'en-gb'
const price = {
  currency: 'EUR',
  sale: 899,
  rrp: 1299
}

describe(calculatePricePerUnit, () => {
  const setupPPU = (
    contentSize: { unit: string; amount: number; unit_label: string },
    contentSizeFactor = 1
  ) => calculatePricePerUnit({ price, locale, contentSize, contentSizeFactor })

  const expectedValueCommon = {
    value: 0,
    currency: 'EUR',
    unit: ''
  }

  describe('outputs valid price per unit object', () => {
    it('calculates for 0.50 kg', async () => {
      const contentSize = { unit: 'kilogram', amount: 0.5, unit_label: 'kg' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1798,
        unit: '1 kg'
      })
    })

    it('calculates for 670 g', async () => {
      const contentSize = { unit: 'gram', amount: 670, unit_label: 'g' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1341.7910447761194,
        unit: '1 kg'
      })
    })

    it('calculates for 0.1 kg', async () => {
      const contentSize = { unit: 'KILOGRAM', amount: 0.1, unit_label: 'kg' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 899,
        unit: '100 g'
      })
    })

    it('calculates for 150 g', async () => {
      const contentSize = { unit: 'GRAM', amount: 150, unit_label: 'g' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 599.3333333333334,
        unit: '100 g'
      })
    })

    it('calculates for 0.5 l', async () => {
      const contentSize = { unit: 'LITER', amount: 0.5, unit_label: 'l' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1798,
        unit: '1 l'
      })
    })

    it('calculates for 750 ml', async () => {
      const contentSize = { unit: 'milliliter', amount: 750, unit_label: 'ml' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1198.6666666666667,
        unit: '1 l'
      })
    })

    it('calculates for 0.1 l', async () => {
      const contentSize = { unit: 'liter', amount: 0.1, unit_label: 'l' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 899,
        unit: '100 ml'
      })
    })

    it('calculates for 150 ml', async () => {
      const contentSize = { unit: 'MILLILITER', amount: 150, unit_label: 'ml' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 599.3333333333334,
        unit: '100 ml'
      })
    })

    it('calculates for 1.3 m', async () => {
      const contentSize = { unit: 'meter', amount: 1.3, unit_label: 'm' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 691.5384615384615,
        unit: '1 m'
      })
    })

    it('calculates for 70 cm', async () => {
      const contentSize = { unit: 'CENTIMETER', amount: 70, unit_label: 'cm' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1284.2857142857144,
        unit: '1 m'
      })
    })

    it('calculates for 380 mm', async () => {
      const contentSize = { unit: 'millimeter', amount: 380, unit_label: 'ml' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 2365.7894736842104,
        unit: '1 m'
      })
    })

    it('calculates for 0.17 m', async () => {
      const contentSize = { unit: 'METER', amount: 0.17, unit_label: 'm' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 528.8235294117646,
        unit: '100 mm'
      })
    })

    it('calculates for 7 cm', async () => {
      const contentSize = { unit: 'centimeter', amount: 7, unit_label: 'cm' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1284.2857142857142,
        unit: '100 mm'
      })
    })

    it('calculates for 50 mm', async () => {
      const contentSize = { unit: 'millimeter', amount: 50, unit_label: 'ml' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 1798,
        unit: '100 mm'
      })
    })

    it('calculates PIECE unit', async () => {
      const contentSize = { unit: 'PIECE', amount: 3, unit_label: 'uns' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        value: 299.6666666666667,
        unit: '1 piece'
      })
    })

    it('calculate contentSizeFactor', async () => {
      const contentSizeFactor = 10
      const contentSize = { unit: 'kilogram', amount: 0.5, unit_label: 'kg' }

      expect(setupPPU(contentSize, contentSizeFactor)).toEqual({
        ...expectedValueCommon,
        value: 179.8,
        unit: '1 kg'
      })
    })

    it('does not fail if contentSizeFactor is undefined', () => {
      const contentSizeFactor = undefined
      const contentSize = { unit: 'kilogram', amount: 0.5, unit_label: 'kg' }

      expect(setupPPU(contentSize, contentSizeFactor)).toEqual({
        ...expectedValueCommon,
        value: 1798,
        unit: '1 kg'
      })
    })
  })

  describe('outputs no unit for bad data', () => {
    it('7 g < 10 g', async () => {
      const contentSize = { unit: 'gram', amount: 7, unit_label: 'g' }

      expect(setupPPU(contentSize)).toEqual({
        ...expectedValueCommon,
        unit: ''
      })
    })

    it('3 ml < 10 ml', async () => {
      const contentSize = { unit: 'milliliter', amount: 3, unit_label: 'ml' }

      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })

    it('1 mm < 10 mm', async () => {
      const contentSize = { unit: 'MILLIMETER', amount: 1, unit_label: 'ml' }

      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })

    it('0.0001 kg < 0.01 kg', async () => {
      const contentSize = { unit: 'kilogram', amount: 0.0001, unit_label: 'kg' }

      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })

    it('0.005 l < 0.01 l', async () => {
      const contentSize = { unit: 'LITER', amount: 0.005, unit_label: 'l' }

      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })

    it('0.001 m < 0.01 m', async () => {
      const contentSize = { unit: 'meter', amount: 0.001, unit_label: 'm' }

      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })

    it('no amount given', async () => {
      const contentSize = { unit: 'liter' }

      // @ts-ignore
      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })

    it('amount = -10 <= 0', async () => {
      const contentSize = { unit: 'liter', amount: -10, unit_label: 'l' }

      expect(setupPPU(contentSize)).toEqual(expectedValueCommon)
    })
  })
})
