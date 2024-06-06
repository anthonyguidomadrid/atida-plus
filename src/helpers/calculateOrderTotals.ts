export const shipmentPrice = 399
export const amountForFreeShipment = 4900

export const calculateOrderTotals = (
  grandTotal: number | undefined
): number | undefined => {
  return grandTotal && grandTotal < amountForFreeShipment
    ? grandTotal + shipmentPrice
    : grandTotal
}
