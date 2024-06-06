import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  LegacyRef,
  useEffect,
  useMemo,
  useState
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { Link } from '../../atoms/Link'
import { Drawer } from '~components/molecules/Drawer'
import { AccountMenuList } from '~components/molecules/AccountMenuList'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { toggleElementOverflow } from '~helpers/toggleElementOverflow'
import { routeQueryMatcher } from '~helpers'
import { useRouter } from 'next/router'
import {
  triggerReportNavigationItemButtonClicked,
  triggerReportSocialLoginAttempted
} from '~domains/analytics'
import { useDispatch } from 'react-redux'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { SocialLoginAndSignUp } from '~components/atoms/SocialLoginAndSignUp'
import { getOAuthUrl } from '~helpers/oauth'

export type AccountMenuProps = {
  isOpen?: boolean
  isLoggedIn: boolean
  firstName?: string
  customerReference?: string
  hasNewAccountMenuStyle?: boolean
  onClose?: () => void
  dropdownRef?: LegacyRef<HTMLDivElement>
}

export const AccountMenu: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & AccountMenuProps
> = ({
  isLoggedIn = false,
  isOpen = false,
  hasNewAccountMenuStyle = false,
  firstName,
  onClose,
  dropdownRef,
  className
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { push, route, query, locale } = useRouter()
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(isLoggedIn)

  const actualRoute = routeQueryMatcher({ route, query, locale })

  const isSocialLoginInMenuEnabled = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_MENU_SOCIAL_LOGIN_AND_SIGNUP)
  )

  const isGoogleEnabled = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_GOOGLE)
  )

  const isFaceBookEnabled = Boolean(
    useFeatureFlag(FeatureFlag.ACCOUNT_SOCIAL_LOGIN_AND_SIGNUP_FACEBOOK)
  )

  const isSocialLoginEnabled = useMemo<boolean>(
    () => isSocialLoginInMenuEnabled && isGoogleEnabled && isFaceBookEnabled,
    [isSocialLoginInMenuEnabled, isGoogleEnabled, isFaceBookEnabled]
  )

  const isDesktopMenu = useBreakpoint(breakpoints.sm)
  useEffect(
    () =>
      toggleElementOverflow(
        (isOpen && isDesktopMenu) || !isOpen,
        document.body
      ),
    [isDesktopMenu, isOpen]
  )

  useEffect(() => {
    // Fix for re-rendering the account navigation
    setIsCustomerLoggedIn(isLoggedIn)
  }, [isLoggedIn])

  const handleAccountActionButtonsClicked = (name: string) =>
    dispatch(
      triggerReportNavigationItemButtonClicked({
        buttonName: name,
        buttonClickedFrom: 'account_menu_list'
      })
    )

  const AccountActionButtons = () => (
    <div
      className={classNames('mt-1.5px p-3 bg-primary-white text-left', {
        'border-b border-ui-black-10': !isSocialLoginEnabled,
        'pb-0': isSocialLoginEnabled
      })}
    >
      <NextLink href={`/login${actualRoute ?? ''}`} prefetch={false} passHref>
        <Link
          data-testid="accountMenuLoginLink"
          className="button button--secondary w-full mb-2 font-normal cursor-pointer text-center"
          trackingHandler={() => handleAccountActionButtonsClicked('sign_in')}
        >
          {t('shared.login')}
        </Link>
      </NextLink>
      <span className="block">
        <strong>{t('account-menu.account-cta.title')}</strong>
      </span>
      <span>{t('account-menu.account-cta.body')}</span>
      <NextLink
        href={`/create-account${actualRoute ?? ''}`}
        prefetch={false}
        passHref
      >
        <Link
          data-testid="accountMenuCreateAccountLink"
          className="button button--tertiary w-full mt-2 font-normal cursor-pointer text-center"
          trackingHandler={() =>
            handleAccountActionButtonsClicked('create_account')
          }
        >
          {t('create-account.title')}
        </Link>
      </NextLink>
    </div>
  )

  return hasNewAccountMenuStyle ? (
    <div
      ref={dropdownRef}
      data-testid="myAccountMenu"
      className={classNames(
        'w-full top-0 right-0 transition-all duration-500 ease-in-out fixed bottom-0 sm:left-0 sm:absolute bg-primary-white',
        className,
        {
          'right-0': isOpen,
          '-right-full sm:hidden': !isOpen
        }
      )}
    >
      <div className="bg-primary-white rounded border border-ui-black-10 sm:shadow-md">
        <Drawer
          hasNewAccountMenuStyle={hasNewAccountMenuStyle}
          title={
            isCustomerLoggedIn
              ? t('account.greetings-with-name', {
                  name: firstName
                })
              : t('account.my-account.label')
          }
          onClickCloseIcon={onClose}
        >
          {!isCustomerLoggedIn && (
            <>
              <AccountActionButtons />
              {isSocialLoginEnabled && (
                <SocialLoginAndSignUp
                  className="w-full px-3 pb-3 border-b border-ui-black-10"
                  labelClassName="py-2"
                  label="account-menu.new-customer-notification-question"
                  handleOnClick={serviceType => {
                    push(getOAuthUrl(serviceType, locale, actualRoute))
                    dispatch(
                      triggerReportSocialLoginAttempted({
                        social_platform: serviceType,
                        clickedFrom: 'account_menu_list'
                      })
                    )
                  }}
                  isAppleEnabled={false}
                  isFaceBookEnabled={isFaceBookEnabled}
                  isGoogleEnabled={isGoogleEnabled}
                />
              )}
            </>
          )}
          <AccountMenuList
            isLoggedIn={isCustomerLoggedIn}
            hasNewAccountMenuStyle={hasNewAccountMenuStyle}
          />
        </Drawer>
      </div>
    </div>
  ) : (
    <div
      ref={dropdownRef}
      data-testid="myAccountMenu"
      className={classNames(
        'w-full top-0 right-0 transition-all duration-500 ease-in-out fixed bottom-0 sm:left-0 sm:absolute bg-primary-white',
        className,
        {
          'right-0': isOpen,
          '-right-full sm:hidden': !isOpen
        }
      )}
    >
      <Drawer
        hasNewAccountMenuStyle={hasNewAccountMenuStyle}
        title={
          isCustomerLoggedIn
            ? t('account.greetings-with-name', {
                name: firstName
              })
            : t('account.my-account.label')
        }
        onClickCloseIcon={onClose}
      >
        <AccountMenuList isLoggedIn={isCustomerLoggedIn} />
      </Drawer>
    </div>
  )
}
