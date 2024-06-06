import { getIpAddressLookupUrl, getMyIpAddress } from '../ip-address'

global.fetch = jest.fn().mockImplementationOnce(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ip: '127.0.0.1' })
  })
)

describe(getIpAddressLookupUrl, () => {
  it('returns the IP address lookup URL', () => {
    expect(getIpAddressLookupUrl()).toEqual('SomeIPAddressLookupURL')
  })
})

describe(getMyIpAddress, () => {
  it('returns the IP address', async () => {
    const ipAddress = await getMyIpAddress()

    expect(ipAddress).toEqual('127.0.0.1')
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
