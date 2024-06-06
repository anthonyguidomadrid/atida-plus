import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { NavigationItem } from '~components/atoms/NavigationItem'
import { ReactComponent as Overview } from '~assets/svg/navigation-24px/Overview.svg'
import { ReactComponent as Box } from '~assets/svg/navigation-24px/Box.svg'
import { ReactComponent as ExternalLink } from '~assets/svg/navigation-24px/ExternalLink.svg'
import { ReactComponent as Settings } from '~assets/svg/navigation-24px/Settings.svg'
import { ReactComponent as Help } from '~assets/svg/navigation-24px/Help.svg'
import { ReactComponent as Coins } from '~assets/svg/navigation-24px/Coins.svg'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { routeQueryMatcher } from '~helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

export type AccountMenuListProps = {
  isLoggedIn: boolean
  isAsideNavigation?: boolean
  hasNewAccountMenuStyle?: boolean
}

export const AccountMenuList: FunctionComponent<
  ComponentPropsWithoutRef<'ul'> & AccountMenuListProps
> = ({
  isLoggedIn = false,
  isAsideNavigation = false,
  hasNewAccountMenuStyle = false,
  className
}) => {
  const { t } = useTranslation()
  const { route, query, locale } = useRouter()

  const isAccountOverviewRoute = !!route?.match(/^\/account$/)
  const isOrderHistoryRoute = !!route?.match('/account/order-history')
  const isAccountDetailsRoute = !!route?.match('/account/details')
  const isAddressBookRoute = !!route?.match('/account/address-book')
  const isAtidaCashRoute = !!route?.match('/account/atida-cash')

  const actualRoute = routeQueryMatcher({ route, query, locale })

  const loginRoute = `/login${actualRoute ?? ''}`

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  return (
    <ul
      data-testid="accountMenuList"
      className={classNames(
        {
          'md:ml-1 md:mr-1 md:my-1':
            !isAsideNavigation && !hasNewAccountMenuStyle
        },
        { 'pr-4': isAsideNavigation },
        { 'sm:py-1': hasNewAccountMenuStyle },
        className
      )}
    >
      <NavigationItem
        isActive={isLoggedIn || !hasNewAccountMenuStyle}
        data-testid="menuItemOverview"
        title={t('account.overview')}
        href={isLoggedIn ? '/account' : '/login/account'}
        highlightOnlyExactRoute
        icon={<Overview className="icon-24 mr-3" />}
        isAsideNavigation={isAsideNavigation}
        isTopMenuActive={isAccountOverviewRoute}
        hasNewAccountMenuStyle={hasNewAccountMenuStyle}
      />
      <NavigationItem
        isActive={isLoggedIn || !hasNewAccountMenuStyle}
        data-testid="menuItemAddressBook"
        title={t('account.address-book')}
        href={
          isLoggedIn ? '/account/address-book' : '/login/account/address-book'
        }
        icon={<Help className="icon-24 mr-3" />}
        isAsideNavigation={isAsideNavigation}
        isTopMenuActive={isAddressBookRoute}
        hasNewAccountMenuStyle={hasNewAccountMenuStyle}
      />
      <NavigationItem
        isActive={isLoggedIn || !hasNewAccountMenuStyle}
        data-testid="menuItemHistory"
        title={t('account.order-history')}
        href={
          isLoggedIn ? '/account/order-history' : '/login/account/order-history'
        }
        icon={<Box className="icon-24 mr-3" />}
        isAsideNavigation={isAsideNavigation}
        isTopMenuActive={isOrderHistoryRoute}
        hasNewAccountMenuStyle={hasNewAccountMenuStyle}
      />
      {isLoyaltyAtidaCashEnabled && (
        <NavigationItem
          isActive={isLoggedIn || !hasNewAccountMenuStyle}
          data-testid="menuItemMyAtidaCash"
          title={t('account.my-atida-cash')}
          href={
            isLoggedIn
              ? '/account/my-atida-cash'
              : '/login/account/my-atida-cash'
          }
          icon={<Coins className="icon-24 mr-3" />}
          isAsideNavigation={isAsideNavigation}
          isTopMenuActive={isAtidaCashRoute}
          hasNewAccountMenuStyle={hasNewAccountMenuStyle}
          tag={
            <span
              data-testid="navigationItemTag"
              className="h-2.5 ml-1 mb-0.25 pt-0.125 px-0.75 flex rounded-sm justify-center self-center text-primary-white text-xs bg-primary-caribbean-green"
            >
              {t('shared.new')}
            </span>
          }
        />
      )}
      <NavigationItem
        isActive={isLoggedIn || !hasNewAccountMenuStyle}
        data-testid="menuItemDetails"
        title={t('account.account-details')}
        href={isLoggedIn ? '/account/details' : '/login/account/details'}
        icon={<Settings className="icon-24 mr-3" />}
        isAsideNavigation={isAsideNavigation}
        isTopMenuActive={isAccountDetailsRoute}
        hasNewAccountMenuStyle={hasNewAccountMenuStyle}
      />
      {!isAsideNavigation && !hasNewAccountMenuStyle && (
        <div className="md:border-ui-grey-light md:border-t md:my-1" />
      )}
      {(!hasNewAccountMenuStyle || (hasNewAccountMenuStyle && isLoggedIn)) && (
        <NavigationItem
          isActive={isLoggedIn || !hasNewAccountMenuStyle}
          data-testid="menuItemsLogin"
          title={isLoggedIn ? t('shared.logout') : t('shared.login')}
          href={isLoggedIn ? '/logout' : loginRoute}
          isAsideNavigation={isAsideNavigation}
          icon={<ExternalLink className="icon-24 mr-3" />}
          hasNewAccountMenuStyle={hasNewAccountMenuStyle}
        />
      )}
    </ul>
  )
}
