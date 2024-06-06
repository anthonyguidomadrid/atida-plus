import { OrderDetailsItemDiscounts } from '~domains/account'
import {
  BasketCoupon,
  BasketExpense,
  BasketWithProducts,
  ProductDiscount,
  SprykerBasket,
  SprykerBasketItem
} from '~domains/basket/types'
import { Product } from '~domains/product'
import { ThreeDSecureVerifyPayload } from 'braintree-web/modules/three-d-secure'
import { SHIPMENT_STATUSES } from '~config/constants/shipment-status'
import { PAYMENT_OPTIONS } from '~config/constants/payments'

export type SprykerIncludedBasket = SprykerBasket['data'] & {
  relationships: {
    items: {
      type: 'items'
      id: string
    }[]
  }
}

export type SprykerIncludedShipmentMethod = {
  type: 'shipment-methods'
  id: string
  attributes: {
    name: string
    carrierName: string
    deliveryTime: null
    price: number
    currencyIsoCode: string
    maxDeliveryDays: number
    minDeliveryDays: number
  }
}

export type SprykerIncludedPaymentMethod = {
  type: 'payment-methods'
  id: string
  attributes: {
    paymentMethodName: string
    paymentProviderName: string
    priority: null
    requiredRequestData: string[]
    availableAmount: number
  }
}

export type SprykerIncludedCarts = {
  type: 'carts'
  id: string
  attributes: {
    priceMode: string
    currency: string
    store: string
    taxReference: string
    totals: Totals
    shippingAddress: Address & {
      isTaxExempt: boolean
    }
    discounts: ProductDiscount[]
    expenses: BasketExpense[]
    payments: Payment[]
  }
}

export type SprykerCheckoutData = {
  data: {
    type: 'checkout-data'
    id: string
    attributes: {
      idCart: string
      orderReference: string
      taxReference: string | undefined
      lastUsedPaymentCode: string
      selectedShipmentMethods: {
        id: number
        name: string
        carrierName: string
        price: number
        taxRate: null
        deliveryTime: null
        currencyIsoCode: string
      }[]
      addresses: Address[]
      paymentProviders: unknown[]
      shipmentMethods: unknown[]
      selectedPaymentMethods: unknown[]
    }
    relationships?: {
      'shipment-methods': {
        data: {
          type: 'shipment-methods'
          id: string
        }[]
      }
      'payment-methods': {
        data: {
          type: 'payment-methods'
          id: string
          attributes: {
            paymentMethodName: string
            paymentProviderName: string
            priority: null
            requiredRequestData: string[]
            availableAmount: number
          }
        }[]
      }
    }
  }
  included: (
    | SprykerBasketItem
    | SprykerIncludedBasket
    | SprykerIncludedShipmentMethod
    | SprykerIncludedPaymentMethod
    | SprykerIncludedCarts
  )[]
}

export type SprykerCheckout = {
  data: {
    type: 'checkout'
    id: null
    attributes: {
      orderReference: string
      selectedShipmentMethods: ShipmentMethods[]
      billingAddress: Address[]
      deliveryAddress: Address[]
      payments: PaymentData[]
      taxReference: string
    }
  }
  included?: {
    attributes?: {
      payments: Payment[]
      items: GetOrderResponseItem[]
      expenses: Omit<
        BasketExpense,
        'quantity' | 'sumDiscountAmountAggregation'
      >[]
    }
  }[]
}

export type CustomerSalutation = 'Mr' | 'Mrs' | 'Dr' | 'Ms'

export type Customer = {
  email: string
  salutation: CustomerSalutation
  firstName: string
  lastName: string
  invoiceRequired: boolean
}

export type Address = {
  id?: string | undefined
  salutation: CustomerSalutation
  firstName: string
  middleName: string | null
  lastName: string
  address1: string
  address2: string | null
  address3: string | null
  houseNumber?: string | undefined
  addition?: string | undefined
  company: string | null
  city: string
  province?: string
  district?: string
  zipCode: string
  poBox: string | number | null
  phone: string
  cellPhone: string | null
  description: string | null
  comment: string | null
  email: string | null
  country: string
  iso2Code: string
  isDefaultShipping: boolean
  isDefaultBilling: boolean
  pickingStationId?: string
  isAddressSavingSkipped?: boolean
  pickingStationName?: string
}

export type PaymentData = {
  paymentMethodName: string
  paymentProviderName: string
  paymentSelection: string
}

