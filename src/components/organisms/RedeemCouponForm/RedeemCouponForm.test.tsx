import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RedeemCouponForm } from './RedeemCouponForm'
import { renderWithStore } from '~test-helpers'

describe(RedeemCouponForm, () => {
  const onSubmit = jest.fn()

  beforeEach(() => {
    renderWithStore(<RedeemCouponForm couponData={[]} />)
  })

  it('renders an coupon input field', async () => {
    const container = screen.getByTestId('inputContainer')
    expect(container).toBeInTheDocument()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('when add coupon button is disabled', async () => {
    const containerEl = screen.getByTestId('inputContainer')
    const inputEl = containerEl.firstChild as HTMLInputElement
    expect(inputEl).toBeInTheDocument()
    await userEvent.type(inputEl, '')
    expect(screen.getByTestId('redeemCouponFormButton')).toBeDisabled()
  })

  it('when add coupon button is not disabled', async () => {
    const containerEl = screen.getByTestId('inputContainer')
    const inputEl = containerEl.firstChild as HTMLInputElement
    expect(inputEl).toBeInTheDocument()
    await userEvent.type(inputEl, 'coupon-code')
    expect(screen.getByTestId('redeemCouponFormButton')).not.toBeDisabled()
  })

  describe('when valid coupon is entered', () => {
    it.skip('submits form', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'coupon.input-field-label' }),
        'CODE123'
      )
      userEvent.click(screen.getByTestId('redeemCouponFormButton'))
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
      expect(onSubmit).toHaveBeenCalledWith(
        { coupon: 'CODE123' },
        expect.any(Object)
      )
    })
  })

  it('renders the out-of-stock error message if the promotional item is not available', async () => {
    renderWithStore(
      <RedeemCouponForm couponData={[]} hasPromotionalItemOutOfStock={true} />
    )
    expect(screen.getByTestId('alert')).toHaveTextContent(
      'promotional-item.voucher.out-of-stock.error'
    )
  })
})
