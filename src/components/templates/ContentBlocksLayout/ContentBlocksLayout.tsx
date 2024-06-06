import dynamic from 'next/dynamic'
import { FunctionComponent, useMemo } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { prependURLWithSlash } from '~helpers'
import {
  BLOCKS_WITHOUT_IMAGES,
  ContentBlock,
  selectPageSlug
} from '~domains/page'
import { CmsContentTypes } from '~config/content-types'
import {
  MockBlockComponent,
  MockContentBlock
} from '~components/templates/ContentBlocksLayout/MockBlockComponent'
import { CategoryDetails } from '~components/templates/CategoryOverviewLayout'
import { ExponeaRecommendationBlockProps } from '~components/organisms/ExponeaRecommendationBlock'
import { VoucherCodes } from '~components/molecules/VoucherCodes'
import { StaticContentBlockProps } from '~components/atoms/StaticContentBlock'
import { StaticHeaderBlockProps } from '~components/atoms/StaticHeaderBlock'
import { PromotionTeaserProps } from '~components/molecules/PromotionTeaser'
import { HeroBannerSliderProps } from '~components/organisms/HeroBannerSlider'
import { HeroBannerProps } from '~components/organisms/HeroBanner'
import { CampaignHeroBannerProps } from '~components/molecules/CampaignHeroBanner'
import { CategoryGridProps } from '~components/molecules/CategoryGrid'
import { ContentWithImageProps } from '~components/molecules/ContentWithImage'
import { ContainerOfContentBlocksProps } from '~components/molecules/ContainerOfContentBlocks'
import { USPCardProps } from '~components/molecules/USPCard'
import { TopBrandsProps } from '~components/molecules/TopBrands'
import { LinkBlockProps } from '~components/atoms/LinkBlock'
import { StaticRecommendationBlockProps } from '~components/organisms/StaticRecommendationBlock'
import type { BreakOutOfContainerProps } from '~components/atoms/BreakOutOfContainer'

const StaticContentBlock = dynamic<StaticContentBlockProps>(() =>
  import('~components/atoms/StaticContentBlock').then(c => c.StaticContentBlock)
)
const StaticHeaderBlock = dynamic<StaticHeaderBlockProps>(() =>
  import('~components/atoms/StaticHeaderBlock').then(c => c.StaticHeaderBlock)
)

const PromotionTeaser = dynamic<PromotionTeaserProps>(() =>
  import('~components/molecules/PromotionTeaser').then(c => c.PromotionTeaser)
)

const HeroBannerSlider = dynamic<HeroBannerSliderProps>(() =>
  import('~components/organisms/HeroBannerSlider').then(c => c.HeroBannerSlider)
)
const HeroBanner = dynamic<HeroBannerProps>(() =>
  import('~components/organisms/HeroBanner').then(c => c.HeroBanner)
)
const CampaignHeroBanner = dynamic<CampaignHeroBannerProps>(() =>
  import('~components/molecules/CampaignHeroBanner').then(
    c => c.CampaignHeroBanner
  )
)
const CategorySlider = dynamic<CategoryGridProps>(() =>
  import('~components/molecules/CategorySlider').then(c => c.CategorySlider)
)
const CategoryGrid = dynamic<CategoryGridProps>(() =>
  import('~components/molecules/CategoryGrid').then(c => c.CategoryGrid)
)
const ContentWithImage = dynamic<ContentWithImageProps>(() =>
  import('~components/molecules/ContentWithImage').then(c => c.ContentWithImage)
)
const ContainerOfContentBlocks = dynamic<ContainerOfContentBlocksProps>(() =>
  import('~components/molecules/ContainerOfContentBlocks').then(
    c => c.ContainerOfContentBlocks
  )
)
const USPCard = dynamic<USPCardProps>(() =>
  import('~components/molecules/USPCard').then(c => c.USPCard)
)
const TopBrands = dynamic<TopBrandsProps>(() =>
  import('~components/molecules/TopBrands').then(c => c.TopBrands)
)

const StaticRecommendationBlock = dynamic<StaticRecommendationBlockProps>(() =>
  import('~components/organisms/StaticRecommendationBlock').then(
    c => c.StaticRecommendationBlock
  )
)

const LinkBlock = dynamic<LinkBlockProps>(() =>
  import('~components/atoms/LinkBlock').then(c => c.LinkBlock)
)

const BreakOutOfContainer = dynamic<BreakOutOfContainerProps>(() =>
  import('~components/atoms/BreakOutOfContainer').then(
    c => c.BreakOutOfContainer
  )
)

const ExponeaRecommendationBlock = dynamic(async () => {
  const component = await require('~components/organisms/ExponeaRecommendationBlock')
  return component.ExponeaRecommendationBlock as FunctionComponent<ExponeaRecommendationBlockProps>
})

export type ContentBlocksLayoutProps = {
  contentBlocks: ContentBlock[]
  mockBlocks?: MockContentBlock[]
  isContainer?: boolean
  isHomePage?: boolean
  category?: Pick<CategoryDetails, 'id' | 'url' | 'title'>
  isLcp?: boolean
}

/**
 * Template component that provides container rules and spacing between content blocks.
 * @param contentBlocks - different content types coming from Contentful
 * @param mockBlocks - mock data based on which we render this component as a storybook story (documentation purposes)
 * @param isContainer - controls the usage of the container rules. True by default; false means that the parent component
 * @param category - url and id sent to ExponeaRecommendationBlock, so we can redirect to the POP of the category
 * @param isLcp - whether the content is candidate to be the Largest Contentful Paint
 */
