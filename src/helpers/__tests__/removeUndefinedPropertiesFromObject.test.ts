import { removeUndefinedPropertiesFromObject } from '../removeUndefinedPropertiesFromObject'

describe(removeUndefinedPropertiesFromObject, () => {
  it('filters out undefined properties from an object', () => {
    expect(
      removeUndefinedPropertiesFromObject({
        a: 'a',
        b: undefined,
        c: null,
        d: 'd'
      })
    ).toEqual({ a: 'a', c: null, d: 'd' })
  })
})
