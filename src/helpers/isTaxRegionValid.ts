import { isTaxRegionValidByZipcodes } from './isTaxRegionValidByZipcodes'
import { isTaxRegionValidByProvinces } from './isTaxRegionValidByProvinces'
import { CustomerAddress } from '~domains/address'

type PartialAddress = Pick<
  CustomerAddress,
  'zipCode' | 'province' | 'subdivision'
>

export const isTaxRegionValid = (
  shippingAddress: PartialAddress | undefined,
  billingAddress: PartialAddress | undefined,
  locale = ''
) => {
  if (locale !== 'es-es') {
    return true
  }

  if (
    (!shippingAddress?.province && !shippingAddress?.subdivision) ||
    (!billingAddress?.province && !billingAddress?.subdivision) ||
    !shippingAddress?.zipCode ||
    !billingAddress?.zipCode
  ) {
    return false
  }

  return (
    isTaxRegionValidByProvinces(
      shippingAddress?.province ?? shippingAddress?.subdivision ?? '',
      billingAddress?.province ?? billingAddress?.subdivision ?? ''
    ) &&
    isTaxRegionValidByZipcodes(
      shippingAddress?.zipCode,
      billingAddress?.zipCode
    )
  )
}
