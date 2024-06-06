import { FunctionComponent, ComponentPropsWithoutRef } from 'react'
import classNames from 'classnames'
import { ButtonProps, Button } from '~components/atoms/Button'
import { ReactComponent as SliderArrow } from '~assets/svg/sliderArrow.svg'

type SliderArrowButtonProps = {
  direction: 'left' | 'right'
  handleOnClick: () => void
  isFixed?: boolean
  label?: string
}

export const SliderArrowButton: FunctionComponent<
  ComponentPropsWithoutRef<'button'> & ButtonProps & SliderArrowButtonProps
> = ({ direction, handleOnClick, isFixed = true, className, label }) => (
  <Button
    aria-label={label}
    data-testid={`slider-navigation-${direction}-arrow`}
    icon={
      <SliderArrow
        className={classNames('icon-20 pl-0.25  text-primary-oxford-blue ', {
          'pb-0.25 transform rotate-180': direction === 'left',
          'pt-0.25': direction === 'right'
        })}
      />
    }
    className={classNames(
      {
        'bg-transparent border-none w-fit h-fit': !isFixed,
        'absolute z-2 top-slider-buttons rounded-full bg-primary-white border-ui-grey-light shadow-md': isFixed,
        'left-0 sm:-left-2.5': direction === 'left' && isFixed,
        'right-0 sm:-right-2.5': direction === 'right' && isFixed
      },
      className
    )}
    onClick={handleOnClick}
  />
)
