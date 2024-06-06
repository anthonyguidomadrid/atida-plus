import { getLoginMessage } from '~helpers/getLoginMessage'

describe(getLoginMessage, () => {
  it('returns basket.coupon-code.already-used when login message is discount.voucher_code.customer.already_used ', () => {
    expect(
      getLoginMessage('discount.voucher_code.customer.already_used')
    ).toEqual({
      title: 'basket.coupon-code.already-used.title',
      content: 'basket.coupon-code.already-used.description'
    })
  })
  it('returns basket.coupon-code.cannot.be.added when login message is ERROR_IDENTIFIER_CART_CODE_CANT_BE_ADDED ', () => {
    expect(getLoginMessage('ERROR_IDENTIFIER_CART_CODE_CANT_BE_ADDED')).toEqual(
      {
        title: 'basket.coupon-code.cannot.be.added.title',
        content: 'basket.coupon-code.cannot.be.added.description'
      }
    )
  })
  it('returns empty string for title and content when loginMessage value is empty', () => {
    expect(getLoginMessage('')).toEqual({
      title: '',
      content: ''
    })
  })
})
