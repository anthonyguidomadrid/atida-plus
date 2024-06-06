import {
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { triggerReportProductFavourites } from '~domains/analytics'
import {
  selectAddToFavouritesItems,
  selectFavouritesItems,
  selectRemoveFromFavouritesItems,
  selectForceRefresh
} from '~domains/favourites'
import { Product } from '~domains/product'
import { Button } from '~components/atoms/Button'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { getGuestFavouritesItems } from '~helpers/guest-favourites'
import {
  FavouritesItemsIds,
  favouritesProductState
} from '~domains/favourites/types'

export type FavouriteButtonProps = {
  product: Product
  addToFavourites?: (sku: string) => void
  removeFromFavourites?: (sku: string) => void
  addedFrom?: string
  className?: string
  iconDefault?: FunctionComponentElement<SVGAttributes<'svg'>>
  iconActive?: FunctionComponentElement<SVGAttributes<'svg'>>
  isFavouritesPage?: boolean
}

export const FavouriteButton: FunctionComponent<FavouriteButtonProps> = ({
  product,
  addToFavourites,
  removeFromFavourites,
  addedFrom,
  iconDefault,
  iconActive,
  isFavouritesPage = false,
  className = '',
  ...props
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const forceRefreshProduct = useSelector(selectForceRefresh)
  const storedFavouritesItems = useSelector(selectFavouritesItems)
  const guestFavouritesItems = getGuestFavouritesItems()
  const [favourites, setFavourites] = useState<FavouritesItemsIds>([])
  const addToFavouritesIsLoading = useSelector(selectAddToFavouritesItems)
  const removeFromFavouritesIsLoading = useSelector(
    selectRemoveFromFavouritesItems
  )
  const productSku = product.sku ?? product.id
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isFavouritesFeatureEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_ALL_PAGES
  )
  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  const handleAddToFavourites = useCallback(() => {
    if (favourites && favourites.includes(productSku)) {
      removeFromFavourites?.(productSku)
      dispatch(
        triggerReportProductFavourites({
          event: 'Product Removed from Favourites',
          product,
          removed_from: addedFrom
        })
      )
    } else {
      addToFavourites?.(productSku)
      dispatch(
        triggerReportProductFavourites({
          event: 'Product Added to Favourites',
          product,
          added_from: addedFrom
        })
      )
    }
  }, [
    favourites,
    productSku,
    removeFromFavourites,
    dispatch,
    product,
    addedFrom,
    addToFavourites
  ])

  const hasIcon = useMemo(() => iconDefault && iconActive, [
    iconDefault,
    iconActive
  ])

  const isLoading = useMemo(
    () =>
      addToFavouritesIsLoading?.find(item => item.sku === productSku)
        ?.isLoading ||
      removeFromFavouritesIsLoading?.find(item => item.sku === productSku)
        ?.isLoading,
    [addToFavouritesIsLoading, productSku, removeFromFavouritesIsLoading]
  )

  const isFavourite = useMemo(
    () => favourites && favourites.includes(productSku),
    [favourites, productSku]
  )

  /* Hide all other favourites buttons while removing the specific one */
  const isHidden = useMemo(
    () =>
      isFavouritesPage &&
      removeFromFavouritesIsLoading?.some(
        (item: favouritesProductState) =>
          item.sku !== productSku && item.isLoading
      ),
    [isFavouritesPage, removeFromFavouritesIsLoading, productSku]
  )

  useEffect(() => {
    /* Re-trigger Guest favourites after changing something */
    isGuestFavouritesEnabled &&
      !isLoggedIn &&
      forceRefreshProduct &&
      setFavourites(guestFavouritesItems)
    // If guestFavouritesItems is included in the dependency array it causes infinite loop on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isGuestFavouritesEnabled, forceRefreshProduct])

  useEffect(() => {
    /* Guest favourites coming from cookie */
    isGuestFavouritesEnabled &&
      !isLoggedIn &&
      setFavourites(guestFavouritesItems)
    // If guestFavouritesItems is included in the dependency array it causes infinite loop on the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuestFavouritesEnabled, isLoggedIn])

  useEffect(() => {
    /* Registered customer favourites coming from Spryker */
    isLoggedIn && setFavourites(storedFavouritesItems ?? [])
  }, [isLoggedIn, storedFavouritesItems])

  if (!isFavouritesFeatureEnabled || isHidden) return null

  return (
    <Button
      key={`${productSku}-${isFavourite}-${isLoading}`}
      type="button"
      variant="tertiary"
      className={classNames(
        'no-border p-0',
        {
          'favourite-icon top-0': !hasIcon,
          'favourite-icon--active': !hasIcon && isFavourite,
          'favourite-icon--loading': !hasIcon && isLoading
        },
        className
      )}
      onClick={handleAddToFavourites}
      isLoading={isLoading}
      singleIcon={!hasIcon}
      icon={hasIcon && (isFavourite ? iconActive : iconDefault)}
      aria-label={t('basket.save-to-favorites.label')}
      {...props}
    />
  )
}

export const FavouriteButtonPlaceholder = () => (
  <div className="bg-ui-grey-lightest h-3 w-3 rounded absolute top-0 right-0 opacity-50" />
)
