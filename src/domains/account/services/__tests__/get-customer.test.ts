/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'

import {
  sprykerCustomer,
  sprykerCustomerWithAddresses
} from '../../__mocks__/customer'
import { getCustomer } from '../get-customer'

describe(getCustomer, () => {
  describe('customer without addresses', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: sprykerCustomer
      })
    })

    it('creates the client & passes the locale to spryker request', async () => {
      await getCustomer('en-gb', 'some-ref', 'some-token')
      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        }
      })
      expect(axios.get).toHaveBeenCalledWith(`/customers/some-ref`, {
        headers: { Authorization: 'Bearer some-token' }
      })
    })

    it('returns the correct response', async () => {
      const getCustomerResponse = await getCustomer(
        'en-gb',
        'some-ref',
        'some-token'
      )
      expect(getCustomerResponse).toMatchSnapshot()
    })
  })

  describe('customer with addresses', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: sprykerCustomerWithAddresses
      })
    })

    it('returns the correct response', async () => {
      const getCustomerResponse = await getCustomer(
        'en-gb',
        'some-ref',
        'some-token'
      )
      expect(getCustomerResponse).toMatchSnapshot()
    })
  })

  describe('incorrect customer response from Spryker with no attributes', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: {
            type: 'customers',
            id: 'PT--1821'
          }
        }
      })
    })
    it('Throws an error with the correct message', async () => {
      expect.assertions(1)
      await getCustomer('en-gb', 'some-ref', 'some-token').catch(e =>
        expect(e).toEqual(
          new Error('account.get-customer.failed-to-retrieve-customer-details')
        )
      )
    })
  })
})
