import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { ReactComponent as Warning } from '~assets/svg/navigation-24px/Warning.svg'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export type AvailabilityWarningBlockProps = {
  productName?: string
  productQuantity?: number
  isPromotionalItem?: boolean
}

export const AvailabilityWarningBlock: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & AvailabilityWarningBlockProps
> = ({ productName, productQuantity, isPromotionalItem }) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        'flex flex-row bg-feedback-warning-light px-3 py-2 my-2 sm:mx-0 xs:mx-2',
        { 'justify-between': !isPromotionalItem }
      )}
      data-testid="availabilityWarningBlock"
    >
      <div className="mr-2">
        <Warning className="icon-24 text-feedback-warning" />
      </div>
      <div className="flex flex-col">
        <p
          className="font-body text-lg text-feedback-warning pb-1.5"
          data-testid="availabilityWarningTitle"
        >
          {t(
            isPromotionalItem
              ? 'promotional-item.availability.warning.block-title'
              : 'product.availability.warning.block-title'
          )}
        </p>
        {isPromotionalItem ? (
          <p className="text-base font-body">
            {t('promotional-item.availability.warning.block-description')}
          </p>
        ) : (
          <p className="text-base font-body">
            ({t('product.availability.warning.block-description-1')}{' '}
            <span className="text-base font-body font-semibold">
              {productName}{' '}
            </span>
            {t('product.availability.warning.block-description-2')}{' '}
            <span className="text-base font-body font-semibold">
              {productQuantity}
            </span>
            .)
          </p>
        )}
      </div>
    </div>
  )
}
