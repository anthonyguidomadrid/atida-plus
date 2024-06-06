import { ChangeEvent, FunctionComponent, memo } from 'react'
import { Filter as FilterComponent } from '~components/molecules/Filter'
import { Filter } from '~domains/contentful/normalizers/page-filter'

export type FilterListProps = {
  items: Filter[]
  handleFiltersSelection: (e: ChangeEvent<HTMLInputElement>) => void
  activeFilters: string[]
}

const FilterListComponent: FunctionComponent<FilterListProps> = ({
  items,
  handleFiltersSelection,
  activeFilters
}) => {
  return (
    <div
      data-testid="filterList"
      className="w-full mb-2.5 md:max-w-32 space-y-3"
    >
      {items?.map(({ title, items }, index) => (
        <FilterComponent
          key={`${title}-${index}`}
          title={title}
          items={items}
          handleFiltersSelection={handleFiltersSelection}
          activeFilters={activeFilters}
        />
      ))}
    </div>
  )
}

export const FilterList = memo(FilterListComponent)

export default FilterList
