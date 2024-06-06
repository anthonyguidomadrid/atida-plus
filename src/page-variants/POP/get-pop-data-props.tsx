import { GetServerSidePropsContext } from 'next'
import { findResultsState } from 'react-instantsearch-dom/server'
import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { selectPageContent } from '~domains/page'
import { ReduxProvider, RootState } from '~domains/redux'
import type { EnhancedStore } from '@reduxjs/toolkit'
import { ProductSearchLayoutProps } from '~components/templates/ProductSearchLayout'
import { queryToSearchState } from '~helpers/queryToSearchState'
import { QueryToSearchState } from '~types/Search'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'
import type { InstantSearchProps } from 'react-instantsearch-core'
import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'

export const getPOPDataProps = async (
  context: GetServerSidePropsContext,
  store: Pick<EnhancedStore<RootState>, 'getState'>
): Promise<{
  resultsState: unknown
  searchFilters: string
  searchState: QueryToSearchState
  featureFlags: Record<string, FeatureFlagValue>
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
  const level = pageContent?.content?.category?.level ?? 0
  const searchFilters = `attributes.categories.lvl${level}: "${pageContent.content?.category?.id}"`
  const searchState = queryToSearchState(context.query)
  const resultsState = await findResultsState(ProductWrapper, {
    indexName: getAlgoliaIndex(context.locale, 'productIndexes'),
    searchClient: createAlgoliaFrontendClient(),
    filters: searchFilters,
    category: pageContent?.content?.category,
    searchState
  } as InstantSearchProps['resultsState'])

  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.NEW_CAMPAIGN_TAG_FILTER
  ])

  return {
    resultsState: JSON.parse(JSON.stringify(resultsState)),
    searchFilters,
    featureFlags,
    searchState
  }
}
