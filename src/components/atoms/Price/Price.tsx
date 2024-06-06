import React, { FunctionComponent, useMemo } from 'react'
import classNames from 'classnames'
import {
  PricePerUnit,
  useFormatPrice,
  Price as PriceType
} from '~domains/product'

export type PriceProps = {
  price: PriceType
  pricePerUnit?: PricePerUnit
  rrp?: PriceType
  showRRP?: boolean
  className?: string
  isVertical?: boolean
  isCompact?: boolean
  size?: 'small' | 'medium' | 'large'
  rrpSize?: 'base' | 'large'
  superscriptDecimals?: boolean
  isPricePerUnitBelowRRP?: boolean
  isPricePerUnitOnTheLeft?: boolean
  rrpColor?: 'primary' | 'secondary' | 'secondary-dark' | 'tertiary'
  priceType?: string
}

export const Price: FunctionComponent<PriceProps> = ({
  price,
  pricePerUnit,
  rrp,
  rrpColor = 'primary',
  className,
  isVertical = false,
  size = 'large',
  rrpSize = 'large',
  superscriptDecimals = false,
  isPricePerUnitBelowRRP = false,
  isPricePerUnitOnTheLeft = false,
  isCompact = false,
  showRRP,
  priceType,
  ...props
}) => {
  const formatPrice = useFormatPrice()
  const mainPrice = useMemo(() => formatPrice(price?.value, price?.currency), [
    price,
    formatPrice
  ])
  const rrpPrice = useMemo(
    () => (rrp ? formatPrice(rrp.value, rrp.currency).withCurrency : ''),
    [rrp, formatPrice]
  )
  const pricePerUnitLabel = useMemo(
    () =>
      pricePerUnit
        ? formatPrice(pricePerUnit.value, pricePerUnit.currency).withCurrency
        : '',
    [pricePerUnit, formatPrice]
  )

  const rrpBlock = rrp && showRRP && (
    <div
      data-testid="priceRRP"
      className={classNames('block line-through', {
        'text-lg': !isCompact || rrpSize === 'large',
        'text-base': isCompact || rrpSize === 'base',
        'text-primary-oxford-blue': rrpColor === 'primary',
        'text-ui-grey': rrpColor === 'secondary',
        'text-ui-grey-dark': rrpColor === 'secondary-dark',
        'text-secondary-portland-orange': rrpColor === 'tertiary'
      })}
    >
      {priceType ? (
        <span>
          {priceType}
          {/* TODO: We need to know which reference is depending on the price type */}
          <sup style={{ fontSize: 9.6 }}>1</sup>{' '}
        </span>
      ) : (
        ''
      )}
      {rrpPrice}
    </div>
  )

  const pricePerUnitBlock = pricePerUnit && !!pricePerUnit.unit && (
    <div
      data-testid="pricePricePerUnit"
      className={classNames('text-ui-grey-dark', {
        'text-xs': size === 'medium'
      })}
    >{`${pricePerUnitLabel} / ${pricePerUnit.unit}`}</div>
  )

  if (size === 'small')
    return (
      <div className={classNames('h-full flex items-center', className)}>
        {showRRP && (
          <div
            className={classNames('line-through text-sm', {
              'text-ui-grey-dark': rrpColor === 'secondary',
              'text-secondary-portland-orange': rrpColor === 'tertiary'
            })}
          >
            {rrpPrice}
          </div>
        )}
        <div className="font-bold">{mainPrice.withCurrency}</div>
      </div>
    )

  return (
    <div
      data-testid="price"
      className={classNames({
        'space-y-0.5': size === 'large',
        'flex justify-between items-center': isPricePerUnitOnTheLeft
      })}
    >
      <div
        data-testid="price"
        className={classNames('flex', className, {
          'flex-col': isVertical,
          'flex-col-reverse': isCompact,
          'space-x-2 md:space-x-2 items-center': !isVertical && !isCompact
        })}
        {...props}
      >
        <div
          data-testid="pricePrice"
          className={classNames({
            'text-4xl': size === 'large' && !isCompact,
            'text-3xl': size === 'medium' && !isCompact,
            'font-bold': !isCompact,
            'font-bold text-base': isCompact,
            block: !superscriptDecimals,
            flex: superscriptDecimals
          })}
        >
          {superscriptDecimals ? (
            <span className="text-6xl leading-none">
              {mainPrice.integerAndDecimal}
              <sup className="text-sm -top-2">{`${mainPrice.fraction}${mainPrice.currency}`}</sup>
            </span>
          ) : (
            mainPrice.withCurrency
          )}
        </div>
        {isPricePerUnitBelowRRP ? (
          <div>
            {rrpBlock}
            {pricePerUnitBlock}
          </div>
        ) : (
          rrpBlock
        )}
      </div>
      {!isPricePerUnitBelowRRP && pricePerUnitBlock}
    </div>
  )
}
