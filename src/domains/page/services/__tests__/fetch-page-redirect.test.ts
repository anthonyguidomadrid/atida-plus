/**
 * @jest-environment node
 */
// @ts-ignore
import { getEntries } from 'contentful'
import {
  contentfulPageRedirect,
  contentfulPageRedirectNormalized
} from '~domains/page/__mocks__/contentfulPageRedirect'
import { fetchPageRedirect } from '../fetch-page-redirect'

describe(fetchPageRedirect, () => {
  describe('default case', () => {
    beforeEach(() => {
      ;(getEntries as jest.Mock).mockResolvedValueOnce(contentfulPageRedirect)
    })

    it("creates the client passes the locale to contentful's getEntries", async () => {
      await fetchPageRedirect('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(1)
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'pageRedirect',
        include: 2,
        limit: 1000,
        locale: 'en-GB',
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
    })

    it('normalizes the contentful response', async () => {
      const response = await fetchPageRedirect('en-gb')
      expect(response).toEqual([contentfulPageRedirectNormalized])
    })
  })
})
