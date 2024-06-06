import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { PageLayout } from '~components/templates/PageLayout'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { MainSectionHeader } from '~components/molecules/MainSectionHeader'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { useSelector } from 'react-redux'
import { selectProductView } from '~domains/product/selectors/view-toggle'
import { ProductViews } from '~domains/product/slices/view-toggle'
import classNames from 'classnames'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'

export const FavouritesPageLayout = ({
  children
}: {
  children?: ReactNode
}) => {
  const { t } = useTranslation()

  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  const isFavouritesGridEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GRID_VIEW
  )

  const productView = useSelector(selectProductView)
  const isGridView = productView === ProductViews.GRID

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const breadcrumbs = useMemo(
    () => [
      {
        title: t('favourites.title'),
        path: '/favourites' ?? ''
      }
    ],
    [t]
  )

  const renderChildren = () => (
    <PageLayout>
      <MainSectionHeader className="bg-ui-guyabano">
        {props => (
          <SimpleHeader
            isFavourites
            title={t('favourites.title')}
            breadcrumbs={breadcrumbs}
            {...props}
          />
        )}
      </MainSectionHeader>
      <main
        className={classNames(
          'px-0 pb-2 container-fixed grid sm:px-5 md:container md:items-center m-auto sm:mb-6 md:mb-8 lg:mb-10',
          {
            'md:grid-cols-12 md:gap-4': !isGridView || !isFavouritesGridEnabled,
            'pt-3': isGuestFavouritesEnabled && !isLoggedIn,
            'pt-0': isLoggedIn
          }
        )}
      >
        {children}
      </main>
    </PageLayout>
  )

  if (isGuestFavouritesEnabled) {
    return renderChildren()
  }

  return <AuthGuard>{renderChildren()}</AuthGuard>
}
