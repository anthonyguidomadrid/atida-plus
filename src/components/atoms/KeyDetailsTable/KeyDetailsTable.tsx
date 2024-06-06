import type { FunctionComponent } from 'react'
import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PricePerUnit, useFormatPrice } from '~domains/product'
import NextLink from 'next/link'
import { Link } from '../../atoms/Link'

export type KeyDetailsTableProps = {
  format: {
    code: string
    label: string
  }
  brandDetailsPageUrl?: string
  unitPrice?: PricePerUnit
  brand: {
    code: string
    label: string
  }
  msrp?: {
    value: number
    currency: string
  }
}

export const KeyDetailsTable: FunctionComponent<KeyDetailsTableProps> = ({
  format,
  unitPrice,
  brand,
  msrp,
  brandDetailsPageUrl,
  ...props
}) => {
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()

  return (
    <dl
      data-testid="keyDetailsTable"
      className={classNames(
        'bg-ui-guyabano',
        'grid',
        'p-3',
        'grid-cols-1',
        'gap-2',
        'text-sm',
        'sm:grid-cols-pdp-key-details-table-sm',
        'sm:grid-flow-col',
        'sm:grid-rows-2',
        'sm:text-base',
        'sm:gap-2.5',
        'lg:gap-3',
        'lg:p-4'
      )}
      {...props}
    >
      {format && (
        <div data-testid="format">
          <dt className="font-semibold">{t('product.type-title')}</dt>
          <dd data-testid="productFormat">{format.label}</dd>
        </div>
      )}
      {brand && (
        <div data-testid="brand">
          <dt className="font-semibold">{t('product.brand-title')}</dt>
          {brandDetailsPageUrl ? (
            <NextLink
              data-testid="productBrand"
              href={`${brandDetailsPageUrl}`}
              passHref
              prefetch={false}
            >
              <Link>{brand.label}</Link>
            </NextLink>
          ) : (
            <dd data-testid="productBrand">{brand.label}</dd>
          )}
        </div>
      )}
      {unitPrice && (
        <div data-testid="price">
          <dt className="font-semibold">{t('product.price-title')}</dt>
          <dd data-testid="unitPrice">
            {formatPrice(unitPrice.value, unitPrice.currency).asOne} /{' '}
            {unitPrice.unit}
          </dd>
        </div>
      )}
      {msrp && (
        <div data-testid="msrp">
          <dt className="font-semibold">{t('product.msrp-title')}</dt>
          <dd data-testid="productMSRP">
            {formatPrice(msrp.value, msrp.currency).asOne}
          </dd>
        </div>
      )}
    </dl>
  )
}
