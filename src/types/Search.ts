export type ResultsState = {
  rawResults: RawResults[]
}

export type RawResults = {
  nbHits?: number
  hits?: []
}

export type SearchState = Record<
  string,
  | string
  | string[]
  | Record<string, string | string[] | undefined>
  | Record<string, Record<string, number>>
  | undefined
>

export type QueryToSearchState = {
  all?: string[]
  search?: string
  page?: string | number
  hasPromo?: string
  priceRange?: string
  sortBy?: string
  refinementList?: {
    'attributes.brand.label'?: string[]
    'attributes.brand_subbrand.label'?: string[]
    'attributes.format.label'?: string[]
    'attributes.categories.lvl0'?: string[]
    'attributes.categories.lvl1'?: string[]
    'attributes.categories.lvl2'?: string[]
    'attributes.spf.label'?: string[]
    'attributes.color.label'?: string[]
    'attributes.hair_color.label'?: string[]
    'attributes.glass.label'?: string[]
    'attributes.seasonality_list_multiselect.label'?: string[]
    'attributes.minerals_multiselect.label'?: string[]
    'attributes.absorption_level.label'?: string[]
    'attributes.occasion_multiselect.label'?: string[]
    'attributes.warnings_multiselect.label'?: string[]
    'attributes.taste_multiselect.label'?: string[]
    'attributes.size.label'?: string[]
    'attributes.hair_type_multiselect.label'?: string[]
    'attributes.skin_type_multiselect.label'?: string[]
    'attributes.vitamins_multiselect.label'?: string[]
    'attributes.target_age_multiselect.label'?: string[]
    'attributes.product_features_list_multiselect.label'?: string[]
    campaign?: string[]
  }
  toggle?: {
    has_promo?: string | string[]
  }
  range?: {
    'price.sale': {
      min: number
      max: number
    }
  }
}
