import { BasketProductModal, BasketProductModalProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: BasketProductModal,
  title: 'molecules/BasketProductModal',
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
    }
  }
}
const store = createStore(rootReducer, {})

export const basic = (args: BasketProductModalProps): JSX.Element => (
  <Provider store={store}>
    <BasketProductModal {...args} />
  </Provider>
)
