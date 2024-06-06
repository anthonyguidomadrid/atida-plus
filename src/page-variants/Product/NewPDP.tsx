import { useSelector } from 'react-redux'
import { selectProductData } from '~domains/product'
import { useYotpoWidget } from '~helpers/useYotpoWidget'
import { PDPMetaData } from './PDPMetaData'
import { PDPLayout } from './PDPLayout'
import { PDPHeader } from './PDPHeader'
import { PDPGallery } from './PDPGallery'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { PDPDetails } from './PDPDetails'
import { PDPSidebar } from './PDPSidebar'
import { PDPRecommendations } from './PDPRecommendations'
import { PDPImportantInformation } from './PDPImportantInfo/PDPImportantInformation'
import { PDPBasketNotification } from './PDPBasketNotification'
import {
  useBasketDataForPDP,
  useBasketNotification
} from '~helpers/useBasketDataForPDP'
import { getUserToken } from '~helpers/getUserToken'
import { useEffect, useMemo } from 'react'

export const NewPDP = () => {
  const product = useSelector(selectProductData)
  const { yotpoShouldRender, reviewsRef } = useYotpoWidget()
  const isProductImportantInfoEnabled = useFeatureFlag(
    FeatureFlag.PDP_IMPORTANT_INFO_COMPONENT
  )
  const basketNotificationData = useBasketNotification()
  const basketDataForPDP = useBasketDataForPDP(basketNotificationData)

  const userToken = getUserToken()

  const rtbHouseScript = useMemo(
    () =>
      `(rtbhEvents = window.rtbhEvents || []).push({ eventType: 'offer',offerId: '${
        product?.sku
      }'},{eventType: 'uid',id: '${userToken ?? 'unknown'}'});`,
    [product?.sku, userToken]
  )

  useEffect(() => {
    const script = document.createElement('script')
    script.innerText = rtbHouseScript

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [rtbHouseScript])

  if (!product) return null
  return (
    <>
      <PDPMetaData yotpoShouldRender={yotpoShouldRender} />
      <PDPLayout>
        <PDPHeader />
        <PDPGallery />
        <PDPSidebar basketDataForPDP={basketDataForPDP} />
        {isProductImportantInfoEnabled && <PDPImportantInformation />}
        <PDPDetails reviewsRef={reviewsRef} />
        <PDPRecommendations />
        <PDPBasketNotification
          basketNotificationData={basketNotificationData}
          basketDataForPDP={basketDataForPDP}
        />
      </PDPLayout>
    </>
  )
}
