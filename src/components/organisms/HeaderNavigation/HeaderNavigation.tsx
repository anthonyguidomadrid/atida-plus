import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  MouseEvent
} from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import {
  CategoryListCategory,
  CategoryListProps
} from '~components/molecules/CategoryList'
import { useDetectOutsideClick } from '~helpers'
import { Button } from '~components/atoms/Button'
import { ReactComponent as ChevronDown } from '~assets/svg/navigation-16px/ChevronDown.svg'
import { ReactComponent as ChevronUp } from '~assets/svg/navigation-16px/ChevronUp.svg'
import { ReactComponent as Back } from '~assets/svg/navigation-24px/Back.svg'
import { ReactComponent as CrossNavMenu } from '~assets/svg/navigation-24px/CrossNavMenu.svg'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
import { Link } from '~components/atoms/Link'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { HeaderNavigationMenu } from '~domains/page/types'
import { mapIconReferenceToIconComponent } from '~domains/contentful'
import { convertURL } from '~helpers/convertURL'
import { isExternalLink } from '~helpers/isExternalLink'
import { toggleElementOverflow } from '~helpers/toggleElementOverflow'
import { MinimalCategoryList } from '~components/molecules/CategoryList/MinimalCategoryList'
import { getPageSlug } from '~domains/translated-routes'

const DynamicCategoryList = dynamic(() =>
  import('~components/molecules/CategoryList').then(
    component => component.CategoryList as FunctionComponent<CategoryListProps>
  )
) as FunctionComponent<CategoryListProps>

export type HeaderNavigationProps = ComponentPropsWithoutRef<'div'> & {
  isLoggedIn?: boolean
  isMenuOpen?: boolean
  closeMenu: () => void
  onClickCloseIcon?: () => void
  categories?: CategoryListProps['categories']
  removeFromMenuStack?: (e: MouseEvent<HTMLElement>) => void
  headerNavigationLeft?: HeaderNavigationMenu
  headerNavigationRight?: HeaderNavigationMenu
}

