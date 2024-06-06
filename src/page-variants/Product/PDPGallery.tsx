import classNames from 'classnames'
import { Tooltip } from '~components/atoms/Tooltip'
import { ProductLabels } from '~components/molecules/ProductLabels'
import { Gallery } from '~components/organisms/Gallery'
import { ReactComponent as Information } from '~assets/svg/navigation-24px/InformationSimple.svg'
import { ReactComponent as Like } from '~assets/svg/navigation-24px/Like.svg'
import { ReactComponent as LikeFilled } from '~assets/svg/navigation-24px/LikeFilled.svg'
import { selectProductData, selectShowLabels } from '~domains/product'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import {
  FavouriteButtonPlaceholder,
  FavouriteButtonProps
} from '~components/molecules/FavouriteButton'
import { PATH_DESCRIPTION } from '~config/constants/pages_description'
import { useHandleAddToFavourites } from '~helpers/useHandleAddToFavourites'
import { useHandleRemoveFromFavourites } from '~helpers/useHandleRemoveFromFavourites'
import { useRouter } from 'next/router'
import { usePromoInformation } from '~helpers/usePromoInformation'

const FavouritesButtonComponent = dynamic<FavouriteButtonProps>(
  () =>
    import('~components/molecules/FavouriteButton').then(
      c => c.FavouriteButton
    ),
  {
    loading: () => <FavouriteButtonPlaceholder />
  }
)

export const PDPGallery = () => {
  const router = useRouter()
  const product = useSelector(selectProductData)

  const handleAddToFavourites = useHandleAddToFavourites(router)
  const handleRemoveFromFavourites = useHandleRemoveFromFavourites(router)

  const favouritesButton = product && (
    <FavouritesButtonComponent
      data-testid="saveToFavouritesButton"
      product={product}
      iconDefault={<Like className={classNames('icon-24')} />}
      iconActive={<LikeFilled className={classNames('icon-24')} />}
      className="w-6 h-6 border-none absolute right-0"
      addedFrom={PATH_DESCRIPTION.PDP}
      addToFavourites={handleAddToFavourites}
      removeFromFavourites={handleRemoveFromFavourites}
    />
  )
  const doShowLabels = useSelector(selectShowLabels)

  const [isPageLoaded, setIsPageLoaded] = useState(false)
  useEffect(() => setIsPageLoaded(true), [])

  const [, promoInformation] = usePromoInformation()

  if (!product) return null
  return (
    <div
      className={classNames(
        'relative flex justify-center col-span-12 mb-3',
        'sm:col-span-6',
        'lg:col-span-7 lg:mb-6'
      )}
    >
      {!isPageLoaded || !product.images ? (
        <GalleryPlaceholder />
      ) : (
        <Gallery
          isLoading={!isPageLoaded}
          isLcp={true}
          images={product.images}
          videos={product.videos}
          productName={product.name}
          className="w-full h-full overflow-hidden"
        />
      )}

      {/* Tooltip + Labels */}
      {doShowLabels && (
        <ProductLabels
          data-testid="productLabels"
          labels={product.labels ?? []}
          className="absolute top-2 left-0 z-9 max-w-4/5"
          listItemClassName="w-fit max-w-full mb-1"
          tooltip={
            promoInformation ? (
              <Tooltip content={promoInformation} delay={200}>
                <Information className="icon-16 text-ui-grey" />
              </Tooltip>
            ) : undefined
          }
        />
      )}
      {/* Favourites Button */}
      <div className="absolute top-0 right-0 z-10">{favouritesButton}</div>
    </div>
  )
}

const GalleryPlaceholder = () => {
  return (
    <div className="min-h-32 w-full max-w-full h-full max-h-36 md:max-h-50 opacity-50 rounded">
      <img
        src="/images/no-image-Product%20Medium.png"
        alt="product-placeholder"
        className="object-contain w-full h-full p-5"
      />
    </div>
  )
}
