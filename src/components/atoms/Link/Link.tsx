import {
  forwardRef,
  cloneElement,
  ComponentPropsWithRef,
  FunctionComponent,
  FunctionComponentElement,
  SVGAttributes
} from 'react'
import classNames from 'classnames'

import { InteractionTracker } from '~components/atoms/InteractionTracker'

export type LinkProps = ComponentPropsWithRef<'a'> & {
  extraParams?: string
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
  iconPosition?: 'before' | 'after'
  trackingHandler?: () => void
  variant?: 'button' | 'button-secondary'
}

export const Link: FunctionComponent<LinkProps> = forwardRef(
  (
    {
      extraParams = '',
      href,
      children,
      className,
      icon,
      iconPosition = 'before',
      trackingHandler,
      variant,
      ...props
    },
    ref
  ) => {
    const shouldTrack =
      !!trackingHandler && typeof trackingHandler === 'function'

    return (
      <a
        ref={ref}
        href={`${href}${extraParams}`}
        className={classNames(
          {
            'link--button--primary': variant === 'button',
            'link--button--secondary': variant === 'button-secondary'
          },
          className
        )}
        {...props}
      >
        {icon &&
          iconPosition === 'before' &&
          cloneElement(icon, {
            ...icon.props,
            className: classNames('link__icon--before', icon.props.className)
          })}
        {shouldTrack ? (
          <InteractionTracker trackingHandler={trackingHandler}>
            {children}
          </InteractionTracker>
        ) : (
          children
        )}
        {icon &&
          iconPosition === 'after' &&
          cloneElement(icon, {
            ...icon.props,
            className: classNames('link__icon--after', icon.props.className)
          })}
      </a>
    )
  }
)
