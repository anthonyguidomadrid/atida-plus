import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { logoutTrigger } from '~domains/account'

import { useDispatch } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { triggerReportPageViewed } from '~domains/analytics'

const Logout: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { query, locale } = useRouter()
  const dispatch = useDispatch()

  const redirect = useMemo(
    () =>
      Array.isArray(query.redirect)
        ? `/${query.redirect.join('/')}`
        : `/${locale}`,
    [locale, query.redirect]
  )

  useEffect(() => {
    dispatch(logoutTrigger(redirect))
  }, [dispatch, redirect])

  useEffect(() => {
    dispatch(triggerReportPageViewed({ page: 'Logout', pageType: 'account' }))
  }, [dispatch])

  return null
}

Logout.Layout = (page: JSX.Element) => <>{page}</>

export default Logout
