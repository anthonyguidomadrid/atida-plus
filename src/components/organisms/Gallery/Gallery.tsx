import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import YouTube from 'react-youtube'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { ReactComponent as ChevronRight } from '~assets/svg/navigation-16px/ChevronRight.svg'
import { ReactComponent as Play } from '~assets/svg/navigation-24px/Play.svg'

import 'swiper/components/zoom/zoom.min.css'
import 'swiper/components/a11y/a11y.min.css'

import SwiperCore, {
  A11y,
  EffectFade,
  Keyboard,
  Lazy,
  Navigation,
  Thumbs,
  Zoom
} from 'swiper'
import { Button } from '~components/atoms/Button'
import { useDispatch } from 'react-redux'
import { setShowLabels } from '~domains/product'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { Image } from '~components/atoms/Image'
import { ImagePreload } from '~components/atoms/Image/ImagePreload'

SwiperCore.use([A11y, EffectFade, Keyboard, Lazy, Navigation, Thumbs, Zoom])

export type GalleryImage = {
  productDatImage?: string
  productHigh: string
  productTileThumbnail: string
}

export type GalleryVideo = {
  label: string
  type: string
  video_id: string
}
export type GalleryProps = {
  images?: GalleryImage[]
  videos?: GalleryVideo[]
  productName?: string
  isLoading?: boolean
  isLcp?: boolean
}

