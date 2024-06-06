import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { CategoryGrid as CategoryGridType } from '~domains/contentful'
import classNames from 'classnames'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { Image } from '~components/atoms/Image'

export type CategoryGridProps = CategoryGridType & { isLcp?: boolean }

export const CategoryGrid: FunctionComponent<
  ComponentPropsWithoutRef<'section'> &
    CategoryGridProps & { isHomePage?: boolean }
> = ({
  title,
  items,
  contentType,
  className,
  isHomePage,
  isLcp = false,
  ...props
}) => {
  return (
    <section
      className={classNames('w-full', className)}
      data-testid="categoryTiles"
      {...props}
    >
      <h1 className="text-lg mb-3 font-body font-light">{title ?? ''}</h1>
      <ul
        className="grid grid-cols-2 gap-x-3 gap-y-2 w-full sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6"
        data-testid="categoryGrid"
      >
        {items &&
          items.map(
            (
              { title = '', color = 'ui-grey-light', image, url = '/' },
              idx: number
            ) => {
              const isLast = idx + 1 === items.length
              return (
                <li
                  key={idx}
                  className={
                    color.includes('bg-category') ? `${color}-light` : color
                  }
                >
                  <NextLink href={url} passHref prefetch={false}>
                    <Link
                      className={classNames(
                        'flex items-center h-11 p-1 no-underline cursor-pointer md:h-22 md:flex-col md:justify-between md:p-3 md:pb-1',
                        isLast ? 'md:justify-between' : ''
                      )}
                      data-testid={`items-${url}`}
                    >
                      {isLast ? (
                        <span
                          className={classNames(
                            'text-8xl font-light text-center text-primary-white',
                            'w-6 h-8 py-1 mr-0',
                            'sm:w-8 sm:mr-1',
                            'md:w-9 md:h-12 md:text-8xl md:mr-0 md:pt-3'
                          )}
                          role="img"
                        >
                          %
                        </span>
                      ) : (
                        <span
                          className={classNames(
                            'flex justify-center items-center',
                            'min-w-6 max-w-6 max-h-9 min-h-9 pr-1',
                            'sm:min-w-7 sm:max-w-7 sm:mx-1',
                            'md:min-w-11 md:max-h-11 md:min-h-12 md:mx-2 md:p-0 md:pb-1',
                            'lg:min-w-12'
                          )}
                        >
                          {image && (
                            <Image
                              className="max-w-full max-h-inherit"
                              src={image.url}
                              alt={image.alt}
                              width={{ xs: 50, md: 100 }}
                              height={{ xs: 50, md: 100 }}
                              loading={isLcp && idx < 2 ? 'eager' : 'lazy'}
                              preload={isLcp && idx === 0}
                            />
                          )}
                        </span>
                      )}
                      <span
                        className={classNames(
                          'flex items-center text-xs text-left min-h-6 xs:text-sm md:flex md:items-center md:text-center md:h-6 md:px-2',
                          isLast
                            ? 'font-normal text-primary-white'
                            : 'font-light'
                        )}
                      >
                        {title}
                      </span>
                    </Link>
                  </NextLink>
                </li>
              )
            }
          )}
      </ul>
    </section>
  )
}
