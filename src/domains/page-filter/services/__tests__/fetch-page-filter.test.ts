/**
 * @jest-environment node
 */
import { fetchPageFilter } from '../fetch-page-filter'
import { mock } from '../fetch-page-filter.mock'
import axios from 'axios'

describe(fetchPageFilter, () => {
  describe('fetch promotions', () => {
    it('creates the client passes the locale and skip to request', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: mock
      })

      await fetchPageFilter('promocoes', 'pt-pt')
      expect(axios.post).toHaveBeenLastCalledWith('', {
        query: expect.any(String),
        variables: {
          slug: 'promocoes',
          locale: 'pt-PT',
          tags: 'country-pt'
        }
      })
    })

    it('returns the normalized response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValueOnce({
        data: mock
      })
      const response = await fetchPageFilter('promocoes', 'pt-pt')
      expect(response).toMatchSnapshot()
    })
  })
})
