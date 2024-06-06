import { CustomerSalutation, Shipment } from '~domains/checkout/types'
import type { Product } from '../product/types'
import {
  ACCOUNT_TYPE_BUSINESS,
  ACCOUNT_TYPE_PERSONAL
} from '~config/constants/account-types'

export type CreateCustomerRequest = {
  salutation: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  acceptedTerms: boolean
  emailNotification: boolean
  addresses: {
    addresses: {
      salutation: string
      firstName: string
      phone?: string
      lastName: string
      address1: string
      zipCode: string
      city: string
      iso2Code: string
    }[]
  }
}

export type CreateAccountProgress = {
  currentStep: number
}

export type SprykerCreateCustomer = {
  data: {
    type: 'customers'
    id: string
    attributes: {
      salutation: string
      firstName: string
      lastName: string
      phone?: string
      email: string
      password: string
      confirmPassword: string
      acceptedTerms: boolean
    }
  }
}

export type AccountType = {
  accountType?: typeof ACCOUNT_TYPE_BUSINESS | typeof ACCOUNT_TYPE_PERSONAL
}

export type SprykerCustomer = {
  data: {
    type: 'customers'
    id: string
    attributes: AccountType & {
      firstName: string
      lastName: string
      email: string
      gender: null
      dateOfBirth: null
      salutation: string
      taxReference?: string
      createdAt: string
      updatedAt: string
      magentoCustomerId?: string
      emailNotification: boolean
      receivePersonalRecommendations: boolean
      receivePinnedProductsNotifications: boolean
      company: string | null
      surcharge: boolean | null
      invoiceRequired: boolean
      phone?: string
    }
    relationships?: {
      addresses?: {
        data: Pick<SprykerCustomerAddress, 'type' | 'id'>[]
      }
    }
  }
  included?: SprykerCustomerAddress[]
}

export type Customer = AccountType & {
  salutation: string
  firstName: string
  lastName: string
  taxReference?: string
  email: string
  emailNotification: boolean
  receivePersonalRecommendations?: boolean
  receivePinnedProductsNotifications?: boolean
  magentoCustomerId?: string
  surcharge: boolean | null
  company: string | null
  hasPreviousSuccessfulOrder?: boolean
  invoiceRequired?: boolean
  phoneNumber?: string
  createdAt?: string | Date
  dateOfBirth?: string | null
}

export type CustomerWithAddresses = Customer & {
  addresses: CustomerAddress[]
}

export type SprykerCustomerAuthentication = {
  data: {
    type: 'access-tokens'
    attributes: {
      username: string
      password: string
    }
  }
}

export type CustomerAuthentication = {
  email: string
  password: string
}

export type SprykerCustomerToken = {
  data: {
    type: 'access-tokens' | 'guest-tokens' | 'social-access-tokens'
    attributes: {
      expiresIn?: number
      expires?: number
      accessToken: string
      refreshToken: string
      messages: [
        {
          type?: string
          value?: string
          parameters?: []
          message?: string
        }
      ]
      isNew?: boolean
      firstName?: string
      email?: string
    }
  }
}

export type CustomerToken = {
  accessToken: string
  refreshToken: string
  expiresIn: number
  messages?: [
    {
      type?: string
      value?: string
      parameters?: []
      message?: string
    }
  ]
  social?: {
    isNew?: boolean
    needsVerification?: boolean
    firstName?: string
    email?: string
  }
}

export type CustomerJWT = {
  aud: string
  exp: string
  iat: string
  jti: string
  nbf: string
  scopes: string[]
  sub: string
}

export type CustomerJWTSub = {
  customer_reference: string
  id_customer: number
  given_name: string
  has_previous_successful_order: boolean
}

export type CustomerDecodedJWT = {
  reference: string
  givenName: string
  expires: number
  hasPreviousSuccessfulOrder: boolean
  anonymousId: string
  lastUsedPaymentMethod: string
}

export type CustomerCookie = {
  'given-name': string
  'has-previous-successful-order': boolean
  ref: string
  last_used_payment_code: string
}

