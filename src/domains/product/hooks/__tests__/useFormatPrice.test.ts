import { renderHook } from '@testing-library/react-hooks'
import { describe, it } from 'globalthis/implementation'
import { useRouter } from 'next/router'
import { useFormatPrice } from '..'

describe(useFormatPrice, () => {
  describe('when a valid currency and locale are provided', () => {
    it('can format the price in gb locale', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'en-gb'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, 'EUR')).toEqual({
        asOne: '43.23',
        fraction: '23',
        integerAndDecimal: '43.',
        withCurrency: '€43.23',
        currency: '€'
      })
    })

    it('can format the price in pt locale', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'pt-pt'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, 'EUR')).toEqual({
        asOne: '43,23',
        fraction: '23',
        integerAndDecimal: '43,',
        withCurrency: '43,23 €',
        currency: '€'
      })
    })

    it('can format the price in es locale', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'es-es'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, 'EUR')).toEqual({
        asOne: '43,23',
        fraction: '23',
        integerAndDecimal: '43,',
        withCurrency: '43,23 €',
        currency: '€'
      })
    })

    it('returns undefined when no value is provided', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'en-gb'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(undefined, 'EUR')).toEqual({
        asOne: undefined,
        fraction: undefined,
        integerAndDecimal: undefined,
        withCurrency: undefined,
        currency: undefined
      })
    })
  })

  describe('when an invalid currency is provided', () => {
    it('falls back to number formatting that looks a bit like currency formatting', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'pt-pt'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, '')).toEqual({
        asOne: '43,23',
        fraction: '23',
        integerAndDecimal: '43,',
        withCurrency: '43,23',
        currency: undefined
      })
    })

    it('returns undefined when no value is provided', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'pt-pt'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(undefined, undefined)).toEqual({
        asOne: undefined,
        fraction: undefined,
        integerAndDecimal: undefined,
        withCurrency: undefined,
        currency: undefined
      })
    })
  })

  describe('displays the appropriate currency', () => {
    it('displays GBP correctly', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'en-gb'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, 'GBP')).toEqual({
        asOne: '43.23',
        fraction: '23',
        integerAndDecimal: '43.',
        withCurrency: '£43.23',
        currency: '£'
      })
    })
    it('displays EUR correctly', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'en-gb'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, 'EUR')).toEqual({
        asOne: '43.23',
        fraction: '23',
        integerAndDecimal: '43.',
        withCurrency: '€43.23',
        currency: '€'
      })
    })
  })

  describe('when an invalid locale is provided', () => {
    it('uses the default locale for formatting', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'gibberish',
        defaultLocale: 'pt-pt'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(4323, 'EUR')).toEqual({
        asOne: '43,23',
        fraction: '23',
        integerAndDecimal: '43,',
        withCurrency: '43,23',
        currency: undefined
      })
    })

    it('returns undefined when no value is provided', () => {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale: 'gibberish',
        defaultLocale: 'pt-pt'
      }))

      const { result } = renderHook(() => useFormatPrice())
      expect(result.current(undefined, 'EUR')).toEqual({
        asOne: undefined,
        fraction: undefined,
        integerAndDecimal: undefined,
        withCurrency: undefined,
        currency: undefined
      })
    })
  })
})
