import { getInitialIdShipmentMethod } from '../getInitialIdShipmentMethod'

describe(getInitialIdShipmentMethod, () => {
  it('Returns correct number when passed with pt-pt locale', () => {
    expect(getInitialIdShipmentMethod('pt-pt', false)).toEqual(3)
  })

  it('Returns correct number when passed with es-es locale and isTaxExempt is false', () => {
    expect(getInitialIdShipmentMethod('es-es', false)).toEqual(4)
  })

  it('Returns correct number when passed with es-es locale and isTaxExempt is true', () => {
    expect(getInitialIdShipmentMethod('es-es', true)).toEqual(5)
  })

  it('Returns correct number when default', () => {
    expect(getInitialIdShipmentMethod('default', false)).toEqual(3)
  })
})
