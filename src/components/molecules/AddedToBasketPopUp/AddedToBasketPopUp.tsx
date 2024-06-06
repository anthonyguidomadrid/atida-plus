import {
  BaseSyntheticEvent,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import { Product } from '~domains/product'
import { ReactComponent as Add } from '~assets/svg/navigation-16px/NavAdd.svg'
import { Button } from '~components/atoms/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Image } from '~components/atoms/Image'
import { DEFAULT_POPUP_ANIMATION_DURATION } from '~config/constants/animation-duration-popup'
import { DEFAULT_PRODUCT_IMAGE_SIZE } from '~config/constants/images'

export type AddedToBasketPopUpProps = {
  products?: Partial<Product>[]
  animationDuration?: number
  onFinish: () => void
}

export const AddedToBasketPopUp: FunctionComponent<AddedToBasketPopUpProps> = ({
  products,
  animationDuration = DEFAULT_POPUP_ANIMATION_DURATION,
  onFinish
}) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const viewBasketTrigger = (event: BaseSyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)
    push('/basket')
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      onFinish()
    }, animationDuration)

    return () => {
      clearTimeout(timeOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="border border-ui-grey-lightest p-0 sm:p-3 w-full md:w-52 h-24 bg-primary-white shadow-2xl fixed top-9 right-0 md:right-auto md:top-10 z-40"
      data-testid="added-to-basket-popup"
    >
      <div className="relative h-9 w-full bg-ui-carribean-green-lightest rounded mb-0 sm:mb-3">
        <div className="relative overflow-hidden top-0 h-full rounded notification-addtobasket w-full flex items-center justify-center bg-ui-carribean-green-lightest">
          <p>
            {t('basket.multiple-products-added', {
              count: products && products.length
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 sm:p-0">
        {products?.length === 1 ? (
          <div className="flex items-center">
            {products?.map(product => (
              <div className="flex items-center pr-2" key={product.sku}>
                <div className="min-w-6 w-6 h-6 mr-1">
                  <Image
                    src={product.productDatImage || product.mediumImage || ''}
                    platform="bynder"
                    alt={product.name}
                    className="w-full h-full object-cover"
                    data-testid="added-to-basket-popup-image"
                    loading="lazy"
                    width={DEFAULT_PRODUCT_IMAGE_SIZE}
                    height={DEFAULT_PRODUCT_IMAGE_SIZE}
                    useAlternativeFormats={!!product.productDatImage}
                    fallbackImageElement={
                      <img
                        src={product.mediumImage}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        data-testid="MinifiedProductTileImage"
                      />
                    }
                  />
                </div>
                <p
                  className="line-clamp-2 text-sm"
                  data-testid="added-to-basket-popup-title"
                >
                  {product.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center">
            {products?.map((product, idx) => (
              <div className="flex items-center" key={product.sku}>
                <img
                  src={product.mediumImage}
                  alt={product.name}
                  key={product.sku}
                  className="w-6"
                  data-testid="added-to-basket-popup-image"
                />
                {idx !== products.length - 1 && (
                  <Add
                    className="icon-16 button__icon--before w-1.5 mx-1.25"
                    data-testid="freq-bought-together-plus-icon"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <Button
          data-testid="basketModalViewBasket"
          className="h-6 no-underline"
          onClick={viewBasketTrigger}
          isLoading={isLoading}
          variant="tertiary"
        >
          {t('basket.modal-view-basket')}
        </Button>
      </div>
    </div>
  )
}
