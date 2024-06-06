import { v4 as uuid } from 'uuid'

import { Product } from '~domains/product'

export type ProductReviewsProps = {
  product: Product
}

export const ProductReviews = ({ product }: ProductReviewsProps) => (
  <div
    className="yotpo yotpo-main-widget min-h-27"
    data-product-id={product.sku}
    data-price={product.price.value / 100}
    data-currency={product.price.currency}
    data-name={product.name}
  >
    <ProductReviewPlaceholder />
  </div>
)

export const ProductReviewPlaceholder = () => (
  <div className="space-y-3 md:space-y-0 md:space-x-6 md:flex opacity-50">
    <div className="flex space-x-3">
      <div className="bg-ui-grey-lightest h-9 w-9 rounded" />
      <div className="space-y-1">
        <div className="h-3 w-14 bg-ui-grey-lightest rounded" />
        <div className="h-3 w-10 bg-ui-grey-lightest rounded" />
      </div>
    </div>
    <div className="space-y-3 flex-1">
      {Array(5)
        .fill('')
        .map(() => (
          <div key={uuid()} className="flex space-x-2">
            <div className="h-1 w-2 bg-ui-grey-lightest rounded" />
            <div className="bg-ui-grey-lightest h-1 rounded flex-1" />
          </div>
        ))}
    </div>
  </div>
)
