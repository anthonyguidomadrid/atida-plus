import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import type { FormikProps, FieldInputProps } from 'formik'
import classNames from 'classnames'

export type TextFieldProps = {
  isWide?: boolean
  form?: FormikProps<unknown>
  field?: FieldInputProps<string>
  testId?: string
}

export const TextField: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'input'>, 'form'> & TextFieldProps
> = ({
  type = 'text',
  className,
  isWide = true,
  form,
  field,
  children,
  ...props
}) => {
  return (
    <input
      type={type}
      className={classNames(
        'text-sm font-light border py-1.5 px-2 text-primary-oxford-blue',
        {
          'w-full': isWide,
          'border-ui-grey-light hover:border-ui-grey focus:border-ui-grey-dark': !props[
            'aria-invalid'
          ],
          'bg-feedback-error-light border-feedback-error text-feedback-error':
            props['aria-invalid']
        },
        className
      )}
      {...field}
      data-testid="textField"
      {...props}
    >
      {children}
    </input>
  )
}
