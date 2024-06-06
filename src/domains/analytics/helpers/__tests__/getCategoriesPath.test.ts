import { getCategoriesPath } from '../getCategoriesPath'

describe(getCategoriesPath, () => {
  it('returns the proper format string when object has all expected levels', () => {
    expect(
      getCategoriesPath({
        lvl0: ['category0'],
        lvl1: ['category1'],
        lvl2: ['category2']
      })
    ).toEqual('category0/category1/category2')
  })
  it('returns the proper format string when object has only 2 levels', () => {
    expect(
      getCategoriesPath({
        lvl0: ['category0'],
        lvl1: ['category1']
      })
    ).toEqual('category0/category1')
  })
  it('returns the incorrect format string when object does not have arrays as values', () => {
    expect(
      getCategoriesPath({
        lvl0: 'category0',
        lvl1: 'category1',
        lvl2: 'category2'
      })
    ).toEqual('c/c/c')
  })
  it('returns an empty string when the object is empty', () => {
    expect(getCategoriesPath({})).toEqual('')
  })
  it('returns undefined when an undefined argument is sent', () => {
    expect(getCategoriesPath(undefined)).toEqual(undefined)
  })
})
