import { SessionChannelType } from '~domains/basket/types'
import { Product } from '~domains/product'

export type StaticRecommendationDataState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
}

export type FetchStaticRecommendation = {
  key: string
  products: Partial<Product>[]
}

export type FetchStaticRecommendationTriggerPayload = {
  list: FetchStaticRecommendation[]
  sessionChannel?: SessionChannelType
}

export type FetchStaticRecommendationDataState = StaticRecommendationDataState & {
  details?: FetchStaticRecommendation[]
}
