import { MethodRefData } from '~domains/checkout/types'
import {
  createPaymentMethodData,
  createPaymentMethodResponse
} from '~domains/checkout/__mocks__/create-payment-method'
import { normalizeCreatedPaymentMethod } from '../create-payment-method'

describe(normalizeCreatedPaymentMethod, () => {
  it('normalizes the data received after creating a new payment', () => {
    const normalizedData = normalizeCreatedPaymentMethod(
      (createPaymentMethodResponse as unknown) as MethodRefData
    )

    expect(normalizedData).toEqual(createPaymentMethodData)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeCreatedPaymentMethod({} as MethodRefData)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeCreatedPaymentMethod()
    expect(normalizedData).toEqual({})
  })
})
