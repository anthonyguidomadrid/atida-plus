import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useEffect, FunctionComponent, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { IS_SEGMENT_INITIALISED } from '~config/constants/events'
import {
  selectIsLoggedIn,
  selectHasPreviousSuccessfulOrder
} from '~domains/account/selectors/customer'
import { selectAllOrdersFromHistory } from '~domains/account/selectors/order-history'
import { setPreviousPageSegmentInfo } from '~helpers/pageSegmentInfo'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import 'globalthis'
import { getPageSlug } from '~domains/translated-routes'

interface TranslatedRoute {
  route: string
  translations: {
    [key: string]: string
  }
}

interface UntranslatedRoute {
  title?: string
  href?: string
  pathname?: string
  referrer?: string
}

const storage = globalThis?.sessionStorage
//@ts-ignore
globalThis.getPageSlug = getPageSlug
//@ts-ignore
globalThis.routes = getConfig().publicRuntimeConfig.routes
//@ts-ignore
globalThis.revertTranslatedRoute = (
  routes: TranslatedRoute[],
  locale: string,
  url: string,
  pathname: string,
  referrer?: string
) => {
  const translatedRoute = routes.find(route => {
    return url.includes(route?.translations?.[locale])
  })
  const prevTranslatedRoute = routes.find(route => {
    return referrer?.includes(route?.translations?.[locale])
  })
  let routeSlug = ''
  let referrerSlug = ''
  const untranslatedRoute: UntranslatedRoute = {}

  if (translatedRoute) {
    routeSlug = getPageSlug(translatedRoute.route, locale) ?? ''
    const translatedRouteString = translatedRoute.route.split('-').join(' ')

    if (routeSlug) {
      Object.assign(untranslatedRoute, {
        title:
          translatedRouteString.charAt(0).toUpperCase() +
          translatedRouteString.slice(1),
        href: url.replace(
          translatedRoute?.translations?.[locale],
          `/${locale}/${translatedRoute.route}`
        ),
        pathname: pathname.replace(
          translatedRoute?.translations?.[locale],
          `/${locale}/${translatedRoute.route}`
        )
      })
    }
  }
  if (prevTranslatedRoute) {
    referrerSlug = getPageSlug(prevTranslatedRoute.route, locale) ?? ''

    if (referrerSlug) {
      Object.assign(untranslatedRoute, {
        referrer: referrer?.replace(
          prevTranslatedRoute?.translations?.[locale],
          `/${locale}/${prevTranslatedRoute.route}`
        )
      })
    }
  }

  if (routeSlug || referrerSlug) {
    return untranslatedRoute
  }

  return null
}

const storePathValues = () => {
  if (!storage) return
  // Set the previous path as the value of the current path.
  const prevPath: string = storage.getItem('currentPath') || ''
  storage.setItem('prevPath', prevPath)

  // Set the current path value by looking at the browser's location object.
  storage.setItem('currentPath', globalThis.location.href)
}

const storeLoggedInValue = (isLoggedIn: boolean) => {
  if (!storage) return
  storage.setItem('isLoggedIn', `${isLoggedIn}`)
}

const storePrevSuccessOrderValue = (hasPreviousSuccessfulOrder: boolean) => {
  if (!storage) return
  storage.setItem('hasPreviousSuccessfulOrder', `${hasPreviousSuccessfulOrder}`)
}

