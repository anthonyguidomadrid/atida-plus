import { ProductItemsBuilder } from '../builder/product.items.builder'

export class ProductBuilder {
  build(arraySize, availability, quantity, unitPrice) {
    const currency = 'EUR'
    const basketId = '270c9ec5-64b1-5125-8311-48205280c350'
    let items = []
    let subtotal = 0
    for (var i = 0; i < arraySize; i++) {
      const unitProductPrice = unitPrice * (i + 1)
      let product = new ProductItemsBuilder(
        availability,
        quantity,
        unitProductPrice
      )
      items.push(product.productItem)
      subtotal += items[i].subtotal
    }
    const shippingTotal = subtotal / 100 <= 49 ? 299 : 0
    const grandTotal = subtotal + shippingTotal

    return {
      cartCoupons: [],
      coupons: [],
      currency: currency,
      grandTotal: grandTotal,
      discountTotal: 0,
      discounts: [],
      id: basketId,
      items: items,
      rrpTotal: subtotal,
      shippingTotal: shippingTotal,
      subTotal: subtotal
    }
  }
}
