import { getUUIDName } from '../get-uuid-name'

describe(getUUIDName, () => {
  it('returns a correctly formatted UUID name', () => {
    expect(getUUIDName('pt-pt')).toEqual('atida-plus-pt-uuid')
  })
})
