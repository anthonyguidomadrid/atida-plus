import { getExponeaEtcName } from '../get-exponea-etc-name'

describe(getExponeaEtcName, () => {
  it('returns a correctly formatted Exponea cookie name', () => {
    expect(getExponeaEtcName()).toEqual('__exponea_etc__')
  })
})
