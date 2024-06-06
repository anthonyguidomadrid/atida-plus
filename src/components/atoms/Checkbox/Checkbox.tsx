import {
  FunctionComponent,
  ComponentPropsWithoutRef,
  FormEventHandler
} from 'react'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import classNames from 'classnames'

export type CheckboxProps = {
  id?: string
  label?: string | JSX.Element
  isChecked?: boolean
  disabled?: boolean
  onChange?: FormEventHandler<HTMLInputElement>
  variant?: 'primary' | 'secondary'
  isFilter?: boolean
  isCheckboxCentered?: boolean
}

export const Checkbox: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & CheckboxProps
> = ({
  id,
  label,
  isChecked,
  disabled,
  onChange,
  className,
  variant = 'primary',
  isFilter = false,
  isCheckboxCentered = true,
  ...props
}) => {
  return (
    <div
      data-testid="checkbox"
      className={classNames(
        'flex relative',
        {
          'mr-5 pb-1 md:mt-0 -mt-0.5': !isFilter,
          'items-center': isCheckboxCentered
        },
        className
      )}
      {...props}
    >
      <input
        type="checkbox"
        className={classNames('absolute opacity-0 cursor-pointer', {
          'w-2 h-2': !isFilter,
          'w-3 h-3': isFilter
        })}
        defaultChecked={isChecked}
        disabled={disabled}
        onChange={onChange}
        id={id}
        value={isFilter ? id : undefined}
      />
      <span
        className={classNames('flex grow-0 shrink-0 checkbox rounded', {
          'w-2 h-2': !isFilter,
          'w-3 h-3': isFilter,
          'checkbox--primary checkbox_checkmark--primary':
            variant === 'primary' && !disabled,
          'checkbox--secondary checkbox_checkmark--secondary':
            variant === 'secondary' && !disabled,
          'checkbox--not-checked': !isChecked,
          'checkbox--disabled': disabled
        })}
        data-testid="checkboxContainer"
      >
        {isChecked && (
          <Checkmark
            data-testid="checkmarkIcon"
            className={classNames('checkbox_checkmark', {
              'checkbox_checkmark--primary': variant === 'primary',
              'checkbox_checkmark--secondary': variant === 'secondary'
            })}
          />
        )}
      </span>
      <label
        htmlFor={id}
        className={classNames('ml-1.5 cursor-pointer text-base', {
          'mt-0.5': !isFilter,
          'md:truncate': isFilter && isCheckboxCentered
        })}
      >
        {label}
      </label>
    </div>
  )
}
