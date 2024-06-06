import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { QueryToSearchState, SearchState } from '~types/Search'
import { queryToSearchState, searchStateToQuery } from './queryToSearchState'
import { ParsedUrlQuery } from 'querystring'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const useSyncSearchStateToUrl = (
  initialState?: SearchState
): {
  searchState: QueryToSearchState
  onSearchStateChange: ({
    configure: _configure,
    ...updatedSearchState
  }: SearchState) => void
  createURL: (state: SearchState) => ParsedUrlQuery
} => {
  // TODO: Remove isAddFilterAndSortingParametersToUrlFeatureEnabled FF once implementation is proved on all environments
  const isAddFilterAndSortingParametersToUrlFeatureEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_ADD_FILTER_AND_SORTING_PARAMETER_TO_URL
  )
  const isBrandPageCategoryFilterEnabled = useFeatureFlag(
    FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS
  )
  const router = useRouter()
  const [searchState, setSearchState] = useState(
    queryToSearchState(
      router?.query,
      isAddFilterAndSortingParametersToUrlFeatureEnabled,
      Boolean(isBrandPageCategoryFilterEnabled)
    )
  )

  const dependenciesArr = isAddFilterAndSortingParametersToUrlFeatureEnabled
    ? [router?.query, isAddFilterAndSortingParametersToUrlFeatureEnabled]
    : [initialState, isAddFilterAndSortingParametersToUrlFeatureEnabled]

  useEffect(() => {
    if (!isAddFilterAndSortingParametersToUrlFeatureEnabled && initialState) {
      setSearchState(initialState)
    } else {
      setSearchState(
        queryToSearchState(
          router?.query,
          isAddFilterAndSortingParametersToUrlFeatureEnabled,
          Boolean(isBrandPageCategoryFilterEnabled)
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependenciesArr)

  const onSearchStateChange = useCallback(
    ({ configure: _configure, ...updatedSearchState }: SearchState) => {
      const previousCategoriesArr = Array(updatedSearchState?.all)
      const newCategoriesArr = Array(router?.query?.all)

      const isNavigationToNextPage =
        JSON.stringify(previousCategoriesArr) ===
        JSON.stringify(newCategoriesArr)

      const previousSearchState = isNavigationToNextPage
        ? updatedSearchState
        : (({ all: updatedSearchState.all, page: 1 } as unknown) as SearchState)

      const isShallowRouting =
        Number(previousSearchState?.page) === 1 ? false : true
      router.replace(
        {
          pathname: Array.isArray(router?.query?.all)
            ? router?.query?.all.join('/')
            : router?.query?.all,
          query: searchStateToQuery(
            previousSearchState,
            router?.query,
            isAddFilterAndSortingParametersToUrlFeatureEnabled,
            Boolean(isBrandPageCategoryFilterEnabled)
          )
        },
        undefined,
        { shallow: isShallowRouting, scroll: false }
      )

      setSearchState(previousSearchState)
    },
    [
      router,
      isAddFilterAndSortingParametersToUrlFeatureEnabled,
      isBrandPageCategoryFilterEnabled
    ]
  )

  const createURL = useCallback(
    (state: SearchState) => searchStateToQuery(state),
    []
  )

  return { searchState, onSearchStateChange, createURL }
}
