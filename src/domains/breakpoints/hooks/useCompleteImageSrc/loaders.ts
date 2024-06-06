import {
  AllowedImageFormats,
  Compression,
  ImagePlatforms
} from '~components/atoms/Image/types'

export const contentfulLoader = (
  src: string,
  format: AllowedImageFormats,
  compressionRate: Compression,
  width?: number,
  height?: number,
  isFixedOnHeight?: boolean
): string => {
  return `${src}?${
    typeof width !== 'undefined' && typeof height !== 'undefined'
      ? isFixedOnHeight
        ? `h=${height}`
        : `w=${width}`
      : ''
  }&fm=${format}${compressionRate > 0 ? `&q=${compressionRate}` : ''}`
}

export const bynderLoader = (
  src: string,
  format: AllowedImageFormats,
  compressionRate: Compression,
  width?: number,
  height?: number
): string =>
  `${src}?format=${format}${
    compressionRate > 0 && format !== 'jpg' ? `&quality=${compressionRate}` : ''
  }&io=transform:extend,width:${width}${height ? `,height:${height}` : ''}`

export const loader = (
  platform: ImagePlatforms = 'contentful',
  format: AllowedImageFormats = 'jpg',
  src: string,
  compressionRate: Compression = 100,
  width?: number,
  height?: number,
  isFixedOnHeight?: boolean
) =>
  platform === 'contentful'
    ? contentfulLoader(
        src,
        format,
        compressionRate,
        width,
        height,
        isFixedOnHeight
      )
    : bynderLoader(src, format, compressionRate, width, height)
