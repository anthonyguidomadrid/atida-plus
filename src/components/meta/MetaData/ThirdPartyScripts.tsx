import dynamic from 'next/dynamic'

import { CookiePro } from './CookiePro'
import { GoogleAnalyticsTracking } from './GoogleAnalyticsTracking'
import { CosentMode } from './ConsentMode'
import { LUXSnippet } from './LUXSnippet'
import { NewRelic } from './NewRelic'
import { SegmentTracking } from './SegmentTracking'
import { Reskyt } from './Reskyt'
import { Optimizely } from './Optimizely'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { RTBHouse } from './RTBHouse'

const Exponea = dynamic(async () => {
  const component = await require('./Exponea')
  return component.Exponea
})

export const ThirdPartyScripts = ({
  performanceCookiesAreAccepted
}: {
  performanceCookiesAreAccepted?: boolean
}) => {
  const isLoadOptimizelyBeforeSegmentEnabled = useFeatureFlag(
    FeatureFlag.THIRD_PARTY_SCRIPT_LOAD_OPTIMIZELY_BEFORE_SEGMENT
  )
  return (
    <>
      <LUXSnippet key="speedcurve-script" />
      <NewRelic key="newrelic-script" />
      <CosentMode key="consent-mode-script" />
      {isLoadOptimizelyBeforeSegmentEnabled && (
        <Optimizely
          key="optimizely-script"
          performanceCookiesAreAccepted={performanceCookiesAreAccepted}
        />
      )}
      <SegmentTracking key="segment-script" />
      <CookiePro key="cookiepro-script" />
      <GoogleAnalyticsTracking key="ga-script" />
      <RTBHouse key="rtb-house" />
      <Exponea key="exponea-script" />
      {!isLoadOptimizelyBeforeSegmentEnabled && (
        <Optimizely
          key="optimizely-script"
          performanceCookiesAreAccepted={performanceCookiesAreAccepted}
        />
      )}
      <Reskyt key="reskyt-script" />
    </>
  )
}
