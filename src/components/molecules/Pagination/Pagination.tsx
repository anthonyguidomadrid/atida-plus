import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { useRouter } from 'next/router'
import { ReactComponent as ChevronRight } from '../../../assets/svg/navigation-16px/ChevronRight.svg'
import { ReactComponent as ChevronLeft } from '../../../assets/svg/navigation-16px/ChevronLeft.svg'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useTranslation } from 'react-i18next'

export type PaginationProps = {
  pages: number
  maxShownPages?: number
}

export const Pagination: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & PaginationProps
> = ({ pages, maxShownPages = 3 }) => {
  const { route, query } = useRouter()
  const { page } = query
  const { t } = useTranslation()
  const isDesktop = useBreakpoint(breakpoints.sm)

  const currentPage = page && page !== '0' ? Number(page) : 1
  const offset = Math.floor(maxShownPages / 2)

  // **************************************** //
  // <  1   ···   20   21   22   ···   50  >  //
  //              ↑↑                          //
  //          initialPage                     //
  // **************************************** //
  const initialPage =
    currentPage <= offset + 1 || pages <= maxShownPages
      ? 1
      : currentPage >= pages - offset + 1
      ? pages - maxShownPages + 1
      : currentPage - offset

  return (
    <ul className="flex justify-center font-normal">
      <li
        data-testid="paginationLeftArrow"
        className={classNames(
          'w-6 h-6 flex mr-1 place-content-center bg-primary-oxford-blue rounded',
          {
            'bg-primary-oxford-blue-20 pointer-events-none':
              pages === 1 || currentPage === 1,
            'border border-primary-oxford-blue': pages > 1 && currentPage !== 1
          }
        )}
      >
        <NextLink
          href={`${route}?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          passHref
          prefetch={false}
        >
          <Link className="no-underline w-6 place-content-center">
            <ChevronLeft className={classNames('icon-16 text-primary-white')} />
          </Link>
        </NextLink>
      </li>
      {isDesktop ? (
        <>
          {pages > maxShownPages && currentPage > offset + 1 && (
            <li
              key={1}
              data-testid={`paginationPage-${1}`}
              className={classNames(
                'w-6 h-6 flex place-content-center border ml-1 rounded',
                {
                  'border-primary-oxford-blue': currentPage === 1,
                  'border-ui-grey-light': currentPage !== 1
                }
              )}
            >
              <NextLink href={`${route}?page=1`} key={1} passHref>
                <Link className="no-underline w-6 place-content-center">
                  <span className="p-0.5 truncate">{1}</span>
                </Link>
              </NextLink>
            </li>
          )}
          {pages >= maxShownPages + 2 && currentPage > offset + 2 && (
            <li className="w-6 h-6 flex place-content-center items-center font-light ml-1">
              ···
            </li>
          )}

          {[...Array(maxShownPages)].map((_n, index) => {
            if (pages > index)
              return (
                <li
                  key={initialPage + index}
                  data-testid={`paginationPage-${initialPage + index}`}
                  className={classNames(
                    'w-6 h-6 flex place-content-center border ml-1 rounded',
                    {
                      'border-primary-oxford-blue':
                        currentPage === initialPage + index,
                      'border-ui-grey-light':
                        currentPage !== initialPage + index
                    }
                  )}
                >
                  <NextLink
                    href={`${route}?page=${initialPage + index}`}
                    key={index + 1}
                    passHref
                  >
                    <Link className="no-underline w-6 place-content-center">
                      <span className="p-0.5 truncate">
                        {initialPage + index}
                      </span>
                    </Link>
                  </NextLink>
                </li>
              )
          })}
          {pages >= maxShownPages + 2 && currentPage < pages - offset - 1 && (
            <li className="w-6 h-6 flex place-content-center items-center font-light ml-1">
              ···
            </li>
          )}
          {pages > maxShownPages && currentPage < pages - offset && (
            <li
              key={pages}
              data-testid={`paginationPage-${pages}`}
              className={classNames(
                'w-6 h-6 flex place-content-center border ml-1 rounded',
                {
                  'border-primary-oxford-blue': currentPage === pages,
                  'border-ui-grey-light': currentPage !== pages
                }
              )}
            >
              <NextLink href={`${route}?page=${pages}`} key={pages} passHref>
                <Link className="no-underline w-6 place-content-center">
                  <span className="p-0.5 truncate">{pages}</span>
                </Link>
              </NextLink>
            </li>
          )}
        </>
      ) : (
        <li
          data-testid="paginationMobile"
          className="min-w-22 -mr-1 text-center self-center font-light rounded"
        >
          {t('shared.pagination', { currentPage, totalPages: pages })}
        </li>
      )}
      <li
        data-testid="paginationRightArrow"
        className={classNames(
          'w-6 h-6 flex place-content-center ml-2 bg-primary-oxford-blue rounded',
          {
            'bg-primary-oxford-blue-20 pointer-events-none':
              pages === 1 || currentPage === pages,
            'border border-primary-oxford-blue':
              pages > 1 && currentPage !== pages
          }
        )}
      >
        <NextLink
          href={`${route}?page=${
            currentPage < pages ? currentPage + 1 : pages
          }`}
          passHref
          prefetch={false}
        >
          <Link className="no-underline w-6 place-content-center">
            <ChevronRight
              className={classNames('icon-16 text-primary-white')}
            />
          </Link>
        </NextLink>
      </li>
    </ul>
  )
}
