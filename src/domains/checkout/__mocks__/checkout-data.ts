import { SHIPMENT_STATUSES } from '~config/constants/shipment-status'
import {
  authenticatedSprykerBasket,
  basketWithProducts
} from '~domains/basket/__mocks__/basket'
import { CheckoutData, SprykerCheckoutData } from '../types'

export const sprykerCheckoutData: SprykerCheckoutData = {
  data: {
    type: 'checkout-data',
    id: '1427e0dc-8550-5239-8e7e-1a6c32e8d52c',
    attributes: {
      idCart: '1427e0dc-8550-5239-8e7e-1a6c32e8d52c',
      orderReference: 'PT--0001',
      taxReference: '12345678A',
      lastUsedPaymentCode: 'braintree',
      addresses: [
        {
          salutation: 'Mr',
          firstName: 'Test',
          middleName: null,
          lastName: 'Last Name',
          address1: 'Avda. Málaga 2, Pueblo Andaluz, Bl5A',
          address2: null,
          address3: ' ',
          zipCode: '8142',
          city: 'Portimao',
          country: 'Spain',
          iso2Code: 'PT',
          company: null,
          phone: '68373739',
          isDefaultShipping: true,
          isDefaultBilling: true,
          cellPhone: null,
          comment: null,
          description: null,
          poBox: null,
          email: null
        },
        {
          salutation: 'Mr',
          firstName: 'First Name',
          middleName: null,
          lastName: 'Last Name',
          address1: 'Test Address 2',
          address2: null,
          address3: ' ',
          zipCode: '8142',
          city: 'Portimao',
          country: 'Spain',
          iso2Code: 'PT',
          company: null,
          phone: '68373739',
          isDefaultShipping: false,
          isDefaultBilling: false,
          cellPhone: null,
          comment: null,
          description: null,
          poBox: null,
          email: null
        }
      ],
      paymentProviders: [],
      shipmentMethods: [],
      selectedShipmentMethods: [
        {
          id: 7,
          name: 'Standard',
          carrierName: 'Spryker Dummy Shipment',
          price: 490,
          taxRate: null,
          deliveryTime: null,
          currencyIsoCode: 'EUR'
        }
      ],
      selectedPaymentMethods: []
    },
    relationships: {
      'shipment-methods': {
        data: [
          {
            type: 'shipment-methods',
            id: '7'
          },
          {
            type: 'shipment-methods',
            id: '8'
          }
        ]
      },
      'payment-methods': {
        data: [
          {
            type: 'payment-methods',
            id: '3',
            attributes: {
              paymentMethodName: 'Internal',
              paymentProviderName: 'AtidaPayment',
              priority: null,
              requiredRequestData: ['paymentMethod', 'paymentProvider'],
              availableAmount: 10
            }
          }
        ]
      }
    }
  },
  included: [
    {
      type: 'shipment-methods',
      id: '7',
      attributes: {
        name: 'Standard',
        carrierName: 'Spryker Dummy Shipment',
        deliveryTime: null,
        price: 490,
        currencyIsoCode: 'EUR',
        maxDeliveryDays: 3,
        minDeliveryDays: 1
      }
    },
    {
      type: 'shipment-methods',
      id: '8',
      attributes: {
        name: 'Express',
        carrierName: 'Spryker Dummy Shipment',
        deliveryTime: null,
        price: 590,
        currencyIsoCode: 'EUR',
        maxDeliveryDays: 3,
        minDeliveryDays: 1
      }
    },
    {
      type: 'payment-methods',
      id: '3',
      attributes: {
        paymentMethodName: 'Internal',
        paymentProviderName: 'AtidaPayment',
        priority: null,
        requiredRequestData: ['paymentMethod', 'paymentProvider'],
        availableAmount: 10
      }
    }
  ]
}

export const checkoutData: CheckoutData = {
  deliveryMethod: '7',
  billingAddress: {
    salutation: 'Mr',
    firstName: 'Test',
    middleName: null,
    lastName: 'Last Name',
    address1: 'Avda. Málaga 2, Pueblo Andaluz, Bl5A',
    address2: ' ',
    address3: ' ',
    zipCode: '8142',
    city: 'Portimao',
    country: 'Spain',
    iso2Code: 'PT',
    company: null,
    phone: '68373739',
    isDefaultShipping: true,
    isDefaultBilling: true,
    cellPhone: null,
    comment: null,
    description: null,
    poBox: null,
    email: null
  },
  deliveryAddress: {
    salutation: 'Mr',
    firstName: 'Test',
    middleName: null,
    lastName: 'Last Name',
    address1: 'Avda. Málaga 2, Pueblo Andaluz, Bl5A',
    address2: ' ',
    address3: ' ',
    zipCode: '8142',
    city: 'Portimao',
    country: 'Spain',
    iso2Code: 'PT',
    company: null,
    phone: '68373739',
    isDefaultShipping: true,
    isDefaultBilling: true,
    cellPhone: null,
    comment: null,
    description: null,
    poBox: null,
    email: null
  },
  shipmentMethods: [
    {
      type: 'shipment-methods',
      id: '7',
      attributes: {
        name: 'Standard',
        carrierName: 'Spryker Dummy Shipment',
        deliveryTime: null,
        price: 490,
        currencyIsoCode: 'EUR'
      }
    },
    {
      type: 'shipment-methods',
      id: '8',
      attributes: {
        name: 'Express',
        carrierName: 'Spryker Dummy Shipment',
        deliveryTime: null,
        price: 590,
        currencyIsoCode: 'EUR'
      }
    }
  ]
}

