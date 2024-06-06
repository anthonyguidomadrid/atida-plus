import { removeUndefinedPropertiesFromObject } from '~helpers'
import {
  Address,
  CheckoutData,
  SprykerCheckoutData,
  SprykerIncludedCarts,
  SprykerIncludedPaymentMethod,
  SprykerIncludedShipmentMethod
} from '../types'

const getNormalizedDefaultAddress = (
  addresses: Address[] | undefined,
  addressType: 'isDefaultBilling' | 'isDefaultShipping'
) => {
  if (!addresses) {
    return
  }
  const newAddress = addresses.filter(address =>
    address[addressType] ? address : undefined
  )[0]

  return newAddress
}

export const normalizeCheckoutData = (
  checkoutData?: SprykerCheckoutData,
  data?: CheckoutData
): CheckoutData =>
  removeUndefinedPropertiesFromObject({
    deliveryMethod: checkoutData?.data?.attributes?.selectedShipmentMethods?.[0]?.id?.toString(),
    billingAddress:
      data?.billingAddress ??
      getNormalizedDefaultAddress(
        checkoutData?.data?.attributes?.addresses,
        'isDefaultBilling'
      ),
    cartId: checkoutData?.data?.attributes.idCart,
    deliveryAddress:
      data?.deliveryAddress ??
      getNormalizedDefaultAddress(
        checkoutData?.data?.attributes?.addresses,
        'isDefaultShipping'
      ),
    isBillingSameAsShipping: data?.isBillingSameAsShipping,
    shipmentMethods: checkoutData?.data?.relationships?.[
      'shipment-methods'
    ]?.data
      ?.map(({ id }) =>
        checkoutData?.included.find(
          (item): item is SprykerIncludedShipmentMethod =>
            item.id === id && item.type === 'shipment-methods'
        )
      )
      ?.filter((item): item is SprykerIncludedShipmentMethod => !!item),
    paymentMethods: checkoutData?.data?.relationships?.['payment-methods']?.data
      ?.map(({ id }) =>
        checkoutData?.included.find(
          (item): item is SprykerIncludedPaymentMethod =>
            item.id === id && item.type === 'payment-methods'
        )
      )
      ?.filter((item): item is SprykerIncludedPaymentMethod => !!item),
    minDeliveryDays: checkoutData?.included?.find(
      (item): item is SprykerIncludedShipmentMethod =>
        item.type === 'shipment-methods'
    )?.attributes?.minDeliveryDays,
    maxDeliveryDays: checkoutData?.included?.find(
      (item): item is SprykerIncludedShipmentMethod =>
        item.type === 'shipment-methods'
    )?.attributes?.maxDeliveryDays,
    taxReference: checkoutData?.data?.attributes?.taxReference,
    isTaxExempt: checkoutData?.included?.find(
      (item): item is SprykerIncludedCarts => item.type === 'carts'
    )?.attributes?.shippingAddress?.isTaxExempt,
    lastUsedPaymentCode: checkoutData?.data?.attributes?.lastUsedPaymentCode,
    atidaCashUsed: checkoutData?.included
      ?.find((item): item is SprykerIncludedCarts => item.type === 'carts')
      ?.attributes?.payments?.find(
        payment => payment.paymentMethod === 'atidaPaymentLoyalty'
      )?.amount
  })
