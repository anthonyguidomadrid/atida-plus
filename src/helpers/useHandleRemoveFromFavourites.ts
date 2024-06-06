import { NextRouter } from 'next/router'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { removeFavouritesSave } from '~domains/favourites'

export const useHandleRemoveFromFavourites = (router: NextRouter) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  return useCallback(
    async (sku: string) => {
      if (sku) {
        dispatch(removeFavouritesSave({ sku }))
      }
      !isGuestFavouritesEnabled &&
        !isLoggedIn &&
        router.push(`/login/favourites`)
    },
    [isLoggedIn, isGuestFavouritesEnabled, dispatch, router]
  )
}
