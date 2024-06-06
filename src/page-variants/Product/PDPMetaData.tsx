import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { FeatureFlag } from '~config/constants/feature-flags'
import { selectPDPMetaDataData } from '~domains/product'
import { getAlternateLinksInPdp } from '~domains/translated-routes'

import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { MetaData } from '~components/meta/MetaData'
import { Fonts } from '~components/meta/MetaData/PreloadFonts'
import { YotpoRatings } from '~components/meta/MetaData/YotpoRatings'
import { ProductSEO } from './ProductSEO'

export type PDPMetaDataProps = {
  yotpoShouldRender?: boolean
}

export const PDPMetaData = ({
  yotpoShouldRender = false
}: PDPMetaDataProps) => {
  const { locale } = useRouter()
  const metaDataData = useSelector(selectPDPMetaDataData)
  const isSEOAddNoindexToOnDemandProductsEnabled = useFeatureFlag(
    FeatureFlag.SEO_ADD_NOINDEX_TO_ON_DEMAND_PRODUCTS
  )

  if (!metaDataData) return null
  return (
    <>
      {yotpoShouldRender && <YotpoRatings />}
      <MetaData
        title={metaDataData.metaTitle}
        description={metaDataData.metaDescription}
        keywords={metaDataData.metaKeywords}
        image={metaDataData.largeImage}
        preloadFonts={[Fonts.bodyBold]}
        noIndex={
          isSEOAddNoindexToOnDemandProductsEnabled
            ? metaDataData.isOnDemand
            : null
        }
      />
      <ProductSEO />
      <AlternateLinks
        links={getAlternateLinksInPdp(locale, metaDataData?.alternativeUrls)}
      />
    </>
  )
}
