import { screen, waitFor } from '@testing-library/react'
import { AtidaCash, RedeemAtidaCashFormProps } from './AtidaCash'
import { renderWithStore } from '~test-helpers'
import userEvent from '@testing-library/user-event'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, {})

const defaultProps: RedeemAtidaCashFormProps = {
  currency: 'EUR'
}
describe('AtidaCash', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<RedeemAtidaCashFormProps> = {}) => {
    renderWithStore(
      <Provider store={store}>
        <AtidaCash {...defaultProps} {...props} />
      </Provider>
    )
  }

  it('renders the atidaCash Component', () => {
    setup()
    expect(screen.getByTestId('atidaCashContainer')).toBeInTheDocument()
  })

  it('renders toggle button if totalBalance is bigger than 0', () => {
    setup({ totalBalance: 1500 })
    const toggleButton = screen.getByTestId('atidaCashToggleButton')

    expect(toggleButton).toBeInTheDocument()
  })

  it('when atida cash input is empty, the atida cash redeem Button should be disabled', async () => {
    setup({ totalBalance: 1500 })
    const toggleButton = screen.getByTestId('atidaCashToggleButton')
    userEvent.click(toggleButton)
    const containerEl = screen.getByTestId('atidaCashInput')
    expect(containerEl).toBeInTheDocument()
    userEvent.type(containerEl, '')
    expect(
      screen.getByRole('button', { name: 'atidaCashRedeemButton' })
    ).toBeDisabled()
  })

  it('when a value bigger than 0 is entered in the atida cash input, the atida cash redeem Button should not be disabled', async () => {
    setup({ totalBalance: 1500 })
    const toggleButton = screen.getByTestId('atidaCashToggleButton')
    userEvent.click(toggleButton)
    const containerEl = screen.getByTestId('atidaCashInput')
    expect(containerEl).toBeInTheDocument()
    userEvent.clear(containerEl)
    userEvent.type(containerEl, '10')
    expect(
      screen.getByRole('button', { name: 'atidaCashRedeemButton' })
    ).not.toBeDisabled()
  })

  it('rended successfull state of the atida cash form when form is executed successfully', () => {
    setup({ atidaCashUsed: 10 })

    expect(screen.getByTestId('atidaCashContainer')).toHaveClass(
      'bg-ui-carribean-green-lightest'
    )

    expect(screen.getByTestId('atidaCashCheckmark')).toBeInTheDocument()
  })

  describe('when valid Atida cash is entered', () => {
    it.skip('submits form', async () => {
      setup({ totalBalance: 1500 })
      const toggleButton = screen.getByTestId('atidaCashToggleButton')
      userEvent.click(toggleButton)
      const containerEl = screen.getByTestId('atidaCashInput')

      userEvent.type(containerEl, '10')

      userEvent.click(
        screen.getByRole('button', { name: 'atidaCashRedeemButton' })
      )
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
      expect(onSubmit).toHaveBeenCalledWith({ cash: '10' })
    })
  })
})
