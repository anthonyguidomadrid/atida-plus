import * as currencySymbols from '~config/constants/currency-symbols'

// TODO: possible duplication - we could expand our existing hook to handle currency symbols when needed
export const priceCurrencyFormatter = (
  amount?: number | string,
  currencyIsoCode?: string,
  reverted?: boolean
): string => {
  const currencySymbol =
    currencySymbols[
      currencyIsoCode?.toUpperCase() as keyof typeof currencySymbols
    ] ?? ''

  // TODO: Handle currency with appended symbol

  if (reverted) return `${amount} ${currencySymbol} `

  return `${currencySymbol} ${amount}`
}
