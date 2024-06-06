import React, { ReactNode, useCallback } from 'react'
import { DEFAULT_PRODUCT_IMAGE_SIZE } from '~config/constants/images'
import { FeatureFlags } from '~components/helpers/FeatureFlags/context'
import { FormattedPrice, Product } from '~domains/product'
import { formatContentSizeFactor } from '~helpers/formatContentSizeFactor'
import { Image } from '../Image'
import { Link } from '../Link'

export type SearchResultProps = {
  product: Partial<Product>
  handleClick: () => void
  mainPrice: FormattedPrice
  rrpPrice: FormattedPrice
  formattedUnitVolume: string | null
  featureFlags: FeatureFlags
  locale?: string
  children?: ReactNode
}

export const SearchResult = ({
  product,
  handleClick,
  mainPrice,
  rrpPrice,
  formattedUnitVolume,
  featureFlags,
  children,
  locale
}: SearchResultProps) => {
  const unitVolumeWithContentSizeFactor = formatContentSizeFactor(
    formattedUnitVolume,
    product?.contentSizeFactor
  )

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation()
      handleClick()
    },
    [handleClick]
  )

  return (
    <Link
      onClick={onClick}
      data-testid="search-result-link"
      className="aa-ItemLink"
      href={`${locale ? locale : ''}${product.url}`}
    >
      <div data-testid="search-result-wrapper" className="aa-ItemContent">
        <div className="aa-ItemInfoHolder">
          <div data-testid="search-result-image-wrapper" className="w-8 h-8">
            <Image
              src={product.productDatImage || product.thumbnailImage || ''}
              platform="bynder"
              alt={product.name}
              className="w-full h-full"
              loading="lazy"
              width={DEFAULT_PRODUCT_IMAGE_SIZE}
              height={DEFAULT_PRODUCT_IMAGE_SIZE}
              useAlternativeFormats={!!product.productDatImage}
              fallbackImageElement={
                <img
                  loading="lazy"
                  className="w-full h-full"
                  src={product.thumbnailImage}
                  alt={product.name}
                />
              }
              fallbackFeatureFlags={featureFlags}
            />
          </div>
          <div
            data-testid="search-result-item-name"
            className="aa-ItemNameHolder"
          >
            <p className="line-clamp-2">{children}</p>
            <span>{unitVolumeWithContentSizeFactor}</span>
          </div>
        </div>
        <div>
          {product.rrp && mainPrice.asOne !== rrpPrice.asOne && (
            <span
              data-testid="priceRRP"
              className="block text-base leading-6 line-through text-right text-ui-grey-dark"
            >
              {rrpPrice.asOne}
            </span>
          )}
          <div data-testid="search-result-item-price" className="aa-ItemPrice">
            {mainPrice.asOne}
          </div>
        </div>
      </div>
    </Link>
  )
}
