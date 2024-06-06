import { FunctionComponent, useMemo } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const YotpoRatings: FunctionComponent = () => {
  const { publicRuntimeConfig } = getConfig()
  const { locale } = useRouter()
  const yotpoAppId = publicRuntimeConfig.yotpoAppIds[locale || '']
  const is3rdPartyScriptYotpoEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_YOTPO
  )
  const is3rdPartyScriptCookieProEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO
  )

  const is3rdPartyNextScriptEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT
  )

  const scriptType = is3rdPartyScriptCookieProEnabled
    ? 'text/plain'
    : 'text/javascript'
  const preventCookies = is3rdPartyScriptCookieProEnabled
    ? '?preventCookies=true'
    : ''
  const snippet = useMemo(
    () =>
      `(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=!0, e.src="//staticw2.yotpo.com/${yotpoAppId}/widget.js${preventCookies}";var t=document.getElementsByTagName("script")[0]; t.parentNode.insertBefore(e,t)})()`,
    [preventCookies, yotpoAppId]
  )

  if (!is3rdPartyScriptYotpoEnabled || !yotpoAppId) return null

  return (
    <>
      <Head>
        <link rel="preconnect" href="//staticw2.yotpo.com/" />

        {is3rdPartyScriptCookieProEnabled && (
          <script
            type={scriptType}
            className="optanon-category-C0001-C0003"
            dangerouslySetInnerHTML={{
              __html: `Yotpo.allowCookies()`
            }}
          />
        )}
        {!is3rdPartyNextScriptEnabled && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: snippet
            }}
          />
        )}
      </Head>
      {is3rdPartyNextScriptEnabled && (
        <Script id="yotpo-init" type="text/javascript">
          {snippet}
        </Script>
      )}
    </>
  )
}
