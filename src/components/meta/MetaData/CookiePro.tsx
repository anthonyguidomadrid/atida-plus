import type { FunctionComponent } from 'react'
import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import Script from 'next/script'

export const CookiePro: FunctionComponent = () => {
  const { publicRuntimeConfig } = getConfig()
  const { locale } = useRouter()
  const cookieProScriptId = publicRuntimeConfig.cookieProScriptIds[locale || '']
  const is3rdPartyScriptCookieProEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO
  )

  return (
    is3rdPartyScriptCookieProEnabled &&
    cookieProScriptId && (
      <>
        <Head>
          <link rel="preconnect" href="//cookiepro.com/" />
        </Head>

        <Script
          src="https://cookie-cdn.cookiepro.com/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script={cookieProScriptId}
          strategy="beforeInteractive"
        ></Script>
      </>
    )
  )
}
