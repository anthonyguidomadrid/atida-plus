import { ComponentPropsWithoutRef, FunctionComponent, LegacyRef } from 'react'
import { Drawer } from '~components/molecules/Drawer'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { FilterAndSortMenu } from '~components/molecules/FilterAndSortMenu'
import { Facet } from '~types/Facet'
import { ClearRefinements } from 'react-instantsearch-dom'

export type FilterAndSortProps = {
  onClose?: () => void
  facets?: Facet[]
  locale?: string
  dropdownRef?: LegacyRef<HTMLDivElement>
  isSortMenu?: boolean
}

export const FilterAndSort: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & FilterAndSortProps
> = ({ onClose, dropdownRef, facets, className, locale, isSortMenu }) => {
  const { t } = useTranslation()

  return (
    <div className="w-full top-0 right-0 fixed bottom-0 bg-overlay">
      <div
        ref={dropdownRef}
        data-testid="filterAndSortMenu"
        className={classNames(
          'w-full top-0 left-0 overflow-y-scroll fixed bottom-0 sm:w-1/2 bg-primary-white',
          className
        )}
      >
        <Drawer
          title={isSortMenu ? t('shared.sort.title') : t('shared.filter.title')}
          onClickCloseIcon={onClose}
          isFilter={true}
          isInverted={true}
        >
          <div className="absolute left-3 text-primary-white top-3">
            {!isSortMenu && (
              <ClearRefinements
                translations={{
                  reset: t('search.filters.clear-all')
                }}
              />
            )}
          </div>
          <FilterAndSortMenu
            isSortMenu={isSortMenu}
            locale={locale}
            facets={facets}
            onClose={onClose}
          />
        </Drawer>
      </div>
    </div>
  )
}
