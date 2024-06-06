import NextLink from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import {
  FunctionComponent,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useInView from 'react-cool-inview'

import {
  selectHeaderNavigationCategories,
  selectHeaderNavigationLeft,
  selectHeaderNavigationRight,
  selectPageSlug
} from '~domains/page/selectors'
import { loginTriggerNotification } from '~domains/account'
import { FeatureFlag } from '~config/constants/feature-flags'
import { ReactComponent as FreeShipping } from '~assets/svg/navigation-24px/FreeShipping.svg'
import { ReactComponent as ShipmentDays } from '~assets/svg/navigation-24px/ShipmentDays.svg'
import { ReactComponent as SecurePayments } from '~assets/svg/navigation-24px/SecurePayments.svg'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
import { ReactComponent as Like } from '~assets/svg/navigation-24px/Like.svg'
import { ReactComponent as NavMenu } from '~assets/svg/navigation-24px/NavMenu.svg'
import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/NavBasket.svg'
import { ReactComponent as Search } from '~assets/svg/navigation-24px/Search.svg'
import { ReactComponent as PercentageFlame } from '~assets/svg/PercentageFlame.svg'
import { ReactComponent as ChevronRight } from '~assets/svg/navigation-16px/ChevronRight.svg'
import { HeaderNavigation } from '~components/organisms/HeaderNavigation'
import { CountrySelectorHeader } from '~components/molecules/CountrySelectorHeader'
import { AccountMenu } from '~components/molecules/AccountMenu'
import { Link } from '~components/atoms/Link'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useDetectOutsideClick } from '~helpers'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useScrollHandler } from '~helpers/useScrollHandler'
import { selectItemsAnyError, selectItemsAnySuccess } from '~domains/basket'
import {
  SearchBarPlaceholder,
  SearchBarProps
} from '~components/molecules/SearchBar'
import { useIsBrowser } from '~helpers/useIsBrowser'
import { getTheme } from '~helpers/getTheme'
import {
  triggerReportNavigationItemButtonClicked,
  triggerReportBasketIconClicked
} from '~domains/analytics'
import { Countdown, CountdownThemeEnum } from '~components/atoms/Countdown'
import { InteractionTracker } from '~components/atoms/InteractionTracker'

const SearchBar = dynamic<SearchBarProps>(
  () => import('~components/molecules/SearchBar').then(c => c.SearchBar),
  {
    loading: () => <SearchBarPlaceholder />
  }
)

type HeroBadgeProps = {
  className?: string
  testId?: string
  children?: ReactNode
}

const HeaderBadge = ({ children, className, testId }: HeroBadgeProps) => (
  <div
    data-testid={testId}
    className={classNames(
      'flex items-center justify-center w-2.75 h-2.75 md:w-2.5 md:h-2.5 text-center rounded-full bg-primary-caribbean-green-dark text-xs text-primary-white absolute md:relative box-content border-2 md:border-0 border-primary-white -top-[2px] -right-[2px] sm:right-0.5 sm:top-0.75 md:top-0 md:right-0 md:ml-0.75 md:mt-0.25',
      className
    )}
  >
    {children}
  </div>
)

export type HeaderProps = {
  firstName?: string
  isLoggedIn?: boolean
  isFrontPage?: boolean
  isBasketPage?: boolean
  isFavouritesPage?: boolean
  basketItems?: number
  favouritesCount?: number
}

const ACCOUNT_MENU_STATE_OPEN = true