export type CreateCustomerTriggerPayload = Customer & {
  password: string
  dateOfBirth?: string | null
  confirmPassword: string
  redirect?: string
  acceptedTerms: boolean
  surcharge: boolean | null
  company: string | null
  phone?: string
  addresses: {
    addresses: Omit<
      SprykerCustomerAddress['attributes'],
      'country' | 'isTaxExempt'
    >[]
  }
}

export type LoginTriggerPayload = CustomerAuthentication & {
  redirect?: string
}

export type ReadCustomerPayload = {
  name?: string
  hasPreviousSuccessfulOrder: boolean
  reference: string
}

export type LogoutTriggerPayload = string | undefined

export type LoginSuccessPayload = Omit<CustomerDecodedJWT, 'expires'>

export type LoginMessages = [
  {
    type?: string
    value?: string
    parameters?: []
    message?: string
  }
]

export type SprykerSetNewPassword = {
  data: {
    type: 'customer-restore-password'
    id: string
    attributes: {
      restorePasswordKey: string
      password: string
      confirmPassword: string
    }
  }
}

export type SetNewPassword = {
  restorePasswordKey: string
  password: string
  confirmPassword: string
}

export type SetNewPasswordTriggerPayload = SetNewPassword & {
  redirect?: string
}

export type PasswordForgottenTriggerPayload = Omit<
  CustomerAuthentication,
  'password'
>

export type UserWithVerifiedResetToken = {
  firstName: string
  lastName: string
  email: string
}

export type VerifyResetPasswordTokenTriggerPayload = {
  resetPasswordToken?: string
}

export type SprykerVerifyResetPasswordToken = {
  data: {
    type: 'customer-verify-token'
    id: string
    attributes: {
      firstName: string
      lastName: string
      email: string
      gender: null
      dateOfBirth: null
      salutation: string
      createdAt: string
      updatedAt: string
      emailNotification: boolean
    }
  }
}

export type VerifyResetPasswordTokenSuccessPayload = Omit<
  SprykerVerifyResetPasswordToken,
  'email'
>

export type GetCustomerTriggerPayload = {
  customerReference?: string
}

export type GetCustomerAddressesTriggerPayload = {
  customerReference: string
}

export type SprykerCustomerAddresses = {
  data: SprykerCustomerAddress[]
}

export type SprykerCustomerAddress = {
  type: 'addresses'
  id: string
  attributes: {
    salutation: string
    firstName: string
    lastName: string
    address1: string
    address2?: string
    address3?: string
    houseNumber?: string
    addition?: string
    zipCode: string
    city: string
    subdivision?: string
    province?: string
    district?: string
    country: string
    iso2Code: string
    company?: string
    phone?: string
    createdAt?: string | number | Date
    updatedAt?: string | number | Date
    isDefaultShipping: boolean
    isDefaultBilling: boolean
    isTaxExempt: boolean
  }
}

export type CustomerAddress = SprykerCustomerAddress['attributes'] & {
  id: SprykerCustomerAddress['id']
}

export type UpdateCustomerPersonalDetailsTriggerPayload = UpdateCustomerPersonalDetails & {
  reference?: string
  addressId?: string
  redirect?: string
}

export type UpdateCustomerPersonalDetails = {
  salutation?: CustomerSalutation
  firstName?: string
  lastName?: string
  dateOfBirth?: string | null
  phone?: string
  address?: string
  customerAddressesIds?: string[]
  zipCode?: string
  iso2Code?: string
  city?: string
  country?: string
  taxReference?: string
  receivePersonalRecommendations?: boolean
  receivePinnedProductsNotifications?: boolean
}

export type UpdateBusinessDetailsTriggerPayload = UpdateBusinessDetails & {
  reference: string
  redirect?: string
}

export type UpdateBusinessDetails = {
  companyName: string
  taxReference: string
  equivalenceSurcharge?: boolean
}

export type CreateNewAddressTriggerPayload = CreateNewAddress & {
  reference?: string
  redirect?: string
}

