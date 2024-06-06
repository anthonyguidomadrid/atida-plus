export type LoginMessageType = {
  title: string
  content: string
}

export const getLoginMessage = (loginMessage: string): LoginMessageType => {
  switch (loginMessage) {
    case 'ERROR_IDENTIFIER_CART_CODE_CANT_BE_ADDED':
      return {
        title: 'basket.coupon-code.cannot.be.added.title',
        content: 'basket.coupon-code.cannot.be.added.description'
      }
    case 'discount.voucher_code.customer.already_used':
      return {
        title: 'basket.coupon-code.already-used.title',
        content: 'basket.coupon-code.already-used.description'
      }
    default:
      return {
        title: '',
        content: ''
      }
  }
}
