import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export type SearchCountProps = ComponentPropsWithoutRef<'span'> & {
  count: number
}

export const SearchCount: FunctionComponent<SearchCountProps> = ({
  count,
  className,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <span
      className={classNames(
        'text-base text-ui-grey-dark sm:pt-2.25 md:pt-1',
        'whitespace-nowrap',
        className
      )}
      {...props}
    >
      {t('product.total-number-of-products', { count })}
    </span>
  )
}
