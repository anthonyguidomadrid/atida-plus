import {
  BasketNotification,
  BasketNotificationProps
} from './BasketNotification'

export default {
  component: BasketNotification,
  title: 'organisms/BasketNotification',
  args: {
    product: {
      brand: { code: 'adeephelan', label: 'AdeePhelan' },
      format: { code: 'smoothie', label: 'Smoothie' },
      image:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_.jpg',
      name: 'Chupete Fusion Suavinex Tetina Anatómica Látex -2-4m Verde',
      price: { currency: 'EUR', value: 10400 },
      pricePerUnit: { value: 10400, currency: 'EUR', unit: '100 ml' },
      rrp: { value: 15498, currency: 'EUR' },
      sku: '100000006',
      thumbnailImage:
        'https://www.mifarma.es/media/catalog/product/3/4/340073.verde_.jpg',
      unitVolume: { unit: 'MILLILITER', amount: 100 }
    },
    wasItemSuccess: true,
    isModalOpen: true
  }
}
export const addNotification = (args: BasketNotificationProps): JSX.Element => (
  <BasketNotification {...args} />
)

export const removeNotification = (
  args: BasketNotificationProps
): JSX.Element => (
  <BasketNotification
    {...{
      ...args,
      isRemoved: true
    }}
  />
)

export const addFailNotification = (
  args: BasketNotificationProps
): JSX.Element => (
  <BasketNotification
    {...{
      ...args,
      wasItemSuccess: false,
      wasItemError: true
    }}
  />
)

export const removeFailNotification = (
  args: BasketNotificationProps
): JSX.Element => (
  <BasketNotification
    {...{
      ...args,
      isRemoved: true,
      wasItemSuccess: false,
      wasItemError: true
    }}
  />
)
