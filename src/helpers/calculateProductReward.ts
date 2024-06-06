import { useRouter } from 'next/router'
import { Product, useFormatPrice } from '~domains/product'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getIso2CodeFromLocale } from './transformLocale'

export const CalculateProductReward = (product: Partial<Product>) => {
  type rewardsInfoType = {
    [key: string]: {
      brands: {
        [key: string]: number
      }[]
      categories: {
        [key: string]: number
      }[]
      products: {
        [key: string]: number
      }[]
      base: number
    }
  }

  const rewardsInfo = useFeatureFlag(
    FeatureFlag.PDP_LOYALTY_INFO
  ) as rewardsInfoType

  const { locale } = useRouter()
  const formatPrice = useFormatPrice()

  const localeFormat = getIso2CodeFromLocale(locale)

  const hasContent = Object.keys(rewardsInfo[localeFormat] ?? {}).length > 0

  if (!hasContent) return null

  const {
    brands: brandsWithRewards,
    categories: categoriesWithRewards,
    products: productsWithRewards,
    base: baseReward
  } = (rewardsInfo[localeFormat] || {}) as rewardsInfoType[string]

  const { brand, categories, sku, price } = product

  const skuKey = sku || ''

  const brandKey = brand?.code || ''

  let categorieKey = ''

  const productsReward = (productsWithRewards ?? []).find(productWithReward => {
    return productWithReward[skuKey]
  })

  const brandReward = (brandsWithRewards ?? []).find(brandWithReward => {
    return brandWithReward[brandKey]
  })

  const categoriesReward = (categoriesWithRewards ?? []).find(
    categoryWithReward => {
      return (
        categoryWithReward[
          categories?.lvl0?.find(category => {
            categorieKey = category
            return categoryWithReward[category]
          }) ?? ''
        ] ||
        categoryWithReward[
          categories?.lvl1?.find(category => {
            categorieKey = category
            return categoryWithReward[category]
          }) ?? ''
        ] ||
        categoryWithReward[
          categories?.lvl2?.find(category => {
            categorieKey = category
            return categoryWithReward[category]
          }) ?? ''
        ]
      )
    }
  )

  const base = baseReward || 0

  const rewardPercentage =
    productsReward?.[skuKey] ||
    brandReward?.[brandKey] ||
    categoriesReward?.[categorieKey] ||
    base ||
    0

  const cashSaved = (price && price?.value * (rewardPercentage / 100)) || 0

  return {
    rewardPercentage,
    cashSaved: formatPrice(cashSaved).withCurrency
  }
}
