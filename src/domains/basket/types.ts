import { Product } from '~domains/product'

export type BasketApiConfig = {
  cartUrl: string
  cartItemsType: 'guest-cart-items' | 'items'
  multipleCartItemsType: 'multiple-guest-cart-items' | 'multiple-items'
  cartItemsUrl: string
  multipleCartItemsUrl: '/multiple-guest-cart-items' | '/multiple-items'
}

export type AddToBasketItem = {
  sku?: string
  quantity: number
  id_promotional_item?: string
  added_from?: string
  price_channel?: string
}

export type AddSeveralToBasketItem = {
  skus?: string[]
  quantity: number
  id_promotional_item?: string
  added_from?: string
}

export type RemoveBasketItem = {
  id?: string
  sku?: string
  removed_from?: string
}

export type ChangeItemQuantity = AddToBasketItem & {
  id?: string
  changed_from?: string
}

export type SprykerBasketItem = {
  type: 'guest-cart-items' | 'items' | 'promotional-items'
  id: string
  attributes: {
    price_channel?: string
    sku: string
    quantity: number
    calculations?: {
      unitPrice: number
      unitTaxAmountFullAggregation?: number
      sumPrice: number
      unitDiscountAmountAggregation: number
      unitPriceToPayAggregation: number
    }
    isPromo: boolean
    userDeclined?: boolean
    isNew?: boolean
    discountPercentage?: number
    isFullyDiscounted?: boolean
    isPrescription?: boolean
    tokenCount?: number
  }
}

export type DeliveryDays = {
  minDeliveryDays: number
  maxDeliveryDays: number
}

export type SprykerBasket = {
  data: {
    type: 'guest-carts' | 'carts'
    id: string
    attributes: {
      currency: string
      totals: {
        expenseTotal: number
        discountTotal: number
        taxTotal: number
        subtotal: number
        grandTotal: number
        itemTotal?: number
        priceToPay: number
        surchargeTotal: number
        freeShippingThreshold: number
        rrpDiscountTotal?: number
        totalSaving?: number
        rewardTotal?: number
      }
      coupons?: BasketCoupon[]
      discounts?: BasketDiscounts[]
      productDiscounts?: ProductDiscount[]
      expenses?: BasketExpense[]
      deliveryDays?: DeliveryDays
    }
  }
  included: SprykerBasketItem[]
}

export type ProductDiscount = {
  displayName: string
  amount: number
  code: string
  discountKey: string
}

export type BasketExpense = {
  type: string
  unitNetPrice: number
  unitGrossPrice: number
  quantity: number
  sumPriceToPayAggregation: number
  sumDiscountAmountAggregation?: number
}

export type SprykerBaskets = {
  data: (SprykerBasket['data'] & {
    relationships: {
      'guest-cart-items': { data: { type: string; id: string }[] }
      items: { data: { type: string; id: string }[] }
    }
  })[]
  included: SprykerBasket['included']
}

export type BasketItem = {
  id?: string
  sku?: string
  quantity?: number
  unitPrice?: number
  subtotal?: number
  category?: string
  tax?: number
  brand?: string
  image_url?: string
  name?: string
  position?: number
  price?: number
  product_id?: string
  url?: string
  product?: {
    category?: {
      [key: string]: string[]
    }
  }
  currency?: string
  brand_code?: string
  rrp_price?: number
  isPromo?: boolean
  isNew?: boolean
  hasPromotionalItem?: boolean
  hasPromotionalItemOutofStock?: boolean
  gift?: { sku?: string; quantity?: number }
  hasPromotionalItemOnQuantityChange?: boolean
  isFullyDiscounted?: boolean
  unitPriceToPayAggregation?: number
  family?: string
  notForSaleType?: string
  isOnDemand?: boolean
  isPrescription?: boolean
}

export type BasketCoupon = {
  displayName?: string
  amount?: number
  code?: string
}

export type BasketDiscounts = {
  displayName?: string
  amount: number
  code?: string
  discountKey?: string
}

export type Basket = {
  id?: string
  currency?: string
  items?: BasketItem[]
  rrpTotal?: number
  subTotal?: number
  shippingTotal?: number
  grandTotal?: number
  itemTotal?: number
  discountTotal?: number
  taxTotal?: number
  surchargeTotal?: number
  rrpDiscountTotal?: number
  totalSaving?: number
  rewardTotal?: number
  freeShippingThreshold?: number
  discounts?: BasketDiscounts[]
  coupons?: BasketCoupon[]
  productDiscounts?: ProductDiscount[]
  expenses?: BasketExpense[]
  cartCoupons?: BasketCoupon[]
  promotionalItems?: PromotionalItem[]
  discountedItems?: DiscountedItem[]
  hasPromotionalItemOutOfStock?: boolean
  anonymousId?: string
  deliveryDays?: DeliveryDays
  isPrescription?: boolean
  tokenCount?: number
  priceChannel?: SessionChannelType
}

export type ItemQuantityErrorDetails = {
  error: string | string[]
  not_available_items?: [
    {
      sku: string
      available_qty: number
    }
  ]
}

export type BasketWithProducts = Omit<Basket, 'items'> & {
  items: (BasketItem & { product: Omit<Partial<Product>, 'sku' | 'price'> })[]
}

export type AddToBasketPayload = AddToBasketItem
export type AddSeveralToBasketPayload = AddSeveralToBasketItem
export type AddToBasketSuccessPayload = AddToBasketItem & {
  data: BasketWithProducts
}
export type AddToBasketFailurePayload = AddToBasketItem & {
  message: string
}

export type RemoveFromBasketPayload = RemoveBasketItem
export type RemoveFromBasketSuccessPayload = RemoveBasketItem & {
  data: BasketWithProducts | Basket
}
export type RemoveFromBasketFailurePayload = RemoveBasketItem & {
  message: string
}

export type ChangeItemQuantityPayload = ChangeItemQuantity
export type ChangeItemQuantitySuccessPayload = ChangeItemQuantity & {
  data: BasketWithProducts | Basket
}
export type ChangeItemQuantityFailurePayload = ChangeItemQuantity & {
  message: string
  details?: ItemQuantityErrorDetails
}

export type PromotionalItem = {
  id_promotional_item?: string
  sku?: string
  quantity: number
  userDeclined?: boolean
  isNew?: boolean
  discountPercentage?: number
}

export type DiscountedItem = PromotionalItem

export type SessionChannelType = {
  sku: string
  channel: string
}
