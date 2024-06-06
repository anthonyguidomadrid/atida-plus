import {
  elasticsearchProduct,
  product
} from '~domains/product/__mocks__/product'
import { BasketWithProducts, SprykerBasket } from '../types'

export const sprykerBasket: SprykerBasket = {
  data: {
    type: 'guest-carts',
    id: 'f0849e9c-6712-54b9-8db5-440438d03387',
    attributes: {
      currency: 'EUR',
      totals: {
        expenseTotal: 0,
        discountTotal: 0,
        taxTotal: 1596,
        subtotal: 9999,
        grandTotal: 9999,
        itemTotal: 648,
        surchargeTotal: 123,
        priceToPay: 9999,
        freeShippingThreshold: 5900
      },
      discounts: [],
      coupons: [],
      productDiscounts: [],
      expenses: [
        {
          type: 'SHIPMENT_EXPENSE',
          sumPriceToPayAggregation: 399,
          unitNetPrice: 0,
          unitGrossPrice: 0,
          quantity: 1
        }
      ]
    }
  },
  included: [
    {
      type: 'guest-cart-items',
      id: '100000001',
      attributes: {
        sku: '100000001',
        quantity: 1,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false,
        userDeclined: false,
        isNew: true,
        discountPercentage: 10000
      }
    },
    {
      type: 'guest-cart-items',
      id: '100000002',
      attributes: {
        sku: '100000002',
        quantity: 7,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false
      }
    },
    {
      type: 'guest-cart-items',
      id: '100000003',
      attributes: {
        sku: '100000003',
        quantity: 3,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false,
        userDeclined: false,
        isNew: true,
        discountPercentage: 10000
      }
    }
  ]
}

export const sprykerBasketWithPromotionalItem: SprykerBasket = {
  ...sprykerBasket,
  included: [
    {
      type: 'guest-cart-items',
      id: '100000001',
      attributes: {
        sku: '100000001',
        quantity: 1,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 0,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false
      }
    },
    {
      type: 'guest-cart-items',
      id: '100000002',
      attributes: {
        sku: '100000002',
        quantity: 1,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 0,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: true,
        discountPercentage: 10000
      }
    },
    {
      type: 'promotional-items',
      id: '061e3d16-53ee-5aad-872f-a1b66da30408',
      attributes: {
        sku: 'abstract-100000002',
        quantity: 1,
        discountPercentage: 10000,
        isPromo: true,
        userDeclined: false,
        isNew: false
      }
    }
  ]
}

export const sprykerBasketWithDeclinedPromotionalItem: SprykerBasket = {
  ...sprykerBasket,
  included: [
    {
      type: 'guest-cart-items',
      id: '100000001',
      attributes: {
        sku: '100000001',
        quantity: 1,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false
      }
    },
    {
      type: 'promotional-items',
      id: '061e3d16-53ee-5aad-872f-a1b66da30408',
      attributes: {
        sku: 'abstract-100000002',
        quantity: 1,
        isNew: true,
        discountPercentage: 10000,
        userDeclined: true,
        isPromo: false
      }
    }
  ]
}

export const sprykerBasketWithPromotionalItemOutofStock: SprykerBasket = {
  ...sprykerBasket,
  included: [
    {
      type: 'guest-cart-items',
      id: '100000001',
      attributes: {
        sku: '100000001',
        quantity: 1,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false
      }
    },
    {
      type: 'promotional-items',
      id: '061e3d16-53ee-5aad-872f-a1b66da30408',
      attributes: {
        sku: 'abstract-100000002',
        quantity: 0,
        isNew: true,
        discountPercentage: 10000,
        userDeclined: true,
        isPromo: false
      }
    }
  ]
}

export const sprykerBasketWithDiscountedItem = {
  ...sprykerBasket,
  included: [
    ...sprykerBasket.included,
    {
      type: 'promotional-items',
      id: '061e3d16-53ee-5aad-872f-a1b66da30408',
      attributes: {
        sku: 'abstract-100000002',
        quantity: 1,
        isNew: true,
        discountPercentage: 5000
      }
    }
  ]
}

