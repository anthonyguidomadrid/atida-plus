import { GetServerSidePropsContext } from 'next'
import { findResultsState } from 'react-instantsearch-dom/server'
import type { EnhancedStore } from '@reduxjs/toolkit'

import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { selectPageContent } from '~domains/page'
import { ReduxProvider, RootState } from '~domains/redux'
import { ProductSearchLayoutProps } from '~components/templates/ProductSearchLayout'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'
import { queryToSearchState } from '~helpers/queryToSearchState'
import { I18nNamespace } from '~config/constants/i18n-namespaces'
import type { InstantSearchProps } from 'react-instantsearch-core'
import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'

export const getBrandPageDataProps = async (
  context: GetServerSidePropsContext,
  store: Pick<EnhancedStore<RootState>, 'getState'>
): Promise<{
  resultsState: unknown
  searchFilters: string
  featureFlags: Record<string, FeatureFlagValue>
  i18nNamespaces?: I18nNamespace[]
}> => {
  const ProductSearchLayout = await import(
    '~components/templates/ProductSearchLayout'
  ).then(mod => mod.ProductSearchLayout)
  const ProductWrapper = (
    props: Omit<ProductSearchLayoutProps, 'searchClient' | 'indexName'>
  ) => {
    return (
      <ReduxProvider locale={context.locale as string}>
        <ProductSearchLayout
          {...({
            ...props,
            ...{ locale: context?.locale }
          } as ProductSearchLayoutProps)}
        />
      </ReduxProvider>
    )
  }
  const pageContent = selectPageContent(store.getState())

  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS,
    FeatureFlag.NAVIGATION_ADD_TYPE_BRANDPAGE_TO_CONTEXTRULES
  ])

  const searchFilters = `attributes.brand.code: "${pageContent.content?.brand?.id}"`
  const searchState = queryToSearchState(context.query)
  const resultsState = await findResultsState(ProductWrapper, {
    indexName: getAlgoliaIndex(context.locale, 'productIndexes'),
    searchClient: createAlgoliaFrontendClient(),
    filters: searchFilters,
    brand: pageContent?.content?.brand,
    searchState
  } as InstantSearchProps['resultsState'])

  return {
    resultsState: JSON.parse(JSON.stringify(resultsState)),
    searchFilters,
    featureFlags,
    i18nNamespaces: featureFlags[FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS]
      ? [I18nNamespace.CATEGORY_TITLE]
      : undefined
  }
}