export type MondialAddress = {
  Address1: string
  Address2: string | null
  Postcode: string
  HoursHtmlTable?: string
  id: string
  Lat: string
  Long: string
  Name: string
  Country: string
  Photo?: null
  City: string
}

// TODO: why are these 2 similar but different structures for this?
export type Payment = {
  amount?: number
  // ???
  paymentMethod?: string
  paymentProvider?: string
  paymentReference?: string

  // multibanco/braintree call
  paymentSelection?: string
  paymentMethodName?: string
  paymentProviderName?: string
}

export type CheckoutData = Partial<{
  cartId?: string
  orderId: string
  basketId: string
  customer: Partial<Customer>
  billingAddress: Address
  deliveryAddress: Address
  isBillingSameAsShipping?: boolean
  deliveryMethod: string
  shipmentMethods: ShipmentMethods[]
  paymentMethods: PaymentMethods[]
  payments?: Payment[]
  items?: GetOrderResponseItem[]
  expenses?: Omit<BasketExpense, 'quantity' | 'sumDiscountAmountAggregation'>[]
  basket: BasketWithProducts
  maxDeliveryDays: number
  minDeliveryDays: number
  initialIdShipmentMethod: number
  taxReference: string
  isTaxExempt: boolean
  lastUsedPaymentCode: string
  atidaCashUsed: number
  internalPaymentReference?: string
  loyaltyPaymentReference?: string
  shouldSetLoading?: boolean
  isDelivery?: boolean
}>

export type ShipmentMethods = {
  id: string
  type: string
  attributes: ShipmentMethod
}

export type ShipmentMethod = {
  name: string
  carrierName: string
  price: number
  deliveryTime: null
  currencyIsoCode: string
}

export type PaymentMethods = {
  id: string
  type: string
  attributes: PaymentMethod
}

export type PaymentMethod = {
  paymentMethodName: string
  paymentProviderName: string
  priority: null
  requiredRequestData: string[]
  availableAmount: number
}

export type SetCheckoutDataPayload = CheckoutData & {
  atidaCash?: number
}

export type AccessToken = {
  accessToken: string
}

export type ClientTokenData = {
  client_token: string
}
export type ClientToken = {
  clientToken?: string
}

export type Stepper = {
  activeStep: number
  reachedStep: number
  guestStep: number
  reachedGuestStep: number
  isPaymentStepActive: boolean
}

export type SelectedPaymentMethod = {
  selectedPaymentMethod: string
  isValid: boolean
  isPaymentPending: boolean
}

export type PaymentLoad = {
  method_code: string
  data: {
    payment_nonce: string
    amount: number
    order_id: string
  }
  customer: CustomerData
}

export type MethodRef = {
  methodRef?: string
}

export type MethodRefData = {
  method_ref: string
}

export type CreatePaymentData = {
  methodRef?: string
  methodCode?: string
}

export type BraintreeCardOrPaypalData = {
  method_ref?: string
}

export type SprykerOrderPayment = {
  data: {
    type: 'order-payments'
    attributes: {
      paymentIdentifier: string
      dataPayload: {
        payment_token: string
        method_code: string
      }
    }
  }
}

export type SetOrderPaymentDataPayload = SprykerOrderPayment

export type SprykerOrderPaymentData = {
  data: {
    type: string
    id: string
    attributes: {
      paymentIdentifier: string
      dataPayload: [
        {
          type?: string
          hash?: string
        }
      ]
    }
    links: {
      self: string
    }
  }
  links: {
    self: string
  }
}

export type OrderPaymentData = {
  paymentIdentifier?: string
}

export type StripeMultibancoPaymentData = {
  amount: number
  paymentReference: string
  orderId: string
  returnUrl: string
  customer: CustomerData
}

export type StripeMultibancoResponseData = {
  internal_ref: string
  redirect_url: string
}
export type SIBSMultibancoPaymentData = {
  amount: number
  orderId: string
  customer: CustomerData
}

export type SIBSMultibancoResponseData = {
  internal_ref: string
  payment_reference: string
  payment_entity: string
  amount: number
  expire_at: string
}

export type GetOrderItem = {
  product?: Product
  quantity?: number
  sku?: string | number
  subtotal?: number
  unitPrice?: number
}

export type PayloadProducts = {
  product_id?: string | number
  sku?: string | number
  category?: string
  name?: string
  brand?: string
  variant?: string
  price?: number
  quantity?: number
  coupons?: BasketCoupon[]
  position?: number
  url?: string
  image_url?: string
  objectID?: string | number
}

export type DoGetOrderPayload = {
  orderId?: string
}

