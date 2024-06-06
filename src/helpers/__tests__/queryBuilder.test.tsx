import { buildQueryWithUrl } from '../queryBuilder'

describe(buildQueryWithUrl, () => {
  it('returns the url without params', () => {
    const url = 'SomeBaseUrl'
    const params = {}

    expect(buildQueryWithUrl(url, params)).toEqual('SomeBaseUrl')
  })

  it('returns the url with params', () => {
    const url = 'SomeBaseUrl'
    const params = {
      test_param: 'testParam',
      test_param2: 'testParam2'
    }

    expect(buildQueryWithUrl(url, params)).toEqual(
      'SomeBaseUrl?test_param=testParam&test_param2=testParam2'
    )
  })
})
