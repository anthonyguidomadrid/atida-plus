import { getSalePrice } from '..'

describe(getSalePrice, () => {
  const item = { sku: 'some-sku', sale: 1000 }
  const availableChannels = [
    { channel: 'amazon', price: 950 },
    { channel: 'idealo', price: 980 }
  ]
  const sessionChannel = { sku: 'some-sku', channel: 'amazon' }
  it('return the channel sale price', () => {
    expect(getSalePrice(item, availableChannels, sessionChannel)).toEqual(950)
  })
  it('return the default item price - no session channel', () => {
    expect(getSalePrice(item, availableChannels)).toEqual(1000)
  })
  it('return the default item price - no available channel', () => {
    expect(getSalePrice(item, undefined, sessionChannel)).toEqual(1000)
  })
  it('return the default item price - sku not in the session', () => {
    expect(
      getSalePrice(item, availableChannels, {
        ...sessionChannel,
        sku: 'other-sku'
      })
    ).toEqual(1000)
  })
  it('return the default item price - session channel not in the available channels', () => {
    expect(
      getSalePrice(item, availableChannels, {
        ...sessionChannel,
        channel: 'different-channel'
      })
    ).toEqual(1000)
  })
  it('return 0 if there is no channel or default prices', () => {
    expect(getSalePrice(undefined, undefined, undefined)).toEqual(0)
  })
})
