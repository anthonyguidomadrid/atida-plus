import {
  FunctionComponent,
  ComponentPropsWithoutRef,
  MutableRefObject
} from 'react'
import classNames from 'classnames'
import { Swiper } from 'swiper/react'

type SliderIndicatorsProps = {
  swiperRef: MutableRefObject<Swiper | null>
  slideTo: (slide: number) => void
  numberOfSlides: number
  activeSlide: number
  withNumericBullets?: boolean
  isHeroBanner?: boolean
}

export const SliderIndicators: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & SliderIndicatorsProps
> = ({
  swiperRef,
  slideTo,
  numberOfSlides,
  activeSlide,
  withNumericBullets = false,
  isHeroBanner
}) => (
  <div
    className={classNames('flex mt-3', {
      'justify-between mx-auto relative max-w-[248px] sm:max-w-[332px] md:max-w-[428px] lg:max-w-[646px] sm:mt-5 lg:mt-8': withNumericBullets,
      'justify-center': !withNumericBullets,
      'sm:mt-4 lg:mt-5': isHeroBanner
    })}
  >
    {Array(numberOfSlides)
      .fill(0)
      .map((_child, idx) =>
        withNumericBullets ? (
          <div
            key={`LOYALTY_SLIDER_${idx}`}
            role="button"
            tabIndex={0}
            onKeyDown={() => slideTo(idx)}
            onClick={() => slideTo(idx)}
            className={classNames(
              'inline-flex items-center justify-center bg-primary-white border rounded-full h-4 w-4 relative z-2',
              {
                'xs:bg-primary-oxford-blue xs:text-primary-white md:bg-primary-white md:text-primary-oxford-blue':
                  swiperRef?.current && idx === activeSlide,
                'bg-primary-white': swiperRef.current && idx !== activeSlide
              }
            )}
          >
            <span className="text-base pt-0.25">{idx + 1}</span>
          </div>
        ) : (
          <span
            key={`RECOMMENDATIONS_SLIDER_${idx}`}
            data-testid={`slider_pagination_${idx}`}
            role="button"
            tabIndex={0}
            onKeyDown={() => slideTo(idx)}
            onClick={() => slideTo(idx)}
            className={classNames(
              'bg-color--animated w-2 h-0.25 mx-0.25 border-none transform md:hover:scale-y-200 cursor-pointer focus:outline-0 focus-visible:outline-0 focus-within:outline-0',
              {
                'after-active': idx > activeSlide
              }
            )}
          />
        )
      )}
    {withNumericBullets && (
      <div className="bg-primary-oxford-blue absolute w-full h-0.125 top-1/2 -translate-y-2/4" />
    )}
  </div>
)
