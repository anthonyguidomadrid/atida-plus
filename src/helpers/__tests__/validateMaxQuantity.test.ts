import { validateMaxQuantity } from '~helpers/validateMaxQuantity'

describe(validateMaxQuantity, () => {
  const mockQuantity = 30
  const mockMaxQuantity = 29
  it('returns if the quantity is bigger than MAXIMUM_PRODUCT_QUANTITY if the maxQuantity is not passed', () => {
    expect(validateMaxQuantity(mockQuantity)).toBe(false)
  })
  it('returns if the quantity is bigger than maxQuantity when max Quantity is passed ', () => {
    expect(validateMaxQuantity(mockQuantity, mockMaxQuantity)).toBe(true)
  })
})
