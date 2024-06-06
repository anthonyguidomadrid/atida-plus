import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFormatAmount } from '~domains/product'
import {
  formatContentAndBundleSizeFactor,
  formatContentSizeFactor
} from './formatContentSizeFactor'

export const useUnitVolumeWithContentSizeFactor = (
  unitVolume?: {
    unit: string
    amount: number
    unitLabel: string
  },
  contentSizeFactor?: number,
  bundleSizeFactor?: number
): string | null => {
  const { locale } = useRouter()
  const formatAmount = useFormatAmount()

  const formattedUnitVolume = useMemo(
    () =>
      unitVolume
        ? formatAmount(
            unitVolume.amount,
            unitVolume.unit,
            unitVolume?.unitLabel
          )
        : null,
    [formatAmount, unitVolume]
  )

  const unitVolumeWithContentSizeFactor = useMemo(
    () =>
      locale === 'de-de' && bundleSizeFactor
        ? formatContentAndBundleSizeFactor(
            formattedUnitVolume,
            contentSizeFactor,
            bundleSizeFactor
          )
        : formatContentSizeFactor(formattedUnitVolume, contentSizeFactor),
    [locale, contentSizeFactor, formattedUnitVolume, bundleSizeFactor]
  )

  return unitVolumeWithContentSizeFactor
}