export const HeaderNavigation: FunctionComponent<HeaderNavigationProps> = ({
  categories = [],
  isLoggedIn = false,
  isMenuOpen = false,
  closeMenu,
  headerNavigationLeft,
  headerNavigationRight
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const router = useRouter()
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const isDesktopMenu = useBreakpoint(breakpoints.md)
  const [menuStack, setMenuStack] = useState<CategoryListCategory[]>([])
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => setIsPageLoaded(true), [])

  useEffect(() => {
    setIsActive(false)
    closeMenu()
  }, [router, setIsActive, closeMenu])

  useEffect(
    () =>
      toggleElementOverflow(
        (!isActive && isDesktopMenu) || (!isMenuOpen && !isDesktopMenu),
        document.body
      ),
    [isActive, isDesktopMenu, isMenuOpen]
  )

  useEffect(() => {
    // Reset Menu State when Opened / Closed
    setMenuStack([])

    const menu = document.querySelector('[data-submenu-wrapper]')
    if (menu) {
      menu.scrollTop = 0
    }
  }, [isMenuOpen])

  // Navigate to Sub Category Menu
  const addToMenuStack = useCallback((category: CategoryListCategory) => {
    setMenuStack(currentState => [...currentState, category])
  }, [])

  // Navigate to Parent Category Menu
  const removeFromMenuStack = useCallback((category: CategoryListCategory) => {
    setMenuStack(currentState => {
      const index = currentState.findIndex(item => item.id === category.id)
      return currentState.slice(0, index)
    })
  }, [])

  return useMemo(() => {
    const onClick = () => setIsActive(!isActive)

    // Sub Category Heading Styles
    const subCategoryHeaderStyles =
      menuStack.length > 0
        ? `
        bg-${menuStack[0]?.color}
        hover:bg-${menuStack[0]?.color}
        transition-colors duration-200 ease-in-out
        `
        : ''

    return (
      <>
        <nav
          data-testid="headerNavigation"
          className={classNames(
            'fixed top-0 w-full flex flex-col transform transition-transform duration-300 ease-in-out bg-primary-white',
            'h-screen-ios min-h-screen-ios', // Necessary for iOS Safari, else the content is not fully visible with shown top/bottom bars
            'md:relative md:container md:container-fixed md:flex md:m-auto md:h-auto md:min-h-0 md:overflow-visible md:transform-none md:transition-none',
            {
              'translate-x-0 z-50': isMenuOpen,
              'invisible md:visible -translate-x-full': !isMenuOpen
            }
          )}
        >
          {!isDesktopMenu && (
            <>
              <section
                className={classNames(
                  'flex content-center px-2 bg-primary-oxford-blue',
                  subCategoryHeaderStyles,
                  {
                    hidden: !isMenuOpen
                  }
                )}
              >
                {menuStack.length > 0 && (
                  <Button
                    variant="back"
                    icon={
                      <Back
                        role="presentation"
                        className="icon-24 text-primary-oxford-blue"
                      />
                    }
                    onClick={() =>
                      removeFromMenuStack(menuStack[menuStack.length - 1])
                    }
                    data-testid="backButton"
                    className={classNames('self-center h-5 w-5')}
                  >
                    <span className="sr-only">{t('shared.back')}</span>
                  </Button>
                )}

                <h2
                  className={classNames(
                    'grow py-2 text-xl text-center leading-none transition-colors duration-200 ease-in-out',
                    { 'text-primary-white ml-5': menuStack.length === 0 },
                    { 'text-primary-oxford-blue ml-0': menuStack.length > 0 }
                  )}
                >
                  {menuStack[menuStack.length - 1]?.title ?? t('shared.menu')}
                </h2>

                <Button
                  data-testid="closeMenu"
                  onClick={closeMenu}
                  icon={
                    <CrossNavMenu
                      className={classNames('icon-24', {
                        'text-primary-white': menuStack.length === 0,
                        'text-primary-oxford-blue': menuStack.length > 0
                      })}
                    />
                  }
                  className={classNames(
                    'self-center border-0',
                    subCategoryHeaderStyles
                  )}
                  aria-label="Close Menu"
                />
              </section>
            </>
          )}

          {/* overlay div */}
          <div
            className={classNames(
              'top-7.25 right-0 bottom-0 centered-in-viewport-x z-10 hidden bg-overlay',
              {
                'md:absolute md:block md:h-screen md:w-screen': isActive
              }
            )}
            aria-hidden="true"
          />

          <div
            data-submenu-wrapper
            className={classNames(
              'relative drawer-content-height top-0 left-0 z-10 py-2 w-full overflow-x-hidden transform transition-transform ease-in-out duration-250',
              'md:contents',
              {
                'overflow-y-scroll': menuStack.length === 0
              }
            )}
          >
            <div
              className={classNames(
                'pb-1',
                'md:flex md:justify-between md:pb-0 md:w-full'
              )}
            >
              {/* Mobile Menu Login Button */}
              {!isDesktopMenu && !isLoggedIn && (
                <div
                  key="menu-login"
                  className={classNames(
                    {
                      'pb-2 md:hidden container': !isLoggedIn
                    },
                    { hidden: isLoggedIn }
                  )}
                >
                  <NextLink href={'/login'} passHref prefetch={false}>
                    <Link
                      className="button bg-primary-oxford-blue button--primary w-full h-6 font-normal"
                      data-testid="navLoginLink"
                      icon={<NavUser className="icon-24 mr-1.125 mb-0.25" />}
                      iconPosition="before"
                    >
                      {t('shared.login')}
                    </Link>
                  </NextLink>
                </div>
              )}
              <ul
                className={classNames(
                  'px-2 md:flex md:flex-wrap md:mt-0 md:px-0',
                  {
                    'sm-and-below:fixed sm-and-below:top-0 sm-and-below:w-full drawer-content-height overflow-hidden':
                      menuStack.length > 0
                  }
                )}
                data-testid="headerNavigationLeft"
              >
                {headerNavigationLeft?.items?.map(navItem => {
                  const Icon = mapIconReferenceToIconComponent(
                    navItem?.link?.icon
                  )

                  return navItem?.submenu ? (
                    <li
                      className={classNames(
                        'mb-5',
                        'md:mb-0 md:py-2 md:mr-1.5 md:border-b-2 md:border-primary-white md:border-b-white md:hover:border-primary-oxford-blue md:p-0'
                      )}
                      key={navItem?.id}
                    >
                      <button
                        disabled={!isPageLoaded}
                        onClick={onClick}
                        aria-haspopup={true}
                        aria-expanded={isActive}
                        className={classNames(
                          'hidden font-semibold hover:primary-oxford-blue focus:primary-oxford-blue',
                          'md:flex md:items-center md:px-1.125 md:-ml-1.125'
                        )}
                      >
                        {navItem?.link?.label}
                        {isActive ? (
                          <ChevronUp className="icon-16 relative bottom-fixed-1px inline ml-1" />
                        ) : (
                          <ChevronDown className="icon-16 relative bottom-fixed-1px inline ml-1" />
                        )}
                      </button>

                      {isPageLoaded && navItem?.id === 'Products' ? (
                        <DynamicCategoryList
                          categories={categories}
                          dropdownRef={dropdownRef}
                          aria-hidden={isDesktopMenu ? !isActive : undefined}
                          className={classNames('drawer-content-width', {
                            'md:block': isActive,
                            'md:hidden': !isActive
                          })}
                          currentMenuStack={menuStack}
                          addToMenuStack={addToMenuStack}
                          removeFromMenuStack={removeFromMenuStack}
                        />
                      ) : (
                        <MinimalCategoryList
                          categories={categories}
                          dropdownRef={dropdownRef}
                        />
                      )}
                    </li>
                  ) : (
                    <li
                      className={classNames(
                        'py-2 md:py-2 border-b border-ui-grey-light',
                        'md:inline-flex md:mr-1.5 md:border-b-2 md:border-primary-white md:border-b-white md:hover:border-primary-oxford-blue',
                        {
                          'hidden md:inline-flex': menuStack.length > 0
                        }
                      )}
                      key={navItem?.id}
                    >
                      <NextLink
                        href={
                          convertURL(navItem?.link?.url || '', locale || '') ??
                          ''
                        }
                        passHref
                        prefetch={false}
                      >
                        <Link
                          className={classNames(
                            `header-navigation-link`,
                            'md:px-1.25 md:py-0 md:mt-0 md:flex',
                            {
                              'text-secondary-portland-orange font-semibold md:text-primary-oxford-blue':
                                navItem?.id === 'Promotions'
                            }
                          )}
                          icon={
                            <Icon
                              role="presentation"
                              className={classNames(
                                'relative -top-fixed-1px mr-2 icon-24',
                                'md:hidden'
                              )}
                            />
                          }
                          data-testid="navLink"
                        >
                          {navItem?.link?.label}
                        </Link>
                      </NextLink>
                    </li>
                  )
                })}
              </ul>

              {/* Right Aligned Navigation */}
              <ul
                className={classNames(
                  'px-2 md:flex md:flex-wrap md:mt-0 md:px-0',
                  {
                    hidden: menuStack.length > 0
                  }
                )}
                data-testid="headerNavigationRight"
              >
                {headerNavigationRight?.items?.map(navItem => {
                  const Icon = mapIconReferenceToIconComponent(
                    navItem?.link?.icon
                  )
                  const loyaltyPageSlug = getPageSlug('loyalty', locale)
                  const slug = navItem?.link?.url?.split?.('/')?.[1] ?? ''
                  const isAtidaCash =
                    getPageSlug(slug, locale) === loyaltyPageSlug
                  const path = isAtidaCash
                    ? loyaltyPageSlug ?? ''
                    : navItem?.link?.url ?? ''
                  const linkHref =
                    isAtidaCash && isLoggedIn ? '/account/my-atida-cash' : path

                  return (
                    <li
                      className={classNames(
                        'py-2 md:py-2 border-b border-ui-grey-light ml-auto',
                        'md:ml-3 md:border-b-2 md:border-primary-white md:border-b-white md:hover:border-primary-oxford-blue md:p-0'
                      )}
                      key={navItem?.id}
                    >
                      {!isExternalLink(navItem?.link?.url ?? '') ? (
                        <NextLink href={linkHref} passHref prefetch={false}>
                          <Link
                            className={classNames(
                              `header-navigation-link`,
                              'md:py-0 md:mt-0 md:flex'
                            )}
                            icon={
                              <Icon
                                role="presentation"
                                className={classNames(
                                  'relative -top-fixed-1px mr-2 icon-24',
                                  'md:hidden'
                                )}
                              />
                            }
                          >
                            {navItem?.link?.label}
                          </Link>
                        </NextLink>
                      ) : (
                        <Link
                          href={navItem?.link?.url ?? ''}
                          className={classNames(
                            `header-navigation-link`,
                            'md:py-0 md:mt-0 md:flex'
                          )}
                          icon={
                            <Icon
                              role="presentation"
                              className={classNames(
                                'relative -top-fixed-1px mr-2 icon-24',
                                'md:hidden'
                              )}
                            />
                          }
                        >
                          {navItem?.link?.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </nav>
        <div
          className="md:border-b md:border-ui-grey-light"
          aria-hidden="true"
        ></div>
      </>
    )
  }, [
    isLoggedIn,
    isActive,
    isDesktopMenu,
    menuStack,
    t,
    addToMenuStack,
    removeFromMenuStack,
    setIsActive,
    closeMenu,
    categories,
    isMenuOpen,
    locale,
    headerNavigationLeft?.items,
    headerNavigationRight?.items,
    isPageLoaded
  ])
}
