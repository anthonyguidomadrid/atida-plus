import { useRouter } from 'next/router'

export type AmountFormatter = (
  amount: number,
  unit: string,
  unit_label?: string
) => string

export const useFormatAmount = (): AmountFormatter => {
  const { locale } = useRouter()
  return (amount: number, unit: string, unit_label?: string) => {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: unit.toLowerCase()
      })
      return formatter.format(amount).toLowerCase()
    } catch {
      // unit not valid for built in formatter
      return unit === 'PIECE' || unit === 'PACK'
        ? `${Number(amount).toString()} ${unit_label}`.toLowerCase()
        : `${amount} ${unit}`.toLowerCase()
    }
  }
}
