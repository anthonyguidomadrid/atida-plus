import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'

export type ProgressBarProps = ComponentPropsWithoutRef<'div'> & {
  max: number
  now: number
  isInCheckout?: boolean
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  max,
  now,
  className,
  isInCheckout,
  ...props
}) => {
  const nowAsPercentageOfMax = Math.min((now / max) * 100, 100)

  return (
    <div
      role="presentation"
      className={classNames(
        'relative w-full h-0.5 bg-ui-grey-lightest',
        className,
        {
          'sm:max-w-27': !isInCheckout
        }
      )}
      data-testid="progressBar"
      {...props}
    >
      <div
        className={classNames(
          'absolute top-0 left-0 h-full bg-primary-caribbean-green transition-all',
          'transition-all'
        )}
        data-testid="progressBarValue"
        style={{
          width: `${nowAsPercentageOfMax}%`
        }}
      />
    </div>
  )
}
