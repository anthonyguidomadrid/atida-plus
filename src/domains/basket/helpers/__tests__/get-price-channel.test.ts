import { getPriceChannel } from '../get-price-channel'
import { sprykerBasketWithPriceChannel } from '../../__mocks__/basket'
import { SprykerBasketItem } from '~domains/basket/types'

describe(getPriceChannel, () => {
  it('returns the correct channel', () => {
    expect(
      getPriceChannel(sprykerBasketWithPriceChannel.included, undefined)
    ).toEqual({ sku: '100000001', channel: 'some-channel' })
  })
  it('returns the mocked data when the FF is on', () => {
    expect(
      getPriceChannel(
        sprykerBasketWithPriceChannel.included as SprykerBasketItem[],
        {
          sku: 'some-sku',
          channel: 'some-chnnel'
        }
      )
    ).toEqual({
      sku: 'some-sku',
      channel: 'some-chnnel'
    })
  })

  it('does not break when there is no basket', () => {
    expect(getPriceChannel(undefined, undefined)).toEqual(undefined)
  })
})
