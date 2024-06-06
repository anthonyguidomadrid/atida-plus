import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectData as selectBrands } from '~domains/brand'
import { selectPDPHeaderData } from '~domains/product'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const useBrandUrl = () => {
  const isFetchSingleBrandEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_PDP_FETCH_SINGLE_BRAND
  )
  const brands = useSelector(selectBrands)
  const productData = useSelector(selectPDPHeaderData)
  const brandUrl = useMemo(() => {
    if (isFetchSingleBrandEnabled) return productData?.brandUrl
    return (
      brands?.find(
        brand => brand.id === productData?.brand?.code && brand.url !== ''
      )?.url ?? ''
    )
  }, [
    brands,
    isFetchSingleBrandEnabled,
    productData?.brand?.code,
    productData?.brandUrl
  ])

  return { brandUrl }
}
