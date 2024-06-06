import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useInView from 'react-cool-inview'

import { ReactComponent as ChevronRight } from '~assets/svg/navigation-16px/ChevronRight.svg'
import { Asset } from '~domains/contentful'
import { Button } from '~components/atoms/Button'
import { Link } from '~components/atoms/Link'
import { InfoLabel } from '~components/atoms/InfoLabel'
import { Image } from '~components/atoms/Image'
import {
  triggerReportPromotionClicked,
  triggerReportPromotionViewed
} from '~domains/analytics'
import { CmsContainerContentTypes } from '~config/content-types'
import { PROMOTION_VIEWED_THRESHOLD } from '~config/constants/sponsoredContent'
import { isExternalLink } from '~helpers'

export type MarketingTeaserType = {
  id?: string
  title?: string
  logo?: Asset
  description?: string
  labelText?: string
  labelColor?: string
  backgroundColor?: string
  isFullWidthImage?: boolean
  image?: Asset
  url?: string
  hasButton?: boolean
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  isLcp?: boolean
}

export type MarketingTeaserProps = MarketingTeaserType & {
  index?: number
}

export const MarketingTeaser: FunctionComponent<MarketingTeaserProps> = ({
  id,
  title,
  logo,
  description,
  labelText,
  labelColor,
  backgroundColor,
  isFullWidthImage = true,
  image,
  url,
  hasButton,
  isSponsoredContent,
  sponsoredContentPosition,
  isLcp = false
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { observe } = useInView({
    threshold: PROMOTION_VIEWED_THRESHOLD,
    onEnter: ({ unobserve }) => {
      unobserve()

      dispatch(
        triggerReportPromotionViewed({
          name: title,
          creative: CmsContainerContentTypes.MARKETING_TEASER,
          promotion_id: id,
          index: sponsoredContentPosition
        })
      )
    }
  })

  const isExternal = useMemo(() => isExternalLink(url ?? ''), [url])

  const navigateTo = useCallback(
    (url: string) => {
      if (isExternal) {
        window.location.href = url
      } else {
        router.push(url)
      }
    },
    [isExternal, router]
  )

  const trackClick = useCallback(() => {
    dispatch(
      triggerReportPromotionClicked({
        name: title,
        creative: CmsContainerContentTypes.MARKETING_TEASER,
        promotion_id: id,
        index: sponsoredContentPosition,
        is_sponsored_content: isSponsoredContent
      })
    )
  }, [dispatch, id, sponsoredContentPosition, title, isSponsoredContent])

  const handleClick = useCallback(() => {
    if (url) {
      navigateTo(url)
    }
    trackClick()
  }, [navigateTo, trackClick, url])

  const content = useMemo(
    () =>
      isFullWidthImage ? (
        <FullWidthMarketingTeaserContent
          {...{
            title,
            logo,
            description,
            labelText,
            labelColor,
            image,
            hasButton,
            onClick: handleClick,
            isLcp
          }}
        />
      ) : (
        <MarketingTeaserContent
          {...{
            title,
            logo,
            description,
            labelText,
            labelColor,
            image,
            hasButton,
            url,
            isLcp
          }}
        />
      ),
    [
      isFullWidthImage,
      title,
      logo,
      description,
      labelText,
      labelColor,
      image,
      hasButton,
      handleClick,
      isLcp,
      url
    ]
  )
  return (
    <div
      ref={isSponsoredContent ? observe : null}
      key={id}
      className={classNames(
        `w-full sm:max-w-2.4/5 md:max-w-2.35/5 lg:max-w-2.4/5 overflow-y-hidden no-scroll h-30.5 lg:h-35.5`,
        {
          [`bg-${backgroundColor}`]: backgroundColor
        }
      )}
      data-testid="marketingTeaser"
    >
      {url ? (
        <>
          {isExternal ? (
            <Link
              className="w-full h-full no-underline"
              href={url}
              trackingHandler={trackClick}
            >
              {content}
            </Link>
          ) : (
            <NextLink href={url} prefetch={false} passHref>
              <Link className="w-full h-full no-underline">{content}</Link>
            </NextLink>
          )}
        </>
      ) : (
        <>{content}</>
      )}
    </div>
  )
}

export const FullWidthMarketingTeaserContent: FunctionComponent<
  MarketingTeaserProps & { onClick: () => void }
> = ({ image, logo, title, hasButton, onClick, isLcp = false }) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="marketingTeaserFullWidthDiv"
      className="relative w-full h-full"
      tabIndex={0}
      role="button"
      onKeyDown={onClick}
      onClick={onClick}
    >
      {image?.url && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            className="absolute w-full h-full object-cover object-right sm:object-center mx-auto"
            src={image.url}
            alt={image.title}
            width={{ xs: 750, sm: 750, md: 750, lg: 750 }}
            height={{ xs: 300, sm: 300, md: 300, lg: 300 }}
            preload={isLcp}
            loading={isLcp ? 'eager' : 'lazy'}
          />
        </div>
      )}
      <div className="relative w-full h-full flex flex-col justify-between items-start p-4 lg:p-5">
        {logo?.url && (
          <div className="h-3.5 w-12 flex items-center justify-start mb-1">
            <Image
              alt=""
              fill={false}
              isFixedOnHeight
              data-testid="marketingTeaserLogo"
              className="w-full"
              src={logo?.url || ''}
              width={{ xs: 100, sm: 100, md: 100, lg: 100 }}
              height={{ xs: 100, sm: 100, md: 100, lg: 100 }}
              preload={isLcp}
              loading={isLcp ? 'eager' : 'lazy'}
            />
          </div>
        )}
        {title && (
          <span
            className={classNames(
              'text-xl w-20 mb-3 line-clamp-3 font-heading font-bold',
              'lg:w-25 lg:text-4xl'
            )}
          >
            {title}
          </span>
        )}
        {hasButton && (
          <Button
            data-testid="marketingTeaserButton"
            className="cursor-pointer"
          >
            {t('teaser.button.buy')}
          </Button>
        )}
      </div>
    </div>
  )
}

