import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { OrderSummaryProductTile } from '~components/molecules/OrderSummaryProductTile'
import { Link } from '~components/atoms/Link'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { InfinitePagination } from '~components/molecules/InfinitePagination'
import { Product } from '~domains/product/types'
import { BasketItem } from '~domains/basket/types'
import { OrderDetailsSingleItem } from '~domains/account'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

export type OrderSummaryProductListProps = ComponentPropsWithoutRef<'div'> & {
  items: ((BasketItem & OrderDetailsSingleItem) & {
    product: Omit<Partial<Product>, 'sku' | 'price'>
  })[]
  currency?: string
  loadMore?: boolean
  handleLoadMore?: () => void
  showLoadMoreButton?: boolean
  paymentOrdered?: boolean
}

export const OrderSummaryProductList: FunctionComponent<OrderSummaryProductListProps> = ({
  items,
  currency,
  loadMore,
  handleLoadMore,
  showLoadMoreButton,
  paymentOrdered
}) => {
  const { t } = useTranslation()
  const productsToShowInitially = 3

  const isPromotionalItemsPriceZeroEnabled = useFeatureFlag(
    FeatureFlag.BASKET_PROMOTIONAL_ITEMS_PRICE_ZERO
  )

  const getItemPrice = (item: BasketItem & OrderDetailsSingleItem) => {
    if (
      isPromotionalItemsPriceZeroEnabled &&
      item.isPromo &&
      item.isFullyDiscounted
    )
      return 0
    if (item.isPromo && !item.isFullyDiscounted)
      return item.unitPriceToPayAggregation
    if (paymentOrdered) return item.sumSubtotalAggregation
    return item.subtotal
  }

  return (
    <div
      data-testid="orderSummaryProductList"
      className={classNames(
        'bg-primary-white w-full',
        paymentOrdered && 'border-t border-ui-grey-lightest'
      )}
    >
      {items &&
        items?.map((item, index) => {
          if (
            showLoadMoreButton &&
            index >= productsToShowInitially &&
            !loadMore
          ) {
            return
          }
          return (
            <OrderSummaryProductTile
              key={index}
              data-testid="orderSummaryProductTile"
              product={
                paymentOrdered ? ((item as unknown) as Product) : item.product
              }
              idx={index}
              name={paymentOrdered ? item.metadata?.name : item.product?.name}
              quantity={item.quantity}
              format={
                paymentOrdered ? item.metadata?.format : item.product?.format
              }
              unitVolume={
                paymentOrdered
                  ? item.metadata?.unitVolume
                  : item.product?.unitVolume
              }
              contentSizeFactor={
                paymentOrdered
                  ? item.metadata?.contentSizeFactor
                  : item.product?.contentSizeFactor
              }
              price={{
                currency,
                value: getItemPrice(item)
              }}
              rrp={{ currency, value: item.product?.rrp?.value }}
              image={{
                url: paymentOrdered
                  ? item.metadata?.thumbnailImage
                  : item.product?.thumbnailImage,
                description: `Image of ${
                  paymentOrdered ? item.metadata?.name : item.product?.name
                }`
              }}
              isPromo={item.isPromo}
              isFullyDiscounted={item.isFullyDiscounted}
              isSample={
                item.product
                  ? item.product.notForSaleType === 'sample'
                  : item.metadata.notForSaleType === 'sample'
              }
            />
          )
        })}
      {showLoadMoreButton && items.length > 3 && (
        <InfinitePagination
          itemsPartialNumber={'product.partial-number-of-products'}
          loadMoreText={t('checkout.load-more-products')}
          className="mt-4 px-2"
          current={!loadMore ? productsToShowInitially : items.length}
          total={items.length}
          hasMore={!loadMore}
          loadMore={handleLoadMore}
          isInCheckout
          data-testid="InfinitePagination"
        />
      )}
      {!paymentOrdered && (
        <div
          className={classNames(
            'flex flex-col border-t border-b border-ui-grey-lightest py-2 mt-1 px-2'
          )}
        >
          <NextLink passHref href={'/basket'} prefetch={false}>
            <Link className="underline">{t('basket.back-link')}</Link>
          </NextLink>
        </div>
      )}
    </div>
  )
}
