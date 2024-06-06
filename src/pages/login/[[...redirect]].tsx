import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import {
  triggerReportAccountCreatedAttempted,
  triggerReportAccountCreatedFailed,
  triggerReportGuestCheckoutAttempted,
  triggerReportLoginFailed,
  triggerReportPageViewed,
  triggerReportSignInPageViewed
} from '~domains/analytics'
import { createReduxStore } from '~domains/redux'
import { pageContentTrigger, pageContentFulfill } from '~domains/page'
import {
  loginTrigger,
  loginSelectors,
  loginClearNotification,
  loginClearError,
  verifyResetPasswordTokenSelectors,
  setNewPasswordSelectors,
  setNewPasswordClearState,
  getGuestName
} from '~domains/account'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '~components/helpers/AuthGuard'
import {
  cookieStorageMechanism,
  getClientCookiesDomain,
  routeQueryMatcher
} from '~helpers'
import { ReactComponent as MifarmaLogo } from '~assets/svg/mifarmaLogoMonochromeBlack.svg'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { setPreviousPageSegmentInfo } from '~helpers/pageSegmentInfo'
import classNames from 'classnames'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import {
  SingleColumnLoginAndSignupForm,
  TwoColumnLoginAndSignupForm
} from '~components/organisms/LoginAndSignupForm'
import { getBasketTrigger, selectAnonymousId } from '~domains/basket'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import {
  selectLoginError,
  selectLoginWasError,
  selectSocialDetails,
  socialLoginResetErrors
} from '~domains/social'
import { TranslationKeys } from '~config/constants/translation-keys'
import { selectLoginEmail } from '~domains/account/selectors/login'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { ACCOUNT_TYPE_PERSONAL } from '~config/constants/account-types'
import { LoginFormValues } from '~components/organisms/LoginForm'

const GENERAL_NOTIFICATION_TITLE_KEY = 'login.general-notification.title'
const GENERAL_NOTIFICATION_CONTENT_KEY = 'login.general-notification.content'

