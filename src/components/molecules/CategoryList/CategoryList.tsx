import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  memo,
  MouseEvent,
  MutableRefObject
} from 'react'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { ReactComponent as ChevronRight } from '~assets/svg/navigation-16px/ChevronRight.svg'
import { useTranslation } from 'react-i18next'
import { Asset, Color } from '~domains/contentful'
import { Subcategory } from '~domains/contentful/normalizers/products-menu-submenu'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'

export type CategoryListCategory = {
  id?: string
  title?: string
  color?: Color
  level?: number
  url?: string
  image?: Asset
  subcategories?: Subcategory[]
}

export type CategoryListProps = {
  category?: CategoryListCategory
  categories: CategoryListCategory[]
  dropdownRef?: MutableRefObject<HTMLUListElement | null>
  className?: string
  testId?: string
  currentMenuStack?: CategoryListCategory[]
  addToMenuStack: (category: CategoryListCategory) => void
  removeFromMenuStack: (category: CategoryListCategory) => void
}

const CategoryListComponent: FunctionComponent<
  ComponentPropsWithoutRef<'ul'> & CategoryListProps
> = ({
  category,
  categories,
  dropdownRef,
  className,
  testId = 'root',
  addToMenuStack,
  removeFromMenuStack,
  currentMenuStack = [],
  ...props
}) => {
  const isDesktopMenu = useBreakpoint(breakpoints.md)
  const { t } = useTranslation()

  return (
    <ul
      ref={dropdownRef}
      className={classNames(
        'bg-primary-white w-screen',
        'md:z-20 md:pr-0',
        {
          'md:absolute md:top-7.25 md:left-8 md:py-3 md:pb-13 md:px-2 md:w-45':
            category?.level === undefined,
          'px-2 md:relative md:left-0 md:px-1 md:pb-0 lg:pt-2':
            category?.level !== undefined
        },
        className
      )}
      data-testid={`categoryList_${testId}`}
      {...props}
    >
      {categories?.length > 0 && (
        <>
          {!!category && (
            <li
              className={classNames(
                'py-2 border-b border-ui-grey-light',
                'md:hidden'
              )}
            >
              <NextLink href={category.url ?? ''} passHref prefetch={false}>
                <Link
                  className={classNames(
                    'relative flex py-1.5 leading-none no-underline'
                  )}
                >
                  {t('shared.all-products')} {category.title}
                </Link>
              </NextLink>
            </li>
          )}
          {categories.map(category => {
            const categoryStyles =
              category.color && category?.level === 0
                ? `border-l-4 border-${category.color} hover:bg-${category.color}`
                : ''

            const subCategoryColor = isDesktopMenu
              ? `bg-${category.color}-light`
              : ''

            const isVisible =
              currentMenuStack[currentMenuStack.length - 1]?.id === category?.id
            const isOpen = !!currentMenuStack.find(
              item => item.id === category.id
            )
            const listItemEvents =
              isDesktopMenu && category.level === 0
                ? {
                    onMouseEnter: () => addToMenuStack(category),
                    onMouseLeave: () => removeFromMenuStack(category)
                  }
                : {}

            const linkEvents = isDesktopMenu
              ? {}
              : {
                  onClick: (e: MouseEvent<HTMLAnchorElement>) => {
                    addToMenuStack(category)

                    /*
                      Disable Click for link items that have Sub-Categories
                      to enable access to sub categories on mobile
                    */
                    if (category?.subcategories?.length) {
                      e.preventDefault()

                      // Reset the scroll state of the parent element to 0
                      const currentLink = e.target as HTMLElement
                      const currentLinkWrapper = currentLink.closest(
                        '[data-submenu-wrapper]'
                      )

                      if (currentLinkWrapper) {
                        currentLinkWrapper.scrollTop = 0
                      }
                    }
                  }
                }

            return (
              <li
                key={category.id}
                className={classNames(
                  'py-2 border-b border-ui-grey-light',
                  'md:pb-1 md:border-0 md:p-0 md:last:mb-0'
                )}
                {...listItemEvents}
              >
                <NextLink href={category.url ?? ''} passHref prefetch={false}>
                  <Link
                    {...linkEvents}
                    className={classNames(
                      `py-1.5 flex relative no-underline leading-none`,
                      'md:px-1.25 md:py-1',
                      'lg:py-1.5',
                      categoryStyles,
                      {
                        'px-1.5 hover:text-primary-oxford-blue focus:text-primary-oxford-blue':
                          category?.level === 0,
                        'px-0 hover:text-ui-grey-dark focus:text-ui-grey-dark':
                          (category?.level ?? 0) > 0
                      }
                    )}
                    aria-expanded={isOpen}
                    icon={
                      category.subcategories &&
                      category.subcategories.length > 0 ? (
                        <ChevronRight
                          className={classNames(
                            'icon-16 absolute right-1 md:right-2',
                            {
                              'md:hidden': category?.level === 1
                            }
                          )}
                        />
                      ) : undefined
                    }
                  >
                    {category.title}
                  </Link>
                </NextLink>

                {category.subcategories && category.subcategories.length > 0 && (
                  <div
                    data-submenu-wrapper
                    className={classNames(
                      'products-submenu-wrapper',
                      'lg:px-8',
                      { 'lg:w-83.25': category?.level !== undefined },
                      subCategoryColor,
                      {
                        'translate-x-w-screen md:hidden': !isOpen,
                        'translate-x-0': isOpen,
                        'md:hidden': category?.level === 1,
                        'overflow-y-scroll': isVisible,
                        'sm-and-below:fixed sm-and-below:top-0 overflow-y-hidden': !isVisible
                      }
                    )}
                  >
                    <span
                      className={classNames(
                        'hidden',
                        'md:mx-2 md:block md:mt-1.75 md:font-semibold',
                        'lg:mt-2.25'
                      )}
                    >
                      {t('shared.categories')}
                    </span>
                    <CategoryList
                      category={category}
                      categories={category.subcategories}
                      testId={category.id}
                      className={classNames(
                        'md:w-full md:grid md:grid-cols-2 md:pt-1.5 md:bg-transparent',
                        subCategoryColor
                      )}
                      currentMenuStack={currentMenuStack}
                      addToMenuStack={addToMenuStack}
                      removeFromMenuStack={removeFromMenuStack}
                    />
                    {/* <button>Redeem Prescription</button> This is a placeholder for the Redeem Subscription button */}
                  </div>
                )}
              </li>
            )
          })}
        </>
      )}
    </ul>
  )
}

export const CategoryList = memo(CategoryListComponent)