export const MarketingTeaserContent: FunctionComponent<MarketingTeaserProps> = ({
  labelText,
  labelColor,
  title,
  hasButton,
  description,
  image,
  url = undefined,
  isLcp = false
}) => {
  const { t } = useTranslation()
  return (
    <div
      className="sm:flex sm:flex-row p-2 h-full w-full"
      tabIndex={0}
      role={url ? 'button' : 'none'}
    >
      <div className="flex flex-col justify-between w-full sm:w-8/12 h-full">
        <div className="mt-1.5">
          {labelText && (
            <InfoLabel
              className={classNames(
                'text-primary-white truncate inline-block max-w-full',
                {
                  [`bg-${labelColor}`]: labelColor
                }
              )}
              data-testid="teaserLabel"
            >
              {labelText && t(labelText)}
            </InfoLabel>
          )}
          {title && (
            <span
              className={classNames(
                'text-lg sm:text-xl leading-6 sm:leading-7 line-clamp-3 font-heading font-bold'
              )}
            >
              {title}
            </span>
          )}
          {description && (
            <p className="mt-1 leading-5 text-sm sm:text-base line-clamp-2">
              {description}
            </p>
          )}
        </div>
        {hasButton && (
          <Button
            data-testid="marketingTeaserButton"
            className="cursor-pointer"
            icon={<ChevronRight className={classNames('icon-16')} />}
          />
        )}
      </div>

      {image && (
        <div
          className={classNames(
            'flex w-full sm:w-4/12 h-4/12 sm:h-full mt-2 sm:mt-0 sm:ml-2 xs-only:hidden'
          )}
        >
          <Image
            className="w-auto h-full object-contain mx-auto"
            src={image.url || ''}
            alt={image.title}
            width={{ xs: 300, sm: 300, md: 300, lg: 300 }}
            height={{ xs: 300, sm: 300, md: 300, lg: 300 }}
            isFixedOnHeight
            data-testid="marketingTeaserImage"
            preload={isLcp}
            loading={isLcp ? 'eager' : 'lazy'}
          />
        </div>
      )}
    </div>
  )
}
