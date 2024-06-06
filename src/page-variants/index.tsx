import type { EnhancedStore, AnyAction, Middleware } from '@reduxjs/toolkit'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { FunctionComponent } from 'react'
import { ElasticSearchUrlMapRecord, PageType } from '~domains/page'
import { RootState } from '~domains/redux'
import { ResultsState, SearchState } from '~types/Search'
import { POPProps } from './POP/POP'
import { BrandProps } from './Brand/BrandPage'
import { PromoDPProps } from './Promo/PromoDetailsPage'
import { SearchProps } from './Search/Search'
import { I18nNamespace } from '~config/constants/i18n-namespaces'

const Product = dynamic<unknown>(() =>
  import('./Product/Product').then(p => p.Product)
)
const ContentPage = dynamic<unknown>(() =>
  import('./Content/Content').then(mod => mod.Content)
)
const POP = dynamic<POPProps>(() => import('./POP/POP').then(mod => mod.POP))
const BrandPage = dynamic<BrandProps>(() =>
  import('./Brand/BrandPage').then(mod => mod.BrandPage)
)
const PromoDP = dynamic<PromoDPProps>(() =>
  import('./Promo/PromoDetailsPage').then(mod => mod.PromoDP)
)
const Search = dynamic<SearchProps>(() =>
  import('./Search/Search').then(mod => mod.Search)
)
const COP = dynamic<unknown>(() => import('./COP/COP').then(mod => mod.COP))

export type PageVariantProps = {
  pageType: PageType
  resultsState?: ResultsState
  searchFilters?: string
  searchQuery?: string
  searchState?: SearchState
  i18nNamespaces?: I18nNamespace[]
}

type PageConfiguration = {
  Template: FunctionComponent<PageVariantProps>
  getStaticProps?: (
    context: GetServerSidePropsContext,
    store: EnhancedStore<RootState, AnyAction, Middleware<RootState>[]>,
    record?: ElasticSearchUrlMapRecord
  ) => Promise<Partial<PageVariantProps>>
}

type PageVariants = Record<PageType, PageConfiguration>

export const pageVariants: PageVariants = {
  [PageType.Product]: {
    Template: () => {
      return <Product />
    },
    getStaticProps: async (context, store, record) => {
      const { getProductDataProps } = await import(
        './Product/get-product-data-props'
      )
      return getProductDataProps(context, store, record)
    }
  } as PageConfiguration,
  [PageType.Content]: {
    Template: () => {
      return <ContentPage />
    }
  } as PageConfiguration,
  [PageType.POP]: {
    Template: ({ resultsState, searchFilters, searchState }) => {
      return (
        <POP
          resultsState={resultsState}
          searchFilters={searchFilters}
          searchState={searchState}
        />
      )
    },
    getStaticProps: async (context, store) => {
      const { getPOPDataProps } = await import('./POP/get-pop-data-props')
      return getPOPDataProps(context, store)
    }
  } as PageConfiguration,
  [PageType.Brand]: {
    Template: ({ resultsState, searchFilters }) => {
      return (
        <BrandPage resultsState={resultsState} searchFilters={searchFilters} />
      )
    },
    getStaticProps: async (context, store) => {
      const { getBrandPageDataProps } = await import(
        './Brand/get-brand-page-data-props'
      )
      return getBrandPageDataProps(context, store)
    }
  } as PageConfiguration,
  [PageType.Search]: {
    Template: ({ resultsState, searchFilters, searchQuery }) => {
      return (
        <Search
          resultsState={resultsState}
          searchFilters={searchFilters}
          searchQuery={searchQuery}
        />
      )
    }
  } as PageConfiguration,
  [PageType.PromoDP]: {
    Template: ({ resultsState, searchFilters }) => {
      return (
        <PromoDP resultsState={resultsState} searchFilters={searchFilters} />
      )
    },
    getStaticProps: async (context, state) => {
      const { getPromoDPDataProps } = await import(
        './Promo/get-promodp-data-props'
      )
      return getPromoDPDataProps(context, state)
    }
  } as PageConfiguration,
  [PageType.COP]: {
    Template: () => <COP />,
    getStaticProps: async (context, state) => {
      const { getCopDataProps } = await import('./COP/get-cop-data-props')

      return getCopDataProps(context, state)
    }
  } as PageConfiguration
}