export type CreateNewAddress = {
  salutation: string
  firstName: string
  lastName: string
  address1: string
  address3: string
  zipCode: string
  city: string
  iso2Code: string
  phone: string
  isDefaultShipping: boolean
  isDefaultBilling: boolean
}

export type UpdatedJWTAndRefreshTokens = {
  refreshToken?: string
  JWT?: string
  expiresIn?: number
}

export type SprykerUpdatedJWTAndRefreshTokens = {
  data: {
    type: string
    attributes: {
      tokenType: string
      expiresIn: number
      accessToken: string
      refreshToken: string
    }
    links: {
      self: string
    }
  }
}

export type OrderItemPrices = {
  canceledTotal: number
  discountTotal: number
  expenseTotal: number
  grandTotal: number
  remunerationTotal: number
  surchargeTotal: number
  subtotal: number
  taxTotal: number
  shippingTotal?: number
  rrpDiscountTotal?: number
  rewardTotal?: number
  loyaltySpent?: number
  amountPaidByRealPayment?: number
  itemTotal?: number
}

export type SprykerOrdersLinks = {
  self: string
  last: string
  first: string
  prev: string
}

export type OrderItemShippingStatus = {
  displayName: string
  name: string
}

export type OrderItem = {
  metadata: Omit<Partial<Product>, 'sku'>
  quantity: number
  sku: string
  id: string
  isPromo: boolean
  sumGrossPrice: number
  unitGrossPrice: number
}

export type OrderDetailsSingleItem = OrderItem & {
  calculatedDiscounts: [OrderDetailsItemDiscounts?]
  canceledAmount: 0
  id: string
  idShipment?: number | string
  isReturnable: boolean
  isPromo?: boolean
  isFullyDiscounted?: boolean
  name: string
  orderReference?: string
  productOptions: [unknown]
  refundableAmount: number
  sumDiscountAmountAggregation: number
  sumDiscountAmountFullAggregation: number
  sumExpensePriceAggregation: number
  sumNetPrice: number
  sumPrice: number
  sumPriceToPayAggregation: number
  sumProductOptionPriceAggregation: number
  sumSubtotalAggregation: number
  sumTaxAmountFullAggregation: number
  taxAmountAfterCancellation?: number | string
  taxRate: string
  taxRateAverageAggregation: string
  unitDiscountAmountAggregation: number
  unitDiscountAmountFullAggregation: number
  unitExpensePriceAggregation: number
  unitNetPrice: number
  unitPrice: number
  unitPriceToPayAggregation: number
  unitProductOptionPriceAggregation: number
  unitSubtotalAggregation: number
  unitTaxAmountFullAggregation: number
  uuid: string
}

export type OrderHistoryItem = {
  id: string
  type: string
  links?: {
    self: string
  }
  attributes: {
    createdAt: string
    currencyIsoCode: string
    priceMode: string
    items: OrderItem[]
    status: OrderItemShippingStatus[]
    totals: OrderItemPrices
    shipments?: Shipment[]
    productDiscounts?: OrderDetailsVoucher[]
    calculatedDiscounts?: never[]
  }
  maxProductsIndex: number
}

export type OrderHistoryResponse = {
  data: OrderHistoryItem[]
  links: SprykerOrdersLinks
}

export type OrderHistoryParams = {
  locale: string
  accessToken: string
  params?: {
    page?: number
    sort?: string
  }
}

export type OrdersPayload = {
  data: OrderHistoryItem[]
  links: SprykerOrdersLinks
}

export type OrderHistoryPayload = {
  data: OrderHistorySortedDates[]
  totalPages: number
}

export type OrderHistoryTriggerPayload = {
  page?: number | string | string[]
  sort?: string
}

export type OrderHistorySortedDates = {
  date: string
  unFormattedDate: string
  orderHistory: OrderHistoryItem[]
}

export type OrderDetailsAddressAttribute = {
  address1: string
  address2?: string
  address3?: string
  houseNumber?: string
  addition?: string
  cellPhone?: string
  city?: string
  comment?: string
  company?: string
  district?: string
  province?: string
  country: string
  description?: string
  email?: string
  firstName: string
  iso2Code: string
  lastName: string
  middleName?: string
  phone?: string
  poBox?: string
  salutation?: string
  zipCode?: string
  isTaxExempt: boolean
}

