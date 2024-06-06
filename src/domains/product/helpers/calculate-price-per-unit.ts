import { PricePerUnit } from '../types'
import { translateUnit } from './translate-unit'

const unitIs = (unit: string, ...types: string[]) => types.includes(unit)
const calculateUnitAmount = (unit: string, amount: number, value: number) => {
  if (
    (unitIs(unit, 'kilogram', 'liter', 'meter') && amount > 0.25) ||
    unitIs(unit, 'piece')
  ) {
    return value / amount
  }

  if (unitIs(unit, 'gram', 'milliliter', 'millimeter') && amount > 250) {
    return (value / amount) * 1000
  }

  if (unitIs(unit, 'kilogram', 'meter', 'liter') && amount <= 0.25) {
    return value / (amount * 10)
  }

  if (
    (unitIs(unit, 'gram', 'milliliter', 'millimeter') && amount <= 250) ||
    (unitIs(unit, 'centimeter') && amount > 25)
  ) {
    return (value / amount) * 100
  }

  if (unitIs(unit, 'centimeter') && amount <= 25) {
    return (value / amount) * 10
  }

  return 0
}

export const calculatePricePerUnit = ({
  price,
  contentSize,
  contentSizeFactor,
  locale
}: {
  price: { currency: string; sale: number; rrp?: number }
  contentSize: { unit: string; amount: number; unit_label: string }
  contentSizeFactor?: number
  locale?: string
}): PricePerUnit => {
  locale = locale?.replace('_', '-')
  const currency = price.currency
  const contentUnit = contentSize.unit.toLocaleLowerCase(locale)
  const contentAmount = Number(contentSize.amount) * (contentSizeFactor ?? 1)
  let unit
  let value = price.sale ?? price.rrp

  value = calculateUnitAmount(contentUnit, contentAmount, value)

  // TODO: RX => no base price Not applicable for PT and ES launch

  // TODO: Setartikel => no base price (note: set = different articles as one product; bundle = same articles as one product; for bundles base price rules apply) Out of scope

  if (!contentAmount || contentAmount <= 0) {
    unit = ''
    value = 0
    // TODO: report to be checked by PM
  } else if (
    (unitIs(contentUnit, 'gram', 'milliliter', 'millimeter') &&
      contentAmount < 10) ||
    (unitIs(contentUnit, 'kilogram', 'liter', 'meter') && // TODO: Add support for m2
      contentAmount < 0.01) // TODO: OR (unit = µg AND amount < 10.000)
  ) {
    unit = ''
    value = 0
  } else if (
    (unitIs(contentUnit, 'kilogram') && contentAmount > 0.25) ||
    (unitIs(contentUnit, 'gram') && contentAmount > 250) // TODO: OR (unit µg AND amount > 250.000)
  ) {
    unit = Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'kilogram'
    }).format(1)
  } else if (
    (unitIs(contentUnit, 'kilogram') && contentAmount <= 0.25) ||
    (unitIs(contentUnit, 'gram') && contentAmount <= 250) // TODO: OR (unit = µg AND amount <= 250.000)
  ) {
    unit = Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'gram'
    }).format(100)
  } else if (
    (unitIs(contentUnit, 'liter') && contentAmount > 0.25) ||
    (unitIs(contentUnit, 'milliliter') && contentAmount > 250)
  ) {
    unit = Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'liter'
    }).format(1)
  } else if (
    (unitIs(contentUnit, 'liter') && contentAmount <= 0.25) ||
    (unitIs(contentUnit, 'milliliter') && contentAmount <= 250)
  ) {
    unit = Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'milliliter'
    }).format(100)
  } else if (
    (unitIs(contentUnit, 'meter') && contentAmount > 0.25) ||
    (unitIs(contentUnit, 'centimeter') && contentAmount > 25) ||
    (unitIs(contentUnit, 'millimeter') && contentAmount > 250)
  ) {
    unit = Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'meter'
    }).format(1)
  } else if (
    (unitIs(contentUnit, 'meter') && contentAmount <= 0.25) ||
    (unitIs(contentUnit, 'centimeter') && contentAmount <= 25) ||
    (unitIs(contentUnit, 'millimeter') && contentAmount <= 250)
  ) {
    unit = Intl.NumberFormat(locale, {
      style: 'unit',
      unit: 'millimeter'
    }).format(100)
  }
  // TODO: unit = m² => base price based on 1 m²
  else if (unitIs(contentUnit, 'piece') && contentAmount > 1) {
    // For all other units (bottle, pieces, etc.) no base price is required and
    // in some instances even regarded as misleading.
    // Aponeo decided to display base price for products with
    // unit = pieces AND amount > 1 based on 1 piece.
    const translatedUnit = translateUnit(contentUnit, locale)
    unit = translatedUnit
  }

  return { value, currency, unit }
}
