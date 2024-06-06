import { ContentBlock } from '~domains/page'
import { SponsoredContent } from '~domains/analytics/types'
import { hasOwnProperty } from '~helpers'
import { ContainerOfContentBlocks, Slider } from '~domains/contentful'
import { CmsContentTypes } from '~config/content-types'

/**
 * Checks whether a content block is SponsoredContentBlock
 * @param contentBlock - contentful content block
 */
export const checkIfSponsoredContent = (
  contentBlock: ContentBlock
): contentBlock is SponsoredContent =>
  hasOwnProperty(contentBlock as SponsoredContent, 'isSponsoredContent')

/**
 * Checks whether a content block is ContainerOfContentBlocks
 * @param contentBlock - contentful content block
 */
export const checkIfContainerOfContentBlocks = (
  contentBlock: ContentBlock
): contentBlock is ContainerOfContentBlocks =>
  hasOwnProperty(contentBlock as ContainerOfContentBlocks, 'blocks')

export const checkIfSlider = (
  contentBlock: ContentBlock
): contentBlock is Slider =>
  hasOwnProperty(contentBlock, 'contentType') &&
  contentBlock.contentType === CmsContentTypes.SLIDER
