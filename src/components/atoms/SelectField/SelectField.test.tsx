import React from 'react'
import { render } from '@testing-library/react'
import { openMenu, select } from 'react-select-event'
import SelectField, { OptionData } from './SelectField'
import type { ActionMeta, SingleValue } from 'react-select'
import { Field, Formik } from 'formik'

const OPTIONS: OptionData<string>[] = [
  { label: 'Option 1', value: 'option_1' },
  { label: 'Option 2', value: 'option_2' }
]

const mockedFn = jest.fn()

const renderForm = (select: React.ReactNode) => {
  const result = render(
    <form data-testid="form">
      <label htmlFor="selected_options">Options</label>
      {select}
    </form>
  )
  const form = result.getByTestId('form')
  const input = result.getByLabelText('Options')
  return { ...result, form, input }
}

describe(SelectField, () => {
  it('opens the menu', () => {
    const { getByLabelText, queryByText } = renderForm(
      <SelectField
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
        isMulti
      />
    )
    // option is not yet visible
    expect(queryByText('Option 1')).toBeNull()
    openMenu(getByLabelText('Options'))
    // option can now be seen because menu is open
    expect(queryByText('Option 1')).toBeInTheDocument()
  })

  it('selects an option in a single-option input', async () => {
    let value = OPTIONS[0].value
    const { form, rerender } = renderForm(
      <SelectField
        value={value}
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
      />
    )

    value = OPTIONS[1].value
    rerender(
      <SelectField
        value={value}
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
      />
    )

    expect(form).toMatchSnapshot()
  })

  it('selects several options in a multi-options input', async () => {
    const { form, rerender } = renderForm(
      <SelectField
        value={null}
        isMulti={true}
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
      />
    )

    await rerender(
      <SelectField
        value={OPTIONS[0].value}
        isMulti={true}
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
      />
    )

    await rerender(
      <SelectField
        value={OPTIONS[1].value}
        isMulti={true}
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
      />
    )

    expect(form).toMatchSnapshot()
  })

  it('has selected value', async () => {
    const { form } = renderForm(
      <SelectField
        value={OPTIONS[0].value}
        options={OPTIONS}
        name="selected_options"
        inputId="selected_options"
      />
    )

    expect(form).toHaveFormValues({
      selected_options: 'option_1'
    })
  })

  it('usage with Formik', async () => {
    let optionValue: SingleValue<string> = ''
    let actionMetaValue = null
    const { input, form } = renderForm(
      <Formik<{ selected_options: string }>
        initialValues={{ selected_options: '' }}
        onSubmit={mockedFn}
      >
        <Field
          component={SelectField}
          inputId="selected_options"
          name="selected_options"
          options={OPTIONS}
          onSelect={(
            option: SingleValue<string>,
            actionMeta: ActionMeta<OptionData<string>>
          ) => {
            optionValue = option
            actionMetaValue = actionMeta

            return { optionValue, actionMetaValue }
          }}
        />
      </Formik>
    )

    await select(input, 'Option 1')
    expect(form).toHaveFormValues({ selected_options: 'option_1' })
  })
})
