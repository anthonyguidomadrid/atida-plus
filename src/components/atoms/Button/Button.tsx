import {
  cloneElement,
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes
} from 'react'
import classNames from 'classnames'
import { ReactComponent as Spinner } from '~assets/svg/navigation-24px/Spinner.svg'
import { ReactComponent as BlueSpinner } from '~assets/svg/solid/BlueSpinner.svg'

export type ButtonProps = {
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
  iconPosition?: 'before' | 'after'
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'back'
    | 'add-address'
    | 'underlined'
    | 'notification'
  isLoading?: boolean
  testId?: string
  singleIcon?: boolean
}

export const Button: FunctionComponent<
  ComponentPropsWithoutRef<'button'> & ButtonProps
> = forwardRef(
  (
    {
      variant = 'primary',
      className,
      type = 'button',
      icon,
      iconPosition = 'before',
      isLoading,
      singleIcon = false,
      disabled,
      children,
      ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <button
      className={classNames(
        'button',
        {
          'button--primary': variant === 'primary',
          'button--secondary': variant === 'secondary',
          'button--tertiary': variant === 'tertiary',
          'button--back': variant === 'back',
          'button--add-address': variant === 'add-address',
          'button--underlined': variant === 'underlined',
          'button--loading': isLoading,
          'button--notification': variant === 'notification',
          'p-0 justify-center': !children && icon,
          'w-5 h-5': !children && icon && !singleIcon
        },
        className
      )}
      type={type}
      disabled={disabled || isLoading}
      ref={ref}
      {...props}
    >
      {!isLoading &&
        icon &&
        iconPosition === 'before' &&
        cloneElement(icon, {
          ...icon.props,
          className: classNames(
            'button__icon--before',
            { 'button__icon--only': !children },
            icon.props.className
          )
        })}
      {!!children && (
        <span className={classNames({ invisible: isLoading })}>{children}</span>
      )}
      {!isLoading &&
        icon &&
        iconPosition === 'after' &&
        cloneElement(icon, {
          ...icon.props,
          className: classNames(
            'button__icon--after',
            { 'button__icon--only': !children },
            icon.props.className
          )
        })}
      {!!isLoading && (
        <span
          role="presentation"
          className="button__loading"
          data-testid="buttonLoadingSpinner"
        >
          {variant === 'tertiary' ? <BlueSpinner /> : <Spinner />}
        </span>
      )}
    </button>
  )
)