export const checkoutDataWithBasketItems = {
  ...checkoutData,
  basket: basketWithProducts
} as const

export const checkoutDataWithEmptyBasket = {
  ...checkoutData,
  basket: {
    items: []
  }
} as const

export const sprykerCheckoutDataWithBasketItems = {
  ...sprykerCheckoutData,
  included: [
    ...sprykerCheckoutData.included,
    authenticatedSprykerBasket.data,
    ...authenticatedSprykerBasket.included
  ]
}

export const paymentCheckoutData: CheckoutData = {
  customer: {
    email: 'address@mail.com',
    firstName: 'First name',
    lastName: 'Second name',
    salutation: 'Mr'
  },
  basketId: 'some-basket-id',
  billingAddress: {
    salutation: 'Mr',
    firstName: 'Test',
    middleName: null,
    lastName: 'Last Name',
    address1: 'Avda. Málaga 2, Pueblo Andaluz, Bl5A',
    address2: null,
    address3: ' ',
    zipCode: '8142',
    city: 'Portimao',
    country: 'Spain',
    iso2Code: 'PT',
    company: null,
    phone: '68373739',
    isDefaultShipping: true,
    isDefaultBilling: true,
    cellPhone: null,
    comment: null,
    description: null,
    poBox: null,
    email: null
  },
  deliveryAddress: {
    salutation: 'Mr',
    firstName: 'Test',
    middleName: null,
    lastName: 'Last Name',
    address1: 'Avda. Málaga 2, Pueblo Andaluz, Bl5A',
    address2: null,
    address3: ' ',
    zipCode: '8142',
    city: 'Portimao',
    country: 'Spain',
    iso2Code: 'PT',
    company: null,
    phone: '68373739',
    isDefaultShipping: true,
    isDefaultBilling: true,
    cellPhone: null,
    comment: null,
    description: null,
    poBox: null,
    email: null
  },
  deliveryMethod: '7'
} as const

export const createOrderData = {
  data: {
    attributes: {
      orderReference: 'PT--1630'
    }
  }
} as const

export const createOrderResponse = {
  orderId: 'PT--1630'
} as const

