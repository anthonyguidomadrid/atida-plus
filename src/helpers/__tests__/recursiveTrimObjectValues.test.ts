import { recursiveTrimObjectValues } from '../recursiveTrimObjectValues'

describe(recursiveTrimObjectValues, () => {
  it('trims all the string values of an object', () => {
    const valuesWithSpaces = {
      name: '       name  ',
      address: {
        streetName: '    street name  ',
        number: '2  ',
        isDefaultAddress: true
      }
    }
    recursiveTrimObjectValues(valuesWithSpaces)
    expect(valuesWithSpaces).toEqual({
      name: 'name',
      address: {
        streetName: 'street name',
        number: '2',
        isDefaultAddress: true
      }
    })
  })

  it('does not trim the values of forbidden keys', () => {
    const valuesWithSpaces = {
      name: '       name  ',
      address: {
        streetName: '    street name  ',
        number: '2  ',
        isDefaultAddress: true
      },
      password: ' Test123! '
    }
    recursiveTrimObjectValues(valuesWithSpaces, { forbiddenKeys: ['password'] })
    expect(valuesWithSpaces).toEqual({
      name: 'name',
      address: {
        streetName: 'street name',
        number: '2',
        isDefaultAddress: true
      },
      password: ' Test123! '
    })
  })

  it('does not trim any values if all keys are forbidden', () => {
    const valuesWithSpaces = {
      name: '       name  ',
      address: {
        streetName: '    street name  ',
        number: '2  ',
        isDefaultAddress: true
      },
      password: ' Test123! '
    }
    recursiveTrimObjectValues(valuesWithSpaces, {
      forbiddenKeys: [
        'name',
        'streetName',
        'number',
        'isDefaultAddress',
        'password'
      ]
    })
    expect(valuesWithSpaces).toEqual({
      name: '       name  ',
      address: {
        streetName: '    street name  ',
        number: '2  ',
        isDefaultAddress: true
      },
      password: ' Test123! '
    })
  })

  it('does not break if an empty object is passed', () => {
    const emptyObject = {}
    recursiveTrimObjectValues(emptyObject)
    expect(emptyObject).toEqual({})
  })
})
