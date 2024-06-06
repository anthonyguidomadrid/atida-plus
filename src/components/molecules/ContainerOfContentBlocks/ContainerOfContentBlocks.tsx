import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'

import {
  CmsContainerContentTypes,
  CmsContentTypes
} from '~config/content-types'
import type { ContainerContentBlock } from '~domains/page'
import { promotionHasInvalidDates } from '~helpers/promotionValidDate'
import { Promotion } from '~domains/contentful'

import { PromotionTeaserProps } from '../PromotionTeaser'
import { MarketingTeaserProps } from '../MarketingTeaser'

const PromotionTeaser = dynamic<PromotionTeaserProps>(() =>
  import('../PromotionTeaser').then(c => c.PromotionTeaser)
)
const MarketingTeaser = dynamic<MarketingTeaserProps>(() =>
  import('../MarketingTeaser').then(c => c.MarketingTeaser)
)

export type ContainerOfContentBlocksProps = {
  contentType?: CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS
  title?: string
  displayTitle: boolean
  blocks?: (ContainerContentBlock | null)[]
  className?: string
  isLcp?: boolean
}

export const ContainerOfContentBlocks: FunctionComponent<
  ComponentPropsWithoutRef<'div'> &
    ContainerOfContentBlocksProps & { isHomePage?: boolean }
> = ({ title, displayTitle = false, blocks, className, isLcp = false }) => (
  <section
    className={classNames('w-full', className)}
    data-testid="containerOfContentBlocksContainer"
  >
    {displayTitle ? (
      <h2
        className={classNames(
          'text-lg mb-2 font-body',
          'sm:mb-3',
          'lg:mb-4 lg:text-2xl'
        )}
      >
        {title}
      </h2>
    ) : null}
    <div
      className={classNames('flex flex-wrap gap-2 justify-between')}
      data-testid="containerOfContentBlocks"
    >
      {blocks?.map((contentBlock, index) => {
        switch (contentBlock?.contentType) {
          case CmsContentTypes.PROMOTION:
            return (
              !promotionHasInvalidDates(contentBlock as Promotion) && (
                <PromotionTeaser
                  key={`promotion-teaser-${contentBlock?.id}`}
                  id={contentBlock?.id}
                  name={contentBlock?.title}
                  labels={contentBlock?.labels ?? []}
                  categoryColor={contentBlock?.color}
                  teaserImage={contentBlock?.teaserImage}
                  teaserType={contentBlock.isContentWithImage}
                  shortDescription={contentBlock?.teaserDescription}
                  url={contentBlock?.url}
                  isSponsoredContent={contentBlock?.isSponsoredContent}
                  sponsoredContentPosition={
                    contentBlock?.sponsoredContentPosition
                  }
                  data-testid="PromotionTeaser"
                  isLcp={isLcp && index === 0}
                />
              )
            )
          case CmsContainerContentTypes.MARKETING_TEASER:
            return (
              <MarketingTeaser
                data-testid="marketingTeaser"
                isLcp={isLcp && index === 0}
                key={`marketing-teaser-${Math.random()
                  .toString()
                  .substring(2)}`}
                {...contentBlock}
              />
            )
        }
      })}
    </div>
  </section>
)
