import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Availability } from '~components/atoms/Availability'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type ProductAvailabilityProps = {
  availability?: string
  quantityLeft?: number
  availabilitySize?: 'xs' | 'base'
}

export const ProductAvailability: FunctionComponent<ProductAvailabilityProps> = ({
  availability,
  quantityLeft,
  availabilitySize = 'xs'
}) => {
  const { t } = useTranslation()
  const isScarcityMessagingEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_PDP_SHOW_SCARCITY_MESSAGE
  )
  const scarcityMessageThreshold = useFeatureFlag(
    FeatureFlag.PRODUCT_PDP_PRODUCT_SCARCITY_THRESHOLD
  ) as number

  if (
    isScarcityMessagingEnabled &&
    availability === 'AVAILABLE' &&
    typeof quantityLeft === 'number' &&
    typeof scarcityMessageThreshold === 'number' &&
    quantityLeft <= scarcityMessageThreshold
  )
    return (
      <span
        data-testid="scarcity"
        className="text-xs font-semibold text-labels-tangerine-base md:text-secondary-orange-60 py-0.25 px-2 md:px-1 bg-secondary-orange-100 mb-0.5"
      >
        {t('product.availability.low-stock')}
      </span>
    )

  return (
    <Availability
      className={availabilitySize === 'base' ? undefined : 'mb-0.5'}
      availability={availability}
      size={availabilitySize}
    />
  )
}
