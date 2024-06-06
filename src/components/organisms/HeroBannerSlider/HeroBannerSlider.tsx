import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { CmsContentTypes } from '~config/content-types'
import { HeroBanner as HeroBannerType } from '~domains/contentful'
import { Slider } from '~components/molecules/Slider'
import { HeroBanner } from '../HeroBanner'

export type HeroBannerSliderProps = ComponentPropsWithoutRef<'div'> & {
  contentBlocks: HeroBannerType[]
  isLcp?: boolean
}

export const HeroBannerSlider: FunctionComponent<HeroBannerSliderProps> = ({
  contentBlocks,
  className,
  isLcp = false,
  ...props
}) => {
  return contentBlocks.length === 1 ? (
    <HeroBanner
      isLcp={isLcp}
      {...contentBlocks[0]}
      contentType={CmsContentTypes.HERO_BANNER}
    />
  ) : contentBlocks.length > 1 ? (
    <Slider slidesPerView={1} isHeroBanner {...props}>
      {contentBlocks.map((contentBlock: HeroBannerType, index: number) => (
        <HeroBanner
          {...contentBlock}
          isLcp={isLcp && index === 0}
          key={`${CmsContentTypes.HERO_BANNER}-${contentBlock.title}`}
          contentType={CmsContentTypes.HERO_BANNER}
          isFullHeight
        />
      ))}
    </Slider>
  ) : null
}
