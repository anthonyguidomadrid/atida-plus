import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import useInView from 'react-cool-inview'
import { useDispatch } from 'react-redux'

import { parseHtml } from '~helpers'
import { HeroBanner as HeroBannerType } from '~domains/contentful'
import { Link } from '~components/atoms/Link'
import { Image } from '~components/atoms/Image'
import { BannerLink } from '~components/atoms/BannerLink'
import {
  triggerReportPromotionClicked,
  triggerReportPromotionViewed
} from '~domains/analytics'
import { CmsContentTypes } from '~config/content-types'
import { PROMOTION_VIEWED_THRESHOLD } from '~config/constants/sponsoredContent'
import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH
} from '~config/constants/images'

export type HeroBannerProps = HeroBannerType & {
  isFullHeight?: boolean
  isLcp?: boolean
}

export const HeroBanner: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & HeroBannerProps
> = ({
  contentType,
  title,
  image,
  searchPlaceholder,
  text,
  link,
  isFullHeight = false,
  className,
  isSponsoredContent,
  sponsoredContentPosition,
  isLcp = false,
  ...props
}) => {
  const dispatch = useDispatch()
  const trackingPayload = {
    name: searchPlaceholder || title,
    creative: CmsContentTypes.HERO_BANNER,
    index: sponsoredContentPosition,
    promotion_id: `${searchPlaceholder || title}-${sponsoredContentPosition}`
  }
  const { observe } = useInView({
    threshold: PROMOTION_VIEWED_THRESHOLD,
    onEnter: ({ unobserve }) => {
      unobserve()

      dispatch(triggerReportPromotionViewed(trackingPayload))
    }
  })

  const handleSponsoredContentClicked = () =>
    dispatch(
      triggerReportPromotionClicked({
        ...trackingPayload,
        is_sponsored_content: isSponsoredContent
      })
    )

  return (
    <BannerLink
      href={link?.url}
      trackingHandler={handleSponsoredContentClicked}
      className={classNames({ 'h-full': isFullHeight })}
    >
      <div
        ref={isSponsoredContent ? observe : null}
        className={classNames(
          'w-full flex sm:items-center bg-cover bg-no-repeat bg-center',
          'sm:relative sm:min-h-56 md:min-h-63',
          'xs-only:flex-col bg-secondary-light-beige',
          {
            'h-full': isFullHeight
          }
        )}
        data-testid="heroBanner"
        {...props}
      >
        <div className="xs-only:h-34 sm:absolute sm:z-1 w-full h-full">
          {image && (
            <Image
              className="w-full h-full object-cover object-right sm:object-center mx-auto"
              src={image.url}
              alt={image.title}
              loading={isLcp ? 'eager' : 'lazy'}
              preload={isLcp}
              width={DEFAULT_IMAGE_WIDTH}
              height={DEFAULT_IMAGE_HEIGHT}
              data-testid="heroBannerImage"
            />
          )}
        </div>
        <div className="sm:absolute sm:z-2 sm:w-6/12 md:w-4/12 p-3 sm:pr-0 sm:pl-5 sm:py-5 md:pl-7 md:py-7 lg:pl-8 lg:py-8 xs-only:pt-3.625 xs-only:pb-4">
          {title && title !== '' && (
            <h2
              data-testid="heroBannerTitle"
              className="text-4.5xl sm:text-6xl lg:text-8xl"
            >
              {title}
            </h2>
          )}
          <div className="w-full mt-1">
            <span className="font-light text-sm block">{parseHtml(text)}</span>
          </div>
          {link?.url && (
            <NextLink href={link?.url} passHref prefetch={false}>
              <Link
                className="text-primary-white no-underline rounded button--primary px-3 py-2 hover:text-primary-white mt-3.25 lg:mt-4.25"
                data-testid="heroBannerLink"
              >
                {link?.label}
              </Link>
            </NextLink>
          )}
        </div>
      </div>
    </BannerLink>
  )
}
