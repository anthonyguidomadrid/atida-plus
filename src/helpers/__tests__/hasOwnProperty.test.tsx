import { hasOwnProperty } from '../hasOwnProperty'

describe(hasOwnProperty, () => {
  it('The object has its own properties', () => {
    const obj = { a: 'a', b: 'b' }
    const prop = 'b'
    expect(hasOwnProperty(obj, prop)).toBeTruthy()
  })
  it('The object does not have its own properties', () => {
    const obj = { a: 'a', b: 'b' }
    const prop = 'c'
    expect(hasOwnProperty(obj, prop)).toBeFalsy()
  })
  it('If the object is null, it returns false', () => {
    const obj = null
    const prop = 'c'
    expect(hasOwnProperty(obj, prop)).toBeFalsy()
  })
})
