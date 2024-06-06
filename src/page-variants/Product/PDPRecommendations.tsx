import { useSelector } from 'react-redux'
import { FeatureFlag } from '~config/constants/feature-flags'
import { RECOMMENDATIONS_TYPES } from '~config/constants/recommendations'
import { selectProductSku } from '~domains/product'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { ExponeaRecommendationBlock } from '~components/organisms/ExponeaRecommendationBlock'
import { PDPFrequentlyBoughtTogether } from './PDPFrequentlyBoughtTogether'

export const PDPRecommendations = () => {
  const [
    isFrequentlyBoughtTogetherFeatureEnabled,
    isShowRecommendationsBeforeFBTEnabled
  ] = useFeatureFlags([
    FeatureFlag.PDP_FREQUENTLY_BOUGHT_TOGETHER,
    FeatureFlag.SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT
  ])

  const isSmallSize = useBreakpoint(breakpoints.sm)
  const productSku = useSelector(selectProductSku)

  return (
    <>
      {/* On Mobile show FBT under the reviews if FF SHOPPING_SHOW_OUR_RECOMMENDATIONS_BEFORE_FBT is enabled else show Our Recommendations */}
      {isShowRecommendationsBeforeFBTEnabled && !isSmallSize ? (
        isFrequentlyBoughtTogetherFeatureEnabled && (
          <PDPFrequentlyBoughtTogether />
        )
      ) : (
        <ExponeaRecommendationBlock
          recommendationType={RECOMMENDATIONS_TYPES.PDP1}
          loading="lazy"
          productId={productSku}
          className="mb-8 col-span-12"
        />
      )}

      {/* Last viewed products */}
      <aside className="col-span-12">
        <ExponeaRecommendationBlock
          recommendationType={RECOMMENDATIONS_TYPES.PDP2}
          loading="lazy"
          productId={productSku}
          className="mb-8"
        />
      </aside>
    </>
  )
}
