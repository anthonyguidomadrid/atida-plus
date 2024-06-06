import { calculateOrderTotals } from '../calculateOrderTotals'

describe(calculateOrderTotals, () => {
  it('returns the grandTotal when the grand Total is superior to the amountForFreeShipment', () => {
    const grandTotal = 5000
    expect(calculateOrderTotals(grandTotal)).toEqual(5000)
  })
  it('returns the grandTotal + shipmentPrice when the grand Total is inferior to the amountForFreeShipment', () => {
    const grandTotal = 3000
    expect(calculateOrderTotals(grandTotal)).toEqual(3399)
  })
})
