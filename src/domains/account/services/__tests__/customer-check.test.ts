/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { customerCheck } from '../customer-check'

describe(customerCheck, () => {
  describe('creates the client and passes the locale to the spryker request', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: {
          data: [
            {
              type: 'customer-check',
              id: 'string',
              attributes: { exists: false },
              links: {
                self: ''
              }
            }
          ],
          links: {
            self: ''
          }
        }
      })
    })

    const data = { email: 'someEmail+30@test.com' }

    it('calls the endpoint with the correct encoded email as a param', async () => {
      await customerCheck('en-gb', data, 'some-unique-id')

      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'spryker.co.uk'
        },
        addAnonymousCustomerUniqueId: 'some-unique-id'
      })

      expect(axios.get).toHaveBeenCalledWith(
        'customer-check?email=someEmail%2B30%40test.com'
      )
    })

    it('returns the correct response', async () => {
      const response = await customerCheck('en-gb', data, 'some-unique-id')
      expect(response).toEqual({
        email: data.email,
        exists: false
      })
    })
  })
})