export const authenticatedSprykerBasket = {
  data: {
    type: 'carts',
    id: 'f0849e9c-6712-54b9-8db5-440438d03387',
    attributes: {
      priceMode: 'GROSS_MODE',
      currency: 'EUR',
      store: 'PT',
      totals: {
        expenseTotal: 0,
        discountTotal: 0,
        taxTotal: 1596,
        subtotal: 9999,
        grandTotal: 9999,
        priceToPay: 9999
      },
      discounts: [],
      coupons: [],
      productDiscounts: [],
      expenses: [
        {
          type: 'SHIPMENT_EXPENSE',
          sumPriceToPayAggregation: 399,
          unitNetPrice: 0,
          unitGrossPrice: 0,
          quantity: 1
        }
      ]
    },
    links: {
      self:
        'http://glue-pt-atidaplus-spryker.my127.site/guest-carts/f0849e9c-6712-54b9-8db5-440438d03387'
    }
  },
  included: [
    {
      type: 'items',
      id: '100000001',
      attributes: {
        sku: '100000001',
        quantity: 1,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          taxRate: 19,
          unitNetPrice: 0,
          sumNetPrice: 0,
          unitGrossPrice: 9999,
          sumGrossPrice: 9999
        },
        selectedProductOptions: []
      }
    },
    {
      type: 'items',
      id: '100000002',
      attributes: {
        sku: '100000002',
        quantity: 7,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          taxRate: 19,
          unitNetPrice: 0,
          sumNetPrice: 0,
          unitGrossPrice: 9999,
          sumGrossPrice: 9999
        },
        selectedProductOptions: []
      }
    },
    {
      type: 'items',
      id: '100000003',
      attributes: {
        sku: '100000003',
        quantity: 3,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          taxRate: 19,
          unitNetPrice: 0,
          sumNetPrice: 0,
          unitGrossPrice: 9999,
          sumGrossPrice: 9999
        },
        selectedProductOptions: []
      }
    }
  ]
} as const

export const sprykerBaskets = {
  data: [
    {
      ...sprykerBasket.data,
      relationships: {
        'guest-cart-items': {
          data: [
            { type: 'guest-cart-items', id: sprykerBasket.included[0].id },
            { type: 'guest-cart-items', id: sprykerBasket.included[1].id },
            { type: 'guest-cart-items', id: sprykerBasket.included[2].id }
          ]
        }
      }
    }
  ],
  included: sprykerBasket.included
}

export const authenticatedSprykerBaskets = {
  data: [
    {
      ...authenticatedSprykerBasket.data,
      relationships: {
        items: {
          data: [
            { type: 'items', id: sprykerBasket.included[0].id },
            { type: 'items', id: sprykerBasket.included[1].id },
            { type: 'items', id: sprykerBasket.included[2].id }
          ]
        }
      }
    }
  ],
  included: sprykerBasket.included
}

export const basket = {
  id: sprykerBasket.data.id,
  cartCoupons: [],
  coupons: [],
  discounts: [],
  expenses: [
    {
      type: 'SHIPMENT_EXPENSE',
      sumPriceToPayAggregation: 399,
      unitNetPrice: 0,
      unitGrossPrice: 0,
      quantity: 1
    }
  ],
  currency: 'EUR',
  discountTotal: 0,
  grandTotal: 9999,
  itemTotal: 648,
  rrpTotal: 9999,
  shippingTotal: 399,
  surchargeTotal: 123,
  freeShippingThreshold: 5900,
  subTotal: 9999,
  taxTotal: 1596,
  items: [
    {
      id: '100000001',
      quantity: 1,
      sku: '100000001',
      subtotal: 9999,
      unitPrice: 9999,
      tax: 150,
      discount: 999,
      unitPriceToPayAggregation: 9849,
      isPromo: false
    },
    {
      id: '100000002',
      quantity: 7,
      sku: '100000002',
      subtotal: 9999,
      unitPrice: 9999,
      tax: 150,
      discount: 999,
      unitPriceToPayAggregation: 9849,
      isPromo: false
    },
    {
      id: '100000003',
      quantity: 3,
      sku: '100000003',
      subtotal: 9999,
      unitPrice: 9999,
      tax: 150,
      discount: 999,
      unitPriceToPayAggregation: 9849,
      isPromo: false
    }
  ],
  promotionalItems: [],
  discountedItems: []
}

