import { FunctionComponent, useMemo } from 'react'
import Head from 'next/head'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const CosentMode: FunctionComponent = () => {
  const [
    is3rdPartyScriptConsentModeEnabled,
    is3rdPartyScriptCookieProEnabled
  ] = useFeatureFlags([
    FeatureFlag.THIRD_PARTY_SCRIPT_CONSENT_MODE,
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO
  ])

  const scriptType = is3rdPartyScriptCookieProEnabled
    ? 'text/plain'
    : 'text/javascript'
  const snippet = useMemo(
    () =>
      `window.dataLayer = window.dataLayer || []
    function gtag() {
    dataLayer.push(arguments)
    }
    gtag('set', 'developer_id.dNzMyY2', true)
    gtag('consent', 'default', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
    })`,
    []
  )

  if (!is3rdPartyScriptCookieProEnabled || !is3rdPartyScriptConsentModeEnabled)
    return null

  return (
    <Head>
      <script
        type={scriptType}
        dangerouslySetInnerHTML={{
          __html: snippet
        }}
      />
    </Head>
  )
}
