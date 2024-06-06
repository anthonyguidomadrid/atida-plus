export const calculateDiscount = (salePrice: number, rrp: number): number =>
  Math.floor(((rrp - salePrice) / rrp) * 100)
