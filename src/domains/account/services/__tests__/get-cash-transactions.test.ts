/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { mockedTransactionHistory } from '~domains/account/__mocks__/get-cash-transactions'
import { getCashTransactions } from '../get-cash-transactions'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'

describe(getCashTransactions, () => {
  describe('transactions - FF off', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: mockedTransactionHistory
      })
      ;(loadFeatureFlag as jest.Mock).mockResolvedValue({})
    })

    const data = {
      locale: 'en-gb',
      params: { limit: '8', offset: '0' },
      accessToken: 'some-token'
    }

    it('creates the client and passes the locale and access token to ledger', async () => {
      await getCashTransactions(data)

      expect(createClient).toHaveBeenCalledWith({
        locale: 'en-gb',
        options: {
          baseURL: 'someLedgerBaseUrl'
        }
      })

      expect(axios.get).toHaveBeenCalledWith(
        `/ledger-data?limit=${data.params.limit}&offset=${data.params.offset}`,
        {
          headers: { Authorization: 'Bearer some-token' }
        }
      )
    })

    it('returns the correct response', async () => {
      const getCashTransactionsResponse = await getCashTransactions(data)
      expect(getCashTransactionsResponse).toMatchSnapshot()
    })
  })
  describe('transactions - FF on', () => {
    beforeEach(() => {
      ;(axios.get as jest.Mock).mockResolvedValueOnce({
        data: mockedTransactionHistory
      })
      ;(loadFeatureFlag as jest.Mock).mockResolvedValue(
        mockedTransactionHistory
      )
    })

    const data = {
      locale: 'en-gb',
      params: { limit: '8', offset: '0' },
      accessToken: 'some-token'
    }

    it('does not create the client or call the ledger service endpoint', async () => {
      await getCashTransactions(data)

      expect(createClient).toHaveBeenCalledTimes(0)

      expect(axios.get).toHaveBeenCalledTimes(0)
    })

    it('returns the correct response', async () => {
      const getCashTransactionsResponse = await getCashTransactions(data)
      expect(getCashTransactionsResponse).toMatchSnapshot()
    })
  })
})
