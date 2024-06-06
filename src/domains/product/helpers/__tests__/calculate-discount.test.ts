import { calculateDiscount } from '..'

describe(calculateDiscount, () => {
  it('calculates discount between 2 prices', () => {
    expect(calculateDiscount(100, 125)).toEqual(20)
  })
})
