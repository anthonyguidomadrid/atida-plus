import { ParsedUrlQuery } from 'querystring'
import { QueryToSearchState } from '~types/Search'
import { NextRouter } from 'next/router'

const EXCLUDED_PARAMS = [
  'all',
  'page',
  'brand',
  'categoryLvl0',
  'categoryLvl1',
  'categoryLvl2',
  'priceRange',
  'hasPromo',
  'campaign',
  'sortBy',
  'format',
  'brand_subbrand',
  'spf',
  'color',
  'hair_color',
  'glass',
  'seasonality_list_multiselect',
  'minerals_multiselect',
  'absorption_level',
  'occasion_multiselect',
  'warnings_multiselect',
  'taste_multiselect',
  'size',
  'hair_type_multiselect',
  'skin_type_multiselect',
  'vitamins_multiselect',
  'target_age_multiselect',
  'product_features_list_multiselect'
]

export const queryToSearchState = (
  searchState: ParsedUrlQuery,
  isAddFilterAndSortingInUrlEnabled?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | unknown[],
  isBrandPageCategoryFilterEnabled?: boolean
): QueryToSearchState => {
  const state: QueryToSearchState = {
    ...searchState,
    page: searchState?.page?.toString() ?? '1'
  }

  // TODO: Remove isAddFilterAndSortingInUrlEnabled check once implementation is proved on all environments
  if (isAddFilterAndSortingInUrlEnabled) {
    if (searchState?.brand) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.brand.label']: searchState?.brand.toString().split('_')
      }
    }

    if (searchState?.brand_subbrand) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.brand_subbrand.label']: searchState?.brand_subbrand
          .toString()
          .split('_')
      }
    }

    if (searchState?.format) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.format.label']: searchState?.format.toString().split('_')
      }
    }

    if (searchState?.categoryLvl0) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.categories.lvl0']: searchState?.categoryLvl0
          .toString()
          .split(',')
      }
    }

    if (searchState?.categoryLvl1) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.categories.lvl1']: searchState?.categoryLvl1
          .toString()
          .split(',')
      }
    }

    if (searchState?.spf) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.spf.label']: searchState?.spf.toString().split(',')
      }
    }

    if (searchState?.color) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.color.label']: searchState?.color.toString().split(',')
      }
    }

    if (searchState?.hair_color) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.hair_color.label']: searchState?.hair_color
          .toString()
          .split(',')
      }
    }

    if (searchState?.glass) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.glass.label']: searchState?.glass.toString().split(',')
      }
    }

    if (searchState?.seasonality_list_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.seasonality_list_multiselect.label']: searchState?.seasonality_list_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.minerals_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.minerals_multiselect.label']: searchState?.minerals_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.absorption_level) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.absorption_level.label']: searchState?.absorption_level
          .toString()
          .split(',')
      }
    }

    if (searchState?.occasion_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.occasion_multiselect.label']: searchState?.occasion_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.warnings_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.warnings_multiselect.label']: searchState?.warnings_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.taste_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.taste_multiselect.label']: searchState?.taste_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.size) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.size.label']: searchState?.size.toString().split(',')
      }
    }

    if (searchState?.hair_type_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.hair_type_multiselect.label']: searchState?.hair_type_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.skin_type_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.skin_type_multiselect.label']: searchState?.skin_type_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.vitamins_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.vitamins_multiselect.label']: searchState?.vitamins_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.target_age_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.target_age_multiselect.label']: searchState?.target_age_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.product_features_list_multiselect) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.product_features_list_multiselect.label']: searchState?.product_features_list_multiselect
          .toString()
          .split(',')
      }
    }

    if (searchState?.categoryLvl2) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['attributes.categories.lvl2']: searchState?.categoryLvl2
          .toString()
          .split(',')
      }
    }

    if (searchState?.campaign) {
      state.refinementList = {
        ...(state.refinementList ?? {}),
        ['campaign']: searchState?.campaign.toString().split(',')
      }
    }

    if (isBrandPageCategoryFilterEnabled) {
      if (searchState?.categoryLvl0) {
        state.refinementList = {
          ...(state.refinementList ?? {}),
          ['attributes.categories.lvl0']: searchState?.categoryLvl0
            .toString()
            .split(',')
        }

        if (searchState?.categoryLvl1) {
          state.refinementList = {
            ...(state.refinementList ?? {}),
            ['attributes.categories.lvl1']: searchState?.categoryLvl1
              .toString()
              .split(',')
          }
        }
      }
    }

    if (searchState?.priceRange) {
      const rangeValuesArray = searchState?.priceRange.toString().split('-')
      state.range = {
        'price.sale': {
          min: parseInt(rangeValuesArray[0]) * 100,
          max: parseInt(rangeValuesArray[1]) * 100
        }
      }
    }

    if (searchState?.hasPromo) {
      state.toggle = {
        has_promo: searchState?.hasPromo
      }
    }
  }

  return state
}

