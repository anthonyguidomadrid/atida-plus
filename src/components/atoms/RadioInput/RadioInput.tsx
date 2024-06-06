import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import type { FieldInputProps } from 'formik'

export type RadioInputProps = ComponentPropsWithoutRef<'label'> & {
  id: string
  value: string
  label?: string
  isChecked?: boolean
  field?: FieldInputProps<unknown>
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

export const RadioInput: FunctionComponent<RadioInputProps> = ({
  id,
  value,
  label,
  isChecked,
  field,
  onClick
}) => {
  return (
    <div data-testid="RadioInput" className="flex mr-5 items-center">
      <input
        onClick={onClick}
        type="radio"
        id={id}
        {...field}
        value={value}
        className="absolute w-3 h-3 opacity-0"
      />
      <span
        className={classNames(
          'flex grow-0 shrink-0 items-center justify-center w-3 h-3 border rounded-full',
          {
            'border-ui-grey-light': !isChecked,
            'border-primary-oxford-blue': isChecked
          }
        )}
      >
        {isChecked && (
          <span
            data-testid="checked-circle"
            className="bg-primary-oxford-blue h-1.5 w-1.5 rounded-full"
          ></span>
        )}
      </span>
      <label htmlFor={id} className="ml-1.5">
        {label}
      </label>
    </div>
  )
}
