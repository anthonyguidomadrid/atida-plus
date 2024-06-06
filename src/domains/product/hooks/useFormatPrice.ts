import { useRouter } from 'next/router'
import { logger } from '~helpers'
import { getErrorMessage, getErrorStack } from '~helpers/error'

export type FormattedPrice = {
  integerAndDecimal?: string
  fraction?: string
  asOne?: string
  withCurrency?: string
  currency?: string
}

export type PriceFormatter = (
  value?: number,
  currency?: string
) => FormattedPrice

export const useFormatPrice = (): PriceFormatter => {
  const { locale, defaultLocale, asPath } = useRouter()

  return (value?: number, currency = 'EUR') => {
    const normalizedValue = value === undefined ? NaN : value / 100
    let formatter: Intl.NumberFormat

    if (Number.isNaN(normalizedValue)) {
      logger.error({
        request: asPath,
        name: 'PriceFormatError',
        message: 'Price was not provided or was not a number'
      })

      return {
        integerAndDecimal: undefined,
        fraction: undefined,
        asOne: undefined
      }
    }

    try {
      formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      })
    } catch (error) {
      logger.error({
        request: asPath,
        name: 'PriceFormatError',
        message: getErrorMessage(error),
        stack: getErrorStack(error)
      })

      try {
        formatter = new Intl.NumberFormat(locale, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })
      } catch (error) {
        logger.error({
          request: asPath,
          name: 'PriceFormatError',
          message: getErrorMessage(error),
          stack: getErrorStack(error)
        })

        formatter = new Intl.NumberFormat(defaultLocale, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })
      }
    }

    const withCurrency = formatter.format(normalizedValue)
    const parts = formatter.formatToParts(normalizedValue)
    const integerAndDecimal = parts.reduce((combined, part) => {
      if (part.type === 'integer' || part.type === 'decimal') {
        return `${combined}${part.value}`
      }

      return combined
    }, '')
    const fraction = parts.find(part => part.type === 'fraction')?.value
    const currencySymbol = parts.find(part => part.type === 'currency')?.value

    return {
      integerAndDecimal,
      fraction,
      asOne: `${integerAndDecimal}${fraction}`,
      withCurrency,
      currency: currencySymbol
    }
  }
}
