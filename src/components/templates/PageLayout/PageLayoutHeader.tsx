import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { Header } from '~components/organisms/Header'
import { FeatureFlag } from '~config/constants/feature-flags'
import { customerSelectors, getCustomerTrigger } from '~domains/account'
import {
  selectCustomerReference,
  selectTrimmedCustomerFirstName
} from '~domains/account/selectors/customer'
import {
  getBasketTrigger,
  resetCoupon,
  selectNumberOfItems
} from '~domains/basket'
import {
  getFavouritesTrigger,
  selectAddToFavouritesItems,
  selectFavouritesItems,
  selectForceRefresh,
  selectGetFavouritesItemsLoaded,
  selectRemoveFromFavouritesItems
} from '~domains/favourites'
import { getGuestFavouritesItems } from '~helpers/guest-favourites'
import { useHandleFavourites } from '~helpers/useHandleFavourites'
import { useReloadFavourites } from '~helpers/useReloadFavourites'

export type PageLayoutHeaderProps = { isFrontPage?: boolean }

export const PageLayoutHeader: FunctionComponent<PageLayoutHeaderProps> = ({
  isFrontPage
}) => {
  const dispatch = useDispatch()
  const { asPath } = useRouter()
  const [favouritesCount, setFavouritesCount] = useState(0)

  const isBasketPage = useMemo(() => asPath === '/basket', [asPath])
  const isFavouritesPage = useMemo(() => asPath === '/favourites', [asPath])

  const isLoggedIn = useSelector(customerSelectors.selectIsLoggedIn)

  const customerReference = useSelector(selectCustomerReference)
  const customerIsLoading = useSelector(customerSelectors.selectIsLoading)
  const customerWasSuccess = useSelector(customerSelectors.selectWasSuccess)
  const customerWasError = useSelector(customerSelectors.selectWasError)

  const basketItems = useSelector(selectNumberOfItems)
  const favouritesItems = useSelector(selectFavouritesItems)
  const firstName = useSelector(selectTrimmedCustomerFirstName)

  const forceRefreshItems = useSelector(selectForceRefresh)
  const guestFavouritesItems = getGuestFavouritesItems()
  const storedFavouritesItems = useSelector(selectFavouritesItems)
  const storedFavouritesItemsLoaded = useSelector(
    selectGetFavouritesItemsLoaded
  )
  const addToFavouritesIsLoading = useSelector(selectAddToFavouritesItems)
  const removeFromFavouritesIsLoading = useSelector(
    selectRemoveFromFavouritesItems
  )

  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  useEffect(() => {
    if (!basketItems) {
      dispatch(resetCoupon())
    }
  }, [dispatch, basketItems])

  useEffect(() => {
    isLoggedIn &&
      !firstName &&
      !customerIsLoading &&
      !customerWasSuccess &&
      !customerWasError &&
      dispatch(getCustomerTrigger({ customerReference }))
  }, [
    dispatch,
    firstName,
    customerReference,
    isLoggedIn,
    customerIsLoading,
    customerWasError,
    customerWasSuccess
  ])

  useEffect(() => {
    setFavouritesCount(prevState =>
      favouritesItems && isLoggedIn
        ? favouritesItems.length
        : !isLoggedIn && isGuestFavouritesEnabled
        ? guestFavouritesItems.length
        : prevState
    )
  }, [
    favouritesItems,
    guestFavouritesItems,
    isGuestFavouritesEnabled,
    isLoggedIn
  ])

  useEffect(() => {
    if (asPath !== '/basket') {
      dispatch(getBasketTrigger())
    }
  }, [dispatch, asPath])

  useEffect(() => {
    if (isLoggedIn && asPath !== '/checkout' && asPath !== '/favourites') {
      dispatch(getFavouritesTrigger())
    }
  }, [dispatch, asPath, isLoggedIn])

  useEffect(() => {
    /* Re-trigger Guest favourites after changing something */
    if (!isLoggedIn && forceRefreshItems && isGuestFavouritesEnabled) {
      setFavouritesCount(guestFavouritesItems.length)
    }
  }, [
    isLoggedIn,
    forceRefreshItems,
    isGuestFavouritesEnabled,
    guestFavouritesItems
  ])

  useReloadFavourites(
    isLoggedIn,
    isGuestFavouritesEnabled as boolean,
    guestFavouritesItems,
    storedFavouritesItems,
    addToFavouritesIsLoading,
    storedFavouritesItemsLoaded
  )

  useHandleFavourites(
    isLoggedIn,
    addToFavouritesIsLoading,
    removeFromFavouritesIsLoading
  )

  return (
    <Header
      basketItems={basketItems}
      favouritesCount={favouritesCount}
      isFrontPage={isFrontPage}
      isBasketPage={isBasketPage}
      isFavouritesPage={isFavouritesPage}
      isLoggedIn={isLoggedIn}
      firstName={firstName}
    />
  )
}
