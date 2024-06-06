import { Product } from '~domains/product'

export type ExponeaProduct = {
  brand?: string
  cost_per_unit?: number
  description?: string
  engine_name: string
  image?: string
  item_id: string
  price?: number
  product_id: string
  recommendation_id: string
  recommendation_source: string
  recommendation_variant_id: null
  title?: string
  url?: string
}

type ExponeaRecommendationsDataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

export type ExponeaFetchRecommendationsDataState = ExponeaRecommendationsDataState & {
  details?: FetchRecommendationResponse[]
}

export type ExponeaFetchAllRecommendationsDataState = ExponeaRecommendationsDataState & {
  content?: FetchAllRecommendationsResponse[]
}

export type SuccessfulExponeaResult = {
  success: boolean
  value: ExponeaProduct[]
}

export type ErrorExponeaResult = { success: boolean; error: string }

export type ExponeaResult = SuccessfulExponeaResult | ErrorExponeaResult

export type ExponeaRecommendationResponse = {
  results: ExponeaResult[]
  success: boolean
}

export type ExponeaRecommendationPayload = {
  recommendationId: string
  productId?: string
  categoryId?: string
  itemsQuantity?: number
}

export type FetchRecommendationResponse = {
  recommendationId?: string
  isPersonalized?: boolean
  items: Partial<Product>[]
}

export type ExponeaAllRecommendationsTriggerPayload = {
  type: string
}

export type ContentfulFetchAllRecommendationsResponse = {
  data: {
    exponeaRecommendationCollection: {
      items: RecommendationBlock[]
    }
  }
}

export type FetchAllRecommendationsResponse = {
  items: RecommendationBlock[]
}

export type RecommendationBlock = {
  title: string
  id: string
  type: string
  isSlider?: boolean | null
  quantity?: number
  altTitle?: string
}
