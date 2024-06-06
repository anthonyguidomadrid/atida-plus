export enum PROVINCES {
  CEUTA = 'Ceuta',
  MELILLA = 'Melilla',
  TENERIFE = 'Santa Cruz De Tenerife',
  LAS_PALMAS = 'Las Palmas'
}

export const isTaxRegionValidByProvinces = (
  shippingAddressProvince: string,
  billingAddressProvince: string
): boolean => {
  switch (shippingAddressProvince) {
    case PROVINCES.CEUTA:
    case PROVINCES.MELILLA:
      return (
        billingAddressProvince === PROVINCES.CEUTA ||
        billingAddressProvince === PROVINCES.MELILLA
      )
    case PROVINCES.TENERIFE:
    case PROVINCES.LAS_PALMAS:
      return (
        billingAddressProvince === PROVINCES.TENERIFE ||
        billingAddressProvince === PROVINCES.LAS_PALMAS
      )
    default:
      return (
        billingAddressProvince !== PROVINCES.CEUTA &&
        billingAddressProvince !== PROVINCES.MELILLA &&
        billingAddressProvince !== PROVINCES.LAS_PALMAS &&
        billingAddressProvince !== PROVINCES.TENERIFE
      )
  }
}
