import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import fileSystem from 'fs'

import { createReduxStore } from '~domains/redux'
import {
  ElasticSearchUrlMapRecord,
  pageContentFulfill,
  pageContentTrigger,
  PageRedirect,
  PageType,
  selectPageContent
} from '~domains/page'
import { PageVariantProps, pageVariants } from '~page-variants'
import { lookupPageUrl } from '~domains/page/services/lookup-page-url'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getLocaleRedirect } from '~helpers/server-only/localeRedirection'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import {
  checkIsAtidaDotCom,
  checkIsSparMed,
  getHostWithProtocol
} from '~helpers/hosts'
import {
  fetchStaticRecommendationFulfill,
  fetchStaticRecommendationTrigger
} from '~domains/static-recommendation'
import { StaticRecommendationBlock } from '~domains/contentful/normalizers'
import { FetchStaticRecommendation } from '~domains/static-recommendation/types'
import { transformLocaleToUppercase } from '~helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getCookie, setCookies } from '~helpers/server-only/cookie'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getJWTCookieDomain } from '~domains/account'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { SessionChannelType } from '~domains/basket/types'
import { fetchPageRedirect } from '~domains/page/services/fetch-page-redirect'

const All: NextPage<PageVariantProps> = ({ pageType, ...props }) => {
  const { asPath, locale, query } = useRouter()
  const isSearch = locale && asPath.replace(locale, '').startsWith('/?search=')
  if (isSearch) {
    const { Template } = pageVariants.search
    const searchQuery = Array.isArray(query.search)
      ? query.search.join(' ')
      : query.search

    return <Template pageType={PageType.Search} searchQuery={searchQuery} />
  }

  const { Template } = pageVariants[pageType]
  return <Template pageType={pageType} {...props} />
}