export const searchStateToQuery = (
  query: QueryToSearchState,
  urlParams?: NextRouter['query'],
  isAddFilterAndSortingInUrlEnabled?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | unknown[],
  isBrandPageCategoryFilterEnabled?: boolean
): ParsedUrlQuery => {
  const simplifiedQuery: ParsedUrlQuery = {}
  // Check for different filters and in case any is applied add it to the simplifiedQuery in order to be added in the url
  if (urlParams) {
    Object.keys(urlParams).map((key: string) => {
      if (!EXCLUDED_PARAMS.includes(key)) {
        simplifiedQuery[key] = urlParams[key]
      }
    })
  }

  // TODO: Remove isAddFilterAndSortingInUrlEnabled check once implementation is proved on all environments
  if (query?.search) {
    simplifiedQuery.search = query.search.toString()
  }

  if (isAddFilterAndSortingInUrlEnabled) {
    if (query?.sortBy) {
      query.sortBy.toString().includes('price') &&
        (simplifiedQuery.sortBy = query.sortBy.toString())
    }

    if (query?.refinementList) {
      const campaignArray = query.refinementList['campaign'] ?? []
      const campaignFilter =
        campaignArray.length > 0 ? campaignArray[0] : undefined
      campaignFilter && (simplifiedQuery.campaign = campaignFilter)
      const brandsArray =
        query?.refinementList?.['attributes.brand.label'] ?? []
      const brandFilters =
        brandsArray.length > 0 ? brandsArray.join('_') : undefined
      brandFilters && (simplifiedQuery.brand = brandFilters)

      const subBrandsArray =
        query?.refinementList?.['attributes.brand_subbrand.label'] ?? []
      const subBrandFilters =
        subBrandsArray.length > 0 ? subBrandsArray.join('_') : undefined
      subBrandFilters && (simplifiedQuery.brand_subbrand = subBrandFilters)

      const formatArray =
        query?.refinementList?.['attributes.format.label'] ?? []
      const formatFilters =
        formatArray.length > 0 ? formatArray.join('_') : undefined
      formatFilters && (simplifiedQuery.format = formatFilters)

      const categoryLvl0Array =
        query?.refinementList?.['attributes.categories.lvl0'] ?? []
      const categoryLvl0Filters =
        categoryLvl0Array.length > 0 ? categoryLvl0Array.join(',') : undefined
      categoryLvl0Filters &&
        (simplifiedQuery.categoryLvl0 = categoryLvl0Filters)

      const categoryLvl1Array =
        query?.refinementList?.['attributes.categories.lvl1'] ?? []
      const categoryLvl1Filters =
        categoryLvl1Array.length > 0 ? categoryLvl1Array.join(',') : undefined
      categoryLvl1Filters &&
        (simplifiedQuery.categoryLvl1 = categoryLvl1Filters)

      const spfArray = query?.refinementList?.['attributes.spf.label'] ?? []
      const spfFilters = spfArray.length > 0 ? spfArray.join(',') : undefined
      spfFilters && (simplifiedQuery.spf = spfFilters)

      const colorArray = query?.refinementList?.['attributes.color.label'] ?? []
      const colorFilters =
        colorArray.length > 0 ? colorArray.join(',') : undefined
      colorFilters && (simplifiedQuery.color = colorFilters)

      const hairColorArray =
        query?.refinementList?.['attributes.hair_color.label'] ?? []
      const hairColorFilters =
        hairColorArray.length > 0 ? hairColorArray.join(',') : undefined
      hairColorFilters && (simplifiedQuery.hair_color = hairColorFilters)

      const glassArray = query?.refinementList?.['attributes.glass.label'] ?? []
      const glassFilters =
        glassArray.length > 0 ? glassArray.join(',') : undefined
      glassFilters && (simplifiedQuery.glass = glassFilters)

      const seasonalityList =
        query?.refinementList?.[
          'attributes.seasonality_list_multiselect.label'
        ] ?? []
      const seasonalityFilters =
        seasonalityList.length > 0 ? seasonalityList.join(',') : undefined
      seasonalityFilters && (simplifiedQuery.glass = seasonalityFilters)

      const mineralsList =
        query?.refinementList?.['attributes.minerals_multiselect.label'] ?? []
      const mineralsFilters =
        mineralsList.length > 0 ? mineralsList.join(',') : undefined
      mineralsFilters &&
        (simplifiedQuery.minerals_multiselect = mineralsFilters)

      const absorptionLevelList =
        query?.refinementList?.['attributes.absorption_level.label'] ?? []
      const absorptionLevelFilters =
        absorptionLevelList.length > 0
          ? absorptionLevelList.join(',')
          : undefined
      absorptionLevelFilters &&
        (simplifiedQuery.absorption_level = absorptionLevelFilters)

      const occasionMultiselectList =
        query?.refinementList?.['attributes.occasion_multiselect.label'] ?? []
      const ocasionMultiselectFilters =
        occasionMultiselectList.length > 0
          ? occasionMultiselectList.join(',')
          : undefined
      ocasionMultiselectFilters &&
        (simplifiedQuery.occasion_multiselect = ocasionMultiselectFilters)

      const warningsMultiselectList =
        query?.refinementList?.['attributes.warnings_multiselect.label'] ?? []
      const warningsMultiselectFilters =
        warningsMultiselectList.length > 0
          ? warningsMultiselectList.join(',')
          : undefined
      warningsMultiselectFilters &&
        (simplifiedQuery.occasion_multiselect = warningsMultiselectFilters)

      const tasteMultiselectList =
        query?.refinementList?.['attributes.taste_multiselect.label'] ?? []
      const tasteMultiselectFilters =
        tasteMultiselectList.length > 0
          ? tasteMultiselectList.join(',')
          : undefined
      tasteMultiselectFilters &&
        (simplifiedQuery.taste_multiselect = tasteMultiselectFilters)

      const sizeList = query?.refinementList?.['attributes.size.label'] ?? []
      const sizeFilters = sizeList.length > 0 ? sizeList.join(',') : undefined
      sizeFilters && (simplifiedQuery.size = sizeFilters)

      const hairTypeMultiselectList =
        query?.refinementList?.['attributes.hair_type_multiselect.label'] ?? []
      const hairTypeMultiselectFilters =
        hairTypeMultiselectList.length > 0
          ? hairTypeMultiselectList.join(',')
          : undefined
      hairTypeMultiselectFilters &&
        (simplifiedQuery.hair_type_multiselect = hairTypeMultiselectFilters)

      const skinTypeMultiselectList =
        query?.refinementList?.['attributes.skin_type_multiselect.label'] ?? []
      const skinTypeMultiselectFilters =
        skinTypeMultiselectList.length > 0
          ? skinTypeMultiselectList.join(',')
          : undefined
      skinTypeMultiselectFilters &&
        (simplifiedQuery.skin_type_multiselect = skinTypeMultiselectFilters)

      const vitaminsMultiselectList =
        query?.refinementList?.['attributes.vitamins_multiselect.label'] ?? []
      const vitaminsMultiselectFilters =
        vitaminsMultiselectList.length > 0
          ? vitaminsMultiselectList.join(',')
          : undefined
      vitaminsMultiselectFilters &&
        (simplifiedQuery.vitamins_multiselect = vitaminsMultiselectFilters)

      const targetAgeMultiselectList =
        query?.refinementList?.['attributes.target_age_multiselect.label'] ?? []
      const targetAgeMultiselectFilters =
        targetAgeMultiselectList.length > 0
          ? targetAgeMultiselectList.join(',')
          : undefined
      targetAgeMultiselectFilters &&
        (simplifiedQuery.target_age_multiselect = targetAgeMultiselectFilters)

      const productFeaturesListMultiselectList =
        query?.refinementList?.[
          'attributes.product_features_list_multiselect.label'
        ] ?? []
      const productFeaturesListMultiselectFilters =
        productFeaturesListMultiselectList.length > 0
          ? productFeaturesListMultiselectList.join(',')
          : undefined
      productFeaturesListMultiselectFilters &&
        (simplifiedQuery.product_features_list_multiselect = productFeaturesListMultiselectFilters)

      const categoryLvl2Array =
        query?.refinementList?.['attributes.categories.lvl2'] ?? []
      const categoryLvl2Filters =
        categoryLvl2Array.length > 0 ? categoryLvl2Array.join(',') : undefined
      categoryLvl2Filters &&
        (simplifiedQuery.categoryLvl2 = categoryLvl2Filters)

      if (isBrandPageCategoryFilterEnabled) {
        const categoryLvl0Array =
          query?.refinementList?.['attributes.categories.lvl0'] ?? []
        const categoryLvl0Filters =
          categoryLvl0Array.length > 0 ? categoryLvl0Array.join(',') : undefined
        categoryLvl0Filters &&
          (simplifiedQuery.categoryLvl0 = categoryLvl0Filters)

        const categoryLvl1Array =
          query?.refinementList?.['attributes.categories.lvl1'] ?? []
        const categoryLvl1Filters =
          categoryLvl1Array.length > 0 ? categoryLvl1Array.join(',') : undefined
        categoryLvl1Filters &&
          (simplifiedQuery.categoryLvl1 = categoryLvl1Filters)
      }
    }

    if (query?.range) {
      const minPrice = query?.range?.['price.sale']?.min ?? 0
      const maxPrice = query?.range?.['price.sale']?.max ?? 0
      maxPrice > 0 &&
        (simplifiedQuery.priceRange = `${minPrice / 100}-${maxPrice / 100}`)
    }

    if (query?.toggle) {
      const hasPromo = query?.toggle?.has_promo
      hasPromo && (simplifiedQuery.hasPromo = hasPromo)
    }
  }

  if (query?.page && Number(query.page) !== 1) {
    simplifiedQuery.page = query.page.toString()
  }

  return simplifiedQuery
}