const Login: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, query, asPath, push } = useRouter()
  const { social } = query
  const dispatch = useDispatch()
  const wasError = useSelector(loginSelectors.selectWasError)
  const socialWasError = useSelector(selectLoginWasError)
  const error = useSelector(loginSelectors.selectError)
  const socialError = useSelector(selectLoginError)
  const resetPasswordSuccess = useSelector(
    setNewPasswordSelectors.selectWasSuccess
  )
  const user = useSelector(verifyResetPasswordTokenSelectors.selectUserInfo)
  const loginNotificationType = useSelector(
    loginSelectors.selectLoginNotification
  )
  const anonymousId = useSelector(selectAnonymousId)
  const userEmail = useSelector(selectLoginEmail)
  const needsVerification = useSelector(selectSocialDetails)?.needsVerification
  const { t } = useTranslation()

  const isTwoColumnLoginAndSignupEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_TWO_COLUMN_LOGIN_AND_SIGNUP
  )

  const hasMifarmaBanner = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_LOGIN_MIFARMA_BANNER)
  )

  const isFaceBookEnabled = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_FACEBOOK)
  )

  const isGoogleEnabled = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_GOOGLE)
  )

  const isAppleEnabled = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_APPLE)
  )

  const redirect = Array.isArray(query.redirect)
    ? `/${query.redirect.join('/')}`
    : undefined

  const actualRedirect = routeQueryMatcher({ route: redirect, query, locale })

  const basketLogin = asPath.split('?')[0] === '/login/checkout'

  const [generalNotificationTitle, setGeneralNotificationTitle] = useState('')
  const [generalNotificationContent, setGeneralNotificationContent] = useState(
    ''
  )
  const [showReducedForm, setShowReducedForm] = useState(false)

  const guestCookie = cookieStorageMechanism().get(getGuestName())

  const handleLoginOnSubmit = useCallback(
    (values: LoginFormValues) => {
      dispatch(
        loginTrigger({
          redirect: actualRedirect,
          email: user ? user?.email : values.email,
          password: values.password
        })
      )
    },
    [dispatch, actualRedirect, user]
  )

  const setGuestCookie = () => {
    cookieStorageMechanism().set(
      getGuestName(),
      JSON.stringify({
        guestId: anonymousId
      }),
      {
        expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.oneHour),
        domain: getClientCookiesDomain(window?.location?.hostname)
      }
    )
  }

  const handleGuestCheckoutOnClick = () => {
    if (!guestCookie) {
      setGuestCookie()
    } else if (guestCookie && JSON.parse(guestCookie).guestId !== anonymousId) {
      cookieStorageMechanism().remove(getGuestName())
      setGuestCookie()
    }
    dispatch(triggerReportGuestCheckoutAttempted())
    push('/checkout')
  }

  useEffect(() => {
    const title = t(GENERAL_NOTIFICATION_TITLE_KEY)
    const content = t(GENERAL_NOTIFICATION_CONTENT_KEY)

    title !== GENERAL_NOTIFICATION_TITLE_KEY &&
      setGeneralNotificationTitle(title)
    content !== GENERAL_NOTIFICATION_CONTENT_KEY &&
      setGeneralNotificationContent(content)
  }, [t])

  useEffect(() => {
    if (needsVerification) {
      push(`/account-verification${actualRedirect ?? ''}`)
    }
  }, [actualRedirect, needsVerification, push])

  useEffect(() => {
    setPreviousPageSegmentInfo()
    dispatch(
      triggerReportPageViewed({
        page: basketLogin ? 'Login from Checkout' : 'Login',
        pageType: 'account'
      })
    )
  }, [dispatch, basketLogin])

  useEffect(() => {
    dispatch(triggerReportSignInPageViewed())
  }, [dispatch])

  useEffect(() => {
    dispatch(getBasketTrigger())
  }, [dispatch])

  useEffect(() => {
    if (asPath === '/login') {
      dispatch(loginClearNotification())
    }
  }, [dispatch, asPath])

  useEffect(() => {
    ;(wasError || (socialWasError && socialError === 'account.social.login')) &&
      dispatch(
        triggerReportLoginFailed({
          ...(error === TranslationKeys.Login.AccountLockout.content && {
            event: 'Account Blocked'
          }),
          ...(wasError && userEmail && { email: userEmail }),
          is_social: !!socialError,
          social_platform: (social as string) ?? '',
          error_message: socialError
            ? t(TranslationKeys.Login.Social.content, { social })
            : error && t(error),
          error_key: socialError ? TranslationKeys.Login.Social.content : error
        })
      )
  }, [
    wasError,
    socialWasError,
    error,
    socialError,
    dispatch,
    t,
    social,
    userEmail
  ])

  useEffect(() => {
    socialWasError &&
      socialError === 'account.social.sign-up' &&
      dispatch(
        triggerReportAccountCreatedAttempted({
          is_social: true,
          social_platform: social as string,
          account_type: ACCOUNT_TYPE_PERSONAL
        })
      ) &&
      dispatch(
        triggerReportAccountCreatedFailed({
          is_social: true,
          social_platform: social as string,
          error_key: TranslationKeys.Login.Social.content,
          error_message: t(TranslationKeys.Login.Social.content, { social }),
          account_type: ACCOUNT_TYPE_PERSONAL
        })
      )
  }, [dispatch, socialWasError, socialError, social, t])

  useEffect(() => {
    if (resetPasswordSuccess) {
      setShowReducedForm(true)
      dispatch(setNewPasswordClearState())
    }
  }, [dispatch, resetPasswordSuccess])

  useEffect(() => {
    return () => {
      dispatch(socialLoginResetErrors())
      dispatch(loginClearNotification())
      dispatch(loginClearError())
    }
  }, [dispatch])

  return (
    <>
      <MetaData
        title={t('seo.titles.login')}
        indexation="noindex"
        hideCanonicalLink={true}
      />
      <AlternateLinks links={getAlternateLinks('login', locale)} />
      <main
        className={classNames('h-full flex flex-col items-center', {
          '-mt-1.75 sm:-mt-4.75 md:-mt-1.75': !hasMifarmaBanner
        })}
      >
        {hasMifarmaBanner && (
          <div
            className={classNames(
              'w-full flex flex-row flex-wrap justify-center items-center bg-ui-carribean-green-lightest',
              '-mt-4 py-2 px-1.5',
              'sm:-mt-5 sm:py-1.5',
              'md:-mt-2'
            )}
          >
            <MifarmaLogo className="h-2 mb-0.5 sm:mb-0.5 pr-1" />
            <span className="text-sm pt-0.25 break-normal">
              {t('login.mifarma-banner.body')}
            </span>
          </div>
        )}
        {isTwoColumnLoginAndSignupEnabled ? (
          <TwoColumnLoginAndSignupForm
            loginNotificationType={loginNotificationType}
            actualRedirect={actualRedirect}
            showReducedForm={showReducedForm}
            user={user}
            wasError={wasError || socialWasError}
            error={error || socialError}
            hasMifarmaBanner={hasMifarmaBanner}
            generalNotificationTitle={generalNotificationTitle}
            generalNotificationContent={generalNotificationContent}
            hasGuestCheckoutButton={(anonymousId && basketLogin) as boolean}
            handleGuestCheckoutOnClick={handleGuestCheckoutOnClick}
            handleLoginOnSubmit={handleLoginOnSubmit}
            basketLogin={basketLogin}
            isFaceBookEnabled={isFaceBookEnabled}
            isGoogleEnabled={isGoogleEnabled}
            isAppleEnabled={isAppleEnabled}
          />
        ) : (
          <SingleColumnLoginAndSignupForm
            loginNotificationType={loginNotificationType}
            actualRedirect={actualRedirect}
            showReducedForm={showReducedForm}
            user={user}
            wasError={wasError}
            error={error}
            hasMifarmaBanner={hasMifarmaBanner}
            generalNotificationTitle={generalNotificationTitle}
            generalNotificationContent={generalNotificationContent}
            hasGuestCheckoutButton={(anonymousId && basketLogin) as boolean}
            handleGuestCheckoutOnClick={handleGuestCheckoutOnClick}
            handleLoginOnSubmit={handleLoginOnSubmit}
            basketLogin={basketLogin}
          />
        )}
      </main>
    </>
  )
}

Login.Layout = (page: JSX.Element) => (
  <AuthGuard isAuthPage>
    <MinimalPageLayout reducedVerticalMargin>{page}</MinimalPageLayout>
  </AuthGuard>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_TWO_COLUMN_LOGIN_AND_SIGNUP
  ])

  store.dispatch(pageContentTrigger({ slug: getPageUrlSlug(context) }))

  await store.dispatch({
    type: 'page-content',
    [WAIT_FOR_ACTION]: pageContentFulfill().type
  })

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Login
