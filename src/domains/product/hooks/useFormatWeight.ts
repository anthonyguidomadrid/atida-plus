import { useRouter } from 'next/router'

export type WeightFormatter = (
  amount: number,
  unit: string,
  unit_label?: string
) => string

export const useFormatWeight = (): WeightFormatter => {
  const { locale } = useRouter()
  return (amount: number, unit: string, unit_label?: string) => {
    try {
      // This is built in JS formatter which enables language-sensitive formatting based on the locale
      // For example if Germany and Austria have different way of formatting the weight it will be automatically applied based on the locale
      const formatter = new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: unit.toLowerCase()
      })
      return formatter.format(amount).toLowerCase()
    } catch {
      // Unit not valid for built in formatter. If the formatter fails we just show the concatenated amount and unit label
      return `${Number(amount).toString()} ${unit_label}`.toLowerCase()
    }
  }
}
