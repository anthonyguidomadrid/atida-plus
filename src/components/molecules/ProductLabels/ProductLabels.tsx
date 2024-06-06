import { FunctionComponent, ReactElement, useMemo, Fragment } from 'react'
import classNames from 'classnames'
import { InfoLabel } from '~components/atoms/InfoLabel'
import type { ProductLabelWrapper } from '~domains/product'
import { InfoLabelEnum as ProductLabelType } from '~domains/product'
import { useTranslation } from 'react-i18next'
import { TooltipProps } from '~components/atoms/Tooltip'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type ProductLabelsProps = {
  labels?: ProductLabelWrapper[]
  className?: string
  listItemClassName?: string
  tooltip?: ReactElement<TooltipProps>
}

export const ProductLabels: FunctionComponent<ProductLabelsProps> = ({
  className = '',
  listItemClassName = '',
  labels,
  tooltip,
  ...props
}) => {
  const { t } = useTranslation()
  const isTooltipEnabled = useFeatureFlag(
    FeatureFlag.PDP_TOOLTIP_PROMOTION_INFO
  )

  const isShowDiscountLabelWithCampaignEnabled = useFeatureFlag(
    FeatureFlag.SHOW_DISCOUNT_LABELS_WITH_CAMPAIGN
  )

  const isPromoOrCampaign = (type: ProductLabelType): boolean =>
    type === ProductLabelType.Promotion ||
    type === ProductLabelType.CampaignPromotion

  const isPromo = (type: ProductLabelType): boolean =>
    type === ProductLabelType.Promotion

  const isPricing = (type: ProductLabelType): boolean =>
    type === ProductLabelType.PricingTagOutlet ||
    type === ProductLabelType.PricingTagMini

  // Go through all labels and check if both
  // promotion and discount labels exist
  const hasPromoLabels = useMemo(
    () =>
      labels && labels.findIndex(({ type }) => isPromoOrCampaign(type)) > -1,
    [labels]
  )
  // A product cannot have simultaneously a promotion or a campaign and a discount.
  // In the moment there is a promotion or a campaign, they take precedence over the discount.
  // Also if the discount is smaller than 5%, its label won't be displayed.

  const finalLabelsWithDiscountPriority = useMemo(
    () =>
      labels
        ? labels.filter(({ type, label }) => {
            return hasPromoLabels
              ? isPromoOrCampaign(type) ||
                  Number(label.substring(1, label.length - 1)) >= 5
              : isPricing(type) ||
                  Number(label.substring(1, label.length - 1)) >= 5
          })
        : [],
    [hasPromoLabels, labels]
  )

  const finalLabelsWithPricingPriority = useMemo(
    () =>
      labels
        ? labels.filter(({ type, label }) => {
            return hasPromoLabels
              ? isPromoOrCampaign(type) || isPricing(type)
              : Number(label.substring(1, label.length - 1)) >= 5 ||
                  isPricing(type)
          })
        : [],
    [hasPromoLabels, labels]
  )

  const finalLabels = isShowDiscountLabelWithCampaignEnabled
    ? finalLabelsWithDiscountPriority
    : finalLabelsWithPricingPriority

  if (!labels || labels?.length === 0 || finalLabels.length === 0) return null
  return finalLabels.length === 1 ? (
    <>
      <div
        className={classNames(
          {
            'flex space-x-1':
              tooltip && isTooltipEnabled && isPromo(finalLabels[0].type)
          },
          className
        )}
        {...props}
      >
        <InfoLabel
          data-testid="productLabel"
          variant={finalLabels[0].type}
          label={finalLabels[0].label}
        >
          {isPromoOrCampaign(finalLabels[0].type)
            ? t(finalLabels[0].label)
            : finalLabels[0].label}
        </InfoLabel>
        {tooltip && isTooltipEnabled && isPromo(finalLabels[0].type) && (
          <>{tooltip}</>
        )}
      </div>
    </>
  ) : (
    <ul data-testid="labelsList" className={className} {...props}>
      {finalLabels.map(({ type, label }, index) => {
        return (
          <Fragment key={`${type}-${index}`}>
            <li
              data-testid="productLabelList"
              key={label}
              className={classNames(
                {
                  'flex space-x-1': tooltip && isTooltipEnabled && isPromo(type)
                },
                listItemClassName
              )}
            >
              <InfoLabel
                data-testid="productLabel"
                variant={type}
                label={label}
              >
                {isPromoOrCampaign(type) ? t(label) : label}
              </InfoLabel>
              {tooltip && isTooltipEnabled && isPromo(type) && <>{tooltip}</>}
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}

export const ProductLabelsPlaceholder = () => (
  <div className="bg-ui-grey-lightest h-3 w-6 rounded absolute top-0 left-0 opacity-50" />
)
