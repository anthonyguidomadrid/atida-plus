import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as GridView } from '~assets/svg/navigation-24px/GridView.svg'
import { ReactComponent as ListView } from '~assets/svg/navigation-24px/ListView.svg'
import { selectProductView } from '~domains/product/selectors/view-toggle'
import { toggleView } from '~domains/product/slices'
import { ProductViews } from '~domains/product/slices/view-toggle'
import { triggerReportGridListViewToggled } from '~domains/analytics'

/**
 * Button representing grid or list view for products
 */
export const GridListToggle: FunctionComponent = () => {
  const { t } = useTranslation()
  const productView = useSelector(selectProductView)
  const isGridView = productView === ProductViews.GRID
  const dispatch = useDispatch()

  const handleToggleView = () => {
    const storage = globalThis?.sessionStorage
    storage && storage.removeItem('scroll-position-product-id-marker')

    dispatch(toggleView())
    dispatch(
      triggerReportGridListViewToggled({
        view: isGridView ? ProductViews.LIST : ProductViews.GRID
      })
    )
  }

  return (
    <button
      className="flex items-center cursor-pointer outline-none"
      onClick={handleToggleView}
      data-testid="gridListButton"
    >
      <span data-testid="textElement" className="whitespace-nowrap">
        {t('search.product-view', {
          view: isGridView
            ? t('search.product-view.list')
            : t('search.product-view.grid')
        })}
      </span>
      {isGridView ? (
        <ListView className="inline-block icon-24 ml-1" />
      ) : (
        <GridView className="inline-block icon-24 ml-1" />
      )}
    </button>
  )
}
