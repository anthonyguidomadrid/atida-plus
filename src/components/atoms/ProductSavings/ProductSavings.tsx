import classNames from 'classnames'
import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

import { Price, useFormatPrice } from '~domains/product'

export type ProductSavingsProps = {
  price?: Price
  rrp?: Price
  className?: string
}

export const ProductSavings: FunctionComponent<ProductSavingsProps> = ({
  price,
  rrp,
  className
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const [showSavings, showPercentageSaving] = useFeatureFlags([
    FeatureFlag.PRODUCT_PDP_SHOW_SAVINGS,
    FeatureFlag.EXPERIMENT_PDP_SHOW_SAVING_PERCENTAGE
  ])

  const savings = useMemo(() => {
    if (!rrp || !price) return 0
    if (rrp.value < price.value) return 0
    return rrp.value - price.value
  }, [rrp, price])

  const percentageSaving = useMemo(() => {
    if (!rrp) return 0
    return Math.trunc((savings * 100) / rrp.value)
  }, [rrp, savings])

  if (!showSavings || !savings) return null

  return (
    <div>
      <div
        className={classNames('text-base h-2.5', className, {
          hidden: showPercentageSaving
        })}
        data-testid="productSavingsContainer"
      >
        {t('product.you-save')}{' '}
        <span
          className="font-bold text-primary-caribbean-green-dark"
          data-testid="productSavings"
        >
          {formatPrice(savings, price?.currency).withCurrency}
        </span>
      </div>
      <div
        data-testid="productPercentageSavings"
        className={
          !showPercentageSaving
            ? 'hidden'
            : 'text-secondary-portland-orange font-semibold text-sm md:text-base'
        }
      >
        -{percentageSaving}%
      </div>
    </div>
  )
}
