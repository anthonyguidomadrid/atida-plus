import { FunctionComponent, SetStateAction, Dispatch } from 'react'
import { connectSortBy } from 'react-instantsearch-dom'
import { useTranslation } from 'react-i18next'
import { Select } from '~components/atoms/Select'

type SelectOptionType = {
  value: string
  label: string
}

type ConnectSortByType = {
  refine: Dispatch<SetStateAction<string>>
  items: SelectOptionType[]
  initialValue?: string | undefined
}

const SortSelect: FunctionComponent<ConnectSortByType> = ({
  items,
  refine,
  initialValue
}) => {
  const { t } = useTranslation()

  return (
    <div className="select hidden sm:inline-flex">
      <span className="font-semibold">{t('search.sort.label')}</span>
      <Select
        className="ais-SortBy-select h-5 text-sm"
        onChange={event => refine(event.target.value)}
        initialValue={initialValue ?? undefined}
        isSortBy
      >
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label.toLocaleLowerCase()}
          </option>
        ))}
      </Select>
    </div>
  )
}

export const Sort = connectSortBy(SortSelect)

export const SortPlaceholder = () => (
  <div className="flex items-center space-x-2">
    <div className="bg-ui-grey-lightest h-3 w-10" />
    <div className="bg-ui-grey-lightest h-5 w-16" />
  </div>
)
