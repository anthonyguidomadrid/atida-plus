import { normalizeSubdivision } from '../normalizeSubdivision'

describe(normalizeSubdivision, () => {
  it('A Coruña', () => {
    expect(normalizeSubdivision('La Coruña', 'es-es')).toEqual('A Coruña')
  })
  it('Santa Cruz de Tenerife', () => {
    expect(normalizeSubdivision('Santa Cruz de Tenerife', 'es-es')).toEqual(
      'Santa Cruz De Tenerife'
    )
  })
  it('Islas Baleares', () => {
    expect(normalizeSubdivision('Islas Baleares', 'es-es')).toEqual('Baleares')
  })
  it('Gerona', () => {
    expect(normalizeSubdivision('Gerona', 'es-es')).toEqual('Girona')
  })
  it('Viana do Castelo', () => {
    expect(normalizeSubdivision('Viana do Castelo', 'pt-pt')).toEqual(
      'Viana Do Castelo'
    )
  })
  it('When non special spanish subdivision', () => {
    expect(normalizeSubdivision('Albacete', 'es-es')).toEqual('Albacete')
  })
  it('When non special portuguese subdivision', () => {
    expect(normalizeSubdivision('Lisboa', 'pt-pt')).toEqual('Lisboa')
  })
  it('When undefined subdivision', () => {
    expect(normalizeSubdivision(undefined, 'es-es')).toEqual('')
  })
  it('When undefined locale', () => {
    expect(normalizeSubdivision('Lisboa', undefined)).toEqual('Lisboa')
  })
})
