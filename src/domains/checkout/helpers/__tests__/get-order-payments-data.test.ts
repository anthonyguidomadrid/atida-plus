import {
  getOrderPaymentsData,
  getMultibancoCookie
} from '../get-order-payments-data'

describe(getOrderPaymentsData, () => {
  it('returns a correctly formatted orderPaymentsData cookie', () => {
    expect(getOrderPaymentsData()).toEqual('orderPaymentsData')
  })
})

describe(getMultibancoCookie, () => {
  it('returns a correctly formatted getMultibancoCookie cookie', () => {
    expect(getMultibancoCookie()).toEqual('multibancoCookie')
  })
})
