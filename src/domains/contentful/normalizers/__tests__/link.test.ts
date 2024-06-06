import { ContentfulLink, normalizeLink } from '../link'
import type { Link as GraphQLLink } from '~generated-graphql'

const restMock = ({
  fields: {
    icon: {
      fields: {
        ref: 'PaymentSepa'
      }
    },
    label: 'some label',
    url: '/someurl',
    content: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Including billing and pre-payment',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  }
} as unknown) as ContentfulLink

const graphQLMock = {
  __typename: 'Link',
  icon: {
    __typename: 'Icon',
    ref: 'PaymentSepa'
  },
  label: 'some label',
  url: '/someurl',
  content: {
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Including billing and pre-payment',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  }
} as GraphQLLink

describe(normalizeLink, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeLink(restMock)

      expect(normalizedData).toEqual({
        content: '<p>Including billing and pre-payment</p>',
        icon: 'PaymentSepa',
        label: 'some label',
        url: '/someurl'
      })
    })

    it('does not error if passed empty objet', () => {
      const normalizedData = normalizeLink({} as ContentfulLink)
      expect(normalizedData).toEqual({ content: '' })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeLink(graphQLMock)

      expect(normalizedData).toEqual({
        content: '<p>Including billing and pre-payment</p>',
        icon: 'PaymentSepa',
        label: 'some label',
        url: '/someurl'
      })
    })
  })
})