const HeaderComponent: FunctionComponent<HeaderProps> = ({
  isFrontPage = false,
  isBasketPage = false,
  isFavouritesPage = false,
  isLoggedIn = false,
  firstName,
  basketItems,
  favouritesCount = 0
}) => {
  const { t } = useTranslation()
  const dropdownRef = useRef(null)
  const router = useRouter()
  const { isPreview, locale } = useRouter()
  const dispatch = useDispatch()
  const [accountMenuIsOpen, setAccountMenuIsOpen] = useDetectOutsideClick(
    dropdownRef,
    false
  )

  const headerNavigationCategories = useSelector(
    selectHeaderNavigationCategories
  )
  const headerNavigationLeft = useSelector(selectHeaderNavigationLeft)
  const headerNavigationRight = useSelector(selectHeaderNavigationRight)
  const pageSlug = useSelector(selectPageSlug)
  const wasAnyItemsStateSuccess = useSelector(selectItemsAnySuccess)
  const wasAnyItemsStateError = useSelector(selectItemsAnyError)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const handleCloseMenu = useCallback(() => setIsMenuOpen(false), [])

  const isGuestFavouritesEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES
  )

  const isFavouritesFeatureInHeaderNavEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_FAVOURITES_HEADER_NAVIGATION
  )
  const isCountrySelectorHeaderFeatureEnabled = useFeatureFlag(
    FeatureFlag.COUNTRY_SELECTOR_HEADER
  )
  const isAddToBasketNotificationEnabled = useFeatureFlag(
    FeatureFlag.BASKET_ADD_TO_BASKET_NOTIFICATION
  )

  const hasNewAccountMenuStyle = useFeatureFlag(
    FeatureFlag.ACCOUNT_MENU_NEW_MENU_STYLE
  )

  type BlackFridayPencilBanner = {
    on: boolean
    endDate: string
    url: string
  }
  const {
    on: isBlackFridayPencilBannerEnabled,
    endDate,
    url: bfPageUrl
  } = useFeatureFlag<BlackFridayPencilBanner>(
    FeatureFlag.BF_COUNTDOWN_PENCIL_BANNER
  )

  const isMediumScreen = useBreakpoint(breakpoints.md)
  const isSmallScreen = useBreakpoint(breakpoints.sm)
  const [isBrowser, setIsBrowser] = useState<boolean>(false)
  const isBrowserBeforeHydration = useIsBrowser()

  // we need to "delay" the rendering of client side components, so we don't get a hydration error
  // for more info and possible better solution: https://blog.somewhatabstract.com/2022/01/03/debugging-and-fixing-hydration-issues/
  useEffect(() => {
    setIsBrowser(isBrowserBeforeHydration)
  }, [isBrowserBeforeHydration])

  useEffect(() => {
    setAccountMenuIsOpen(false)
  }, [router, setAccountMenuIsOpen])

  const handleToggleAccountMenu = useCallback(
    (toggleAccountMenuState: boolean) => () => {
      dispatch(
        triggerReportNavigationItemButtonClicked({
          buttonName: 'to_access',
          buttonClickedFrom: 'account_menu_list'
        })
      )

      hasNewAccountMenuStyle && isMediumScreen
        ? isLoggedIn
          ? router.push('/account')
          : router.push('/login/account')
        : setAccountMenuIsOpen(toggleAccountMenuState)
    },
    [
      hasNewAccountMenuStyle,
      isMediumScreen,
      isLoggedIn,
      router,
      setAccountMenuIsOpen,
      dispatch
    ]
  )

  const handleFavouritesOnClick = () => {
    if (!isLoggedIn && !isGuestFavouritesEnabled) {
      dispatch(loginTriggerNotification({ type: 'favourites' }))
    }
    router.push(
      isLoggedIn || isGuestFavouritesEnabled
        ? '/favourites'
        : '/login/favourites'
    )
  }

  const isStickyHeaderOnMobileEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_STICKY_HEADER_MENU_ON_MOBILE
  )

  const isStickyHeaderOnDesktopEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_STICKY_HEADER_MENU_ON_DESKTOP
  )

  const { observe, inView } = useInView()

  const [uspIdx, setUspIdx] = useState(0)

  const timer = useRef<number | undefined>()

  const handleAccountMenuHover = () => {
    if (!hasNewAccountMenuStyle) return

    setAccountMenuIsOpen(true)
  }

  const handleAccountMenuMouseLeave = useCallback(() => {
    setAccountMenuIsOpen(false)
  }, [setAccountMenuIsOpen])
  const [cartAnimation, setCartAnimation] = useState(false)

  const { hideSearchBar } = useScrollHandler()

  const shouldShowSearchBarInServer = useMemo(
    () => !isBrowser && !hideSearchBar && isStickyHeaderOnMobileEnabled,
    [hideSearchBar, isBrowser, isStickyHeaderOnMobileEnabled]
  )
  const shouldShowSearchBarInBrowser = useMemo(
    () =>
      isBrowser && !hideSearchBar && !inView && isStickyHeaderOnMobileEnabled,
    [hideSearchBar, inView, isBrowser, isStickyHeaderOnMobileEnabled]
  )
  const shouldHideSearchBarInBrowser = useMemo(
    () =>
      isBrowser && hideSearchBar && !inView && isStickyHeaderOnMobileEnabled,
    [hideSearchBar, inView, isBrowser, isStickyHeaderOnMobileEnabled]
  )

  const focusSearchBar = () => {
    const button = document.getElementsByClassName(
      'aa-DetachedSearchButton'
    )[0] as HTMLElement
    if (button) {
      button.click()
      return
    }
    ;(document.getElementsByClassName('aa-Input')[0] as HTMLElement).focus()
  }

  const uspArray = [
    <>
      <FreeShipping className="icon-16 inline-block mr-1 -mt-0.5" />
      {t('shared.USP-1')}
    </>,
    <>
      <ShipmentDays className="icon-16 inline-block mr-1 -mt-0.5" />
      {t('shared.USP-2')}
    </>,
    <>
      <SecurePayments className="icon-16 inline-block mr-1 -mt-0.5" />
      {t('shared.USP-3')}
    </>
  ]

  useEffect(() => {
    const uspElement = document.getElementsByClassName(
      'uspToShow'
    )[0] as HTMLElement

    timer.current = window.setInterval(() => {
      const currentIdx = uspIdx
      uspElement?.addEventListener(
        'animationiteration',
        function () {
          setUspIdx(currentIdx + 1)
        },
        false
      )
    }, 0)

    return function cleanup() {
      window.clearTimeout(timer.current)
    }
  }, [uspIdx])

  const uspToShow = uspArray[uspIdx % uspArray.length]

  useEffect(() => {
    if (
      isAddToBasketNotificationEnabled &&
      basketItems &&
      basketItems > 0 &&
      wasAnyItemsStateSuccess &&
      !wasAnyItemsStateError
    )
      setCartAnimation(true)
  }, [
    basketItems,
    isAddToBasketNotificationEnabled,
    wasAnyItemsStateError,
    wasAnyItemsStateSuccess
  ])

  const escFunction = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement> | KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountMenuIsOpen(false)
      }
    },
    [setAccountMenuIsOpen]
  )

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => document.removeEventListener('keydown', escFunction, false)
  }, [escFunction])

  useEffect(() => {
    if (cartAnimation) setTimeout(() => setCartAnimation(false), 400)
  }, [cartAnimation])

  const themeConfigFeatureFlag = useFeatureFlag(
    FeatureFlag.THEME_CONFIG
  ) as string

  const themeConfig = getTheme(themeConfigFeatureFlag)

  const handlePencilBannerClick = useCallback(() => router.push(bfPageUrl), [
    router,
    bfPageUrl
  ])

  const handleReportProductClicked = () => {
    if (router.pathname !== '/basket') {
      dispatch(
        triggerReportBasketIconClicked({
          icon_clicked_from: 'basket_header'
        })
      )
    }
  }

  return (
    <>
      {/* Top Header */}
      <div
        className="bg-primary-oxford-blue xs-only:min-h-5 xs-only:pt-0.25 text-primary-white"
        data-testid="topHeader"
        id="top-header"
      >
        {isBlackFridayPencilBannerEnabled ? (
          <InteractionTracker trackingHandler={handlePencilBannerClick}>
            <div className="container flex justify-center items-center gap-2 sm:gap-3 h-5">
              <div className="bg-secondary-darkest-pink flex justify-center items-center rounded-sm h-3 text-xs pt-0.25 pr-1 pl-0.5 truncate">
                <PercentageFlame className="icon-16 inline-block mr-0.5 -mt-0.5" />
                {t('campaign-promo.black-friday')}
              </div>
              {isSmallScreen && (
                <span className="text-sm-base">
                  {t('bf-pencil-banner.sale-ends')}
                </span>
              )}
              <div className="w-23.25">
                <Countdown
                  isMinified
                  finishingDate={endDate}
                  theme={CountdownThemeEnum.light}
                />
              </div>
              <div className="flex items-center text-sm-base">
                {isSmallScreen && (
                  <span className="mr-1.25">
                    {t('bf-pencil-banner.learn-more')}
                  </span>
                )}
                <ChevronRight className="icon-16" />
              </div>
            </div>
          </InteractionTracker>
        ) : (
          <div className="text-center leading-10 font-light uspsHolder">
            {isMediumScreen ? (
              <span className="md:mr-5 text-sm inline" data-testid="usp1">
                <FreeShipping className="icon-16 inline-block mr-1 -mt-0.5" />
                {t('shared.USP-1')}
              </span>
            ) : (
              <span
                className="md:mr-5 text-sm inline uspToShow"
                data-testid="usp1"
              >
                {uspToShow}
              </span>
            )}

            <span className="mr-5 text-sm hidden md:inline" data-testid="usp2">
              <ShipmentDays className="icon-16 inline-block mr-1 -mt-0.5" />
              {t('shared.USP-2')}
            </span>

            <span className="mr-5 text-sm hidden md:inline" data-testid="usp3">
              <SecurePayments className="icon-16 inline-block mr-1 -mt-0.5" />
              {t('shared.USP-3')}
            </span>
          </div>
        )}
      </div>
      <header
        id="header"
        className={classNames(
          'bg-primary-white md:border-b border-ui-black-10 md:border-none',
          {
            'sticky top-0 z-40': isStickyHeaderOnDesktopEnabled,
            'md:relative': !isStickyHeaderOnDesktopEnabled
          }
        )}
      >
        {isPreview && (
          <a
            href={`/api/clear-preview-cookies?locale=${locale}`}
            className="no-underline justify-center text-primary-white bg-feedback-error p-1 hover:text-primary-white w-full"
          >
            You are now browsing in preview mode. Click here to exit preview
            mode.
          </a>
        )}

        {/* Country Selector Header */}
        {isCountrySelectorHeaderFeatureEnabled && pageSlug === '/' && (
          <CountrySelectorHeader />
        )}

        {/* Sub Header */}
        <div
          id="subHeader"
          className={classNames(
            'container-fixed container flex justify-between md:items-center m-auto md:mt-2 md:mb-2 border-b',
            {
              'sticky top-0 w-full z-40 bg-primary-white':
                !isBrowser &&
                !inView &&
                !isMediumScreen &&
                isStickyHeaderOnMobileEnabled,
              'top-0 w-full z-40 bg-primary-white':
                isBrowser &&
                !inView &&
                !isMediumScreen &&
                isStickyHeaderOnMobileEnabled,
              'border-ui-black-10 md:border-none': hideSearchBar,
              'border-transparent md:border-none': !hideSearchBar
            }
          )}
          data-testid="subHeader"
        >
          {/* Dropdown Menu */}
          <div className="flex">
            <button
              aria-label={t('accessibility.open-categories-list')}
              className="p-1 mr-1 my-2 sm:p-1.5 sm:my-1.5 font-light md:hidden cursor-pointer hover:bg-ui-black-5 active:bg-ui-black-10 transition-colors duration-300 ease-in rounded"
              onClick={() => setIsMenuOpen(true)}
            >
              <NavMenu className={classNames('icon-24 inline-block')} />
            </button>

            {/* Atida Logo */}
            <NextLink href="/" prefetch={false}>
              <a className="md:col-start-1 md:col-end-2 text-center block md:ml-0 max-h-10 cursor-pointer my-2 md:my-0 md:text-left">
                <img
                  alt="logo"
                  className="icon-logo-mifarma max-w-max"
                  src={`/${themeConfig.logo}`}
                />
              </a>
            </NextLink>
          </div>

          {/* SearchBar Desktop */}
          {!isFrontPage && (
            <div
              className={classNames(
                'hidden row-start-2 col-span-full px-2 pb-2 md:pt-0 md:pb-0 md:block m-auto w-full md:px-4'
              )}
            >
              {isBrowser && isMediumScreen && (
                <SearchBar data-testid="headerSearchBarWrapper" />
              )}
              {!isBrowser && <SearchBarPlaceholder />}
            </div>
          )}

          {/* Actions */}

          <div
            className={classNames(
              'text-right block mt-2 h-6 cursor-pointer md:pr-0 md:flex md:items-center md:mx-0 md:my-0',
              {
                'md:col-start-11 md:-ml-1.25 lg:col-start-12 lg:-ml-7': !isFavouritesFeatureInHeaderNavEnabled
              }
            )}
            data-testid="headerActions"
          >
            {/* these could be looped through as an <ul> when they are pulled from contentful */}
            <div
              className="top-0 inline-block sm:relative md:h-full md:flex sm:h-8"
              onMouseLeave={handleAccountMenuMouseLeave}
            >
              <button
                data-testid="searchIcon"
                className={classNames(
                  'inline-block md:hidden no-underline relative p-1 sm:p-1.5 md:p-0 hover:bg-ui-black-5 active:bg-ui-black-10 rounded md:px-1.5 transition-opacity duration-300 ease-in-out',
                  {
                    'opacity-0':
                      !hideSearchBar || inView || !isStickyHeaderOnMobileEnabled
                  }
                )}
                title={'Search'}
                onClick={e => {
                  e.preventDefault()
                  hideSearchBar && focusSearchBar()
                }}
              >
                <Search className={classNames('icon-24 inline-block')} />
              </button>

              <button
                data-testid="accountMenuButton"
                onMouseEnter={() => handleAccountMenuHover()}
                onFocus={() => handleAccountMenuHover()}
                onKeyDown={e => escFunction(e)}
                onClick={handleToggleAccountMenu(ACCOUNT_MENU_STATE_OPEN)}
                aria-label={isLoggedIn ? firstName : t('shared.login')}
                className={classNames(
                  'relative p-1 sm:p-1.5 md:pr-1.5 md:pl-2 md:flex md:items-center hover:bg-ui-black-5 transition-colors duration-300 ease-in rounded',
                  {
                    'active:bg-ui-black-5': !accountMenuIsOpen
                  }
                )}
              >
                <p className="hidden text-base text-center font-light py-1 md:block md:max-w-9 md:overflow-y-visible md:mt-0.5 md:truncate md:leading-none">
                  {isLoggedIn ? firstName : t('shared.login')}
                </p>
                <NavUser
                  className={classNames(
                    'icon-24 inline-block md:block md:ml-0.75',
                    {
                      'text-primary-caribbean-green-dark':
                        !isMediumScreen && accountMenuIsOpen
                    }
                  )}
                />
              </button>

              <AccountMenu
                isOpen={accountMenuIsOpen}
                firstName={firstName}
                isLoggedIn={isLoggedIn}
                hasNewAccountMenuStyle={Boolean(hasNewAccountMenuStyle)}
                onClose={handleToggleAccountMenu(!ACCOUNT_MENU_STATE_OPEN)}
                className={classNames(
                  'z-50 w-full sm:w-40 sm:-left-24 md:-left-16 sm:top-7 md:top-6 md:pt-1',
                  {
                    'sm:w-38 sm:top-5 md:top-6': !hasNewAccountMenuStyle
                  }
                )}
                dropdownRef={dropdownRef}
              />
            </div>
            {isFavouritesFeatureInHeaderNavEnabled && (
              <button
                data-testid="favouritesIcon"
                aria-label={
                  favouritesCount
                    ? `${t('shared.favorites')}, ${favouritesCount}`
                    : t('shared.favorites')
                }
                className="inline-block no-underline items-center relative md:flex md:h-full p-1 sm:p-1.5 hover:bg-ui-black-5 active:bg-ui-black-10 transition-colors duration-300 ease-in rounded"
                onClick={handleFavouritesOnClick}
              >
                <Like
                  className={classNames('icon-24 inline-block', {
                    'text-primary-caribbean-green-dark': isFavouritesPage
                  })}
                  data-testid="headerActionsFavorites"
                />
                {favouritesCount > 0 ? (
                  <HeaderBadge testId="favouritesBadge">
                    <div
                      data-testid="favouritesItems"
                      className="font-semibold"
                    >
                      {favouritesCount}
                    </div>
                  </HeaderBadge>
                ) : null}
              </button>
            )}

            <div
              onKeyDown={handleReportProductClicked}
              tabIndex={0}
              role="button"
              onClick={handleReportProductClicked}
              className="inline-block"
            >
              <NextLink href="/basket" passHref prefetch={false}>
                <Link
                  aria-label={
                    basketItems
                      ? `${t('shared.basket')}, ${basketItems}`
                      : t('shared.basket')
                  }
                  className="text-right inline-block no-underline relative md:flex md:h-full p-1 md:py-0 sm:p-1.5 hover:text-primary-oxford-blue hover:bg-ui-black-5 active:bg-ui-black-10 transition-colors duration-300 ease-in rounded"
                >
                  <NavBasket
                    className={classNames('icon-24 inline-block', {
                      'text-primary-caribbean-green-dark': isBasketPage,
                      'text-primary-caribbean-green-light': cartAnimation
                    })}
                    data-testid="headerActionsBasket"
                  />
                  {basketItems && basketItems > 0 ? (
                    <HeaderBadge
                      testId="basketBadge"
                      className={classNames({
                        'bg-primary-caribbean-green transform scale-125': cartAnimation
                      })}
                    >
                      <div
                        data-testid="basketItems"
                        className="font-semibold"
                        id="basketItems"
                      >
                        {basketItems}
                      </div>
                    </HeaderBadge>
                  ) : null}
                </Link>
              </NextLink>
            </div>
          </div>
        </div>
        <HeaderNavigation
          isLoggedIn={isLoggedIn}
          categories={headerNavigationCategories}
          isMenuOpen={isMenuOpen}
          headerNavigationLeft={headerNavigationLeft}
          headerNavigationRight={headerNavigationRight}
          closeMenu={handleCloseMenu}
        />
      </header>
      {/* SearchBar Mobile/Tablet */}
      {!isFrontPage && !isMediumScreen && (
        <>
          {/* An empty div that triggers the sticky position of the searchbar to avoid using fixed and producing CLS */}
          <div ref={observe}></div>
          <div
            id="searchBar"
            className={classNames(
              'sm:container row-start-2 col-span-full px-2 pb-2 md:pt-0 md:pb-0 md:block m-auto w-full md:px-4 border-b border-ui-black-10 transform transition duration-300',
              {
                'sticky top-9 bg-primary-white z-30': !hideSearchBar,
                'md:hidden': !isBrowser,
                'sticky top-9 z-30 bg-primary-white':
                  shouldShowSearchBarInServer || shouldShowSearchBarInBrowser,
                'relative -translate-y-10': shouldHideSearchBarInBrowser
              }
            )}
          >
            <SearchBar data-testid="headerSearchBarWrapper" />
          </div>
        </>
      )}
    </>
  )
}

export const Header = memo(HeaderComponent)
