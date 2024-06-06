import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ExpertSignature } from '.'
import { rootReducer } from '~domains/redux'

export default {
  component: ExpertSignature,
  title: 'organisms/StaticRecommendationBlock'
}

const store = createStore(rootReducer, {})

store.getState().server.expertSignature.content.experts = [
  {
    image: {
      __typename: 'Asset',
      url:
        'https://images.ctfassets.net/7g2w796onies/5H3Op6BNoYzl5Vth0lO5XV/7371d29d8e999964aef1218cc3fd6a4f/remenavarro.jpg',
      title: 'Reme Navarro'
    },
    categories: {
      id: 'Beauty',
      title: 'Beauty'
    },
    name: 'Reme Navarro',
    jobTitle: 'Nutrition consultant from Atida',
    jobDescription:
      'Licenciada en Farmacia, Nutrición y Dietética. Nºcolegiado: 903'
  }
]

export const basic = (): JSX.Element => (
  <Provider store={store}>
    <ExpertSignature />
  </Provider>
)
