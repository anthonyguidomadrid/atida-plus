// TODO: this component needs some kind of test
import {
  ComponentPropsWithoutRef,
  Fragment,
  FunctionComponent,
  useMemo
} from 'react'
import type { ParsedUrlQuery } from 'querystring'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'

import { Link } from '~components/atoms/Link'
import { ReactComponent as ChevronRight } from '../../../assets/svg/navigation-16px/ChevronRight.svg'
import { useBreakpoint } from '~domains/breakpoints'
import { breakpoints } from '~domains/breakpoints/config'

export type NavigationBreadcrumb = {
  title?: string
  path?: string
  linkPath?: string
  subpaths?: Array<NavigationBreadcrumb>
  showHomePageLink?: boolean
  index?: number
  isLastCrumb?: boolean
  isDesktop?: boolean
}

export type NavigationBreadcrumbsProps = {
  breadcrumbs: Array<NavigationBreadcrumb>
  showOnMobile?: boolean
}

export const NavigationBreadcrumbs: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & NavigationBreadcrumbsProps
> = ({ breadcrumbs, showOnMobile = false, className }) => {
  const { route, asPath, query } = useRouter()
  const isDesktop = useBreakpoint(breakpoints.sm)

  const breadcrumbsList = useMemo(() => {
    const homePageLink = {
      title: 'Atida',
      path: '/'
    }
    return breadcrumbs.reduce<NavigationBreadcrumb[]>(
      (list, breadcrumb) => {
        const { title, path, subpaths } = breadcrumb
        const breadcrumbItems = []

        if (title && path && asPath.match(path))
          breadcrumbItems.push(breadcrumb)

        if (subpaths) {
          const processedBreadcrumb = processSubpaths({
            subpaths,
            route,
            asPath,
            query
          })

          if (processedBreadcrumb) breadcrumbItems.push(...processedBreadcrumb)
        }

        list.push(...breadcrumbItems)

        return list
      },
      [homePageLink]
    )
  }, [asPath, breadcrumbs, query, route])

  const breadcrumbsListToShow = useMemo(
    () =>
      !isDesktop && breadcrumbsList.length > 1
        ? breadcrumbsList.slice(
            breadcrumbsList.length - 2,
            breadcrumbsList.length - 1
          )
        : breadcrumbsList,
    [breadcrumbsList, isDesktop]
  )
  return (
    <div
      className={classNames(
        'ml-1 sm:ml-0 flex overflow-x-auto flex-nowrap hide-scrollbar',
        {
          'hidden sm:block': !showOnMobile
        },
        className
      )}
    >
      {breadcrumbsListToShow.map((breadcrumb, index) => {
        const isLastCrumb = index === breadcrumbsListToShow.length - 1
        return buildLinkItem({
          ...breadcrumb,
          index,
          isLastCrumb,
          isDesktop
        })
      })}
    </div>
  )
}

const buildLinkItem = ({
  title,
  path,
  linkPath,
  index,
  isLastCrumb,
  isDesktop
}: NavigationBreadcrumb): JSX.Element => {
  return (
    <Fragment key={uuid()}>
      {index !== 0 && (
        <ChevronRight className="icon-16 pt-0.125 mx-1 inline text-primary-oxford-blue" />
      )}
      {!isLastCrumb || !isDesktop || (index === 0 && isLastCrumb) ? (
        <NextLink href={(linkPath || path) ?? ''} passHref prefetch={false}>
          <Link className="text-sm font-semibold text-primary-oxford-blue">
            {title}
          </Link>
        </NextLink>
      ) : (
        <span className="text-sm no-underline text-primary-oxford-blue">
          {title}
        </span>
      )}
    </Fragment>
  )
}

const processSubpaths = ({
  subpaths,
  route,
  asPath,
  query
}: {
  subpaths?: NavigationBreadcrumb[]
  route: string
  asPath: string
  query: ParsedUrlQuery
}) => {
  if (!subpaths) return

  return subpaths.reduce(
    (memo: Array<NavigationBreadcrumb>, breadcrumb: NavigationBreadcrumb) => {
      if (memo && memo.length > 0) return memo

      const { title, path, subpaths } = breadcrumb

      const breadcrumbPath = replaceBracketsWithQueryParam({
        str: path,
        query
      })
      const breadcrumbTitle = replaceBracketsWithQueryParam({
        str: title,
        query
      })

      const properRoute = removeBracketsFromString(route)
      const properPath = removeBracketsFromString(path ?? '')

      if (
        breadcrumbTitle &&
        breadcrumbPath &&
        (properRoute.match(properPath) || asPath.match(path ?? ''))
      ) {
        memo.push({ title: breadcrumbTitle, path: breadcrumbPath })
      }

      if (Array.isArray(subpaths) && subpaths.length > 0) {
        memo.push(
          // @ts-ignore - TODO: needs refactor to fix this type
          ...processSubpaths({
            subpaths,
            asPath,
            route,
            query
          })
        )
      }

      return memo
    },
    []
  )
}

const replaceBracketsWithQueryParam = ({
  str,
  query
}: {
  str: string | undefined
  query: ParsedUrlQuery
}): string | undefined => {
  let fixedString = str

  if (str?.match(/\[.+\]/gi)) {
    const queryParam = str.match(/\[([^]+)\]/i)?.[1]

    // TODO: need to try and get rid of the "as"
    fixedString = str.replace(/\[.+\]/gi, query[queryParam as string] as string)
  }

  return fixedString
}

const removeBracketsFromString = (str: string): string =>
  str.replace(/\[|\]/gi, '')