export const SegmentTracking: FunctionComponent = () => {
  const { publicRuntimeConfig } = getConfig()
  const segmentWriteKey = publicRuntimeConfig.segmentWriteKey
  const analyticsFileName = publicRuntimeConfig.analyticsFileName

  const { locale, asPath } = useRouter()
  const market = locale && locale.split('-')[1].toLowerCase()

  const store = publicRuntimeConfig.segmentStore
    .split(',')
    .find((localeSegmentStore: string) =>
      localeSegmentStore.includes(locale ?? '')
    )
    ?.split('|')[1]

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const hasPreviousSuccessfulOrderFromToken = Boolean(
    useSelector(selectHasPreviousSuccessfulOrder)
  )
  const hasPreviousSuccessfulOrderFromHistory = Boolean(
    useSelector(selectAllOrdersFromHistory)?.length
  )

  useEffect(() => {
    storePathValues()
    storeLoggedInValue(isLoggedIn)
    setPreviousPageSegmentInfo()
  }, [isLoggedIn, asPath])

  useEffect(() => {
    storePrevSuccessOrderValue(
      hasPreviousSuccessfulOrderFromToken ||
        hasPreviousSuccessfulOrderFromHistory
    )
  }, [
    hasPreviousSuccessfulOrderFromToken,
    hasPreviousSuccessfulOrderFromHistory
  ])

  const [
    is3rdPartyScriptSegmentEnabled,
    is3rdPartyScriptCookieProEnabled,
    isAllPropertyIntegrationsObjectAdded,
    isRetryInitializationEnabled,
    isRevertTranslatedRouteEnabled
  ] = useFeatureFlags([
    FeatureFlag.THIRD_PARTY_SCRIPT_SEGMENT,
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO,
    FeatureFlag.SEGMENT_SCRIPT_INTEGRATIONS_ALL_PROPERTY,
    FeatureFlag.SEGMENT_SCRIPT_RETRY_INITIALIZATION,
    FeatureFlag.SEGMENT_REVERT_TRANSLATED_ROUTE
  ])

  const scriptType = is3rdPartyScriptCookieProEnabled
    ? 'text/plain'
    : 'text/javascript'

  const snippet = useMemo(
    () => `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://evs.events.atida.com/mU51AcorMiom6E8j2m1UJi/${analyticsFileName}.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${segmentWriteKey}";analytics._cdn = "https://evs.events.atida.com";analytics.SNIPPET_VERSION="4.15.3";
    analytics.load("${segmentWriteKey}");
    analytics.ready(() => {
      const isSegmentInitialised = new Event("${IS_SEGMENT_INITIALISED}");
      window.dispatchEvent(isSegmentInitialised);
      ${
        isRetryInitializationEnabled
          ? `
      document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'visible') {
          window.dispatchEvent(isSegmentInitialised);
        }
      });`
          : ''
      }
    })

    const pageMetaData = ({ payload, next }) => {
      setTimeout(() => {
        var locale = "${locale}";
        var isRevertTranslatedRouteEnabled = ${isRevertTranslatedRouteEnabled};
        var untranslatedRoute = 
          isRevertTranslatedRouteEnabled 
          ? globalThis.revertTranslatedRoute(globalThis.routes, locale, window.location.href, window.location.pathname, globalThis.sessionStorage.prevPath || document.referrer) 
          : null;
        var title = 
          untranslatedRoute && untranslatedRoute.title 
          ? untranslatedRoute.title 
          : document.title;
        var url = 
          untranslatedRoute && untranslatedRoute.href 
          ? untranslatedRoute.href 
          : window.location.href;
        var path = 
          untranslatedRoute && untranslatedRoute.pathname 
          ? untranslatedRoute.pathname 
          : window.location.pathname;
        var referrer = 
          untranslatedRoute && untranslatedRoute.referrer 
          ? untranslatedRoute.referrer 
          : globalThis.sessionStorage.prevPath || document.referrer;
        
        var pageName = globalThis.sessionStorage.pageName
        var pageType = globalThis.sessionStorage.pageType
        var previousPageName = globalThis.sessionStorage.previousPageName
        var previousPageType = globalThis.sessionStorage.previousPageType
        var isLoggedIn = JSON.parse(globalThis.sessionStorage.isLoggedIn)
        var hasPreviousSuccessfulOrder = JSON.parse(globalThis.sessionStorage.hasPreviousSuccessfulOrder)
        var searchQuery = globalThis.sessionStorage.searchQuery

        payload.obj.context.page.title = title;
        payload.obj.context.page.url = url;
        payload.obj.context.page.path = path;
        payload.obj.context.page.referrer = referrer;
        payload.obj.context.market = "${market}";
        payload.obj.context.is_logged_in = isLoggedIn;
        payload.obj.context.page_name = pageName;
        payload.obj.context.page_type = pageType;
        payload.obj.context.previous_page_name = previousPageName;
        payload.obj.context.previous_page_type = previousPageType;
        payload.obj.context.is_existing_customer = hasPreviousSuccessfulOrder
        payload.obj.context.store = "${store}"

        if (${isAllPropertyIntegrationsObjectAdded} && payload.obj.integrations) {
          payload.obj.integrations = { ...payload.obj.integrations, All: true };
        }

        if (${isAllPropertyIntegrationsObjectAdded} && payload.obj.integrations) {
          payload.obj.integrations = { ...payload.obj.integrations, All: true };
        }

        // only 'fix' these if they're already there
        if (payload.obj.properties !== undefined) {
          if (payload.obj.properties.title !== undefined) {
            payload.obj.properties.title = title;
          }

          if (payload.obj.properties.url !== undefined && payload.obj.properties.name !== "Search As You Type") {
            payload.obj.properties.url = url;
          }

          if (payload.obj.properties.path !== undefined) {
            payload.obj.properties.path = path;
          }

          if (payload.obj.properties.referrer !== undefined) {
            payload.obj.properties.referrer = referrer
          }

          if (payload.obj.properties.name === "Search As You Type" ) {
            payload.obj.properties.page_name = payload.obj.properties.name
            payload.obj.properties.page_type = "shopping"
            payload.obj.properties.url = url + "?search=" + searchQuery
            payload.obj.context.page.url = url + "?search=" + searchQuery
          } else {
            payload.obj.properties.page_name = pageName
            payload.obj.properties.page_type = pageType
          }

          payload.obj.properties.is_logged_in = isLoggedIn
          payload.obj.properties.is_existing_customer = hasPreviousSuccessfulOrder

          payload.obj.properties.market = "${market}"
          payload.obj.properties.store = "${store}"
          payload.obj.properties.previous_page_name = previousPageName
          payload.obj.properties.previous_page_type = previousPageType
        }
        
        next(payload);
      }, 0);
    };

    analytics.addSourceMiddleware(pageMetaData);
    }}();
    `,
    [
      analyticsFileName,
      segmentWriteKey,
      isRetryInitializationEnabled,
      locale,
      isRevertTranslatedRouteEnabled,
      market,
      store,
      isAllPropertyIntegrationsObjectAdded
    ]
  )

  if (!is3rdPartyScriptSegmentEnabled || !segmentWriteKey) return null
  return (
    <Head>
      <link rel="preconnect" href="//events.atida.com/" />

      <script
        type={scriptType}
        className="optanon-category-C0001-C0002-C0003-C0004-C0005"
        dangerouslySetInnerHTML={{
          __html: snippet
        }}
      />
    </Head>
  )
}
