import { priceCurrencyFormatter } from '../price-formatter'

describe(priceCurrencyFormatter, () => {
  it('returns € 15 when an amount of 15 is called with an currencyIsoCode EUR', () => {
    expect(priceCurrencyFormatter(15, 'eur')).toEqual('€ 15')
  })
  it('returns only the amount when the currencyIsoCode is not defined', () => {
    expect(priceCurrencyFormatter(15, 'chc')).toEqual(' 15')
  })
  it('places the currency symbol after the price if reverted is passed', () => {
    expect(priceCurrencyFormatter(15, 'eur', true)).toEqual('15 € ')
  })
})