export const basketWithPromotionalItem = {
  id: sprykerBasket.data.id,
  cartCoupons: [],
  coupons: [],
  discounts: [],
  expenses: [
    {
      type: 'SHIPMENT_EXPENSE',
      sumPriceToPayAggregation: 399,
      unitNetPrice: 0,
      unitGrossPrice: 0,
      quantity: 1
    }
  ],
  currency: 'EUR',
  discountTotal: 0,
  grandTotal: 9999,
  itemTotal: 648,
  rrpTotal: 9999,
  shippingTotal: 399,
  subTotal: 9999,
  surchargeTotal: 123,
  taxTotal: 1596,
  freeShippingThreshold: 5900,
  items: [
    {
      id: '100000001',
      quantity: 1,
      sku: '100000001',
      subtotal: 9999,
      unitPrice: 9999,
      tax: 0,
      discount: 999,
      isPromo: false,
      unitPriceToPayAggregation: 9849
    },
    {
      id: '100000002',
      isPromo: true,
      quantity: 1,
      sku: '100000002',
      subtotal: 9999,
      unitPrice: 9999,
      tax: 0,
      discount: 999,
      unitPriceToPayAggregation: 9849
    }
  ],
  promotionalItems: [
    {
      sku: '100000002',
      quantity: 1,
      id_promotional_item: '061e3d16-53ee-5aad-872f-a1b66da30408',
      is_promo: true,
      discountPercentage: 10000,
      isNew: false,
      userDeclined: false
    }
  ],
  discountedItems: []
}

export const basketWithDiscountedItem = {
  ...basket,
  discountedItems: [
    {
      sku: '100000002',
      quantity: 1,
      id_promotional_item: '061e3d16-53ee-5aad-872f-a1b66da30408',
      is_promo: true,
      discountPercentage: 5000,
      isNew: true
    }
  ]
}

export const basketWithProducts: BasketWithProducts = {
  ...basket,
  items: [
    {
      ...basket.items[0],
      id: '100000001',
      url: '/example/100000001',
      isPromo: false,
      product: {
        ...product,
        name: 'Test Product 1',
        sku: undefined,
        price: undefined,
        tax: 200
      }
    },
    {
      ...basket.items[1],
      id: '100000002',
      url: '/example/100000002',
      isPromo: false,
      product: {
        ...product,
        name: 'Test Product 2',
        sku: undefined,
        price: undefined,
        tax: 200
      }
    },
    {
      ...basket.items[2],
      id: '100000003',
      url: '/example/100000003',
      isPromo: false,
      product: {
        ...product,
        name: 'Test Product 3',
        sku: undefined,
        price: undefined,
        tax: 200
      }
    }
  ]
}

export const basketWithProductsAndCoupons: BasketWithProducts = {
  ...basket,
  items: [
    {
      ...basket.items[0],
      url: '/example/100000001',
      product: {
        ...product,
        name: 'Test Product 1',
        sku: undefined,
        price: undefined
      }
    },
    {
      ...basket.items[1],
      url: '/example/100000002',
      product: {
        ...product,
        name: 'Test Product 2',
        sku: undefined,
        price: undefined
      }
    },
    {
      ...basket.items[2],
      url: '/example/100000003',
      product: {
        ...product,
        name: 'Test Product 3',
        sku: undefined,
        price: undefined
      }
    }
  ],
  coupons: [
    {
      displayName: '20 percent OFF all products',
      amount: 1290,
      code: 'total-20-percent-off'
    }
  ]
}

