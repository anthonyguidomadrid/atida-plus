import { normalizeStaticHeaderBlock } from '../static-header-block'

//eslint-disable-next-line
const restMock: any = {
  contentType: {
    sys: {
      id: 'staticHeaderBlock'
    }
  },
  fields: {
    title: 'Terms and conditions'
  }
}

//eslint-disable-next-line
const graphQLMock: any = {
  __typename: 'StaticHeaderBlock',
  title: 'Terms and conditions'
} as const

const expected = {
  contentType: 'StaticHeaderBlock',
  title: 'Terms and conditions'
}

describe(normalizeStaticHeaderBlock, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      //@ts-ignore
      const normalizedData = normalizeStaticHeaderBlock(restMock)
      expect(normalizedData).toEqual(expected)
    })
  })
  describe('GraphQL', () => {
    it('normalized the data', () => {
      const normalizedData = normalizeStaticHeaderBlock(graphQLMock)
      expect(normalizedData).toEqual(expected)
    })
  })
})
