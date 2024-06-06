import { ContentfulIcon, normalizeIcon } from '../icon'

describe(normalizeIcon, () => {
  describe('REST', () => {
    it('pulls out the icon reference', () => {
      expect(
        normalizeIcon({
          fields: {
            ref: 'SomeIcon'
          }
        } as ContentfulIcon)
      ).toEqual('SomeIcon')
    })

    it('returns undefined when iconReference not set', () => {
      expect(
        normalizeIcon({
          fields: {}
        } as ContentfulIcon)
      ).toEqual(undefined)
    })

    it('returns undefined when fields not returned', () => {
      expect(normalizeIcon({} as ContentfulIcon)).toEqual(undefined)
    })

    it('returns undefined when nothing is passed', () => {
      expect(normalizeIcon(undefined)).toEqual(undefined)
    })
  })

  describe('GraphQL', () => {
    it('pulls out the icon reference', () => {
      expect(
        normalizeIcon({
          __typename: 'Icon',
          ref: 'SomeIcon'
        })
      ).toEqual('SomeIcon')
    })

    it('returns undefined when iconReference not set', () => {
      expect(
        normalizeIcon({
          __typename: 'Icon'
        })
      ).toEqual(undefined)
    })
  })
})
