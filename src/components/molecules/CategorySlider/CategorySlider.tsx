import { useEffect, useState } from 'react'
import classNames from 'classnames'
import NextLink from 'next/link'

import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useIsBrowser } from '~helpers/useIsBrowser'
import { Link } from '~components/atoms/Link'
import { Image } from '~components/atoms/Image'
import { Slider } from '../Slider'
import type { SlidesPerView } from '../Slider'
import { CategoryGridProps } from '../CategoryGrid'

export const CategorySlider = ({
  title,
  items,
  isLcp = false
}: CategoryGridProps) => {
  const isBrowser = useIsBrowser()
  const isSmallScreen = useBreakpoint(breakpoints.sm)
  const isMediumScreen = useBreakpoint(breakpoints.md)
  const isLargeScreen = useBreakpoint(breakpoints.lg)
  const [slidesPerView, setSlidesPerView] = useState<SlidesPerView>(3)

  useEffect(() => {
    setSlidesPerView(
      isBrowser
        ? isLargeScreen
          ? 8
          : isMediumScreen
          ? 6
          : isSmallScreen
          ? 5
          : 'auto'
        : 3
    )
  }, [isBrowser, isLargeScreen, isMediumScreen, isSmallScreen])

  if (!items || !items.length) return null
  return (
    <Slider
      title={title}
      slidesPerView={slidesPerView}
      slideWidth={140}
      displayTitle
      areArrowButtonsOnTop
      showSlidesIndicators={false}
      autoplay={false}
      swiperClassName={classNames(
        'xs-only:-ml-1',
        'sm:max-w-category-slider-sm sm:-ml-category-slider-sm',
        'md:max-w-[921.33px] lg:max-w-[1332px]',
        'md:-ml-[12.66px] lg:-ml-1.25'
      )}
      className="xs-only:container"
      testId="categorySlider"
    >
      {items.length > 0 &&
        items.map(
          (
            {
              title = '',
              color = 'bg-ui-grey-light',
              image,
              url = '/',
              titleColor
            },
            idx: number
          ) => (
            <NextLink
              key={`category-slider-tile-${title}`}
              href={url}
              passHref
              prefetch={false}
            >
              <Link
                className="h-full flex flex-col gap-2 no-underline cursor-pointer"
                data-testid={`items-${url}`}
              >
                <span
                  className={classNames(
                    'flex justify-center items-center w-15.5 lg:w-18 h-15.5 lg:h-18 rounded-full',
                    color
                  )}
                >
                  {image && (
                    <Image
                      className="w-auto max-h-11"
                      fill={false}
                      src={image.url}
                      alt={image.alt}
                      width={{ xs: 150, lg: 250 }}
                      height={{ xs: 150, lg: 250 }}
                      loading={isLcp && idx < 2 ? 'eager' : 'lazy'}
                      preload={isLcp && idx === 0}
                    />
                  )}
                </span>
                <span
                  className={classNames('w-15.5 lg:w-18 text-sm text-center', {
                    [`text-${titleColor} font-semibold`]: titleColor
                  })}
                >
                  {title}
                </span>
              </Link>
            </NextLink>
          )
        )}
    </Slider>
  )
}
