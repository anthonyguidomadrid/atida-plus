/**
 * @jest-environment node
 */
import axios from 'axios'
import { PageNotFoundError } from '~domains/page/helpers'
import {
  contentfulSeoBlockGraphQL,
  contentfulSeoBlockNormalized
} from '~domains/seo/__mocks__/contentfulSEO'
import { fetchSeoBlock } from '../fetch-seo'

describe(fetchSeoBlock, () => {
  it('creates the client passes the locale & slug to request', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: contentfulSeoBlockGraphQL
    })
    await fetchSeoBlock('en-gb', 'brands')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: {
        locale: 'en-GB',
        tags: 'country-gb',
        slug: 'brands'
      }
    })
  })

  it('normalizes the response for the seo block', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: contentfulSeoBlockGraphQL
    })
    const response = await fetchSeoBlock('en-gb', 'brands')
    expect(response).toEqual(contentfulSeoBlockNormalized)
  })

  it('throws a page not found error when seo block is not found', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: {
        data: { seoCollection: { items: [] } }
      }
    })
    await fetchSeoBlock('en-gb', 'some-non-existent-slug').catch(e =>
      expect(e).toEqual(
        new PageNotFoundError(
          'SEO Block for slug some-non-existent-slug not found in Contentful'
        )
      )
    )
  })
})
