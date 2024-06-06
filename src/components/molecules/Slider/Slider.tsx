import {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import useInView from 'react-cool-inview'
import { useTranslation } from 'react-i18next'

import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { SLIDER_AUTOPLAY_INTERVAL } from '~config/constants/time'
import { SliderArrowButton } from './SliderArrowButton'
import { SliderIndicators } from './SliderIndicators'
import { useSize } from '~helpers/useSize'
import { ComponentPropsWithoutRefAndChildren } from '~helpers/typeHelpers'

export type SlidesPerView = number | 'auto' | undefined
export type SliderProps = {
  title?: string
  displayTitle?: boolean
  slidesPerView?: SlidesPerView
  slideWidth?: number
  showArrowButtons?: boolean
  showSlidesIndicators?: boolean
  autoplay?: boolean
  withNumericBullets?: boolean
  areArrowButtonsOnTop?: boolean
  testId?: string
  swiperClassName?: string
  isHeroBanner?: boolean
  children?: ReactNode
}

/**
 * Renders a slider component. The containing children are going to be the different slides
 * @param title [Optional] This title won't be rendered by default. To display it you will need to pass a 'displayTitle' prop as true. It will be displayed at the top of the slider
 * @param displayTitle [Optional] This indicates if the title will be rendered or not. It's false by default
 * @param slidesPerView [Optional] This indicates the slides per view the slider will show. It's 1 by default. Recommendation: if 'auto' is passed, please provide a slide width with the 'slideWidth' prop
 * @param slideWidth [Optional] This sets the width for each slide if the 'slidesPerView' prop is set to 'auto'. It's 165 by default
 * @param showArrowButtons [Optional] This indicates if the arrow buttons (for changing the slides for tablets or desktop devices) will be rendered or not. It's true by default
 * @param showSlidesIndicators [Optional] Recommended only for full-width slides. This indicates if the slides indicators (indicating the slides quantity and which one is showing) will be rendered or not. It's true by default
 * @param autoplay [Optional] This sets the autoplay for the slides (if the slides are going to be swiped automatically). It's true by default
 * @param withNumericBullets [Optional] Shows numeric bullets for changing the slides, and for indicating the current one for the mobile version
 * @param areArrowButtonsOnTop [Optional] This indicates if the arrow buttons will be displayed on top of the slider (on the right of the title if displayed) or on the sides of it (with a fixed position). It's false by default
 * @param testId [Optional] This sets the Data Test ID
 * @param swiperClassName [Optional] This sets additional class names to the Swiper component
 * @param className [Optional] This sets additional class names to the slider
 * @param isHeroBanner [Optional] This sets additional class names to the slider indicators
 * @param children
 */
export const Slider = ({
  title,
  displayTitle = false,
  slidesPerView: spv = 1,
  slideWidth = 165,
  showArrowButtons = true,
  showSlidesIndicators = true,
  autoplay = true,
  withNumericBullets = false,
  areArrowButtonsOnTop = false,
  testId,
  swiperClassName,
  className,
  isHeroBanner,
  children
}: ComponentPropsWithoutRefAndChildren<'div'> & SliderProps) => {
  const childrenArray = Children.toArray(children)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const [isHover, setIsHover] = useState<boolean>(false)

  const swiperRef = useRef<Swiper | null>(null)
  const { observe, inView } = useInView()

  const { width: innerWidth = 0 } = useSize()
  const isSmallFormat = useBreakpoint(breakpoints.sm)
  const isMediumFormat = useBreakpoint(breakpoints.md)
  const isExtraSmallFormat = useBreakpoint(breakpoints.xs)
  const { t } = useTranslation()

  const [
    shouldRenderEmptySlides,
    setShouldRenderEmptySlides
  ] = useState<boolean>(false)
  const [emptySlidesQuantity, setEmptySlidesQuantity] = useState<number>(0)

  // Header.tsx has a similar case and explanation on why this is needed (hydration)
  const [slidesPerView, setSlidesPerView] = useState<
    number | 'auto' | undefined
  >(1)
  useEffect(() => setSlidesPerView(spv), [spv])

  const dynamicSlidesPerView = useMemo(
    () => (slidesPerView === 'auto' ? Math.ceil(innerWidth / slideWidth) : 0),
    [innerWidth, slideWidth, slidesPerView]
  )

  const showIndicatorsOnMobile = useMemo<boolean>(
    () => !isMediumFormat && childrenArray.length >= 2 && showSlidesIndicators,
    [isMediumFormat, childrenArray.length, showSlidesIndicators]
  )
  const showIndicatorsOnDesktop = useMemo<boolean>(
    () => isMediumFormat && childrenArray.length >= 3 && showSlidesIndicators,
    [isMediumFormat, childrenArray.length, showSlidesIndicators]
  )
  const shouldShowArrowButtons = useMemo<boolean>(
    () =>
      ((isSmallFormat && slidesPerView !== 1) || (isMediumFormat && isHover)) &&
      !!slidesPerView &&
      !!Number(slidesPerView) &&
      childrenArray.length > slidesPerView &&
      showArrowButtons,
    [
      isSmallFormat,
      slidesPerView,
      isMediumFormat,
      isHover,
      childrenArray.length,
      showArrowButtons
    ]
  )
  const shouldAutoPlay = useMemo<boolean>(
    () =>
      autoplay && inView && ((isMediumFormat && !isHover) || !isMediumFormat),
    [autoplay, inView, isHover, isMediumFormat]
  )
  const isOnLastSlide = useMemo<boolean>(
    () =>
      slidesPerView === 'auto'
        ? activeSlide === childrenArray.length - dynamicSlidesPerView
        : typeof slidesPerView === 'number' && slidesPerView > 1
        ? activeSlide === childrenArray.length - slidesPerView
        : activeSlide === childrenArray.length - 1,
    [activeSlide, childrenArray.length, dynamicSlidesPerView, slidesPerView]
  )

  const slideTo = useCallback((slide: number) => {
    if (!swiperRef.current || slide === undefined) return
    // @ts-expect-error - missing correct swiper type
    swiperRef.current.swiper.slideTo(slide)
  }, [])

  const handlePreviousSlide = useCallback(() => {
    if (!swiperRef.current) return
    activeSlide === 0
      ? slideTo(childrenArray.length - 1)
      : // @ts-expect-error - missing correct swiper type
        swiperRef.current.swiper.slidePrev()
  }, [activeSlide, childrenArray.length, slideTo])

  const handleNextSlide = useCallback(() => {
    if (!swiperRef.current) return
    isOnLastSlide
      ? slideTo(0)
      : // @ts-expect-error - missing correct swiper type
        swiperRef.current.swiper.slideNext()
  }, [isOnLastSlide, slideTo])

  useEffect(() => {
    if (!shouldAutoPlay) return
    const autoPlayInterval = setInterval(
      handleNextSlide,
      SLIDER_AUTOPLAY_INTERVAL
    )

    return () => {
      clearInterval(autoPlayInterval)
    }
  })

  useEffect(() => {
    if (
      slidesPerView !== 1 &&
      (childrenArray.length - activeSlide) * slideWidth > innerWidth
    ) {
      setShouldRenderEmptySlides(true)
      innerWidth !== 0 &&
        Math.round(
          ((childrenArray.length - activeSlide) * slideWidth) / innerWidth
        ) < dynamicSlidesPerView &&
        setEmptySlidesQuantity(
          Math.round(
            ((childrenArray.length - activeSlide) * slideWidth) / innerWidth
          )
        )
    }
  }, [
    activeSlide,
    childrenArray.length,
    dynamicSlidesPerView,
    innerWidth,
    slideWidth,
    slidesPerView
  ])

  const renderEmptySlide = useCallback(
    (quantity?: number) =>
      quantity && quantity > 1 ? (
        Array(quantity)
          .fill(0)
          .map((_el, idx) => (
            <SwiperSlide
              key={`slider-slide-extra-${idx}`}
              className={classNames(
                'h-auto md:max-w-112 lg:max-w-164 sm:hidden',
                {
                  [`w-[${100 / (slidesPerView as number)}%]`]:
                    typeof slidesPerView === 'number' && slidesPerView !== 1,
                  [`w-[${100 / dynamicSlidesPerView}%]`]:
                    slidesPerView === 'auto'
                }
              )}
            />
          ))
      ) : quantity == 1 ? (
        <SwiperSlide
          key="slider-slide-extra"
          className={classNames('h-auto md:max-w-112 lg:max-w-164 sm:hidden', {
            [`w-[${100 / (slidesPerView as number)}%]`]:
              typeof slidesPerView === 'number' && slidesPerView !== 1,
            [`w-[${100 / dynamicSlidesPerView}%]`]: slidesPerView === 'auto'
          })}
        />
      ) : null,
    [dynamicSlidesPerView, slidesPerView]
  )

  const arrowButtons = useMemo(
    () => (
      <>
        <SliderArrowButton
          label={t('accessibility.slide-left')}
          direction="left"
          handleOnClick={handlePreviousSlide}
          isFixed={!areArrowButtonsOnTop}
          className={classNames({
            'hidden pointer-events-none': !shouldShowArrowButtons
          })}
        />
        <SliderArrowButton
          label={t('accessibility.slide-right')}
          direction="right"
          handleOnClick={handleNextSlide}
          isFixed={!areArrowButtonsOnTop}
          className={classNames({
            'hidden pointer-events-none': !shouldShowArrowButtons
          })}
        />
      </>
    ),
    [
      t,
      areArrowButtonsOnTop,
      handleNextSlide,
      handlePreviousSlide,
      shouldShowArrowButtons
    ]
  )

  return childrenArray.length > 1 ? (
    <div
      className={classNames(
        'w-screen relative left-1/2 right-1/2 -mx-w-1/2-screen',
        {
          'md:w-full md:left-0 md:right-0 md:mx-auto': slidesPerView === 1,
          'sm:w-full sm:left-0 sm:right-0 sm:mx-auto': slidesPerView !== 1
        }
      )}
      data-testid="sliderContainer"
    >
      <div
        ref={observe}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={classNames('relative', className)}
        data-testid={testId ?? 'slider'}
      >
        {areArrowButtonsOnTop ? (
          <div className="w-full flex justify-between">
            {title && displayTitle && (
              <span className="flex ml-0 mb-3 sm:mb-4 lg:mb-5 font-semibold text-lg lg:text-2xl">
                {title}
              </span>
            )}
            <div data-testid="arrow-buttons-container" className="flex gap-2">
              {arrowButtons}
            </div>
          </div>
        ) : (
          arrowButtons
        )}
        <div
          {...(withNumericBullets && { className: 'swiper-slides-wrapper' })}
          data-testid="swiperSlidesWrapper"
        >
          <Swiper
            id={testId ?? title}
            ref={swiperRef}
            onSlideChange={swiper => {
              setActiveSlide(swiper.activeIndex)
            }}
            lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
            slidesPerView={
              slidesPerView === 'auto' ? dynamicSlidesPerView : slidesPerView
            }
            {...(withNumericBullets && {
              breakpoints: {
                375: {
                  slidesPerView: 'auto'
                },
                1024: {
                  slidesPerView: 3
                }
              }
            })}
            className={classNames(
              {
                'w-screen': slidesPerView !== 'auto',
                'md:w-112 lg:w-164': slidesPerView === 1 && !withNumericBullets,
                [`w-[${dynamicSlidesPerView * slideWidth}px]`]:
                  slidesPerView === 'auto',
                'md:w-full': withNumericBullets
              },
              swiperClassName
            )}
            style={
              slidesPerView === 'auto'
                ? { width: `${dynamicSlidesPerView * slideWidth}px` }
                : undefined
            }
            centeredSlides={
              withNumericBullets &&
              !isMediumFormat &&
              (isSmallFormat || isExtraSmallFormat)
            }
          >
            {Children.map(childrenArray, (child, idx) => (
              <SwiperSlide
                key={`slider-slide-${idx}`}
                className={classNames('h-auto md:max-w-112', {
                  'lg:max-w-164': !withNumericBullets,
                  'flex lg:w-[374px] md:w-[310px] sm:w-[356px] w-[328px]': withNumericBullets
                })}
                style={{
                  width:
                    typeof slidesPerView === 'number' && slidesPerView !== 1
                      ? `${100 / slidesPerView}%`
                      : slidesPerView === 'auto'
                      ? `${100 / dynamicSlidesPerView}%`
                      : undefined
                }}
              >
                {child}
              </SwiperSlide>
            ))}
            {shouldRenderEmptySlides && renderEmptySlide(emptySlidesQuantity)}
          </Swiper>
        </div>
      </div>
      {(showIndicatorsOnMobile || showIndicatorsOnDesktop) && (
        <SliderIndicators
          swiperRef={swiperRef}
          slideTo={slideTo}
          numberOfSlides={childrenArray.length}
          activeSlide={activeSlide}
          isHeroBanner={isHeroBanner}
          withNumericBullets={withNumericBullets}
        />
      )}
    </div>
  ) : null
}