export const ContentBlocksLayout: FunctionComponent<ContentBlocksLayoutProps> = ({
  contentBlocks = [],
  mockBlocks,
  isContainer = true,
  category,
  isLcp = false
}) => {
  const path = useSelector(selectPageSlug)

  //The Largest Contentful Paint will be the first block that contains images
  const lcpIndex = useMemo(() => {
    if (!isLcp && !contentBlocks.length) return -1
    return (
      contentBlocks
        .filter(b => b.contentType !== undefined)
        //@ts-ignore
        .findIndex(block => !BLOCKS_WITHOUT_IMAGES.includes(block.contentType))
    )
  }, [isLcp, contentBlocks])

  return (
    <div
      data-testid="contentBlocksLayout"
      className={classNames(
        'w-full flex flex-col',
        'gap-5 sm:gap-6 md:gap-7 lg:gap-9',
        {
          'container container-fixed mx-auto': isContainer
        }
      )}
    >
      {mockBlocks && mockBlocks.length > 0
        ? // This content type does not exist in Contentful. As it's name suggests it's a mock type, used for providing
          // documentation to the ContentBlocksLayout component in form of a storybook story
          mockBlocks.map(mockBlock => <MockBlockComponent {...mockBlock} />)
        : contentBlocks.map((contentBlock, index) => {
            switch (contentBlock.contentType) {
              case CmsContentTypes.SLIDER:
                return (
                  <HeroBannerSlider
                    data-testid="heroBannerSlider"
                    isLcp={lcpIndex === index}
                    key={`${index}-${CmsContentTypes.SLIDER}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.HERO_BANNER:
                return (
                  <HeroBanner
                    data-testid="heroBanner"
                    isLcp={lcpIndex === index}
                    key={`${index}-${CmsContentTypes.HERO_BANNER}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.CAMPAIGN_HERO_BANNER:
                return (
                  <CampaignHeroBanner
                    data-testid="campaignHeroBanner"
                    isLcp={lcpIndex === index}
                    key={`${index}-${CmsContentTypes.CAMPAIGN_HERO_BANNER}-${contentBlock.title}`}
                    withCTA={prependURLWithSlash(path) !== contentBlock.url}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.CATEGORY_GRID:
                if (contentBlock.viewType === 'Slider')
                  return (
                    <CategorySlider
                      isLcp={lcpIndex === index}
                      data-testid="categoryTiles"
                      key={`${index}-${CmsContentTypes.CATEGORY_GRID}-${contentBlock.title}`}
                      {...contentBlock}
                    />
                  )
                return (
                  <CategoryGrid
                    isLcp={lcpIndex === index}
                    data-testid="categoryTiles"
                    key={`${index}-${CmsContentTypes.CATEGORY_GRID}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE:
                return (
                  <ContentWithImage
                    isLcp={lcpIndex === index}
                    data-testid="contentWithImage"
                    key={`${index}-${CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.USPS_CARD:
                return (
                  <BreakOutOfContainer
                    data-testid="breakOutOfContainer-USP"
                    key={`${index}-${CmsContentTypes.USPS_CARD}-${contentBlock.title}`}
                  >
                    <USPCard {...contentBlock} />
                  </BreakOutOfContainer>
                )
              case CmsContentTypes.VOUCHER_CODES:
                return (
                  <VoucherCodes
                    data-testid="voucherCodes"
                    key={`${index}-${CmsContentTypes.VOUCHER_CODES}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.PROMOTION:
                return (
                  <PromotionTeaser
                    data-testid="promotionTeaser"
                    key={`${index}-${CmsContentTypes.PROMOTION}-${contentBlock.title}`}
                    name={contentBlock?.title}
                    labels={contentBlock?.labels ?? []}
                    id={contentBlock?.id}
                    categoryColor={contentBlock?.color}
                    teaserImage={contentBlock?.teaserImage}
                    teaserType={contentBlock.isContentWithImage}
                    shortDescription={contentBlock?.teaserDescription}
                    url={contentBlock?.url}
                    isLcp={lcpIndex === index}
                  />
                )
              case CmsContentTypes.STATIC_CONTENT_BLOCK:
                return (
                  <StaticContentBlock
                    data-testid="staticContentBlock"
                    key={`${index}-${CmsContentTypes.STATIC_CONTENT_BLOCK}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.STATIC_HEADER_BLOCK:
                return (
                  <StaticHeaderBlock
                    data-testid="staticHeaderBlock"
                    key={`${index}-${CmsContentTypes.STATIC_HEADER_BLOCK}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.STATIC_RECOMMENDATION_BLOCK:
                return (
                  <StaticRecommendationBlock
                    data-testid="staticRecommendationBlock"
                    key={`${index}-${CmsContentTypes.STATIC_RECOMMENDATION_BLOCK}-${contentBlock.title}`}
                    id={contentBlock.listOfSkus.join('')}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.EXPONEA_RECOMMENDATION:
                return (
                  <ExponeaRecommendationBlock
                    data-testid="exponeaRecommendationBlock"
                    key={`${index}-${CmsContentTypes.EXPONEA_RECOMMENDATION}-${contentBlock.title}`}
                    {...contentBlock}
                    category={category}
                  />
                )
              case CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS:
                return (
                  <ContainerOfContentBlocks
                    isLcp={lcpIndex === index}
                    data-testid="containerOfContentBlocks"
                    key={`${index}-${CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.TOP_BRANDS:
                return (
                  <TopBrands
                    data-testid="topBrands"
                    key={`${index}-${CmsContentTypes.TOP_BRANDS}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              case CmsContentTypes.LINK_BLOCK:
                return (
                  <LinkBlock
                    data-testid="LinkBlock"
                    key={`${index}-${CmsContentTypes.LINK_BLOCK}-${contentBlock.title}`}
                    {...contentBlock}
                  />
                )
              default:
                return null
            }
          })}
    </div>
  )
}
