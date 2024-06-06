import Head from 'next/head'
import getConfig from 'next/config'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const Optimizely = ({
  performanceCookiesAreAccepted
}: {
  scriptType?: string
  performanceCookiesAreAccepted?: boolean
}) => {
  const { publicRuntimeConfig } = getConfig()

  const SCRIPT_ID = 'optimizely-script'
  const SCRIPT_CLASSES = 'optanon-category-C0002'
  const optimizelyId = publicRuntimeConfig.optimizelyProjectId

  const [
    is3rdPartyScriptCookieProEnabled,
    isOptimizelyEnabled
  ] = useFeatureFlags([
    FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO,
    FeatureFlag.THIRD_PARTY_SCRIPT_OPTIMIZELY
  ])

  const src = `//cdn.optimizely.com/js/${optimizelyId}.js`

  const scriptType =
    is3rdPartyScriptCookieProEnabled && !performanceCookiesAreAccepted
      ? 'text/plain'
      : 'text/javascript'

  if (!isOptimizelyEnabled || !optimizelyId) return null

  return (
    <Head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="preconnect" href="//cdn.optimizely.com" />
      <link rel="preconnect" href="//logx.optimizely.com" />
      <link rel="preload" href={src} as="script" />
      <script
        data-testid={SCRIPT_ID}
        type={scriptType}
        className={SCRIPT_CLASSES}
        src={src}
      />
    </Head>
  )
}
