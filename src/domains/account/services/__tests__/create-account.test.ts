/**
 * @jest-environment node
 */
import axios from 'axios'
import { createCustomer, sprykerCustomer } from '../../__mocks__/customer'
import { createClient } from '~helpers'
import { createCustomerAccount } from '../create-account'

describe(createCustomerAccount, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerCustomer })
  })

  it('creates the client & passes the locale and anonymous id to spryker request', async () => {
    await createCustomerAccount('en-gb', createCustomer, 'some-unique-id')
    expect(createClient).toHaveBeenCalledWith({
      addAnonymousCustomerUniqueId: 'some-unique-id',
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(`/customers`, {
      data: {
        attributes: createCustomer,
        type: 'customers'
      }
    })
  })

  it('returns the normalized customer response', async () => {
    const customerResponse = await createCustomerAccount(
      'en-gb',
      createCustomer,
      'some-unique-id'
    )

    expect(customerResponse).toMatchSnapshot()
  })
})
