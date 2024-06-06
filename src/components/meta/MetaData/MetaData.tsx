import Head from 'next/head'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import type { FunctionComponent } from 'react'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { Fonts, PreloadFonts } from './PreloadFonts'

export type MetaDataProps = {
  title?: string
  description?: string
  keywords?: string
  image?: string | null
  canonicalHref?: string
  canonicalHrefOverride?: string | null
  hideCanonicalLink?: boolean
  renderMetaOgUrl?: boolean
  indexation?: string
  preloadFonts?: Fonts[]
  noIndex?: boolean | null
  noFollow?: boolean | null
}

export const MetaData: FunctionComponent<MetaDataProps> = ({
  title,
  description,
  keywords,
  image,
  canonicalHref,
  canonicalHrefOverride,
  hideCanonicalLink = false,
  renderMetaOgUrl = true,
  indexation = 'index',
  preloadFonts = [],
  noIndex = false,
  noFollow = false
}) => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const { asPath, locale, query } = useRouter()
  const isIndexingDisabled = useFeatureFlag(FeatureFlag.SEO_DISABLE_INDEXING)
  const isGetNoIndexAndNoFollowFromContentfulEnabled = useFeatureFlag(
    FeatureFlag.SEO_GET_NO_INDEX_AND_NO_FOLLOW_TAGS_FROM_CONTENTFUL
  )

  const normalisedTitle = title || 'Atida Online Pharmacy'

  // default canonical url, also used for home page
  let canonicalUrl
  const baseUrl = `${host}/${locale}`

  const removeLocalePrefix = (url: string) =>
    url?.replace(new RegExp(`^(\/)?${locale}`, 'i'), '') ?? ''

  if (canonicalHref) {
    // used passed in prop
    canonicalHref = removeLocalePrefix(canonicalHref)
    canonicalUrl = `${baseUrl}${
      !canonicalHref.startsWith('/') && !canonicalHref.startsWith('?')
        ? '/'
        : ''
    }${canonicalHref}`
  } else {
    const asPathNoParams = asPath?.split('?')[0] ?? asPath
    if (asPathNoParams === '/') {
      // home page no params
      canonicalUrl = `${baseUrl}${asPath.replace(/^\/+/, '')}`
    } else {
      // all other pages, with or without params, including home page with params
      canonicalUrl = `${baseUrl}${removeLocalePrefix(asPath)}`
    }
  }

  canonicalUrl = query?.page
    ? `${canonicalUrl?.toLocaleLowerCase().split('?')[0]}?page=${query.page}`
    : canonicalUrl?.toLocaleLowerCase().split('?')[0]

  const ogUrl = canonicalUrl

  canonicalUrl = canonicalHrefOverride
    ? `${baseUrl}/${canonicalHrefOverride}`
    : canonicalUrl

  const robotsMetaTags = []
  noIndex || indexation === 'noindex'
    ? robotsMetaTags.push('noindex')
    : robotsMetaTags.push('index')
  noFollow || indexation === 'noindex'
    ? robotsMetaTags.push('nofollow')
    : robotsMetaTags.push('follow')

  return (
    <>
      <PreloadFonts fonts={preloadFonts} />
      <Head>
        {/* Disable/enable Search Engine Indexing and Crawling */}
        {isGetNoIndexAndNoFollowFromContentfulEnabled ? (
          <>
            <meta
              key="robots"
              name="robots"
              content={robotsMetaTags.join(', ')}
            />
            <meta
              key="googlebot"
              name="googlebot"
              content={robotsMetaTags.join(', ')}
            />
          </>
        ) : (
          <>
            <meta
              key="robots"
              name="robots"
              content={isIndexingDisabled ? 'noindex' : indexation}
            />
            <meta
              key="googlebot"
              name="googlebot"
              content={isIndexingDisabled ? 'noindex' : indexation}
            />
          </>
        )}

        <title key="title">{normalisedTitle}</title>
        <meta
          key="content-language"
          httpEquiv="content-language"
          content={locale}
        />
        {!!description && (
          <meta key="description" name="description" content={description} />
        )}
        {!!keywords && (
          <meta key="keywords" name="keywords" content={keywords} />
        )}
        <meta key="og:title" property="og:title" content={normalisedTitle} />
        <meta key="og:type" property="og:type" content="website" />
        {!!description && (
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />
        )}
        <meta key="og:site_name" property="og:site_name" content="Atida" />
        {!!image && <meta key="og:image" property="og:image" content={image} />}
        {!hideCanonicalLink && (
          <link key="canonical" rel="canonical" href={canonicalUrl} />
        )}
        {!!renderMetaOgUrl && (
          <meta key="og:url" property="og:url" content={ogUrl} />
        )}
        <meta
          key="pinterest_verify"
          name="p:domain_verify"
          content="2a4d583ecc6d32278c4941f227e4a0e7"
        />
        <link key="manifest" rel="manifest" href="/site.webmanifest" />
        <link
          key="alternate icon"
          rel="alternate icon"
          type="image/x-icon"
          href="/favicon.ico"
        />
        <link
          key="apple-touch-icon"
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          key="icon16"
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          key="icon32"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <meta
          key="msapplication-TileColor"
          name="msapplication-TileColor"
          content="#00cca2"
        />
        <meta key="theme-color" name="theme-color" content="#00cca2" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
        <meta
          key="facebook-domain-verification"
          name="facebook-domain-verification"
          content="76ly6tnbmndfxe8bpoikz61hz7xxpz"
        />
      </Head>
    </>
  )
}
