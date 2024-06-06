import { ReactNode, useEffect } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { PageLayout } from '~components/templates/PageLayout'
import { AccountMenuList } from '~components/molecules/AccountMenuList'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Back } from '../../../assets/svg/navigation-24px/Back.svg'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { customerSelectors } from '~domains/account'
import { NavigationBreadcrumbs } from '~components/molecules/NavigationBreadcrumbs'
import { AnyQuestions } from '~components/atoms/AnyQuestions'
import { useBreakpoint } from '~domains/breakpoints'
import { breakpoints } from '~domains/breakpoints/config'
import { resetActiveReachedSteps, setDataClear } from '~domains/checkout'

export type AccountPageLayoutProps = {
  hasAnyQuestionsBlock?: boolean
  isForm?: boolean
  children?: ReactNode
}

export const AccountPageLayout = ({
  hasAnyQuestionsBlock = true,
  isForm = false,
  children
}: AccountPageLayoutProps) => {
  const { t } = useTranslation()
  const { back } = useRouter()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(customerSelectors.selectIsLoggedIn)
  const isDesktop = useBreakpoint(breakpoints.sm)

  useEffect(() => {
    dispatch(setDataClear())
    dispatch(resetActiveReachedSteps())
  }, [dispatch])

  return (
    <AuthGuard>
      <PageLayout>
        <main
          data-testid="accountPageLayout"
          className={classNames(
            'sm:container container-fixed mx-auto',
            'xs:px-0 sm:px-3 md:px-8',
            'grid grid-cols-12',
            'md:gap-x-4'
          )}
        >
          <div
            className={classNames(
              'mx-2 my-2 col-span-12 justify-start',
              'sm:mx-0 sm:mb-4 flex'
            )}
          >
            <Button
              variant="back"
              icon={<Back className="icon-16" />}
              onClick={back}
              className={classNames('w-fit h-fit pt-3px mr-0', {
                hidden: isDesktop
              })}
            />
            <NavigationBreadcrumbs
              breadcrumbs={[
                {
                  title: t('account.account-overview'),
                  path: '/account',
                  subpaths: [
                    {
                      title: t('account.account-details'),
                      path: '/account/details',
                      subpaths: [
                        {
                          title: t('account.change-personal-details.label'),
                          path: '/account/change-personal-details'
                        },
                        {
                          title: t('account.personal-data-request'),
                          path: '/account/personal-data-request'
                        },
                        {
                          title: t('account.delete-account'),
                          path: '/account/delete-account'
                        }
                      ]
                    },
                    {
                      title: t('account.address-book'),
                      path: '/account/address-book'
                    },
                    {
                      title: t('account.order-history'),
                      path: '/account/order-history',
                      subpaths: [
                        {
                          title: '[orderId]',
                          path: '/account/order-history/[orderId]'
                        }
                      ]
                    },
                    {
                      title: t('account.my-atida-cash'),
                      path: '/account/my-atida-cash',
                      subpaths: [
                        {
                          title: t('account.transaction-history'),
                          path: '/account/my-atida-cash/history'
                        }
                      ]
                    }
                  ]
                }
              ]}
              showOnMobile={true}
            />
          </div>
          <div
            className={classNames(
              'hidden md:grid md:col-start-1 md:col-end-5 lg:col-end-4'
            )}
          >
            <AccountMenuList isLoggedIn={isLoggedIn} isAsideNavigation />
          </div>
          <div
            className={classNames(
              'col-start-1 col-end-13',
              'sm:mb-5',
              { 'mb-5': isForm },
              { 'sm:col-start-4 sm:col-end-10': isForm },
              { 'md:col-start-5 md:col-end-11 md:mb-11': isForm },
              { 'lg:col-end-10 lg:mb-9': isForm },
              { 'md:col-start-5 md:col-end-13 md:mb-8': !isForm },
              { 'lg:col-start-4 lg:col-end-11': !isForm }
            )}
          >
            {children}
            {hasAnyQuestionsBlock && (
              <div className="mt-4">
                <AnyQuestions isFullWidth />
              </div>
            )}
          </div>
        </main>
      </PageLayout>
    </AuthGuard>
  )
}
