import { ChangeEvent, FunctionComponent } from 'react'
import { Checkbox } from '~components/atoms/Checkbox'
import { FilterItem } from '~domains/contentful/normalizers/page-filter'

export type FilterProps = {
  title: string
  items: FilterItem[]
  handleFiltersSelection: (e: ChangeEvent<HTMLInputElement>) => void
  activeFilters: string[]
}

export const Filter: FunctionComponent<FilterProps> = ({
  title,
  items,
  handleFiltersSelection,
  activeFilters
}) => {
  return (
    <div data-testid="filter">
      <p
        data-testid="filterTitle"
        className="text-primary-oxford-blue font-semibold text-base mb-2 md:mb-2.5"
      >
        {title}
      </p>
      <div className="max-w-full md:max-w-none flex sm-and-below:flex-wrap md:flex-col md:mr-5">
        {items &&
          items.map(({ id, label }) => {
            return (
              <Checkbox
                key={id}
                label={label}
                id={id}
                isChecked={activeFilters?.includes(id as string)}
                onChange={handleFiltersSelection}
                className="flex border border-ui-grey whitespace-nowrap p-1 sm-and-below:mb-1.5 md:p-0 mr-1 md:mr-0 md:mb-2 md:border-0"
                isFilter={true}
                data-testid="filterName"
              />
            )
          })}
      </div>
    </div>
  )
}
