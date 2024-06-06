import { getDefaultCustomer } from '../get-default-customer'

describe(getDefaultCustomer, () => {
  it('returns teh default user Id', () => {
    expect(getDefaultCustomer()).toEqual('someDefaultCustomer')
  })
})
