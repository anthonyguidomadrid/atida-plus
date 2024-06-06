import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'

import { InfoLabelEnum } from '~domains/product'
import { CampaignLabelWrapper } from '../CampaignLabel/CampaignLabel'

export type ProductLabelProps = ComponentPropsWithoutRef<'span'> & {
  variant?: InfoLabelEnum
  label?: string
}

export const InfoLabel: FunctionComponent<ProductLabelProps> = ({
  className,
  variant,
  label,
  ...props
}) => {
  const variantsMapping = {
    isPromo: variant === InfoLabelEnum.Promotion,
    isCampaignPromoKey:
      variant === InfoLabelEnum.CampaignPromotion &&
      label &&
      label.split('.').length > 2, // label key is of format campaign-promo.promo-name.promo-key
    isDiscount: variant === InfoLabelEnum.Discount,
    isAddress: variant === InfoLabelEnum.Address,
    isAddressDisabled: variant === InfoLabelEnum.AddressDisabled,
    isCampaign: variant === InfoLabelEnum.CampaignPromotion,
    isPricingTagOutlet: variant === InfoLabelEnum.PricingTagOutlet,
    isPricingTagMini: variant === InfoLabelEnum.PricingTagMini
  }

  //Campaign labels have their own content-type (translationInfoLabel)
  if (variantsMapping.isCampaign && !variantsMapping.isCampaignPromoKey)
    return <CampaignLabelWrapper id={label} />

  return (
    <div
      className={classNames(
        'w-full px-0.75 text-xs leading-6 truncate font-normal',
        className,
        {
          'bg-secondary-portland-orange text-primary-white':
            variantsMapping.isPromo || variantsMapping.isCampaignPromoKey,
          'bg-secondary-champagne-pink text-secondary-portland-orange':
            variantsMapping.isDiscount,
          'bg-primary-caribbean-green-light text-primary-oxford-blue flex max-h-3':
            variantsMapping.isAddress,
          'bg-ui-guyabano text-primary-oxford-blue flex max-h-3':
            variantsMapping.isAddressDisabled,
          'bg-labels-coral-red-light text-labels-coral-red-base':
            variantsMapping.isPricingTagOutlet,
          'bg-labels-tangerine-light text-labels-tangerine-base':
            variantsMapping.isPricingTagMini
        }
      )}
      {...props}
    >
      {props?.children}
    </div>
  )
}
