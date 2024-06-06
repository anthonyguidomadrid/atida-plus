import type { FunctionComponent } from 'react'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import type { Category } from '~domains/contentful'
import { ProductListWithStateConnected } from '~components/templates/ProductSearchLayout/connected'
import { SearchCountGridListWrapper } from '~components/molecules/SearchCountGridListRow'

export type MinimalProductSearchLayoutProps = InstantSearchProps & {
  filters?: string
  locale?: string
  category?: Category
  query?: string
}

export const MinimalProductSearchLayout: FunctionComponent<MinimalProductSearchLayoutProps> = ({
  locale,
  filters,
  query,
  ...props
}) => (
  <InstantSearch {...props}>
    <Configure
      hitsPerPage={50}
      filters={filters}
      query={query}
      clickAnalytics
    />

    {/* Search count and grid/list toggle */}
    <SearchCountGridListWrapper />

    {/* Product list */}
    <ProductListWithStateConnected
      locale={locale}
      data-testid="productSearchList"
    />
  </InstantSearch>
)
