import { SprykerOrderPaymentData } from '~domains/checkout/types'
import {
  sprykerOrderPaymentsData,
  orderPaymentsResponse
} from '~domains/checkout/__mocks__/order-payments'
import { normalizeOrderPayments } from '../order-payments'

describe(normalizeOrderPayments, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizeOrderPayments(
      (sprykerOrderPaymentsData as unknown) as SprykerOrderPaymentData
    )

    expect(normalizedData).toEqual(orderPaymentsResponse)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeOrderPayments({} as SprykerOrderPaymentData)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeOrderPayments()
    expect(normalizedData).toEqual({})
  })
})