export type CancelOrderPayload = {
  orderId?: string
}

type CalculatedExpense = {
  unitAmount?: number
  sumAmount?: number
  displayName?: string
  description?: string
  voucherCode?: string
  quantity?: number
  discountKey?: string
}

type Totals = {
  expenseTotal?: number
  discountTotal?: number
  taxTotal?: number
  subtotal?: number
  surchargeTotal?: number
  grandTotal?: number
  canceledTotal?: number
  remunerationTotal?: number
  rewardTotal?: number
  loyaltySpent?: number
  amountPaidByRealPayment?: number
}

export type Shipment = {
  shipmentMethodName?: string
  carrierName?: string
  deliveryTime?: number | null
  defaultGrossPrice?: number | null
  defaultNetPrice?: number | null
  currencyIsoCode?: string
  shipmentStatus?: string | null
  estimatedDeliveryDate?: number | null
  erpShipmentStatus?: typeof SHIPMENT_STATUSES[number] | null
  erpTrackingUrl?: string | null
  erpTrackingReference?: string | null
  trackingLink?: string | null
  maxDeliveryDays?: number
  minDeliveryDays?: number
}

export type GetOrderResponseItem = {
  name?: string
  sku?: string
  quantity?: number
  unitGrossPrice?: number
  sumGrossPrice?: number
  taxRate?: string | number
  unitTaxAmountFullAggregation?: number
  unitPrice?: number
  orderReference?: string | null
  uuid?: string
  metadata?: { image: string }
  urlSlug?: string
  categoryList?: string
  brand?: string
  brandCode?: string
  calculatedDiscounts?: OrderDetailsItemDiscounts[]
  unitPriceToPayAggregation?: number
}

export type SprykerOrderResponseData = {
  type?: string
  id?: string
  attributes?: {
    currencyIsoCode?: string
    totals?: Totals
    billingAddress?: Address
    shippingAddress?: Address
    items?: Partial<GetOrderResponseItem[]>
    payments?: Payment[]
    shipments?: Shipment[]
    calculatedDiscounts?: { [key: string]: CalculatedExpense }
  }
  links?: { self: string }
}

export type SprykerOrderResponse = { data?: SprykerOrderResponseData }

export type MBWayPaymentLoad = MBWayPayment

export type MBWayPayment = {
  amount: number
  orderId: string
  customer: CustomerData & { phone: string }
}

export type MBWayPaymentResponseData = {
  internal_ref: string
}

export type CreateOrderError = {
  errorMessage: string | string[]
  details:
    | {
        error?: string | string[]
        not_available_items?: [
          {
            sku: string
            available_qty: number
          }
        ]
      }
    | string
}

export type ThreeDSecureError = {
  message: string
  _braintreeWebError: {
    code?: string
    message?: string
    details?: {
      originalError?: {
        code?: number
        description?: string
      }
    }
  }
  details: {
    originalError: {
      description?: string
      code?: number
      details?: {
        httpStatus?: number
      }
    }
  }
}
export interface IThreeDSecureVerifyPayload extends ThreeDSecureVerifyPayload {
  status?: string
  threeDSecureVersion?: string
}

export type BraintreeDeviceData = {
  customer_browser: string
  ip_address?: string
  device_data: string
  customer: CustomerData
}

export type BizumPaymentLoad = {
  amount: number
  invoice_ref: string
  customer: CustomerData
}

export type BizumResponseData = {
  internal_ref: string
  form_url: string
  signature_version: string
  merchant_params: string
  signature: string
}

export type BraintreeTokenLoad = { customer: CustomerData }

type CustomerData = {
  customer_reference: string
  email: string
  name: string
  is_guest?: boolean
}

export type WindowProdIDA = {
  h: string
  ckw: string
  r: boolean
}

export type AdyenPaymentMethodsData = {
  amount: number
  currency: string
  countryCode: string
  shopperLocale: string
  allowedPaymentMethods: string[]
  shopperReference?: string
}

type AdyenPaymentMethod = {
  configuration?: {
    gatewayMerchantId?: string
    merchantId: string
    merchantName?: string
  }
  details?: { key: string; type: string }[]
  name: string
  type: string
}

export type StoredPaymentMethod = {
  brand: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  id: string
  lastFour: string
  name: string
  supportedShopperInteractions: string[]
  type: string
}

export type AdyenPaymentMethodsResponseData = {
  paymentMethods: AdyenPaymentMethod[]
  storedPaymentMethods?: StoredPaymentMethod[]
}

