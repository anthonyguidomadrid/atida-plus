/**
 * @jest-environment node
 */
import axios from 'axios'
import { PageNotFoundError } from '~domains/page/helpers'
import {
  categoryPagePOP,
  contentfulCategoryPageGraphQL
} from '~domains/page/__mocks__/contentfulCategoryContent'
import {
  contentfulPageContentGraphQL,
  contentfulPageContentNormalized
} from '../../__mocks__/contentfulPageContent'
import { fetchPageContent } from '../fetch-page-content'

describe(fetchPageContent, () => {
  it('creates the client passes the locale to request', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: contentfulPageContentGraphQL
    })
    await fetchPageContent('en-gb', '')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: {
        locale: 'en-GB',
        preview: false,
        slug: '',
        allLocales: ['en-GB', 'pt-PT', 'es-ES', 'de-DE'],
        tags: 'country-gb'
      }
    })
  })

  it('applies a valid slug to the query unchanged', async () => {
    await fetchPageContent('en-gb', 'beauty')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: expect.objectContaining({
        slug: 'beauty'
      })
    })
  })

  it('removes whitespace from start of slug', async () => {
    await fetchPageContent('en-gb', ' vitamins')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: expect.objectContaining({
        slug: 'vitamins'
      })
    })
  })

  it('removes whitespace from end of slug', async () => {
    await fetchPageContent('en-gb', 'supplements ')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: expect.objectContaining({
        slug: 'supplements'
      })
    })
  })

  // middle whitespaces should be captured as invalid by contentful
  it('leaves whitespace in the middle of slug', async () => {
    await fetchPageContent('en-gb', ' vitamins and supplements ')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: expect.objectContaining({
        slug: 'vitamins and supplements'
      })
    })
  })

  describe('with en-gb locale', () => {
    it('normalizes the response for a content page', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: contentfulPageContentGraphQL
      })
      const response = await fetchPageContent('pt-pt', '')
      expect(response).toEqual({ ...contentfulPageContentNormalized, slug: '' })
    })

    it('normalizes the response for a category page', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: contentfulCategoryPageGraphQL
      })
      const response = await fetchPageContent('pt-pt', '')
      expect(response).toEqual({
        ...categoryPagePOP,
        slug: 'medicines/digestion',
        isCampaignPage: false
      })
    })
  })

  describe('with pt-pt locale', () => {
    it('normalizes the response for a content page', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: contentfulPageContentGraphQL
      })
      const response = await fetchPageContent('pt-pt', '')
      expect(response).toEqual(contentfulPageContentNormalized)
    })

    it('normalizes the response for a category page', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: contentfulCategoryPageGraphQL
      })
      const response = await fetchPageContent('pt-pt', '')
      expect(response).toEqual(categoryPagePOP)
    })
  })

  it('throws a page not found error when page is not found', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: {
        data: { pageCollection: { items: [] } }
      }
    })
    expect.assertions(1)
    await fetchPageContent('en-gb', 'some-non-existent-page').catch(e =>
      expect(e).toEqual(
        new PageNotFoundError(
          'Page for slug some-non-existent-page not found in Contentful'
        )
      )
    )
  })
})