export const Gallery: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & GalleryProps
> = ({
  images,
  videos,
  productName,
  className,
  isLoading,
  isLcp,
  ...props
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const mainSwiper = useRef<Swiper | null>(null)
  const thumbsSwiperRef = useRef<Swiper | null>(null)
  let youtubeInstance: { pauseVideo: () => void }

  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [zoomedImage, setZoomedImage] = useState<boolean>(false)
  const [dragCursor, setDragCursor] = useState<boolean>(false)
  const [moveCursor, setMoveCursor] = useState<boolean>(false)
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

  const imagesLength = useMemo(() => images?.length ?? 0, [images])
  const videosLength = useMemo(() => videos?.length ?? 0, [videos])
  const hasSingleMedia = useMemo(() => imagesLength + videosLength < 2, [
    imagesLength,
    videosLength
  ])

  const handleVideo = (videoInstance: { pauseVideo: () => void }) => {
    youtubeInstance = videoInstance
  }

  const hideArrowsMd = useMemo(() => imagesLength + videosLength <= 6, [
    imagesLength,
    videosLength
  ])
  const hideArrowsLg = useMemo(() => imagesLength + videosLength <= 10, [
    imagesLength,
    videosLength
  ])

  const getProductImageClassName = useCallback(
    (index: number) =>
      classNames(
        'w-auto h-full max-h-32 object-contain border border-primary-white',
        {
          'swiper-lazy': index,
          'border-ui-grey-lightest': !isImageLoaded,
          'cursor-zoom-out': zoomedImage && !moveCursor,
          'cursor-zoom-in': !zoomedImage && !dragCursor,
          'cursor-pointer': dragCursor,
          'cursor-move': moveCursor
        }
      ),
    [dragCursor, isImageLoaded, moveCursor, zoomedImage]
  )

  const imageDimensions = useMemo(
    () => ({
      xs: zoomedImage ? 520 : 260
    }),
    [zoomedImage]
  )

  const isAlternativeImageFormatsEnabled = useFeatureFlag(
    FeatureFlag.PRODUCT_IMAGE_ALLOW_ALTERNATIVE_FORMATS
  )

  const isImageLcp = useCallback((index: number) => isLcp && index === 0, [
    isLcp
  ])

  return (
    <div
      className={classNames(
        'relative bg-cover bg-no-repeat bg-center flex flex-col justify-center',
        className
      )}
      data-testid="gallery"
      {...props}
    >
      <Swiper
        ref={mainSwiper}
        a11y={{
          enabled: true,
          notificationClass: 'swiper-notification',
          prevSlideMessage: t('gallery.a11y.prevSlideMessage'),
          nextSlideMessage: t('gallery.a11y.nextSlideMessage'),
          firstSlideMessage: t('gallery.a11y.firstSlideMessage'),
          lastSlideMessage: t('gallery.a11y.lastSlideMessage'),
          paginationBulletMessage: t('gallery.a11y.paginationBulletMessage'),
          slideLabelMessage: '{{index}} / {{slidesLength}}',
          slideRole: t('gallery.a11y.sliderRole'),
          containerMessage: t('gallery.a11y.containerMessage')
        }}
        allowTouchMove={true}
        centeredSlides={true}
        onSlideChange={swiper => {
          setActiveSlide(swiper.activeIndex)
          youtubeInstance?.pauseVideo()
          setZoomedImage(false)
          setDragCursor(false)
          setMoveCursor(false)
        }}
        onTouchMove={() => {
          setDragCursor(true)
        }}
        onTouchStart={() => {
          zoomedImage && setMoveCursor(!moveCursor)
        }}
        onTouchEnd={() => {
          zoomedImage && setMoveCursor(false)
        }}
        onSlideResetTransitionEnd={() => {
          setDragCursor(false)
        }}
        className="h-32 sm:h-full w-full max-h-36 sm:max-h-30.75 md:max-h-50"
        fadeEffect={{ crossFade: true }}
        keyboard={{
          enabled: true,
          pageUpDown: true
        }}
        passiveListeners={false}
        lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
        // @ts-ignore - missing swiper type
        modules={[A11y]}
        navigation={{
          nextEl: '.swiper-next-button',
          prevEl: '.swiper-prev-button'
        }}
        preloadImages={false}
        shortSwipes={true}
        tabIndex={0}
        thumbs={{ swiper: thumbsSwiper }}
        zoom={true}
        onClick={swiper => {
          swiper.zoom.toggle()
          setZoomedImage(!zoomedImage)
          setDragCursor(dragCursor)
        }}
        onAfterInit={() => {
          images && images.length === 1 && setIsImageLoaded(true)
        }}
        onLazyImageReady={() => {
          setIsImageLoaded(true)
        }}
      >
        {images &&
          images.map((image, index) => {
            const src =
              isAlternativeImageFormatsEnabled && image.productDatImage
                ? image.productDatImage
                : image.productHigh
            return (
              <SwiperSlide
                className="overflow-hidden w-full"
                key={src}
                data-testid="product-image-slide"
              >
                <Image
                  src={src || ''}
                  isSwiper
                  fill={false}
                  platform="bynder"
                  data-src={
                    index
                      ? `${image.productDatImage}?format=png&io=transform:extend,width:412,height:412`
                      : ''
                  }
                  alt={productName}
                  pictureClassName="w-full h-full flex justify-center items-center"
                  className={getProductImageClassName(index)}
                  loading={isImageLcp(index) ? 'eager' : 'lazy'}
                  preload={isImageLcp(index)}
                  width={imageDimensions}
                  height={imageDimensions}
                  useAlternativeFormats={!!image.productDatImage}
                  fallbackImageElement={
                    <>
                      {isImageLcp(index) && (
                        <ImagePreload src={image.productHigh} />
                      )}
                      <img
                        data-src={index ? image.productHigh : ''}
                        src={!index ? image.productHigh : ''}
                        alt={productName}
                        className={getProductImageClassName(index)}
                        loading={isImageLcp(index) ? 'eager' : 'lazy'}
                        width={412}
                        height={412}
                      />
                    </>
                  }
                />
              </SwiperSlide>
            )
          })}

        {videos &&
          videos.map((video, index) => {
            return (
              <SwiperSlide
                className="overflow-hidden w-full sm:h-29 md:h-52"
                key={video.video_id + index}
                data-testid="product-video-slide"
              >
                <div className="video-responsive w-screen sm:w-auto sm:h-29 md:h-52">
                  <YouTube
                    videoId={video.video_id}
                    onPlay={e => {
                      handleVideo(e.target)
                    }}
                    className="absolute lg:relative left-0 top-0 w-full h-full sm:h-29 md:h-48 lg:h-52 m-auto"
                  />
                </div>
              </SwiperSlide>
            )
          })}
      </Swiper>
      <div
        className={classNames('flex items-center', {
          hidden: hasSingleMedia
        })}
      >
        <Button
          data-testid="navigation-left-arrow"
          variant="tertiary"
          icon={<ChevronLeft className="icon-16" />}
          className={classNames(
            'swiper-prev-button h-8 border-none mt-1 sm:mt-3 mr-1 pr-1 pl-2 sm:pl-0',
            {
              'md:hidden': hideArrowsMd,
              'lg:hidden': hideArrowsLg,
              'lg:block': !hideArrowsLg
            }
          )}
          onClick={() =>
            thumbsSwiperRef.current &&
            // @ts-ignore - missing correct swiper type
            thumbsSwiperRef.current.swiper.slidePrev()
          }
        />
        {isLoading ? (
          <div className="flex-1 flex items-center pt-2 pb-1 sm:pt-3 sm:pb-0 ml-0">
            {images &&
              images.map((_, index) => (
                <div
                  key={index}
                  className="mr-1 last:mr-0.5 cursor-pointer w-8 h-8 opacity-50 bg-ui-grey-lightest"
                />
              ))}
          </div>
        ) : (
          <Swiper
            ref={thumbsSwiperRef}
            tabIndex={0}
            // @ts-ignore - missing correct swiper type
            onSwiper={setThumbsSwiper}
            modules={[A11y]}
            a11y={{ enabled: true }}
            className="pt-2 pb-1 sm:pt-3 sm:pb-0 ml-0"
            navigation={false}
            preventInteractionOnTransition={true}
            slidesPerView="auto"
            threshold={1}
          >
            {images &&
              images.map((image, index) => {
                if (activeSlide === index) {
                  dispatch(dispatch(setShowLabels(true)))
                }
                const slideKey = isAlternativeImageFormatsEnabled
                  ? image.productDatImage
                  : image.productTileThumbnail

                return (
                  <SwiperSlide
                    // @ts-ignore - missing correct swiper type
                    onClick={() => setThumbsSwiper(index)}
                    className={classNames(
                      'mr-1 last:mr-0.5 cursor-pointer w-8 h-8 opacity-50',
                      {
                        'border border-primary-oxford-blue opacity-100 bg-primary-white':
                          activeSlide === index
                      },
                      {
                        'border border-ui-grey-lightest': activeSlide !== index
                      }
                    )}
                    key={slideKey}
                    data-testid="thumbnails-image-slide"
                  >
                    <div className="w-full h-full md:block">
                      <Image
                        src={
                          image.productDatImage ||
                          image.productTileThumbnail ||
                          ''
                        }
                        loading="lazy"
                        platform="bynder"
                        alt={productName}
                        width={{ xs: 62 }}
                        height={{ xs: 62 }}
                        useAlternativeFormats={!!image.productDatImage}
                        fallbackImageElement={
                          <img
                            loading="lazy"
                            src={image.productTileThumbnail}
                            alt={productName}
                          />
                        }
                      />
                    </div>
                  </SwiperSlide>
                )
              })}

            {videos &&
              videos.map((video, index) => {
                if (activeSlide === index + imagesLength) {
                  dispatch(dispatch(setShowLabels(false)))
                }

                return (
                  <SwiperSlide
                    // @ts-ignore - missing correct swiper type
                    onClick={() => setThumbsSwiper(index)}
                    className={classNames(
                      'mr-1 last:mr-0.5 cursor-pointer w-8 h-8 opacity-50 flex justify-center items-center',
                      {
                        'border border-primary-oxford-blue opacity-100 bg-primary-white':
                          activeSlide === index + imagesLength
                      },
                      {
                        'border border-ui-grey-lightest':
                          activeSlide !== index + imagesLength
                      }
                    )}
                    key={video.video_id + index}
                    data-testid="thumbnails-video-slide"
                  >
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 absolute text-center flex justify-center rounded-full bg-primary-oxford-blue">
                        <Play className="w-1.25 ml-0.25 text-primary-white" />
                      </div>
                      <img
                        src={
                          'https://i.ytimg.com/vi/' +
                          `${video.video_id}` +
                          '/default.jpg'
                        }
                        alt={productName}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
          </Swiper>
        )}

        <Button
          data-testid="navigation-right-arrow"
          variant="tertiary"
          icon={<ChevronRight className="icon-16" />}
          className={classNames(
            'swiper-next-button h-8 border-none mt-1 sm:mt-3 ml-1 pl-1 pr-2 sm:pr-0 lg:-mr-1.5',
            {
              'md:hidden': hideArrowsMd,
              'lg:hidden': hideArrowsLg,
              'lg:block': !hideArrowsLg
            }
          )}
          onClick={() =>
            thumbsSwiperRef.current &&
            // @ts-ignore - missing correct swiper type
            thumbsSwiperRef.current.swiper.slideNext()
          }
        />
      </div>
    </div>
  )
}
