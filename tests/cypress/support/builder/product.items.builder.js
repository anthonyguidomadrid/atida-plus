const faker = require('faker')

export class ProductItemsBuilder {
  constructor(availability, quantity, unitPrice) {
    this.availability = availability
    this.quantity = quantity
    this.unitPrice = unitPrice
    const imageUrl = 'https://via.placeholder.com/400'
    const productName = `Automation Test Product ${Date.now()}`
    const sku = faker.datatype.number({ min: 100000000, max: 900000000 })
    const subTotal = this.unitPrice * this.quantity

    this.productItem = {
      product: {
        image: imageUrl,
        name: productName,
        availability: this.availability,
        brand: { code: 'a_vogel', label: 'A.Vogel' },
        format: { code: 'cream', label: 'Creme' },
        thumbnailImage: imageUrl
      },
      sku: sku,
      id: sku,
      subtotal: subTotal,
      unitPrice: this.unitPrice,
      quantity: this.quantity
    }
  }

  build() {
    return this.productItem
  }
}
