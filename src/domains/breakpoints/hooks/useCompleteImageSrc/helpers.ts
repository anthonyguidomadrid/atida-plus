import {
  AllowedImageFormats,
  Breakpoints,
  Compression,
  ImagePlatforms,
  ResponsiveDimensions
} from '~components/atoms/Image/types'
import { pixelBreakpoints as breakpoints } from '~domains/breakpoints/config'
import { loader } from './loaders'

const pixelRatios = {
  bynder: [1, 1.5],
  contentful: [1]
}

export const getImageSizes = (
  platform: ImagePlatforms,
  width?: ResponsiveDimensions
): string => {
  if (!width) return ''
  const ratios = pixelRatios[platform]
  const allWidths = Object.keys(width)
  const defaultWidth = `${width[allWidths[0] as Breakpoints]}px`
  if (allWidths.length === 1 && ratios.length === 1) return defaultWidth

  const sizes = ratios
    .map(pixelRatio =>
      allWidths
        .map(key => {
          const currentWidth = width[key as Breakpoints]
          const breakpoint = breakpoints[key as Breakpoints]

          if (!breakpoint || !currentWidth) return ''

          return `(max-width: ${breakpoint * pixelRatio}px) ${
            currentWidth * pixelRatio
          }px`
        })
        .filter(val => val !== '')
        .join(', ')
    )
    .join(', ')

  return `${sizes}, ${defaultWidth}`
}

export const getSourceSet = (
  src: string,
  format: AllowedImageFormats,
  platform: ImagePlatforms,
  compressionRate: Compression,
  width: ResponsiveDimensions,
  height?: ResponsiveDimensions,
  isFixedOnHeight?: boolean
): string =>
  pixelRatios[platform]
    .map(pixelRatio => {
      const allWidths = Object.keys(width)
      return allWidths.map(key => {
        const imageWidth = width[key as Breakpoints] as number
        const imageHeight = height ? height[key as Breakpoints] : undefined
        return `${loader(
          platform,
          format,
          src,
          compressionRate,
          imageWidth * pixelRatio,
          imageHeight ? imageHeight * pixelRatio : 0,
          isFixedOnHeight
        )}${
          allWidths.length + pixelRatios[platform].length > 2
            ? ` ${imageWidth * pixelRatio}w`
            : ''
        }`
      })
    })
    .join(', ')