export type AdyenPaymentMethodsResponse = {
  data: AdyenPaymentMethodsResponseData
  allowedPaymentMethods: string[]
}

export type AdyenAmount = {
  value: number
  currency: string
}

export type reOrderPayload = {
  orderId?: string
}

export type AdyenSubmitEvent = {
  data: {
    paymentMethod: AdyenPaymentMethodObject
    browserInfo?: AdyenBrowserInfoObject
    riskData?: AdyenRiskDataObject
    clientStateDataIndicator: boolean
    storePaymentMethod?: boolean
  }
  isValid: boolean
  isStoredCard?: boolean
}

type AdyenPaymentMethodObject = {
  type: string
  googlePayToken?: string
  googlePayCardNetwork?: string
  telephoneNumber?: string
}

type AdyenBrowserInfoObject = {
  acceptHeader: string
  colorDepth: number
  language: string
  javaEnabled: boolean
  screenHeight: number
  screenWidth: number
  userAgent: string
  timeZoneOffset: number
}

type AdyenRiskDataObject = {
  clientData: string
}

export type AdyenPaymentLoad = {
  amount: number
  currency: string
  reference: string
  paymentMethod: AdyenPaymentMethodObject
  browserInfo?: AdyenBrowserInfoObject
  billingAddress: {
    country: string
    street: string
    houseNumberOrName: string
    postalCode: string
    city: string
    stateOrProvince?: string
  }
  riskData?: AdyenRiskDataObject
  clientStateDataIndicator: boolean
  shopperEmail: string
  customer: CustomerData
  countryCode: string
  telephoneNumber?: string
  items?: GetOrderResponseItem[]
  expenses?: Omit<BasketExpense, 'quantity' | 'sumDiscountAmountAggregation'>[]
  additionalData: {
    allow3DS2: string
    RequestedTestAcquirerResponseCode?: string
  }
}

export type AdyenResponseData = {
  action: {
    data: {
      MD: string
      PaReq: string
      TermUrl: string
    }
    totalAmount?: {
      value: number
      currency: string
    }
    reference?: string
    entity?: string
    expiresAt?: string
    method: string
    paymentMethodType: string
    type: string
    url: string
  }
  resultCode: string
}

export type AdyenPaymentDetailsLoad = {
  details: {
    threeDSResult?: string
    redirectResult?: string
    payload?: string
  }
  customer: CustomerData
}

export type AdyenPaymentDetailsResponseData = {
  additionalData: {
    paymentMethod: string
  }
  amount: {
    currency: string
    value: number
  }
  merchantReference: string
  pspReference: string
  resultCode: string
}

type AtidaPaymentLoyaltyData = {
  amount: number
  invoice_ref: string
  origin_payment_ref: string
  customer: {
    customer_reference: string
    email: string
    name: string
  }
}

export type MultiplePaymentsLoad = {
  [PAYMENT_OPTIONS.ADYEN]?: AdyenPaymentLoad & {
    origin_payment_ref: string
    origin?: string
    returnUrl?: string
    shopperIP?: string
    shopperInteraction?: string
    recurringProcessingModel?: string
    shopperReference?: string
  }
  [PAYMENT_OPTIONS.REDSYS_BIZUM]?: BizumPaymentLoad & {
    origin_payment_ref: string
    success_url?: string
    failure_url?: string
  }
  [PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD]?: PaymentLoad & {
    origin_payment_ref: string
  }
  [PAYMENT_OPTIONS.BRAINTREE_PAYPAL]?: PaymentLoad & {
    origin_payment_ref: string
  }
  [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]?: AtidaPaymentLoyaltyData
}

export type MultiplePaymentsResponseData = {
  [PAYMENT_OPTIONS.ADYEN]?: AdyenResponseData
  [PAYMENT_OPTIONS.REDSYS_BIZUM]?: BizumResponseData
  [PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD]?: BraintreeCardOrPaypalData
  [PAYMENT_OPTIONS.BRAINTREE_PAYPAL]?: BraintreeCardOrPaypalData
  [PAYMENT_OPTIONS.ATIDA_PAYMENT_LOYALTY]?: AtidaPaymentLoyaltyData
}
export type AdyenPaymentDetailsState = {
  data: {
    details: {
      payload: string
    }
    paymentData: string
  }
}

export type AdyenPaymentCardPlaceholdersTranslations = {
  [key: string]: {
    ['creditCard.numberField.placeholder']: string
    ['creditCard.expiryDateField.placeholder']: string
  }
}
