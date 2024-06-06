class Wishlist {
  constructor(sku) {
    this.type = 'wishlists'
    this.attributes = new Attributes(sku)
  }
}

class Attributes {
  constructor(sku) {
    this.name = 'wishlist'
  }
}

export class WishlistData {
  constructor(sku) {
    this.data = new Wishlist(sku)
  }
}
