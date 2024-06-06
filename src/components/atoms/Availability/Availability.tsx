import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export type AvailabilityProps = {
  availability?: string
  qty?: number
  size?: 'xs' | 'base'
  className?: string
}

export const Availability: FunctionComponent<
  ComponentPropsWithoutRef<'span'> & AvailabilityProps
> = ({ availability, qty, size = 'xs', className, ...props }) => {
  const { t } = useTranslation()

  return (
    <span
      data-testid="availability"
      className={classNames(
        'block font-semibold mt-auto sm:mt-0',
        {
          'text-feedback-success': availability === 'AVAILABLE' && !qty,
          'text-feedback-error': availability !== 'AVAILABLE',
          'text-feedback-warning': availability === 'AVAILABLE' && qty,
          'text-xs': size === 'xs',
          'text-base': size === 'base'
        },
        className
      )}
      {...props}
    >
      {availability === 'AVAILABLE' &&
        !qty &&
        t('product.availability.in-stock')}
      {availability === 'AVAILABLE' &&
        qty &&
        qty > 0 &&
        `${qty} ${t('product.availability.items-left')}`}
      {availability === 'NOT_AVAILABLE' &&
        t('product.availability.out-of-stock')}
      {!availability && t('product.availability.out-of-stock')}
    </span>
  )
}
