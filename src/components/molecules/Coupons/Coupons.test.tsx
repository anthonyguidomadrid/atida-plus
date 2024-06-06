import { render, screen } from '@testing-library/react'
import { Coupons, CouponsProps } from '.'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { coupons } from '~components/molecules/Coupons/Coupons.mock'
import userEvent, { TargetElement } from '@testing-library/user-event'

describe(Coupons, () => {
  const defaultProps = {
    onCouponRemove: jest.fn(),
    basketCouponData: coupons.items
  }
  const setup = (props: Partial<CouponsProps> = {}) =>
    render(
      <RouterContext.Provider value={routerMock}>
        <Coupons {...defaultProps} {...props} />
      </RouterContext.Provider>
    )

  describe('When multiple vouchers are disabled', () => {
    it('renders coupon when basketCouponData is passed', () => {
      setup()
      expect(screen.getByTestId('coupon')).toHaveTextContent('total-20-percent')
    })

    it('removes successfully the added coupon after clicking on the remove button', () => {
      const onCouponRemove = jest.fn()
      setup({ onCouponRemove })
      expect(onCouponRemove).toHaveBeenCalledTimes(0)
      userEvent.click(
        screen.getByTestId('removeCouponButtonText') as TargetElement
      )
      expect(onCouponRemove).toHaveBeenCalledTimes(1)
    })
  })
})
