import Head from 'next/head'
import getConfig from 'next/config'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { FunctionComponent, useMemo } from 'react'

import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

const SCRIPT_ID = 'google-analytics-tracking'
const SCRIPT_CLASSES = 'optanon-category-C0001-C0002-C0004'

export const GoogleAnalyticsTracking: FunctionComponent = () => {
  const { publicRuntimeConfig } = getConfig()
  const googleAnalyticsId = publicRuntimeConfig.googleAnalyticsId
  const { locale } = useRouter()

  const [
    is3rdPartyScriptCookieProEnabled,
    isGoogleAnalyticsTrackingScriptEnabled,
    is3rdPartyNextScriptEnabled
  ] = useFeatureFlags([
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO,
    FeatureFlag.THIRD_PARTY_SCRIPT_GA_TRACKING_SCRIPT,
    FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT
  ])

  const scriptType = is3rdPartyScriptCookieProEnabled
    ? 'text/plain'
    : 'text/javascript'

  const snippet = useMemo(
    () =>
      `<!-- Google Analytics -->(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '${googleAnalyticsId}', 'auto');ga('send', 'pageview');<!-- End Google Analytics -->`,
    [googleAnalyticsId]
  )

  if (
    !(
      isGoogleAnalyticsTrackingScriptEnabled &&
      googleAnalyticsId &&
      locale === 'es-es'
    )
  )
    return null

  return is3rdPartyNextScriptEnabled ? (
    <Script
      data-testid={SCRIPT_ID}
      id={SCRIPT_ID}
      type={scriptType}
      className={SCRIPT_CLASSES}
      strategy="afterInteractive"
    >
      {snippet}
    </Script>
  ) : (
    <Head>
      <script
        data-testid={SCRIPT_ID}
        type={scriptType}
        className={SCRIPT_CLASSES}
        dangerouslySetInnerHTML={{
          __html: snippet
        }}
      />
    </Head>
  )
}
