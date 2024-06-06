import { connectStateResults } from 'react-instantsearch-dom'
import type { StateResultsProvided } from 'react-instantsearch-core'
import type { AlgoliaProduct } from '~domains/product'
import { ReactNode, useEffect, useRef } from 'react'
import { HTMLDivElement } from 'globalthis/implementation'

export const ConditionalFacet = connectStateResults(
  ({
    ifSelected,
    searchState,
    children
  }: StateResultsProvided<AlgoliaProduct> & {
    ifSelected: Record<string, string>
    children: ReactNode
  }) => {
    const element = useRef<HTMLDivElement | null>(null)
    // will loop through the ifSelected object, to find out if any of the filters are selected. Will return true
    // only if ALL filters are selected.
    const isVisible = Object.entries(ifSelected).reduce(
      (result, [conditionType, conditionAttribute]) => {
        if (searchState?.[conditionType]?.[conditionAttribute]) {
          return true
        }

        return false
      },
      false
    )

    useEffect(() => {
      // it's not really ideal to do this, I think a refactoring is needed to include the containing div & filter
      // title in a single component (https://olp.atlassian.net/browse/PLUS-4494)
      if (!isVisible) {
        element.current?.parentElement?.classList.add('hidden')
      } else {
        element.current?.parentElement?.classList.remove('hidden')
      }
    }, [isVisible])

    return <div ref={element}>{children}</div>
  }
)
