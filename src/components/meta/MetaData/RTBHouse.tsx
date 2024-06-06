import getConfig from 'next/config'
import Head from 'next/head'
import { FunctionComponent, useMemo } from 'react'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const RTBHouse: FunctionComponent = () => {
  const [
    is3rdPartyScriptRTBHouseEnabled,
    is3rdPartyScriptCookieProEnabled
  ] = useFeatureFlags([
    FeatureFlag.THIRD_PARTY_SCRIPT_RTB_HOUSE,
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO
  ])

  const { publicRuntimeConfig } = getConfig()

  const rtbHouseId = publicRuntimeConfig.rtbHouseProjectId

  const scriptType = is3rdPartyScriptCookieProEnabled
    ? 'text/plain'
    : 'text/javascript'

  const snippet = useMemo(
    () =>
      `(function (w,d,dn,t){w[dn]=w[dn]||[];w[dn].push({eventType:'init',value:t,dc:''});
      var f=d.getElementsByTagName('script')[0],c=d.createElement('script');c.async=true;
      c.src='https://tags.creativecdn.com/${rtbHouseId}.js';
      f.parentNode.insertBefore(c,f);})(window,document,'rtbhEvents', '${rtbHouseId})';`,
    [rtbHouseId]
  )

  if (!is3rdPartyScriptCookieProEnabled || !is3rdPartyScriptRTBHouseEnabled)
    return null

  return (
    <Head>
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
