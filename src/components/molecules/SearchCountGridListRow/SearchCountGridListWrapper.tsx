import classNames from 'classnames'
import { FunctionComponent } from 'react'

import { SearchCountConnected } from '~components/templates/ProductSearchLayout/connected'
import { GridListToggle } from '~components/atoms/GridListToggle'
import useHasSidebar from '~domains/page/hooks/useHasSidebar'

/**
 * SearchCount and GridListToggle wrapper.
 */
export const SearchCountGridListWrapper: FunctionComponent = () => {
  const hasSidebar = useHasSidebar()

  return (
    <div
      id="searchCountGridListWrapper"
      className={classNames(
        'my-2 col-span-12 flex items-end justify-between',
        'sm:my-1.5 sm:col-span-5 sm:col-end-13 sm:items-center',
        'md:col-span-12'
      )}
    >
      {/* Search count */}
      <div>
        <SearchCountConnected data-testid="productSearchTotalCount" />
      </div>

      {hasSidebar && (
        <hr
          className={classNames(
            'hidden sm:block md:hidden w-px border-0 h-3 bg-ui-grey-lightest mx-2'
          )}
        />
      )}

      {/* Toggle list/grid view */}
      <GridListToggle data-testid="gridListToggle" />
    </div>
  )
}

export const SearchCountGridListWrapperPlaceholder: FunctionComponent = () => (
  <>
    <div className="flex items-center justify-between my-2 col-span-12 sm:my-1.5 sm:col-span-5 sm:col-end-13 md:col-span-12">
      <div className="bg-ui-grey-lightest h-3 w-10" />
      <div className="flex items-center justify-end space-x-3">
        <div className="bg-ui-grey-lightest h-3 w-10" />
        <div className="bg-ui-grey-lightest h-3 w-4" />
      </div>
    </div>
  </>
)
