import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactElement,
  useMemo
} from 'react'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlags } from '~components/helpers/FeatureFlags/context'
import { FeatureFlag } from '~config/constants/feature-flags'
import { DEFAULT_IMAGE_WIDTH } from '~config/constants/images'
import { useCompleteImageSrc } from '~domains/breakpoints/hooks/useCompleteImageSrc'
import { useImageDimensions } from '~domains/breakpoints/hooks/useImageDimensions'
import { ImagePreload } from './ImagePreload'
import { ImagePlatforms, ResponsiveDimensions } from './types'
import NextImage from 'next/future/image'
import classNames from 'classnames'

export type ImageProps = {
  src: string
  platform?: ImagePlatforms
  width?: ResponsiveDimensions
  height?: ResponsiveDimensions
  alt?: string
  loading?: 'lazy' | 'eager'
  isFixedOnHeight?: boolean
  useAlternativeFormats?: boolean
  fallbackImageElement?: ReactElement<HTMLImageElement>
  fallbackFeatureFlags?: FeatureFlags
  className?: string
  pictureClassName?: string
  preload?: boolean
  isSwiper?: boolean
  fill?: boolean
}

/**
 * Renders an image component, capable of managing next-gen formats (such as AVIF or WebP) depending on the used platform, and resizes depending on the screen size
 * @param src This sets the source of the image. This prop is mandatory
 * @param platform [Optional] This indicates the platform source of the image (Contentful or Bynder). Contentful is set by default
 * @param width [Optional] This indicates the width of the image. You should pass an object with the desired sizes for each breakpoint
 * @param height [Optional] This indicates the height of the image. You should pass an object with the desired sizes for each breakpoint
 * @param alt [Optional] This sets the alternative text for the image, as in the <img /> HTML tag
 * @param loading [Optional] This indicates if the image should be loaded lazily or not. The allowed values are 'lazy' or 'eager'. Lazy is set by default
 * @param isFixedOnHeight [Optional] This indicates if the image should be fixed on the indicated height instead of on the width. You may also pass a height prop. This is false by default
 * @param useAlternativeFormats [Optional] This indicates if the image should be rendered with next-gen formats such as AVIF or WebP. This is true by default
 * @param fallbackImageElement [Optional] This indicates the fallback image in case the image is not going to be rendered with next-gen formats
 * @param className [Optional] This sets additional class names to the image
 * @param pictureClassName [Optional] This sets additional class names to the <picture /> tag (in case the image is rendered with next-gen formats)
 * @param preload [Optional] This indicates if the image should be preloaded or not. This is false by default
 * @param isSwiper [Only used on with Next/image] This adds specific props and classes to the image container for the zoom feature on the swiper component
 * @param fill [Only used on with Next/image] This indicates if the image size should scale or not to the container size
 */
export const Image: FunctionComponent<
  ComponentPropsWithoutRef<'picture'> & ImageProps
> = ({
  src,
  platform = 'contentful',
  width = DEFAULT_IMAGE_WIDTH,
  height,
  alt,
  loading = 'lazy',
  isFixedOnHeight = false,
  useAlternativeFormats = true,
  fallbackImageElement,
  fallbackFeatureFlags,
  className,
  pictureClassName,
  preload = false,
  isSwiper = false,
  fill = true,
  ...props
}) => {
  const [
    isAlternativeFormatsEnabled,
    isAlternativeFormatsForProductImagesEnabled,
    isAVIFFormatEnabled,
    isDecodingAsyncEnabled,
    isFetchPriorityEnabled,
    isNextImageComponentEnabled
  ] = useFeatureFlags(
    [
      FeatureFlag.IMAGE_ALLOW_ALTERNATIVE_FORMATS,
      FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS,
      FeatureFlag.IMAGE_ALLOW_AVIF_FORMAT,
      FeatureFlag.IMAGE_ALLOW_DECODING_ASYNC,
      FeatureFlag.FETCH_PRIORITY,
      FeatureFlag.IMAGE_USE_NEXT_IMAGE_COMPONENT
    ],
    fallbackFeatureFlags
  )

  const { imageWidth, imageHeight } = useImageDimensions(width, height)

  const { sizes, srcSet } = useCompleteImageSrc(
    src,
    platform,
    width,
    height,
    isFixedOnHeight
  )

  const preloadSrcSet = useMemo(
    () =>
      isAlternativeFormatsEnabled
        ? isAVIFFormatEnabled
          ? srcSet.avif
          : srcSet.webp
        : srcSet.jpg,

    [
      isAlternativeFormatsEnabled,
      isAVIFFormatEnabled,
      srcSet.avif,
      srcSet.webp,
      srcSet.jpg
    ]
  )

  const isFromContentful = useMemo(
    () => platform === 'contentful' && isAlternativeFormatsEnabled,
    [isAlternativeFormatsEnabled, platform]
  )
  const isFromBynder = useMemo(
    () => platform === 'bynder' && isAlternativeFormatsForProductImagesEnabled,
    [isAlternativeFormatsForProductImagesEnabled, platform]
  )
  const shouldRenderAlternativeFormats = useMemo(
    () => useAlternativeFormats && (isFromContentful || isFromBynder),
    [isFromBynder, isFromContentful, useAlternativeFormats]
  )

  const decoding = useMemo(() => {
    if (loading === 'lazy' && isDecodingAsyncEnabled) return 'async'
    return 'auto'
  }, [isDecodingAsyncEnabled, loading])

  const fetchPriority = useMemo(() => {
    if (!isFetchPriorityEnabled) return 'auto'
    if (preload) return 'high'
    if (loading === 'lazy') return 'low'
    return 'auto'
  }, [isFetchPriorityEnabled, loading, preload])

  let img = !shouldRenderAlternativeFormats ? (
    fallbackImageElement || (
      <img
        className={className}
        loading={loading}
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        {...props}
      />
    )
  ) : (
    <picture className={pictureClassName}>
      {isAVIFFormatEnabled && <source srcSet={srcSet.avif} type="image/avif" />}
      <source srcSet={srcSet.webp} type="image/webp" />
      <img
        className={className}
        loading={loading}
        srcSet={srcSet.jpg}
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        decoding={decoding}
        sizes={sizes}
        //@ts-ignore
        fetchpriority={fetchPriority}
        {...props}
      />
    </picture>
  )
  if (isSwiper)
    img = (
      <div className="swiper-zoom-container" data-swiper-zoom="1.5">
        {img}
      </div>
    )

  if (!shouldRenderAlternativeFormats) return img

  if (isNextImageComponentEnabled) {
    return (
      <div
        data-testid="nextImg"
        className={classNames('w-full h-full relative', {
          'swiper-zoom-container': isSwiper,
          'flex items-center justify-center': !isSwiper
        })}
        {...(isSwiper && { 'data-swiper-zoom': '2.25' })}
      >
        <NextImage
          style={{
            objectFit: 'contain',
            ...(!fill && { position: 'relative' })
          }}
          className={className}
          {...(fill ? { fill } : { width: imageWidth, height: imageHeight })}
          src={src}
          alt={alt}
          loading={loading}
          priority={preload}
          decoding={decoding}
          sizes={sizes}
          quality={100}
        />
      </div>
    )
  }

  return (
    <>
      {preload && (
        <ImagePreload src={src} srcSet={preloadSrcSet} sizes={sizes} />
      )}
      {img}
    </>
  )
}
