import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useInView from 'react-cool-inview'

import { Asset } from '~domains/contentful'
import { parseHtml } from '~helpers'
import { Button } from '~components/atoms/Button'
import { Countdown, CountdownThemeEnum } from '~components/atoms/Countdown'
import { Image } from '~components/atoms/Image'
import { BannerLink } from '~components/atoms/BannerLink'
import {
  triggerReportPromotionClicked,
  triggerReportPromotionViewed
} from '~domains/analytics'
import { CmsContentTypes } from '~config/content-types'
import { PROMOTION_VIEWED_THRESHOLD } from '~config/constants/sponsoredContent'
import { ComponentPropsWithoutRefAndChildren } from '~helpers/typeHelpers'

export type CampaignHeroBannerProps = {
  title?: string
  description?: string
  altTitle?: string
  finishingDate?: string
  backgroundColor?: string
  image?: Asset
  url?: string
  withCTA?: boolean
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  isLcp?: boolean
}

export const CampaignHeroBanner = ({
  title,
  description,
  altTitle,
  finishingDate,
  backgroundColor = 'ui-black',
  image,
  url,
  withCTA = true,
  isSponsoredContent,
  sponsoredContentPosition,
  isLcp = false
}: ComponentPropsWithoutRefAndChildren<'section'> &
  CampaignHeroBannerProps) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const dispatch = useDispatch()
  const trackingPayload = {
    name: title,
    creative: CmsContentTypes.CAMPAIGN_HERO_BANNER,
    index: sponsoredContentPosition,
    promotion_id: `${title}-${sponsoredContentPosition}`
  }
  const { observe } = useInView({
    threshold: PROMOTION_VIEWED_THRESHOLD,
    onEnter: ({ unobserve }) => {
      unobserve()

      dispatch(triggerReportPromotionViewed(trackingPayload))
    }
  })

  const handleCampaignBannerClick = (url?: string) => () => url && push(url)

  const handleSponsoredContentClicked = () =>
    dispatch(
      triggerReportPromotionClicked({
        ...trackingPayload,
        is_sponsored_content: isSponsoredContent
      })
    )

  return (
    <BannerLink href={url} trackingHandler={handleSponsoredContentClicked}>
      <section
        ref={isSponsoredContent ? observe : null}
        className={classNames(
          'w-full overflow-hidden sm:grid sm:grid-cols-10 xs-only:flex no-scroll text-left xs-only:flex-col-reverse',
          {
            [`bg-${backgroundColor}`]: backgroundColor,
            'text-primary-white': backgroundColor === 'ui-black',
            'text-primary-oxford-blue': backgroundColor !== 'ui-black'
          }
        )}
        data-testid="campaignHeroBanner"
      >
        <div
          className={classNames(
            'w-full px-3 py-4 sm:px-6 sm:py-6.5 lg:px-8 lg:py-9 sm:col-start-1 sm:col-end-6 md:col-end-5'
          )}
        >
          {altTitle && (
            <div className="text-ui-campaign-base mb-3 leading-5 text-sm sm:text-base line-clamp-3">
              {altTitle.toLocaleUpperCase()}
            </div>
          )}
          {title && (
            <h2 className={classNames('text-lg text-6xl lg:text-8xl mt-1.5')}>
              {title}
            </h2>
          )}
          {description && (
            <div
              className={classNames(
                'mt-1 leading-5 text-sm sm:text-base line-clamp-3',
                {
                  'text-ui-grey-light': backgroundColor === 'ui-black',
                  'text-primary-oxford-blue': backgroundColor !== 'ui-black'
                }
              )}
            >
              {parseHtml(description)}
            </div>
          )}
          {finishingDate && (
            <Countdown
              finishingDate={finishingDate}
              theme={
                backgroundColor === 'ui-black'
                  ? CountdownThemeEnum.dark
                  : CountdownThemeEnum.light
              }
              className="mt-3"
            />
          )}
          {withCTA && (
            <Button
              data-testid="campaignHeroBannerButton"
              className={classNames('cursor-pointer mt-4', {
                'text-primary-white hover:text-primary-white focus:text-primary-white border-primary-white':
                  backgroundColor === 'ui-black',
                'border-none': backgroundColor !== 'ui-black'
              })}
              variant={backgroundColor === 'ui-black' ? 'tertiary' : 'primary'}
              onClick={handleCampaignBannerClick(url)}
            >
              {t('campaign-hero-banner.button')}
            </Button>
          )}
        </div>
        <div className="sm:relative w-full h-full sm:col-start-6 sm:col-end-11 md:col-start-5 bg-no-repeat bg-cover bg-center">
          {image && (
            <Image
              fill={false}
              className="sm:absolute w-full h-full xs-only:min-h-30 object-cover mx-auto"
              src={image.url || ''}
              alt={image.title}
              width={{ xs: 600, sm: 600, md: 800, lg: 800 }}
              loading={isLcp ? 'eager' : 'lazy'}
              preload={isLcp}
              data-testid="campaignHeroBannerImage"
            />
          )}
        </div>
      </section>
    </BannerLink>
  )
}
