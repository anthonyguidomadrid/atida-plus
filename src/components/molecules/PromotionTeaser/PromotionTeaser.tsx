import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useInView from 'react-cool-inview'

import { ReactComponent as ChevronRight } from '../../../assets/svg/navigation-16px/ChevronRight.svg'
import { Asset, Color } from '~domains/contentful'
import { Subcategory } from '~domains/contentful/normalizers/products-menu-submenu'
import {
  triggerReportPromotionClicked,
  triggerReportPromotionViewed
} from '~domains/analytics'
import { ProductLabelWrapper } from '~domains/product'
import { ProductLabels } from '../ProductLabels/ProductLabels'
import { Button } from '~components/atoms/Button'
import { ConditionalLink } from '~components/atoms/ConditionalLink'
import { Image } from '~components/atoms/Image'
import { CmsContainerContentTypes } from '~config/content-types'
import { PROMOTION_VIEWED_THRESHOLD } from '~config/constants/sponsoredContent'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type Category = {
  level: number
  id: string
  subcategories?: Subcategory
  color: Color
  image: Asset
}

export type PromotionTeaserType = {
  id?: string
  name?: string
  shortDescription?: string
  categoryColor?: string
  teaserImage?: Asset
  teaserType?: boolean
  url?: string
  className?: string
  labels?: ProductLabelWrapper[]
  isSponsoredContent?: boolean
  sponsoredContentPosition?: number
  isLcp?: boolean
}

export type PromotionTeaserProps = PromotionTeaserType & {
  index?: number
}

export const PromotionTeaser: FunctionComponent<PromotionTeaserProps> = ({
  name,
  shortDescription,
  teaserImage,
  teaserType = true,
  url,
  id,
  index,
  labels,
  categoryColor,
  className,
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
          name,
          creative: CmsContainerContentTypes.PROMOTION,
          index: sponsoredContentPosition,
          promotion_id: id
        })
      )
    }
  })

  const handleReportPromotionClicked = (url?: string) => () => {
    url && router.push(url)

    dispatch(
      triggerReportPromotionClicked({
        name,
        index: isSponsoredContent ? sponsoredContentPosition : index,
        promotion_id: id,
        creative: isSponsoredContent
          ? CmsContainerContentTypes.PROMOTION
          : teaserImage?.url,
        is_sponsored_content: isSponsoredContent
      })
    )
  }

  //TODO: Remove once proven to all environments
  const isShowLabelsOverImageOnPromotionTeaserEnabled = useFeatureFlag(
    FeatureFlag.SHOW_LABELS_OVER_IMAGE_ON_PROMOTION_TEASER
  )

  return (
    <div
      ref={isSponsoredContent ? observe : null}
      key={id}
      className={classNames(
        `flex flex-row w-full sm:max-w-2.4/5 md:max-w-2.35/5 lg:max-w-2.4/5 h-32 justify-between`,
        {
          [`bg-${categoryColor}`]: categoryColor
        },
        className
      )}
      data-testid="promotionTeaser"
    >
      {teaserType ? (
        <ConditionalLink
          url={url}
          testId="teaserTypeTrueLink"
          className="w-full no-underline"
          trackingHandler={handleReportPromotionClicked(url)}
        >
          <div
            data-testid="teaserTypeTrueDivMain"
            className="flex w-full h-full relative"
          >
            <ProductLabels
              labels={labels}
              className={classNames('flex absolute top-2 left-2', {
                'z-10': isShowLabelsOverImageOnPromotionTeaserEnabled
              })}
              listItemClassName="mr-1"
            />
            <div
              className={classNames(
                'flex flex-col justify-between w-8/12 p-2 h-full'
              )}
            >
              <div className="mt-6 space-y-1">
                <h2
                  data-testid="teaserTypeTrueH2"
                  className={classNames(
                    'text-xl leading-6 sm:leading-7 max-w-32 max-h-14 line-clamp-2'
                  )}
                >
                  {name}
                </h2>
                <p className="line-clamp-2" data-testid="teaserTypeTrueP">
                  {shortDescription || ''}
                </p>
              </div>
              <Button
                data-testid="teaserTypeTrueButton"
                className="cursor-pointer"
                icon={<ChevronRight className={classNames('icon-16')} />}
              />
            </div>
            <div className={classNames('relative flex flex-col w-4/12 h-full')}>
              <Image
                className="absolute w-full h-full object-cover"
                src={teaserImage?.url || ''}
                alt={teaserImage?.title}
                width={{ xs: 200, sm: 200, md: 200, lg: 200 }}
                height={{ xs: 300, sm: 300, md: 300, lg: 300 }}
                isFixedOnHeight
                data-testid="promotionTeaserImage"
                preload={isLcp}
                loading={isLcp ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        </ConditionalLink>
      ) : (
        <ConditionalLink
          url={url}
          testId="promotionImageLink"
          className="cursor-pointer w-full h-full"
          trackingHandler={handleReportPromotionClicked()}
        >
          <div data-testid="teaserTypeFalseDiv" className="w-full h-full">
            <Image
              className="w-full h-full object-cover"
              src={teaserImage?.url || ''}
              alt={teaserImage?.title}
              width={{ xs: 600, sm: 600, md: 800, lg: 800 }}
              height={{ xs: 300, sm: 300, md: 300, lg: 300 }}
              data-testid="teaserTypeFalseImg"
              preload={isLcp}
              loading={isLcp ? 'eager' : 'lazy'}
            />
          </div>
        </ConditionalLink>
      )}
    </div>
  )
}
