import { FunctionComponent, useMemo } from 'react'
import Head from 'next/head'

import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useRouter } from 'next/router'

export const Reskyt: FunctionComponent = () => {
  const { query } = useRouter()
  const { customapp } = query

  const is3rdPartyReskytEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_RESKYT
  )

  const shouldDisplay = useMemo(() => is3rdPartyReskytEnabled && customapp, [
    customapp,
    is3rdPartyReskytEnabled
  ])

  if (!shouldDisplay) return null

  return (
    <Head>
      <script
        type="text/javascript"
        src="https://cdn.reskyt.com/6870/layout-app.js"
      ></script>
    </Head>
  )
}
