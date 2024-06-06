import { useCallback } from 'react'
import {
  AllowedImageFormats,
  Compression,
  ImagePlatforms,
  ResponsiveDimensions
} from '~components/atoms/Image/types'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getImageSizes, getSourceSet } from './helpers'

export type ImageSources = {
  sizes: string
  srcSet: {
    jpg: string
    webp: string
    avif: string
  }
}

export const useCompleteImageSrc = (
  src: string,
  platform: ImagePlatforms,
  width: ResponsiveDimensions,
  height?: ResponsiveDimensions,
  isFixedOnHeight = false
): ImageSources => {
  const [
    AVIFCompressionRate,
    WEBPCompressionRate,
    JPEGCompressionRate,
    AVIFCompressionRateForProductImages,
    WEBPCompressionRateForProductImages
  ] = useFeatureFlags([
    FeatureFlag.IMAGE_ALLOW_AVIF_COMPRESSION,
    FeatureFlag.IMAGE_ALLOW_WEBP_COMPRESSION,
    FeatureFlag.IMAGE_ALLOW_JPEG_COMPRESSION,
    FeatureFlag.PRODUCT_IMAGE_AVIF_COMPRESSION,
    FeatureFlag.PRODUCT_IMAGE_WEBP_COMPRESSION
  ]) as Compression[]

  const getCompressionRate = useCallback(
    (format: AllowedImageFormats) =>
      format === 'avif'
        ? platform === 'contentful'
          ? AVIFCompressionRate
          : platform === 'bynder'
          ? AVIFCompressionRateForProductImages
          : 0
        : format === 'webp'
        ? platform === 'contentful'
          ? WEBPCompressionRate
          : platform === 'bynder'
          ? WEBPCompressionRateForProductImages
          : 0
        : format === 'jpg' && platform === 'contentful'
        ? JPEGCompressionRate
        : 0,
    [
      AVIFCompressionRate,
      AVIFCompressionRateForProductImages,
      JPEGCompressionRate,
      WEBPCompressionRate,
      WEBPCompressionRateForProductImages,
      platform
    ]
  )

  return {
    sizes: getImageSizes(platform, width),
    srcSet: {
      jpg: getSourceSet(
        src,
        'jpg',
        platform,
        getCompressionRate('jpg'),
        width,
        height,
        isFixedOnHeight
      ),
      webp: getSourceSet(
        src,
        'webp',
        platform,
        getCompressionRate('webp'),
        width,
        height,
        isFixedOnHeight
      ),
      avif: getSourceSet(
        src,
        'avif',
        platform,
        getCompressionRate('avif'),
        width,
        height,
        isFixedOnHeight
      )
    }
  }
}
