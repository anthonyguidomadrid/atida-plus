import { queryToSearchState, searchStateToQuery } from './queryToSearchState'
import { NextRouter } from 'next/router'

export const updateUrlOnProductClick = (
  router: NextRouter,
  sku: string,
  productPage: number | undefined,
  isAddFilterAndSortingParametersToUrlFeatureEnabled?:
    | string
    | number
    | boolean
    | Record<string, unknown>
    | unknown[],
  isBrandPageCategoryFilterEnabled?: boolean
): void => {
  const storage = globalThis.sessionStorage

  if (!storage) return
  storage.setItem('scroll-position-product-id-marker', sku)

  const updatedSearchState = queryToSearchState(
    router?.query,
    isAddFilterAndSortingParametersToUrlFeatureEnabled,
    isBrandPageCategoryFilterEnabled
  )

  router.replace(
    {
      pathname: Array.isArray(router?.query?.all)
        ? router?.query?.all.join('/')
        : router?.query?.all,
      query: searchStateToQuery(
        { ...updatedSearchState, page: `${productPage}` },
        router?.query,
        isAddFilterAndSortingParametersToUrlFeatureEnabled,
        isBrandPageCategoryFilterEnabled
      )
    },
    undefined,
    { shallow: true }
  )
}
