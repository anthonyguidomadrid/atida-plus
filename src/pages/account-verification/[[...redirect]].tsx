import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import { createReduxStore } from '~domains/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import {
  selectSocialDetails,
  socialLoginResetDetails,
  socialVerifyTrigger
} from '~domains/social'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import {
  AccountVerificationForm,
  AccountVerificationFormValues
} from '~components/organisms/AccountVerificationForm'
import { useCallback, useEffect, useState } from 'react'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import {
  triggerReportPageViewed,
  triggerReportSocialVerificationPageViewed
} from '~domains/analytics'

const AccountVerification: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, push, asPath } = useRouter()
  const dispatch = useDispatch()
  const socialDetails = useSelector(selectSocialDetails)
  const { t } = useTranslation()
  const basketLogin = asPath.split('?')[0] === '/account-verification/checkout'
  const [
    {
      accessToken,
      refreshToken,
      expiresIn,
      redirectUri,
      serviceType,
      firstName,
      email,
      needsVerification
    },
    setDetails
  ] = useState(socialDetails)

  const handleAccountVerificationOnSubmit = useCallback(
    (values: AccountVerificationFormValues) => {
      if (accessToken && expiresIn && redirectUri && serviceType)
        dispatch(
          socialVerifyTrigger({
            accessToken,
            refreshToken,
            expiresIn,
            password: values.password,
            redirectUri,
            serviceType
          })
        )
    },
    [dispatch]
  )

  useEffect(() => {
    !needsVerification && push('/login')
  }, [needsVerification, push])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({
        page: basketLogin ? 'Login from Checkout' : 'Social Verification',
        pageType: 'account'
      })
    )
  }, [dispatch, basketLogin])

  useEffect(() => {
    serviceType &&
      dispatch(
        triggerReportSocialVerificationPageViewed({
          social_platform: serviceType
        })
      )
  }, [dispatch, serviceType])

  useEffect(() => {
    if (socialDetails.needsVerification) {
      setDetails(socialDetails)
      dispatch(socialLoginResetDetails())
    }
  }, [dispatch, socialDetails.needsVerification])

  return (
    <>
      <MetaData
        title={t('seo.titles.login')}
        indexation="noindex"
        hideCanonicalLink={true}
      />
      <AlternateLinks
        links={getAlternateLinks('account-verification', locale)}
      />
      <main className="w-full h-full flex justify-center px-3">
        {needsVerification ? (
          <AccountVerificationForm
            className="pt-1"
            onSubmit={handleAccountVerificationOnSubmit}
            userEmail={email ?? ''}
            userName={firstName ?? ''}
            blockEmail
          />
        ) : (
          <LoadingSpinner />
        )}
      </main>
    </>
  )
}

AccountVerification.Layout = (page: JSX.Element) => {
  return (
    <AuthGuard isAuthPage>
      <MinimalPageLayout withBackButton reducedVerticalMargin>
        {page}
      </MinimalPageLayout>
    </AuthGuard>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default AccountVerification
