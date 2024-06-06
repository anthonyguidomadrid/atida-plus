/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { balance } from '~domains/account/__mocks__/get-cash-balance'
import { getCashBalance } from '../get-cash-balance'

describe(getCashBalance, () => {
  describe('balance with amount', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: balance
      })
    })

    it('creates the client and passes the locale and access token to ledger', async () => {
      await getCashBalance('en-gb', 'some-token')

      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'someLedgerBaseUrl'
        }
      })

      expect(axios.get).toHaveBeenCalledWith(`/balance`, {
        headers: { Authorization: 'Bearer some-token' }
      })
    })

    it('returns the correct response', async () => {
      const getCashBalanceResponse = await getCashBalance('en-gb', 'some-token')
      expect(getCashBalanceResponse).toMatchSnapshot()
    })
  })
})
