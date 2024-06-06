import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useMemo
} from 'react'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import { Product } from '~domains/product/types'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { useFormatAmount } from '~domains/product'
import classNames from 'classnames'
import { Price } from '~components/atoms/Price'
import { Link } from '~components/atoms/Link'
import { Availability } from '~components/atoms/Availability'
import { Image } from '~components/atoms/Image'
import { Reviews } from '~components/atoms/Reviews'
import { useDispatch } from 'react-redux'
import { triggerReportProductClicked } from '~domains/analytics'
import { DEFAULT_PRODUCT_IMAGE_SIZE } from '~config/constants/images'

export type MinifiedProductTileProps = {
  product: Partial<Product>
  className?: string
  isMainProduct?: boolean
  onSelect?: (sku: string, value: boolean) => void
  isSelected?: boolean
  showCheckbox: boolean
  recommendationId?: string
}

const ProductLink: FunctionComponent<{
  href?: string
  children?: ReactNode
}> = ({ href, children }) =>
  href ? (
    <NextLink href={href} passHref prefetch={false}>
      {children}
    </NextLink>
  ) : (
    <>{children}</>
  )

export const MinifiedProductTile: FunctionComponent<MinifiedProductTileProps> = ({
  product,
  isMainProduct = false,
  className,
  isSelected,
  showCheckbox = false,
  recommendationId,
  onSelect
}) => {
  const {
    format,
    unitVolume,
    productDatImage,
    mediumImage,
    name,
    sku = ''
  } = product

  const { t } = useTranslation()
  const formatAmount = useFormatAmount()
  const dispatch = useDispatch()

  const handleSelect = useCallback(
    (
      e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      e.preventDefault()
      e.stopPropagation()
      onSelect && onSelect(sku, !isSelected)
    },
    [isSelected, onSelect, sku]
  )

  const formattedUnitVolume = unitVolume
    ? formatAmount(unitVolume.amount, unitVolume.unit, unitVolume.unitLabel)
    : null

  const isAvailable = useMemo(() => product.availability === 'AVAILABLE', [
    product
  ])

  const handleProductClicked = () => {
    dispatch(
      triggerReportProductClicked({
        product,
        list_id: 'recommended_list',
        recommendation_id: recommendationId
      })
    )
  }

  return showCheckbox ? (
    <button
      data-testid={`minifiedProductTile-${sku}`}
      className={classNames(
        'border p-2 gap-2 flex items-center justify-between cursor-pointer w-full font-light',
        className,
        {
          'border-ui-grey-dark focus:outline-none': isSelected,
          'border-ui-grey-lightest focus:outline-none hover:border-ui-grey': !isSelected,
          'pointer-events-none border-secondary-dark-pink': !isAvailable
        }
      )}
      onClick={handleSelect}
      onKeyDown={handleSelect}
    >
      <div className="flex items-center">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="absolute opacity-0 cursor-pointer"
            data-testid="MinifiedProductTileInput"
          />
          <span
            className={classNames(
              'flex grow-0 shrink-0 items-center justify-center w-2 h-2 cursor-pointer',
              {
                'border-primary-oxford-blue bg-primary-oxford-blue border':
                  isSelected && product.availability === 'AVAILABLE',
                'border-ui-grey-lightest border': !isSelected
              }
            )}
          >
            {isAvailable && isSelected && (
              <Checkmark className="h-2 text-primary-white" />
            )}
          </span>
        </label>
        <div className="min-w-8 w-8 h-8 mx-2">
          <Image
            src={productDatImage || mediumImage || ''}
            platform="bynder"
            alt={product.name}
            className="w-full h-full"
            data-testid="MinifiedProductTileImage"
            loading="lazy"
            width={DEFAULT_PRODUCT_IMAGE_SIZE}
            height={DEFAULT_PRODUCT_IMAGE_SIZE}
            useAlternativeFormats={!!productDatImage}
            fallbackImageElement={
              <img
                src={mediumImage}
                alt={name}
                loading="lazy"
                className="w-full h-full object-cover"
                data-testid="MinifiedProductTileImage"
              />
            }
          />
        </div>
        <div className="flex flex-col items-start">
          {isMainProduct &&
            (isAvailable ? (
              <span
                data-testid="MinifiedProductTilePrincipalProduct"
                className="font-semibold bg-primary-oxford-blue-5 px-0.5 pt-0.75 pb-0.5 leading-none text-xs mb-0.75"
              >
                {t('product.principalProduct')}
              </span>
            ) : (
              <Availability
                availability={product.availability}
                data-testid="MinifiedProductTileOutStock"
              />
            ))}

          {isMainProduct ? (
            <p className="no-underline text-sm text-primary-oxford-blue font-semibold mb-0.5 line-clamp-1 text-left">
              {name}
            </p>
          ) : (
            <ProductLink href={product.url}>
              <Link
                trackingHandler={handleProductClicked}
                className="no-underline text-sm text-primary-oxford-blue font-semibold mb-0.5 line-clamp-1 hover:underline text-left"
              >
                {name}
              </Link>
            </ProductLink>
          )}
          <div className="flex items-center text-sm text-ui-grey space-x-0.5">
            {[format?.label, formattedUnitVolume]
              .filter(value => !!value)
              .join(' - ')}
          </div>
        </div>
      </div>
      {product.price && (
        <Price
          rrpColor="secondary"
          className="flex-col-reverse self-start"
          size="small"
          price={product.price}
          isVertical
          showRRP
          rrp={product.rrp}
        />
      )}
    </button>
  ) : (
    <div
      onKeyDown={handleProductClicked}
      tabIndex={0}
      role="button"
      onClick={handleProductClicked}
    >
      <ProductLink href={product.url}>
        <Link
          className={classNames(
            'no-underline border border-ui-grey-light hover:border-ui-grey p-2 gap-2 flex items-center justify-between cursor-pointer w-full font-light hover:text-primary-oxford-blue',
            className,
            {
              'pointer-events-none border-secondary-dark-pink':
                product.availability === 'NOT_AVAILABLE'
            }
          )}
        >
          <div className="flex items-center">
            <div className="min-w-8 w-8 h-8 mx-2">
              <Image
                src={productDatImage || mediumImage || ''}
                platform="bynder"
                alt={product.name}
                className="w-full h-full"
                data-testid="MinifiedProductTileImage"
                loading="lazy"
                width={DEFAULT_PRODUCT_IMAGE_SIZE}
                height={DEFAULT_PRODUCT_IMAGE_SIZE}
                useAlternativeFormats={!!productDatImage}
                fallbackImageElement={
                  <img
                    src={mediumImage}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    data-testid="MinifiedProductTileImage"
                  />
                }
              />
            </div>
            <div className="flex flex-col items-start">
              {product && product.availability === 'NOT_AVAILABLE' && (
                <Availability
                  availability={product.availability}
                  data-testid="MinifiedProductTileOutStock"
                />
              )}

              <p className="no-underline text-sm text-primary-oxford-blue font-semibold mb-0.5 line-clamp-1 text-left">
                {name}
              </p>

              <p className="flex items-start text-sm text-ui-grey mb-0.5">
                {format?.label} {formattedUnitVolume}
              </p>
              <Reviews data-tesid="MinifiedProductTileReviews" />
            </div>
          </div>

          {product.price && (
            <Price
              rrpColor="secondary"
              className="flex-col-reverse self-start"
              size="small"
              price={product.price}
              isVertical
              showRRP
              rrp={product.rrp}
            />
          )}
        </Link>
      </ProductLink>
    </div>
  )
}
