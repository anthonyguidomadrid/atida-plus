import { getAjsAnonymousIdName } from '../get-ajs-anonymous-id-name'

describe(getAjsAnonymousIdName, () => {
  it('returns a correctly formatted Segmnt cookie name', () => {
    expect(getAjsAnonymousIdName()).toEqual('ajs_anonymous_id')
  })
})
