import classNames from 'classnames'
import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react'

export type FormFieldProps = ComponentPropsWithoutRef<'div'> & {
  label: string
  inputId: string
  required?: boolean
  rounded?: boolean
  error?: string | boolean
}

export const FormField: FunctionComponent<FormFieldProps> = ({
  label,
  inputId,
  error,
  required = false,
  rounded = true,
  children,
  ...props
}) => {
  const hasError = error ? true : undefined
  const errorElementId = `${inputId}_error`

  return (
    <div className="mb-2" data-testid="formField" {...props}>
      {label.length > 0 && (
        <label
          id={`label-${inputId}`}
          className="block text-sm mb-1 font-normal"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            id: inputId,
            'aria-required': required,
            'aria-invalid': hasError,
            'aria-describedby': hasError ? errorElementId : undefined,
            ...({
              ...child?.props,
              ...(rounded && {
                className: classNames(child?.props.className, 'rounded')
              })
            } ?? {})
          })
        }

        return null
      })}
      {hasError && (
        <span
          id={errorElementId}
          role="alert"
          className="block text-sm text-feedback-error mt-1 mb-1"
        >
          {error}
        </span>
      )}
    </div>
  )
}
