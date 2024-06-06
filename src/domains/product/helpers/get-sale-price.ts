import { SessionChannelType } from '~domains/basket/types'
import { ChannelPrice } from '../types'

export const getSalePrice = (
  item?: { sku?: string; sale?: number },
  availableChannels?: ChannelPrice[],
  sessionChannel?: SessionChannelType
): number => {
  if (!sessionChannel || !availableChannels) return item?.sale ?? 0
  if (item?.sku !== sessionChannel?.sku) return item?.sale ?? 0
  return (
    availableChannels.find(
      availableChannel => availableChannel.channel === sessionChannel.channel
    )?.price ??
    item.sale ??
    0
  )
}
