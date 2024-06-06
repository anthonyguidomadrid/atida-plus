export const getInitialIdShipmentMethod = (
  locale: string | undefined,
  isTaxExempt: boolean | undefined
): number => {
  switch (locale) {
    case 'es-es':
      return isTaxExempt ? 5 : 4
    case 'pt-pt':
    default:
      return 3
  }
}