export const getServerSideProps: GetServerSideProps<PageVariantProps> = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.MULTICHANNEL_PRICES,
    FeatureFlag.SEO_FACILITATE_301_REDIRECTS,
    FeatureFlag.CONTENTFUL_PAGE_SLUG_VALIDATION_WEBHOOK,
    FeatureFlag.CONTENTFUL_REPLACE_CDA_CALLS_WITH_WEBHOOKS
  ])
  let webhookPageSlugList: string[] = []

  if (
    featureFlags[FeatureFlag.CONTENTFUL_PAGE_SLUG_VALIDATION_WEBHOOK] &&
    featureFlags[FeatureFlag.CONTENTFUL_REPLACE_CDA_CALLS_WITH_WEBHOOKS]
  ) {
    const { serverRuntimeConfig } = getConfig()
    const webhookStorage =
      serverRuntimeConfig.cmsWebhookStorage ?? '/app/storage/json/'
    const normalizedLocale = transformLocaleToUppercase(context.locale)
    const filePath =
      webhookStorage + `generatePageSlugList_${normalizedLocale}.json`
    if (fileSystem.existsSync(filePath))
      webhookPageSlugList = JSON.parse(
        fileSystem.readFileSync(filePath, 'utf8')
      )
  }

  const redirect = await getLocaleRedirect(context)
  if (redirect) {
    return redirect
  }

  const isAtidaDotCom = context.req.headers.host
    ? checkIsAtidaDotCom(context.req.headers.host)
    : undefined

  const isSparMed = context.req.headers.host
    ? checkIsSparMed(context.req.headers.host)
    : undefined

  if (
    !context.preview &&
    ((context.locale === context.defaultLocale && isAtidaDotCom) ||
      (context.locale !== context.defaultLocale &&
        !isAtidaDotCom &&
        !isSparMed))
  ) {
    return { notFound: true }
  }

  const path = Array.isArray(context?.params?.all)
    ? context?.params?.all.join('/')
    : undefined
  const currentLocale = context.locale
  const currentHost = getHostWithProtocol(context.req.headers.host)

  if (
    featureFlags[FeatureFlag.SEO_FACILITATE_301_REDIRECTS] &&
    path &&
    currentLocale &&
    isAtidaDotCom
  ) {
    const pageRedirects = await fetchPageRedirect(currentLocale)

    const currentRedirect = pageRedirects.find(
      (pageRedirect: PageRedirect) =>
        pageRedirect.slug && pageRedirect.slug.includes(path)
    )

    if (currentRedirect) {
      const destination = currentRedirect.isLink
        ? currentRedirect.redirectTo
        : `${currentHost}/${currentLocale}/${currentRedirect.redirectTo}`

      return {
        redirect: {
          destination: destination,
          permanent: true
        }
      }
    }
  }

  const store = createReduxStore(
    context.preview && context.previewData
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (context.previewData as any).locale
      : context.locale
  )
  let pageType: PageType

  const isHome = path === undefined

  const record = await lookupPageUrl(context.locale, path)

  // this means it's not a product page
  if (record === undefined) {
    if (
      featureFlags[FeatureFlag.CONTENTFUL_PAGE_SLUG_VALIDATION_WEBHOOK] &&
      featureFlags[FeatureFlag.CONTENTFUL_REPLACE_CDA_CALLS_WITH_WEBHOOKS] &&
      path &&
      webhookPageSlugList.length &&
      !webhookPageSlugList.includes(path)
    )
      return { notFound: true }

    store.dispatch(
      pageContentTrigger({
        slug: context.preview
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (context.previewData as any).slug
          : path ?? '/',
        preview: context.preview
      })
    )
    await store.dispatch({
      type: 'page-content',
      [WAIT_FOR_ACTION]: pageContentFulfill().type
    })

    const pageContent = selectPageContent(store.getState())
    if (pageContent?.errorCode === 404) return { notFound: true }

    pageType = pageContent?.content?.type as PageType

    const staticRecommendationBlock = pageContent.content?.contentBlocks.filter(
      content => {
        return content.contentType === 'StaticRecommendationBlock'
      }
    ) as StaticRecommendationBlock[]

    const list = Object.values(staticRecommendationBlock).map(block => {
      return {
        key: block.listOfSkus.join(''),
        products: block.listOfSkus
      }
    })

    const sessionChannelCookie = getCookie(context.req, getSessionChannelName())
    const sessionChannel =
      sessionChannelCookie !== ''
        ? (JSON.parse(sessionChannelCookie) as SessionChannelType)
        : undefined

    store.dispatch(
      fetchStaticRecommendationTrigger({
        list: list as FetchStaticRecommendation[],
        sessionChannel
      })
    )
    await store.dispatch({
      type: 'static-recommendation',
      [WAIT_FOR_ACTION]: fetchStaticRecommendationFulfill().type
    })
  } else {
    // this means it's a product page
    pageType = (record as ElasticSearchUrlMapRecord).type
    const availableChannels = featureFlags[
      FeatureFlag.MULTICHANNEL_PRICES
    ] as Record<string, boolean>
    const channel = context?.query?.channel
    if (
      typeof channel === 'string' &&
      channel !== '' &&
      availableChannels[channel as string]
    ) {
      const sku = (record as ElasticSearchUrlMapRecord).identifier
      setCookies(
        context.res,
        [
          {
            name: getSessionChannelName(),
            value: { sku, channel }
          }
        ],
        {
          maxAge: COOKIES_EXPIRATION_TIME.oneYear,
          domain: getJWTCookieDomain(),
          httpOnly: false
        }
      )
      // We need to add the cookie on the request so get-product-data-props can consume it on the first load
      context['req']['cookies'] = {
        ...context.req.cookies,
        [getSessionChannelName()]: `{ "sku":"${sku}","channel":"${channel}" }`
      }
    }
  }

  const specificPageProps =
    (await pageVariants[pageType].getStaticProps?.(context, store, record)) ??
    {}

  const commonPageProps = {
    pageType,
    isFrontPage: isHome,
    reduxState: store.getState()
  }

  return {
    props: {
      featureFlags,
      ...commonPageProps,
      ...specificPageProps
    }
  }
}

export default All
