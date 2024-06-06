class Favourites {
  constructor(sku) {
    this.type = 'add-to-wishlist'
    this.attributes = new Attributes(sku)
  }
}

class Attributes {
  constructor(sku) {
    this.items = [new Items(sku)]
  }
}

class Items {
  constructor(sku) {
    this.sku = sku
  }
}

export class FavouritesData {
  constructor(sku) {
    this.data = new Favourites(sku)
  }
}
