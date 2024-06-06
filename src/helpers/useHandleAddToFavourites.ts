import { NextRouter } from 'next/router'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { addFavouritesSave } from '~domains/favourites'
import { loginTriggerNotification } from '~domains/account'

export const useHandleAddToFavourites = (router: NextRouter) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  return useCallback(
    async (sku: string) => {
      if (sku) {
        dispatch(addFavouritesSave({ sku }))
      }

      if (!isLoggedIn && !isGuestFavouritesEnabled) {
        dispatch(loginTriggerNotification({ type: 'favourites' }))
        router.push('/login/favourites')
      }
    },
    [isLoggedIn, isGuestFavouritesEnabled, dispatch, router]
  )
}
