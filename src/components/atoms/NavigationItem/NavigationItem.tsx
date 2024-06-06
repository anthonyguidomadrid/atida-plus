import {
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes,
  useEffect,
  useState,
  cloneElement,
  ReactNode
} from 'react'
import NextLink from 'next/link'
import { Link } from '../Link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

export type NavigationItemProps = {
  title: string
  href: string
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
  isActive: boolean
  isAsideNavigation?: boolean
  isTopMenuActive?: boolean
  hasNewAccountMenuStyle?: boolean
  highlightOnlyExactRoute?: boolean
  tag?: ReactNode | null
}

export const NavigationItem: FunctionComponent<NavigationItemProps> = ({
  title,
  href,
  icon,
  isActive = true,
  isAsideNavigation,
  isTopMenuActive,
  hasNewAccountMenuStyle,
  highlightOnlyExactRoute,
  tag = null,
  ...props
}) => {
  const { route } = useRouter()
  const [asideIsActive, setAsideIsActive] = useState(false)

  const [isAccountMenuActive, setIsAccountMenuActive] = useState(true)

  useEffect(() => {
    setIsAccountMenuActive(isActive)
  }, [isActive])

  useEffect(() => {
    const matched = route?.match(href)
    let setActive = !!matched

    if (highlightOnlyExactRoute) {
      setActive = (matched && matched.input === href) ?? false
    }

    setAsideIsActive(setActive)
  }, [highlightOnlyExactRoute, href, route])

  return (
    <li
      data-testid="navigationItem"
      className={classNames(
        'flex border-b last:border-b-0 h-7 relative border-ui-grey-light hover:bg-ui-guyabano sm:border-b-0',
        {
          'border-l border-ui-grey-light md:pl-2':
            isAsideNavigation && !asideIsActive
        },
        {
          'border-l-4 box-border md:border-primary-caribbean-green md:pl-1.5':
            asideIsActive && isAsideNavigation
        },
        { 'p-1 h-8 sm:h-7': hasNewAccountMenuStyle }
      )}
      {...props}
    >
      {isTopMenuActive && !isAsideNavigation && (
        <div
          data-testid="isActiveBorder"
          className={classNames(
            'absolute top-0 -left-0 bottom-0 w-0.5 bg-primary-caribbean-green'
          )}
        />
      )}
      <NextLink href={href} passHref prefetch={false}>
        <Link
          className={classNames('no-underline cursor-pointer', {
            'font-semibold': asideIsActive,
            'cursor-not-allowed': !isAccountMenuActive,
            'ml-2 mr-1': !isAsideNavigation
          })}
          data-testid="navigationItemLink"
        >
          {icon && (
            <div>
              {cloneElement(icon, {
                ...icon.props,
                className: classNames(
                  'mr-3',
                  {
                    'text-primary-caribbean-green':
                      isTopMenuActive || asideIsActive
                  },
                  {
                    'text-ui-grey': !isAccountMenuActive
                  },
                  icon.props.className
                )
              })}
            </div>
          )}
          <span
            className={classNames('text-left', {
              'text-ui-grey': !isAccountMenuActive
            })}
          >
            {title}
          </span>
        </Link>
      </NextLink>
      {tag}
    </li>
  )
}
