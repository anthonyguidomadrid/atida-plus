import App, {
  AppProps,
  AppContext,
  AppInitialProps,
  NextWebVitalsMetric
} from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import type { NextPage, NextComponentType } from 'next'

import { parse } from 'cookie'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import {
  TranslationsProvider,
  useFormatPolyfill,
  createI18nAndLoadNamespaces
} from '~domains/translations'
import { ReduxProvider, createReduxStore } from '~domains/redux'
import { FeatureFlagsProvider } from '~components/helpers/FeatureFlags'
import { PageLayout } from '~components/templates/PageLayout'
import { GlobalHooks } from '~components/helpers/GlobalHooks'
import '../styles/globals.css'
import '../styles/globals-autocomplete.css'
import '../styles/yotpo.css'
import '../styles/adyen.css'
import '../styles/mondial-relay.css'
import 'swiper/swiper-bundle.min.css'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getPreloadedState } from '~helpers'
import { getHostFromLocale } from '~helpers/hosts'
import { preventScrollOnBackNavigation } from '~helpers/preventScrollOnBackNavigation'
import { preventCacheOnBackNavigation } from '~helpers/preventCacheOnBackNavigation'
import { trackPerformanceMetric } from '~domains/analytics/helpers/trackPerformanceMetrics'
import { GlobalScriptsAndStyles } from '~components/meta/MetaData/GlobalScriptsAndStyles'
import { commonFulfill, commonTrigger } from '~domains/page'
import { redirectTo } from '~helpers/redirectTo'
import { checkAndRedirectToCorrespondentLocale } from '~helpers/checkAndRedirectToCorrespondentLocale'
import { getEnabledLocales } from '~domains/translated-routes'

const { publicRuntimeConfig } = getConfig()

type MyAppProps = AppProps & {
  Component: NextPage & { Layout?: (page: JSX.Element) => JSX.Element }
}

const DefaultLayout = (page: JSX.Element) => <PageLayout>{page}</PageLayout>

const MyApp: NextComponentType<AppContext, AppInitialProps, MyAppProps> = ({
  Component,
  pageProps
}) => {
  const { locale, events } = useRouter()
  const getLayout = Component.Layout || DefaultLayout
  // Conditionally Load Polyfill for Intl.NumberFormat unit style
  const isReady = useFormatPolyfill(locale)

  useEffect(() => {
    preventScrollOnBackNavigation(events)
    preventCacheOnBackNavigation()
  }, [events])

  useEffect(() => {
    if (events) {
      const handleRouteChangeComplete = () => {
        // @ts-ignore
        window?.initTrustedShopsBadge?.()
      }
      events.on('routeChangeComplete', handleRouteChangeComplete)

      return () => {
        events.off('routeChangeComplete', handleRouteChangeComplete)
      }
    }
  }, [events])

  return (
    <FeatureFlagsProvider value={pageProps.featureFlags ?? {}}>
      <ReduxProvider
        preloadedState={getPreloadedState(
          pageProps.reduxState,
          pageProps.reduxCommonState
        )}
        locale={locale as string}
      >
        <TranslationsProvider store={pageProps.i18nStore}>
          <GlobalHooks>
            <GlobalScriptsAndStyles
              performanceCookiesAreAccepted={
                pageProps.performanceCookiesAreAccepted
              }
            >
              {isReady
                ? getLayout(<Component key={locale} {...pageProps} />)
                : null}
            </GlobalScriptsAndStyles>
          </GlobalHooks>
        </TranslationsProvider>
      </ReduxProvider>
    </FeatureFlagsProvider>
  )
}

const initialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const currentLocale = appContext.router.locale
  const req = appContext.ctx.req
  const res = appContext.ctx.res
  const { domainPerLocale } = publicRuntimeConfig

  if (res && req) {
    const {
      loadFeatureFlags
      // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require('~helpers/server-only/featureFlagClient')
    const flags = await loadFeatureFlags(currentLocale, [
      FeatureFlag.COOKIE_LOCALE_REDIRECTION,
      FeatureFlag.LOCALE_REDIRECTION_BROWSER_PREFERENCES,
      FeatureFlag.LOCALE_REDIRECTION_HEADERS_FIX,
      FeatureFlag.SEO_FACILITATE_301_REDIRECTS,
      FeatureFlag.BROWSER_LOCALE_EXTERNAL_REDIRECTION,
      FeatureFlag.VIEWER_COUNTRY_EXTERNAL_REDIRECTION,
      FeatureFlag.VIEWER_COUNTRY_LOGGING
    ])

    const enabledLocales = getEnabledLocales()

    if (!currentLocale || !enabledLocales.includes(currentLocale)) {
      const otherAtidaHost = getHostFromLocale(domainPerLocale, currentLocale)
      otherAtidaHost && redirectTo(res, otherAtidaHost)
    }

    // DOMAIN/LOCALE REDIRECTION - TODO PLUS-6640
    checkAndRedirectToCorrespondentLocale(
      req,
      res,
      currentLocale,
      domainPerLocale,
      {
        shouldLogCloudfrontViewerCountry:
          flags[FeatureFlag.VIEWER_COUNTRY_LOGGING],
        shouldRedirectToExternalLocaleFromBrowserSettings:
          flags[FeatureFlag.BROWSER_LOCALE_EXTERNAL_REDIRECTION],
        shouldRedirectToExternalLocaleFromCloudfrontViewerCountry:
          flags[FeatureFlag.VIEWER_COUNTRY_EXTERNAL_REDIRECTION]
      }
    )

    const optanonCookiesConsent =
      parse(req.headers.cookie ?? '')?.OptanonConsent ?? undefined
    const performanceCookiesAreAccepted =
      (optanonCookiesConsent && optanonCookiesConsent.includes('C0002:1')) ??
      false

    const store = createReduxStore(appContext.ctx.locale)
    const i18n = await createI18nAndLoadNamespaces(
      appContext.ctx.locale,
      ['common', 'category-title'],
      store
    )

    store.dispatch(commonTrigger())
    await store.dispatch({
      type: 'common',
      [WAIT_FOR_ACTION]: commonFulfill().type
    })

    appProps.pageProps = {
      ...appProps.pageProps,
      i18nStore: i18n.store.data,
      reduxCommonState: store.getState().server.page.common,
      performanceCookiesAreAccepted
    }

    return appProps
  }

  return { ...appProps }
}

MyApp.getInitialProps = async appContext => {
  if (global?.newrelic?.startSegment)
    return global?.newrelic.startSegment(
      'Nextjs/getInitialProps//_app',
      true,
      async () => {
        return await initialProps(appContext)
      }
    )
  return initialProps(appContext)
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  trackPerformanceMetric(metric)
}

export default MyApp