export const sprykerOrderData = {
  data: {
    type: 'orders',
    id: 'PT--279',
    attributes: {
      createdAt: '2021-07-22 13:01:57.326305',
      currencyIsoCode: 'EUR',
      priceMode: 'GROSS_MODE',
      totals: {
        expenseTotal: 399,
        discountTotal: 85,
        taxTotal: 206,
        subtotal: 846,
        grandTotal: 1160,
        canceledTotal: 0,
        remunerationTotal: 0
      },
      billingAddress: {
        salutation: 'Mr',
        firstName: 'Firstname',
        middleName: null,
        lastName: 'Lastname',
        address1: 'Campo dos Mártires da Pátria, 1150',
        address2: '1A',
        address3: null,
        company: null,
        city: 'Lisboa',
        zipCode: '1150-343',
        poBox: null,
        phone: '+351218850461',
        cellPhone: null,
        description: null,
        comment: null,
        email: null,
        country: 'Portugal',
        iso2Code: 'PT'
      },
      shippingAddress: {
        salutation: 'Mr',
        firstName: 'Firstname',
        middleName: null,
        lastName: 'Lastname',
        address1: 'Campo dos Mártires da Pátria, 1150',
        address2: '1A',
        address3: null,
        company: null,
        city: 'Lisboa',
        zipCode: '1150-343',
        poBox: null,
        phone: '+351218850461',
        cellPhone: null,
        description: null,
        comment: null,
        email: null,
        country: 'Portugal',
        iso2Code: 'PT'
      },
      items: [
        {
          name: 'Multivitaminas Crianças Chewy Vites TLC 60 Ursos De Borracha',
          sku: '470457966443',
          sumPrice: 846,
          quantity: 1,
          unitGrossPrice: 846,
          sumGrossPrice: 846,
          taxRate: '23.00',
          unitNetPrice: 0,
          sumNetPrice: 0,
          unitPrice: 846,
          unitTaxAmountFullAggregation: 142,
          sumTaxAmountFullAggregation: 142,
          refundableAmount: 761,
          canceledAmount: 0,
          sumSubtotalAggregation: 846,
          unitSubtotalAggregation: 846,
          unitProductOptionPriceAggregation: 0,
          sumProductOptionPriceAggregation: 0,
          unitExpensePriceAggregation: 0,
          sumExpensePriceAggregation: null,
          unitDiscountAmountAggregation: 85,
          sumDiscountAmountAggregation: 85,
          unitDiscountAmountFullAggregation: 85,
          sumDiscountAmountFullAggregation: 85,
          unitPriceToPayAggregation: 761,
          sumPriceToPayAggregation: 761,
          taxRateAverageAggregation: '23.00',
          taxAmountAfterCancellation: null,
          orderReference: null,
          uuid: 'cd434c4e-68fb-5016-8bb9-d8537d364411',
          isReturnable: false,
          idShipment: null,
          metadata: {
            superAttributes: [],
            image:
              'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/9DD1BFFF-F8DE-4C0D-9B7C8227BB4CAB20/webimage-092EB4B3-1741-4E1A-9D823C58DD3CDEC7.png'
          },
          categoryList:
            'baby_kids,baby_kids,baby_kids_baby_care,baby_kids_baby_care,baby_care_bath_products,baby_care_hygiene',
          calculatedDiscounts: [
            {
              unitAmount: 85,
              sumAmount: 85,
              displayName: '10% OFF Chewy Vites',
              description: '10% OFF Chewy Vites',
              voucherCode: 'promo.chewy_vites',
              quantity: 1
            }
          ],
          productOptions: []
        }
      ],
      expenses: [
        {
          type: 'SHIPMENT_EXPENSE_TYPE',
          name: 'delivery-method.standard-delivery',
          sumPrice: 399,
          unitGrossPrice: 399,
          sumGrossPrice: 399,
          taxRate: '19.00',
          unitNetPrice: 0,
          sumNetPrice: 0,
          canceledAmount: null,
          unitDiscountAmountAggregation: null,
          sumDiscountAmountAggregation: null,
          unitTaxAmount: 64,
          sumTaxAmount: 64,
          unitPriceToPayAggregation: 399,
          sumPriceToPayAggregation: 399,
          taxAmountAfterCancellation: null,
          idShipment: null,
          idSalesExpense: 321
        }
      ],
      payments: [
        {
          amount: 1160,
          paymentProvider: 'AtidaPayment',
          paymentMethod: 'atidaPaymentInternal',
          paymentReference: 'PMT-PT-000279'
        }
      ],
      shipments: [
        {
          shipmentMethodName: 'delivery-method.standard-delivery',
          carrierName: 'Correo Express',
          deliveryTime: null,
          defaultGrossPrice: 399,
          defaultNetPrice: 0,
          currencyIsoCode: 'EUR',
          shipmentStatus: null,
          estimatedDeliveryDate: null,
          trackingLink: null,
          erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
          erpTrackingUrl: 'some-tracking-url',
          erpTrackingReference: 'some-tracking-url'
        }
      ],
      calculatedDiscounts: {
        'promo.chewy_vites': {
          unitAmount: null,
          sumAmount: 85,
          displayName: '10% OFF Chewy Vites',
          description: '10% OFF Chewy Vites',
          voucherCode: 'promo.chewy_vites',
          quantity: 1
        }
      }
    },
    links: { self: 'http://glue-pt-spryker.dev.atida.com/orders/PT--279' }
  }
}

export const orderData = {
  currency: 'EUR',
  discountTotal: 85,
  expenseTotal: 399,
  grandTotal: 1160,
  taxTotal: 206,
  coupons: [
    {
      amount: 85,
      code: 'promo.chewy_vites',
      displayName: '10% OFF Chewy Vites'
    }
  ],
  items: [
    {
      quantity: 1,
      sku: '470457966443',
      tax: 142,
      unitPrice: 846,
      unitPriceToPayAggregation: 761,
      coupons: [
        {
          amount: 85,
          code: 'promo.chewy_vites',
          displayName: '10% OFF Chewy Vites'
        }
      ],
      discount: 85,
      product: {
        brand: {
          code: undefined,
          label: undefined
        },
        categories: {
          lvl0: ['baby_kids'],
          lvl1: ['baby_kids'],
          lvl2: ['baby_kids_baby_care']
        },
        largeImage:
          'https://d2csxpduxe849s.cloudfront.net/media/07EADC8C-9435-4B3D-87CF5EDA882A36F2/9DD1BFFF-F8DE-4C0D-9B7C8227BB4CAB20/webimage-092EB4B3-1741-4E1A-9D823C58DD3CDEC7.png',
        name: 'Multivitaminas Crianças Chewy Vites TLC 60 Ursos De Borracha',
        url: undefined
      }
    }
  ]
}
