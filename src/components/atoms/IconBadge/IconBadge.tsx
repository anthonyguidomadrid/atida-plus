import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode
} from 'react'
import classNames from 'classnames'

export type IconBadgeProps = {
  icon: ReactNode
  className?: string
}

export const IconBadge: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & IconBadgeProps
> = ({ icon, className, ...props }) => {
  return (
    <div
      className={classNames('bg-primary-white', 'rounded', className)}
      data-testid="iconBadge"
      {...props}
    >
      {icon && icon}
    </div>
  )
}