export const basketWithProductsResponse: BasketWithProducts = {
  ...basket,
  items: [
    {
      quantity: 3,
      sku: '100000001',
      subtotal: 9999,
      unitPrice: 9999,
      product: {
        ...product,
        name: 'Test Product 1',
        sku: undefined,
        price: undefined
      }
    },
    {
      quantity: 4,
      sku: '100000002',
      subtotal: 9999,
      unitPrice: 9999,
      product: {
        ...product,
        name: 'Test Product 2',
        sku: undefined,
        price: undefined
      }
    },
    {
      ...basket.items[2],
      product: {
        ...product,
        name: 'Test Product 3',
        sku: undefined,
        price: undefined
      }
    }
  ]
}

export const basketWithProductsAndPromotionalItemResponse: BasketWithProducts = {
  ...basket,
  items: [
    {
      quantity: 3,
      sku: '100000001',
      subtotal: 9999,
      unitPrice: 9999,
      hasPromotionalItemOnQuantityChange: true,
      product: {
        ...product,
        name: 'Test Product 1',
        sku: undefined,
        price: undefined
      }
    },
    {
      quantity: 1,
      sku: '100000002',
      subtotal: 9999,
      unitPrice: 9999,
      product: {
        ...product,
        name: 'Test Product 2',
        sku: undefined,
        price: undefined
      }
    }
  ]
}

export const elasticsearchProducts = {
  body: {
    docs: [
      {
        _id: '100000001',
        _source: {
          ...elasticsearchProduct.body._source,
          name: 'Test Product 1'
        },
        found: true
      },
      {
        _id: '100000002',
        _source: {
          ...elasticsearchProduct.body._source,
          name: 'Test Product 2'
        },
        found: true
      },
      {
        _id: '100000003',
        _source: {
          ...elasticsearchProduct.body._source,
          name: 'Test Product 3'
        },
        found: true
      },
      {
        _id: '100000004',
        _source: {
          ...elasticsearchProduct.body._source,
          name: 'Test Product 4'
        },
        found: true
      }
    ]
  }
}

export const sprykerBasketWithPriceChannel: SprykerBasket = {
  data: {
    type: 'guest-carts',
    id: 'f0849e9c-6712-54b9-8db5-440438d03387',
    attributes: {
      currency: 'EUR',
      totals: {
        expenseTotal: 0,
        discountTotal: 0,
        taxTotal: 1596,
        subtotal: 9999,
        grandTotal: 9999,
        itemTotal: 648,
        surchargeTotal: 123,
        priceToPay: 9999,
        freeShippingThreshold: 5900
      },
      discounts: [],
      coupons: [],
      productDiscounts: [],
      expenses: [
        {
          type: 'SHIPMENT_EXPENSE',
          sumPriceToPayAggregation: 399,
          unitNetPrice: 0,
          unitGrossPrice: 0,
          quantity: 1
        }
      ]
    }
  },
  included: [
    {
      type: 'guest-cart-items',
      id: '100000001',
      attributes: {
        sku: '100000001',
        quantity: 1,
        price_channel: 'some-channel',
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false,
        userDeclined: false,
        isNew: true,
        discountPercentage: 10000
      }
    },
    {
      type: 'guest-cart-items',
      id: '100000002',
      attributes: {
        sku: '100000002',
        quantity: 7,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false
      }
    },
    {
      type: 'guest-cart-items',
      id: '100000003',
      attributes: {
        sku: '100000003',
        quantity: 3,
        calculations: {
          unitPrice: 9999,
          sumPrice: 9999,
          unitTaxAmountFullAggregation: 150,
          unitDiscountAmountAggregation: 999,
          unitPriceToPayAggregation: 9849
        },
        isPromo: false,
        userDeclined: false,
        isNew: true,
        discountPercentage: 10000
      }
    }
  ]
}
