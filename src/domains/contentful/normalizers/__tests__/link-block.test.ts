import { normalizeLinkBlock } from '../link-block'
import type { LinkBlockFragment } from '~generated-graphql'

const graphQLMock = {
  __typename: 'LinkBlock',
  link: {
    __typename: 'Link',
    icon: {
      __typename: 'Icon',
      ref: 'PlusLarge'
    },
    label: 'Some Button',
    url: '/someurl'
  },
  isCTA: true
} as LinkBlockFragment

describe(normalizeLinkBlock, () => {
  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeLinkBlock(graphQLMock)

      expect(normalizedData).toEqual({
        contentType: 'LinkBlock',
        label: 'Some Button',
        url: '/someurl',
        icon: 'PlusLarge'
      })
    })
    it('does not error if passed empty objet', () => {
      const normalizedData = normalizeLinkBlock({} as LinkBlockFragment)
      expect(normalizedData).toEqual({ contentType: 'LinkBlock' })
    })
  })
})
