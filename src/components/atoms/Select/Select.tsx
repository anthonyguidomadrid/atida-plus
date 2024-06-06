import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { ReactComponent as ChevronDown } from '~assets/svg/navigation-16px/ChevronDown.svg'

export type SelectProps = ComponentPropsWithoutRef<'select'> & {
  isCountrySelector?: boolean
  isSubdivisionSelector?: boolean
  initialValue?: string | undefined
  isSortBy?: boolean
}

export const Select: FunctionComponent<SelectProps> = ({
  isCountrySelector = false,
  isSubdivisionSelector = false,
  initialValue = null,
  isSortBy = false,
  className,
  children,
  ...props
}) => (
  <div className={classNames('select', className)}>
    <select
      className={classNames('rounded', {
        'w-27 sm:w-28 px-2.5 py-1.5 mr-1 border-primary-oxford-blue': isCountrySelector,
        'h-6': isSubdivisionSelector,
        'border-none font-semibold text-base pl-0.5': isSortBy
      })}
      {...props}
      value={initialValue ?? undefined}
    >
      {children}
    </select>
    <ChevronDown
      className={classNames({
        'w-6 h-2': isCountrySelector,
        'icon-16': isSortBy
      })}
    />
  </div>
)
