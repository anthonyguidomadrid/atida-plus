import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'

import { TopBrands as TopBrandsType } from '~domains/contentful/normalizers/top-brands'
import { ConditionalLink } from '~components/atoms/ConditionalLink'
import { Image } from '~components/atoms/Image'

export type TopBrandsProps = TopBrandsType

export const TopBrands: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & TopBrandsProps
> = ({ title, items }) => (
  <section className="w-full" data-testid="topBrands">
    <span className="text-lg flex mb-3">{title ?? ''}</span>

    <ul
      className={classNames(
        'flex flex-wrap grid-rows-brand-tiles grid-cols-brand-tiles gap-2',
        'justify-between items-center w-full m-auto',
        'sm:grid-rows-brand-tiles-sm sm:grid-cols-brand-tiles-sm',
        'lg:grid-cols-brand-tiles-lg lg:gap-8'
      )}
    >
      {items &&
        items.map(({ title = '', logoImage, url = '' }, idx: number) => (
          <li
            key={`${title}-${idx}`}
            className={classNames(
              'flex justify-center items-center w-brand-tiles h-brand-tiles',
              'border border-ui-grey-lightest rounded-full overflow-hidden',
              'sm:w-brand-tiles-sm sm:h-brand-tiles-sm',
              'md:w-17 md:h-17',
              'lg:w-brand-tiles-lg lg:h-brand-tiles-lg lg:last:flex'
            )}
          >
            <ConditionalLink url={url} testId="topBrandsLink">
              {logoImage && (
                <Image
                  width={{ xs: 150 }}
                  src={logoImage.url || ''}
                  alt={title}
                  className="w-min h-min max-w-4/5 max-h-4/5 m-auto"
                  loading="lazy"
                />
              )}
            </ConditionalLink>
          </li>
        ))}
    </ul>
  </section>
)
