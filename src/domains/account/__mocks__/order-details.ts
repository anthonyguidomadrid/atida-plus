import { SHIPMENT_STATUSES } from '~config/constants/shipment-status'
import { OrderDetailsSingle } from '../types'

export const orderDetailsResult: OrderDetailsSingle = {
  id: 'PT--1234',
  type: 'orders',
  links: {
    self: 'http://self.order'
  },
  attributes: {
    createdAt: '2021-21-21 21:21:21',
    currencyIsoCode: 'EUR',
    priceMode: 'GROSS',
    status: {
      exported: {
        displayName: 'oms.state.exported',
        name: 'exported'
      }
    },
    productDiscounts: {
      voucher: {
        sumAmount: 3.99,
        voucherCode: 'discount',
        discountKey: 'discountKey'
      }
    },
    totals: {
      canceledTotal: 10,
      discountTotal: 10,
      expenseTotal: 10,
      grandTotal: 10,
      remunerationTotal: 10,
      surchargeTotal: 10,
      subtotal: 10,
      taxTotal: 10,
      shippingTotal: 10,
      itemTotal: 10
    },
    billingAddress: {
      address1: 'address 1',
      country: 'country',
      firstName: 'first name',
      iso2Code: 'GBGB',
      lastName: 'last name',
      isTaxExempt: false
    },
    shippingAddress: {
      address1: 'address 1',
      country: 'country',
      firstName: 'first name',
      iso2Code: 'GBGB',
      lastName: 'last name',
      isTaxExempt: false
    },
    items: [
      {
        metadata: {
          name: 'item',
          url: 'http://example.item/123456',
          pzn: '0000123456',
          brand: { code: 'Nice', label: 'Nice Brand' },
          format: { code: 'format1', label: 'Format 1' },
          productDatImage: 'http://example.item/image/thumbnail',
          thumbnailImage: 'http://example.item/image/thumbnail',
          mediumImage: 'http://example.item/image/medium',
          largeImage: 'http://example.item/image/large',
          productTileImage: 'http://example.item/image/productTile',
          productTileRetinaImage: 'http://example.item/image/produtTileRetina',
          description: 'description of item',
          shortDescription: 'short description of item',
          unitVolume: {
            unit: 'ml',
            amount: 10,
            unitLabel: 'ml'
          },
          price: {
            value: 10,
            currency: 'EUR'
          },
          pricePerUnit: {
            value: 10,
            currency: 'EUR',
            unit: 'ml'
          },
          rrp: {
            value: 10,
            currency: 'EUR'
          }
        },
        quantity: 10,
        sku: '0000000123456',
        sumGrossPrice: 10,
        unitGrossPrice: 10,
        calculatedDiscounts: [],
        canceledAmount: 0,
        isReturnable: false,
        name: 'item',
        productOptions: [{}],
        refundableAmount: 10,
        sumDiscountAmountAggregation: 10,
        sumDiscountAmountFullAggregation: 10,
        sumExpensePriceAggregation: 10,
        sumNetPrice: 10,
        sumPrice: 10,
        sumPriceToPayAggregation: 10,
        sumProductOptionPriceAggregation: 10,
        sumSubtotalAggregation: 10,
        sumTaxAmountFullAggregation: 10,
        taxRate: '1.00',
        taxRateAverageAggregation: '1.00',
        unitDiscountAmountAggregation: 10,
        unitDiscountAmountFullAggregation: 10,
        unitExpensePriceAggregation: 10,
        unitNetPrice: 10,
        unitPrice: 10,
        unitPriceToPayAggregation: 10,
        unitProductOptionPriceAggregation: 10,
        unitSubtotalAggregation: 10,
        unitTaxAmountFullAggregation: 10,
        uuid: 'akdsbfakshdbf-askdfbaksd-aksdjbfaks-asjdhfvajsdhf',
        id: '755632207021',
        isPromo: false
      }
    ],
    calculatedDiscounts: {},
    expenses: [
      {
        idSalesExpense: 10,
        name: 'expense',
        sumGrossPrice: 10,
        sumNetPrice: 10,
        sumPrice: 10,
        sumPriceToPayAggregation: 10,
        sumTaxAmount: 10,
        type: 'expense_type',
        unitGrossPrice: 10,
        unitNetPrice: 10,
        unitPriceToPayAggregation: 10,
        unitTaxAmount: 10
      }
    ],
    payments: [
      {
        amount: 10,
        paymentMethod: 'paymentMethod',
        paymentProvider: 'paymentProvider',
        paymentReference: 'PMT-PT--1234'
      }
    ],
    shipments: [
      {
        carrierName: 'carrier',
        currencyIsoCode: 'EUR',
        defaultGrossPrice: 10,
        defaultNetPrice: 10,
        shipmentMethodName: 'express_shipping',
        maxDeliveryDays: 3,
        minDeliveryDays: 1,
        erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
        erpTrackingUrl: 'some-tracking-url',
        erpTrackingReference: 'some-tracking-url'
      }
    ]
  }
}

export const orderDetailsResultWithoutItems: OrderDetailsSingle = {
  id: 'PT--1234',
  type: 'orders',
  links: {
    self: 'http://self.order'
  },
  attributes: {
    createdAt: '2021-21-21 21:21:21',
    currencyIsoCode: 'EUR',
    priceMode: 'GROSS',
    status: {
      exported: {
        displayName: 'oms.state.exported',
        name: 'exported'
      }
    },
    productDiscounts: {
      voucher: {
        sumAmount: 3.99,
        voucherCode: 'discount',
        discountKey: 'discountKey'
      }
    },
    totals: {
      canceledTotal: 10,
      discountTotal: 10,
      expenseTotal: 10,
      grandTotal: 10,
      remunerationTotal: 10,
      surchargeTotal: 10,
      subtotal: 10,
      taxTotal: 10,
      shippingTotal: 10,
      itemTotal: 10
    },
    billingAddress: {
      address1: 'address 1',
      country: 'country',
      firstName: 'first name',
      iso2Code: 'GBGB',
      lastName: 'last name',
      isTaxExempt: false
    },
    shippingAddress: {
      address1: 'address 1',
      country: 'country',
      firstName: 'first name',
      iso2Code: 'GBGB',
      lastName: 'last name',
      isTaxExempt: false
    },
    items: [],
    calculatedDiscounts: {},
    expenses: [
      {
        idSalesExpense: 10,
        name: 'expense',
        sumGrossPrice: 10,
        sumNetPrice: 10,
        sumPrice: 10,
        sumPriceToPayAggregation: 10,
        sumTaxAmount: 10,
        type: 'expense_type',
        unitGrossPrice: 10,
        unitNetPrice: 10,
        unitPriceToPayAggregation: 10,
        unitTaxAmount: 10
      }
    ],
    payments: [
      {
        amount: 10,
        paymentMethod: 'paymentMethod',
        paymentProvider: 'paymentProvider',
        paymentReference: 'PMT-PT--1234'
      }
    ],
    shipments: [
      {
        carrierName: 'carrier',
        currencyIsoCode: 'EUR',
        defaultGrossPrice: 10,
        defaultNetPrice: 10,
        shipmentMethodName: 'express_shipping',
        maxDeliveryDays: 3,
        minDeliveryDays: 1,
        erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
        erpTrackingUrl: 'some-tracking-url',
        erpTrackingReference: 'some-tracking-url'
      }
    ]
  }
}
