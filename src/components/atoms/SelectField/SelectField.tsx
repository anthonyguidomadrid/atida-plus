import React from 'react'
import Select, { components } from 'react-select'
import type {
  ActionMeta,
  PropsValue,
  MultiValue,
  DropdownIndicatorProps,
  SingleValue,
  OnChangeValue
} from 'react-select'
import { ReactComponent as MenuDown } from '~assets/svg/MenuDown.svg'
import classNames from 'classnames'
import type { FormikProps, FieldInputProps } from 'formik'

export type OptionData<T> = {
  label: string
  value: T
}

export type isMulti = true | false

export interface SelectFieldProps<T> {
  inputId?: string
  className?: string
  isMulti?: isMulti
  isSearchable?: boolean
  isDisabled?: boolean
  menuIsOpen?: boolean
  field?: FieldInputProps<T | T[]>
  'data-testid'?: string
  'aria-invalid'?: boolean
  'aria-required'?: boolean
  closeMenuOnSelect?: boolean
  placeholder?: string
  options: readonly OptionData<T>[]
  value?: T
  form?: FormikProps<unknown>
  name: string
  onSelect?: (
    option: OnChangeValue<OptionData<T>, isMulti>,
    actionMeta: ActionMeta<OptionData<T>>
  ) => void
}

export const SelectField = <T,>({
  className,
  isMulti = false,
  isSearchable = false,
  isDisabled,
  menuIsOpen,
  field,
  form,
  name,
  options,
  value,
  onSelect,
  placeholder,
  closeMenuOnSelect,
  ...props
}: SelectFieldProps<T>): JSX.Element => {
  const onChange = (
    option: SingleValue<OptionData<T>> | MultiValue<OptionData<T>>,
    actionMeta: ActionMeta<OptionData<T>>
  ): void => {
    if (form && field) {
      form.setFieldValue(
        field.name,
        isMulti
          ? (option as MultiValue<
              OptionData<T>
            >)?.map((item: SingleValue<OptionData<T>>) =>
              item ? item.value : null
            )
          : (option as SingleValue<OptionData<T>>)?.value
      )
    }

    if (onSelect === undefined) return

    /* To clear the value with clear indicator detect actionMeta.action === 'clear' in onSelect prop */
    onSelect(option, actionMeta)
  }

  const getValue = (): PropsValue<OptionData<T>> => {
    if (typeof value !== 'undefined') {
      return options.filter(option => option.value === value) ?? null
    }

    if (options && field && form) {
      return isMulti
        ? options.filter(
            option => (field.value as T[]).indexOf(option.value) >= 0
          )
        : options.find(option => option.value === field.value) ??
            (('' as unknown) as SingleValue<OptionData<T>>)
    }

    return null
  }

  return (
    <Select
      menuIsOpen={menuIsOpen}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      className={classNames('react-select-wrapper', {
        'react-select-error': props?.['aria-invalid']
      })}
      classNamePrefix="react-select-prefix"
      name={name ?? field?.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      closeMenuOnSelect={closeMenuOnSelect}
      components={selectComponents}
      {...props}
    />
  )
}

const DropdownIndicator = <T,>(
  props: DropdownIndicatorProps<OptionData<T>>
) => {
  const { menuIsOpen } = props.selectProps

  return (
    <components.DropdownIndicator {...props}>
      <MenuDown
        className={classNames(
          'w-1.5 h-1 mx-1 text-primary-oxford-blue transform transition-transform',
          {
            'rotate-180': menuIsOpen
          }
        )}
      />
    </components.DropdownIndicator>
  )
}

const selectComponents = { DropdownIndicator, IndicatorSeparator: null }

export default SelectField
