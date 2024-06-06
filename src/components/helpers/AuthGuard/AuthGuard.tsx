import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  selectCustomerDetails,
  selectCustomerReference,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { cookieStorageMechanism, routeQueryMatcher } from '~helpers'
import { getCustomerTrigger, getGuestName } from '~domains/account'

type AuthGuardProps = {
  redirectUrl?: string
  isAuthPage?: boolean
  renderConfirmationPage?: boolean
  isPaymentCompletedRoute?: boolean
  children?: ReactNode
}

export const AuthGuard = ({
  children,
  redirectUrl = '/',
  isAuthPage = false,
  renderConfirmationPage = true,
  isPaymentCompletedRoute = false
}: AuthGuardProps) => {
  const { push, route, query, locale } = useRouter()
  const dispatch = useDispatch()
  const customerReference = useSelector(selectCustomerReference)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const customer = useSelector(selectCustomerDetails)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const redirectToLogin = !isLoggedIn && !isAuthPage && !isPaymentCompletedRoute
  const guestCookie = cookieStorageMechanism().get(getGuestName())

  const actualRoute = routeQueryMatcher({ route, query, locale })
  const [prevRoute, setPrevRoute] = useState(actualRoute)

  const loginRoute = `/login${actualRoute}`
  const isCheckoutRoute = actualRoute === '/checkout'

  if (Array.isArray(query.redirect)) {
    redirectUrl = `/${query.redirect.join('/')}`
  }

  if (query.search) {
    const searchParams = Array.isArray(query.search)
      ? `?search=${query.search.join('&search=')}`
      : `?search=${query.search}`

    redirectUrl += searchParams
  }

  const shouldDisplayChildren =
    ((isLoggedIn && !isAuthPage) ||
      (!isLoggedIn && (isAuthPage || isPaymentCompletedRoute)) ||
      (guestCookie && isCheckoutRoute)) &&
    renderConfirmationPage

  useEffect(() => {
    if (
      prevRoute === '/checkout' &&
      actualRoute === '/account-verification/checkout'
    )
      redirectUrl = '/basket'
    setPrevRoute(actualRoute)
  }, [actualRoute])

  useEffect(() => {
    if (!shouldDisplayChildren) {
      push(redirectToLogin ? loginRoute : redirectUrl)
    }
  }, [loginRoute, push, redirectToLogin, redirectUrl, shouldDisplayChildren])

  useEffect(() => {
    if (customerReference && isPageLoaded && !isCheckoutRoute && !customer) {
      dispatch(getCustomerTrigger({ customerReference }))
    } else {
      setIsPageLoaded(true)
    }
  }, [dispatch, customerReference, actualRoute, isPageLoaded])

  return shouldDisplayChildren ? <>{children}</> : null
}
