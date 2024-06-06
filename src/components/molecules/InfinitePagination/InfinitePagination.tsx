import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { ReactComponent as PlusLarge } from '~assets/svg/navigation-24px/PlusLarge.svg'
import { ProgressBar } from '~components/atoms/ProgressBar'
import { useTranslation } from 'react-i18next'
import { Link } from '~components/atoms/Link'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

export type InfinitePaginationProps = ComponentPropsWithoutRef<'nav'> & {
  current: number
  total: number
  isLoading?: boolean
  hasMore?: boolean
  loadMore?: () => void
  getNextPageQuery?: () => ParsedUrlQuery
  loadMoreText?: string
  itemsPartialNumber?: string
  isInCheckout?: boolean
}

export const InfinitePagination: FunctionComponent<InfinitePaginationProps> = ({
  className,
  current,
  total,
  isLoading,
  hasMore,
  loadMore,
  getNextPageQuery,
  loadMoreText,
  itemsPartialNumber = 'product.partial-number-of-products',
  isInCheckout,
  ...props
}) => {
  const { t } = useTranslation()

  const { asPath } = useRouter()
  const asPathNoParams = asPath?.split('?')?.[0] ?? asPath

  return (
    <nav
      data-testid="infinitePagination"
      className={classNames('flex flex-col items-center', className)}
      aria-busy={isLoading}
      {...props}
    >
      {!!hasMore && (
        /* eslint-disable jsx-a11y/anchor-is-valid */
        <NextLink
          href={{
            pathname: asPathNoParams,
            query: getNextPageQuery && getNextPageQuery()
          }}
          passHref
        >
          <Link
            data-testid="loadMoreButton"
            className={classNames(
              'button button--primary cursor-pointer px-2 mb-3',
              {
                'w-full': isInCheckout
              }
            )}
            icon={!isInCheckout ? <PlusLarge className="icon-24" /> : undefined}
            onClick={e => {
              e.preventDefault()
              const storage = globalThis?.sessionStorage
              if (!storage) return
              storage.removeItem('scroll-position-product-id-marker')
              loadMore && loadMore()
            }}
          >
            {loadMoreText}
          </Link>
        </NextLink>
      )}
      <ProgressBar
        now={current}
        max={total}
        className="mb-3"
        isInCheckout={isInCheckout ?? false}
      />
      <div
        data-testid="infinitePaginationProductCount"
        className={classNames('text-base font-semibold')}
      >
        {t(itemsPartialNumber, {
          count: total,
          current
        })}
      </div>
    </nav>
  )
}
