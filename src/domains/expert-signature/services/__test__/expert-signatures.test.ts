/**
 * @jest-environment node
 */
// @ts-ignore

import axios from 'axios'
import {
  expertSignatureCategoryIdContentfulResponseUndefined,
  expertSignatureContentfulResponse,
  expertSignatureContentfulResponseUndefined
} from '~domains/expert-signature/__mocks__/expert-signature'
import { fetchExpertSignatures } from '../expert-signatures'

describe(fetchExpertSignatures, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue(
      expertSignatureContentfulResponse
    )
  })

  it('passes the correct parameters to contentful request', async () => {
    await fetchExpertSignatures('pt-pt', 'beauty')

    expect(axios.post).toHaveBeenCalledWith('', {
      query: `
    query expertSignaturesCollectionQuery($locale: String!, $categoryId: String!) {
  expertSignatureCollection(
    locale: $locale
    where: {categories: {id: $categoryId}}
  ) {
    items {
      categories {
        id
        title
      }
      image {
        __typename
        title
        url
      }
      name
      jobTitle
      jobDescription
    }
  }
}
    `,
      variables: {
        locale: 'pt-PT',
        categoryId: 'beauty'
      }
    })
  })

  it('returns the normalized Expert Signature response', async () => {
    const response = await fetchExpertSignatures('pt-pt', 'beauty')
    expect(response).toEqual(
      expertSignatureContentfulResponse.data.data.expertSignatureCollection
    )
  })

  it('does not break when items is undefiend', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue(
      expertSignatureContentfulResponseUndefined
    )
    const response = await fetchExpertSignatures('pt-pt', '')
    expect(response).toStrictEqual({ items: [] })
  })

  it('throws a expertSignature not found error when expertSignature block is not found', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue(
      expertSignatureCategoryIdContentfulResponseUndefined
    )
    await fetchExpertSignatures('pt-pt', '').catch(e =>
      expect(e).toEqual(
        new Error('Expert Signature for categoryId not found in Contentful')
      )
    )
  })
})
