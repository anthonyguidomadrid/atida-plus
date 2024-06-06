import { FunctionComponent } from 'react'
import { DynamicWidgets } from 'react-instantsearch-dom'
import { Facet } from '~types/Facet'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type ProductFiltersProps = {
  facets?: Facet[]
}

export const ProductFilters: FunctionComponent<ProductFiltersProps> = ({
  facets
}) => {
  const preventAdditionalRequestFromFetchingAllFacets = useFeatureFlag(
    FeatureFlag.ALGOLIA_PREVENT_ADDITIONAL_REQUEST_FROM_FETCHING_ALL_FACETS
  )
  return (
    <div data-testid="productFilters">
      <DynamicWidgets
        /* @ts-ignore */
        facets={preventAdditionalRequestFromFetchingAllFacets ? [] : ['*']}
      >
        {/*// @ts-ignore*/}
        {facets?.map(({ facet, title, testId }) => {
          return (
            <div key={title} className="mb-4" data-testid={testId}>
              {facet}
            </div>
          )
        })}
      </DynamicWidgets>
    </div>
  )
}