export type OrderDetailsItemDiscounts = {
  description: string
  displayName: string
  quantity: number
  sumAmount: number
  unitAmount?: number
  voucherCode?: string | number
  discountKey?: string
}

export type OrderDetailsSingle = {
  id: string
  type: string
  links: {
    self: string
  }
  attributes: {
    createdAt: string
    currencyIsoCode: string
    priceMode: string
    status: { [key: string]: OrderItemShippingStatus }
    totals: OrderItemPrices
    billingAddress: OrderDetailsAddressAttribute
    shippingAddress: OrderDetailsAddressAttribute
    productDiscounts: OrderDetailsVoucher
    items: OrderDetailsSingleItem[]
    calculatedDiscounts: {
      [key: string]: OrderDetailsItemDiscounts
    }
    expenses: [
      {
        canceledAmount?: number
        idSalesExpense: number
        idShipment?: number
        name: string
        sumDiscountAmountAggregation?: number
        sumGrossPrice: number
        sumNetPrice: number
        sumPrice: number
        sumPriceToPayAggregation: number
        sumTaxAmount: number
        taxAmountAfterCancellation?: number
        taxRate?: string
        type: string
        unitDiscountAmountAggregation?: number
        unitGrossPrice: number
        unitNetPrice: number
        unitPriceToPayAggregation: number
        unitTaxAmount: number
      }
    ]
    payments: [
      {
        amount: number
        paymentMethod: string
        paymentProvider: string
        paymentReference: string
      }
    ]
    shipments: Shipment[]
  }
}

export type OrderDetailsVoucher = {
  [key: string]: {
    sumAmount: number
    voucherCode: string
    discountKey?: string
  }
}

export type OrderDetailsPayload = OrderDetailsSingle

export type OrderDetailsTriggerPayload = {
  orderId?: string | string[]
  isCheckoutComplete?: boolean
}

export type OrderDetailsParams = {
  locale: string
  accessToken: string
  orderId: string | string[] | number
}

export type OrderDetailsItem = {
  idx: number
  name: string
  sku: string
  quantity: number
  metadata: Partial<Product>
  unitSubtotalAggregation: number
  unitPriceToPayAggregation?: number
  isPromo?: boolean
  isFullyDiscounted?: boolean
}

export type ChangePassword = {
  customerReference?: string
  password: string
  newPassword: string
  confirmNewPassword: string
}

export type ChangePasswordPayload = ChangePassword

export type VerifyResetPasswordTokenState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: { message: string; status: number }
  user?: UserWithVerifiedResetToken
}

export type CustomerCheckTriggerPayload = {
  email: string
}

export type SprykerCustomerCheckResponse = {
  data: {
    type: 'customer-check'
    id: string | null
    attributes: { exists: boolean }
    links: {
      self: string
    }
  }[]
  links: {
    self: string
  }
}

export type CustomerCheckResponse = {
  email: string
  exists: boolean
}

export type CashBalanceResponse = {
  total: number
}

export type RequestInvoiceTriggerPayload = {
  customerReference: string
  invoiceRequired: boolean
}

export type AtidaCashTransactionTriggerPayload = {
  limit?: string
  offset?: string
}

export type AtidaCashTransactionRequestPayload = {
  locale: string
  params?: AtidaCashTransactionTriggerPayload
  accessToken: string
}

export type AtidaCashTransactionTypes = 'credit' | 'debit'

export type AtidaCashTransaction = {
  transaction_type: AtidaCashTransactionTypes
  amount: number
  expiry_date?: string
  transaction_date: string
}

export type AtidaCashTransactionHistoryLedgerResponse = {
  data: AtidaCashTransaction[]
  metadata: { total: number; count: number }
}

export type AtidaCashTransactionsHistoryByDate = {
  date: string
  transactions: AtidaCashTransaction[]
}[]

export type AtidaCashTransactionsHistory = {
  transactions: AtidaCashTransactionsHistoryByDate
  totalPages: number
}
