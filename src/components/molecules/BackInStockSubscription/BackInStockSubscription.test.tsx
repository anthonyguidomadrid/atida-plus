import { screen } from '@testing-library/react'
import { BackInStockSubscription } from './BackInStockSubscription'
import userEvent from '@testing-library/user-event'
import { renderWithStore } from '~test-helpers'
import { act } from 'react-dom/test-utils'

describe(BackInStockSubscription, () => {
  const setup = () => renderWithStore(<BackInStockSubscription />)

  it('displays the form on screen without a confirmation notice', async () => {
    const { findByTestId } = setup()
    const backInStockSubscriptionConfirmation = screen.queryByTestId(
      'backInStockSubscriptionConfirmation'
    )
    const submitButton = screen.getByTestId('backInStockFormSubmitButton')
    const inputEl = screen.getByTestId('backInStockSubscriptionField')
    const form = await findByTestId('backInStockSubscriptionForm')

    expect(backInStockSubscriptionConfirmation).not.toBeInTheDocument()
    expect(form).toBeInTheDocument()
    userEvent.click(submitButton)
    userEvent.type(inputEl, 'test@mail.com')
    expect(inputEl).toHaveValue('test@mail.com')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('displays the form on screen with an error after incorrect input', async () => {
    const { findByTestId } = setup()
    const submitButton = screen.getByTestId('backInStockFormSubmitButton')
    const form = await findByTestId('backInStockSubscriptionForm')
    const inputEl = screen.getByTestId('backInStockSubscriptionField')

    expect(form).toBeInTheDocument()
    userEvent.type(inputEl, 'test')
    expect(inputEl).toHaveValue('test')
    await userEvent.click(submitButton)
    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })

  it('displays the success notification after successful form submission', async () => {
    const { findByTestId } = setup()
    const submitButton = screen.getByTestId('backInStockFormSubmitButton')
    const form = await findByTestId('backInStockSubscriptionForm')
    const inputEl = screen.getByTestId('backInStockSubscriptionField')

    expect(form).toBeInTheDocument()
    userEvent.type(inputEl, 'test@mail.com')
    expect(inputEl).toHaveValue('test@mail.com')
    await act(async () => {
      await userEvent.click(submitButton)
    })
    const backInStockSubscriptionConfirmation = screen.queryByTestId(
      'backInStockSubscriptionConfirmation'
    )
    expect(backInStockSubscriptionConfirmation).toBeInTheDocument()
  })
})
