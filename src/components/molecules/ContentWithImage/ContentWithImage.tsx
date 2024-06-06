import NextLink from 'next/link'
import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useMemo
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import useInView from 'react-cool-inview'

import {
  ContentBlockWithImage,
  mapIconReferenceToIconComponent
} from '~domains/contentful'
import { Link } from '~components/atoms/Link'
import { parseHtml } from '~helpers'
import { Image } from '~components/atoms/Image'
import {
  triggerReportPromotionClicked,
  triggerReportPromotionViewed
} from '~domains/analytics'
import { CmsContentTypes } from '~config/content-types'
import { PROMOTION_VIEWED_THRESHOLD } from '~config/constants/sponsoredContent'
import { getPageSlug } from '~domains/translated-routes'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { useRouter } from 'next/router'

export type ContentWithImageProps = ContentBlockWithImage & {
  TitleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
  isHomePage?: boolean
  isLcp?: boolean
}

export const ContentWithImage: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & ContentWithImageProps
> = ({
  contentType,
  className,
  TitleTag = 'h2',
  image,
  imageOnTheLeft = false,
  header,
  title,
  content,
  cta,
  textLink,
  backgroundColor,
  textColor,
  isHomePage,
  isSponsoredContent,
  sponsoredContentPosition,
  titleTypography = 'heading',
  imageSize = 'large',
  textAlignmentForMobile = 'left',
  showDescription = true,
  buttonVariant = 'primary',
  buttonWidthForMobile = 'auto',
  buttonPositionForTablet = 'right',
  isLcp = false,
  ...props
}) => {
  const dispatch = useDispatch()
  const CtaIcon = useMemo(() => mapIconReferenceToIconComponent(cta?.icon), [
    cta?.icon
  ])
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { locale } = useRouter()
  const loyaltyPageSlug = useMemo(() => getPageSlug('loyalty', locale), [
    locale
  ])
  const slug = useMemo(() => cta?.url?.split?.('/')?.[1] ?? '', [cta?.url])
  const isAtidaCash = useMemo(() => slug === loyaltyPageSlug, [
    loyaltyPageSlug,
    slug
  ])
  const path = useMemo(
    () => (isAtidaCash ? loyaltyPageSlug ?? '' : cta?.url ?? ''),
    [cta?.url, isAtidaCash, loyaltyPageSlug]
  )
  const linkHref = useMemo(
    () => (isAtidaCash && isLoggedIn ? '/account/my-atida-cash' : path),
    [isAtidaCash, isLoggedIn, path]
  )

  const trackingPayload = useMemo(
    () => ({
      name: title,
      creative: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE,
      index: sponsoredContentPosition,
      promotion_id: `${title}-${sponsoredContentPosition}`
    }),
    [sponsoredContentPosition, title]
  )

  const { observe } = useInView({
    threshold: PROMOTION_VIEWED_THRESHOLD,
    onEnter: ({ unobserve }) => {
      unobserve()
      dispatch(triggerReportPromotionViewed(trackingPayload))
    }
  })

  const handleSponsoredContentClicked = useCallback(
    () =>
      dispatch(
        triggerReportPromotionClicked({
          ...trackingPayload,
          is_sponsored_content: isSponsoredContent
        })
      ),
    [dispatch, isSponsoredContent, trackingPayload]
  )

  return (
    <div
      ref={isSponsoredContent ? observe : null}
      className={classNames('w-full', className)}
      data-testid="contentWithImage"
      {...props}
    >
      <section
        className={classNames(
          'sm:flex sm:items-stretch',
          `bg-${backgroundColor}`,
          `text-${textColor}`,
          {
            'sm:min-h-40 md:min-h-46 lg:min-h-48':
              !imageOnTheLeft && imageSize !== 'small',
            'flex-row-reverse sm:justify-end': imageOnTheLeft,
            'p-4 sm:p-5 lg:pt-5 lg:pb-5 lg:pr-8 lg:pl-8 sm:gap-6':
              imageSize === 'small'
          }
        )}
        {...props}
        data-testid="ctaIcon"
      >
        <div
          className={classNames('sm:order-2 sm:grow-0 sm:shrink-0', {
            'flex justify-center items-center': imageSize === 'small',
            'h-31 sm:h-auto sm:w-7/12 md:w-1/2 lg:w-7/12':
              !imageOnTheLeft && imageSize === 'large',
            'sm:w-1/2 sm:m-0 lg:w-7/12': imageOnTheLeft && imageSize === 'large'
          })}
        >
          {image && (
            <Image
              preload={isLcp}
              className={classNames({
                'object-cover object-right-center w-full h-full':
                  imageSize === 'large',
                'w-21 mb-3 sm:mb-0 sm:w-17': imageSize === 'small'
              })}
              src={image.url || ''}
              alt={image.description}
              width={{ xs: 600, sm: 600, md: 800, lg: 800 }}
            />
          )}
        </div>
        <div
          className={classNames('flex', {
            'items-center w-full': textAlignmentForMobile === 'center',
            'items-start': textAlignmentForMobile === 'left',
            'p-0': imageSize === 'small',
            'pb-4 pt-4.5 px-2 sm:px-4 md:px-6 lg:px-7':
              !imageOnTheLeft && imageSize === 'large',
            'grow px-3 py-4 md:px-4 lg:p-5':
              imageOnTheLeft && imageSize === 'large'
          })}
        >
          {header && (
            <p className="text-ui-campaign-base mb-3 leading-5 text-sm sm:text-base line-clamp-3">
              {header}
            </p>
          )}
          <div
            className={classNames('flex flex-col', {
              'sm:flex-row w-full gap-2 sm:gap-3 justify-between':
                imageSize === 'small',
              'flex-col items-start sm:order-1 justify-center grow px-3 py-4 md:px-4 lg:p-5':
                imageSize === 'large',
              'items-center sm:gap-4':
                buttonPositionForTablet === 'right' && imageSize === 'small',
              'sm:flex-col md:flex-row items-start sm:gap-2 md:gap-4 md:items-center':
                buttonPositionForTablet === 'bottom' && imageSize === 'small'
            })}
          >
            <div
              className={classNames('xs-only:w-full flex flex-col', {
                'items-center sm:items-start':
                  textAlignmentForMobile === 'center'
              })}
            >
              <TitleTag
                className={classNames('mb-1.5', {
                  'font-body text-lg lg:text-2xl': titleTypography === 'body',
                  'text-3xl lg:text-5xl': titleTypography === 'heading',
                  'col-start-1': imageSize === 'small',
                  'sm:mb-0': showDescription === false
                })}
              >
                {title}
              </TitleTag>
              {showDescription && (
                <div
                  className={classNames({
                    'text-center sm:text-left':
                      textAlignmentForMobile === 'center',
                    'col-start-1 mb-2 sm:mb-0': imageSize === 'small',
                    'mb-2': imageSize === 'large'
                  })}
                >
                  {parseHtml(content)}
                </div>
              )}
            </div>
            {cta && (
              <NextLink href={linkHref} passHref prefetch={false}>
                <Link
                  className={classNames('button px-2 text-center', {
                    'button--primary': buttonVariant === 'primary',
                    'w-full sm:max-w-18': buttonWidthForMobile === 'full-width',
                    'border-none':
                      backgroundColor !== 'ui-black' &&
                      buttonVariant !== 'tertiary',
                    'border-primary-white button--tertiary border-2 text-primary-white hover:text-primary-white focus:text-primary-white':
                      backgroundColor === 'ui-black',
                    'button--tertiary': buttonVariant === 'tertiary'
                  })}
                  icon={<CtaIcon className="icon-24 mr-1" />}
                  data-testid="contentWithImageButton"
                  trackingHandler={handleSponsoredContentClicked}
                >
                  {cta.label}
                </Link>
              </NextLink>
            )}
            {textLink && (
              <NextLink href={textLink.url ?? ''} passHref prefetch={false}>
                <Link
                  className="text-inherit mt-2"
                  data-testid="textLink"
                  trackingHandler={handleSponsoredContentClicked}
                >
                  {textLink.label}
                </Link>
              </NextLink>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
