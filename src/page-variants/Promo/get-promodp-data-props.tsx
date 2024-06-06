import { GetServerSidePropsContext } from 'next'
import { findResultsState } from 'react-instantsearch-dom/server'
import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { selectPageContent } from '~domains/page'
import { ReduxProvider, RootState } from '~domains/redux'
import type { EnhancedStore } from '@reduxjs/toolkit'
import { ProductSearchLayoutProps } from '~components/templates/ProductSearchLayout'
import { promotionHasInvalidDates } from '~helpers/promotionValidDate'
import { Promotion } from '~domains/contentful/normalizers/promotion'
import { convert } from 'url-slug'
import { getPromotionsNameFromLocale } from '~domains/translated-routes'
import type { InstantSearchProps } from 'react-instantsearch-core'

export const getPromoDPDataProps = async (
  context: GetServerSidePropsContext,
  store: Pick<EnhancedStore<RootState>, 'getState'>
): Promise<{ resultsState: unknown; searchFilters: string }> => {
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

  //If promotion doesn't exist or is expired, redirect to /promotions
  if (
    !context.preview &&
    pageContent?.content?.promotion &&
    promotionHasInvalidDates(pageContent?.content?.promotion as Promotion)
  ) {
    context.res?.writeHead(307, {
      Location: `/${context.locale}/${convert(
        getPromotionsNameFromLocale(context.locale)
      )}`
    })
    context.res?.end()
  }

  const searchFilters = `promos: "${pageContent?.content?.promotion?.id}"`
  const resultsState = await findResultsState(ProductWrapper, {
    indexName: getAlgoliaIndex(context.locale, 'productIndexes'),
    searchClient: createAlgoliaFrontendClient(),
    filters: searchFilters,
    category: pageContent?.content?.category
  } as InstantSearchProps['resultsState'])

  return {
    resultsState: JSON.parse(JSON.stringify(resultsState)),
    searchFilters
  }
}
