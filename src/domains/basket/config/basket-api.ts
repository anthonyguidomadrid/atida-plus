export const basketApiConfig = {
  guest: {
    cartUrl: '/guest-carts',
    cartItemsType: 'guest-cart-items',
    multipleCartItemsType: 'multiple-guest-cart-items',
    cartItemsUrl: '/guest-cart-items',
    multipleCartItemsUrl: '/multiple-guest-cart-items'
  },
  authorised: {
    cartUrl: '/carts',
    cartItemsType: 'items',
    multipleCartItemsType: 'multiple-items',
    cartItemsUrl: '/items',
    multipleCartItemsUrl: '/multiple-items'
  }
} as const
