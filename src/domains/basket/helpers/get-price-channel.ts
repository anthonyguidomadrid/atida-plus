import { SprykerBasketItem, SessionChannelType } from '../types'

export const getPriceChannel = (
  basket?: SprykerBasketItem[],
  useMockedData?: SessionChannelType
) => {
  if (!basket) return
  if (useMockedData && Object.keys(useMockedData).length > 0) {
    return useMockedData
  }
  const priceChannel = {} as SessionChannelType
  basket.some(item => {
    if (Object.keys(item.attributes).includes('price_channel')) {
      priceChannel.channel = item.attributes.price_channel ?? ''
      priceChannel.sku = item.attributes.sku
      return
    }
  })

  return Object.keys(priceChannel).length === 0 ? undefined : priceChannel
}
