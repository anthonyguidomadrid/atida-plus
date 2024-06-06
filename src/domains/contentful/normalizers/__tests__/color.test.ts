import { Color as GraphQLColor } from '~generated-graphql'
import { ContentfulColor, normalizeColor } from '../color'

describe(normalizeColor, () => {
  describe('REST', () => {
    it('pulls out the color reference', () => {
      expect(
        normalizeColor({
          fields: {
            ref: 'some-color'
          }
        } as ContentfulColor)
      ).toEqual('some-color')
    })

    it('returns undefined when colorReference not set', () => {
      expect(
        normalizeColor({
          fields: {}
        } as ContentfulColor)
      ).toEqual(undefined)
    })

    it('returns undefined when fields not returned', () => {
      expect(normalizeColor({} as ContentfulColor)).toEqual(undefined)
    })

    it('returns undefined when nothing is passed', () => {
      expect(normalizeColor(undefined)).toEqual(undefined)
    })
  })

  describe('GraphQL', () => {
    it('pulls out the color reference', () => {
      expect(
        normalizeColor({
          __typename: 'Color',
          ref: 'some-color'
        } as const)
      ).toEqual('some-color')
    })

    it('returns undefined when colorReference not set', () => {
      expect(
        normalizeColor({
          __typename: 'Color'
        } as GraphQLColor)
      ).toEqual(undefined)
    })
  })
})
