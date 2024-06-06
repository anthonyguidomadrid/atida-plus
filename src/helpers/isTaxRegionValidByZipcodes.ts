enum ZIPCODE_DIGITS {
  CEUTA = '51',
  MELILLA = '52',
  TENERIFE = '38',
  LAS_PALMAS = '35'
}

export const isTaxRegionValidByZipcodes = (
  shippingAddressZipcode: string,
  billingAddressZipcode: string
): boolean => {
  const shippingLeadingDigits = shippingAddressZipcode.substring(0, 2)
  const billingLeadingDigits = billingAddressZipcode.substring(0, 2)
  switch (shippingLeadingDigits) {
    case ZIPCODE_DIGITS.CEUTA:
    case ZIPCODE_DIGITS.MELILLA:
      return (
        billingLeadingDigits === ZIPCODE_DIGITS.CEUTA ||
        billingLeadingDigits === ZIPCODE_DIGITS.MELILLA
      )
    case ZIPCODE_DIGITS.LAS_PALMAS:
    case ZIPCODE_DIGITS.TENERIFE:
      return (
        billingLeadingDigits === ZIPCODE_DIGITS.LAS_PALMAS ||
        billingLeadingDigits === ZIPCODE_DIGITS.TENERIFE
      )
    default:
      return (
        billingLeadingDigits !== ZIPCODE_DIGITS.CEUTA &&
        billingLeadingDigits !== ZIPCODE_DIGITS.MELILLA &&
        billingLeadingDigits !== ZIPCODE_DIGITS.LAS_PALMAS &&
        billingLeadingDigits !== ZIPCODE_DIGITS.TENERIFE
      )
  }
}

export const isSpecialRegionZipCode = (zipCode: string): boolean => {
  return /^35[0-9]{3}$|^38[0-9]{3}$|^52[0-9]{3}$|^51[0-9]{3}$/.test(zipCode)
}
