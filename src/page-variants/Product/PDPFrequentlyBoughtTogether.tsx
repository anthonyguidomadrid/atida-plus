import { useSelector } from 'react-redux'
import { RECOMMENDATIONS_TYPES } from '~config/constants/recommendations'
import { selectProductData } from '~domains/product'
import { ExponeaRecommendationBlock } from '~components/organisms/ExponeaRecommendationBlock'

export type PDPFrequentlyBoughtTogetherProps = {
  productSku: string
}

export const PDPFrequentlyBoughtTogether = () => {
  const product = useSelector(selectProductData)

  if (!product) return null
  return (
    <div className="col-span-12 py-4 sm:py-0 mb-7 border-ui-grey-lightest md:col-start-7 md:col-end-13 lg:col-start-8 lg:pl-7">
      <ExponeaRecommendationBlock
        recommendationType={RECOMMENDATIONS_TYPES.FREQUENTLY_BOUGHT_TOGETHER}
        loading="lazy"
        productId={product.sku}
        data-testid="pdpFrequentlyBoughtTogether"
      />
    </div>
  )
}
