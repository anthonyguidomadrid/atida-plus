import { createStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { InfoLabelEnum } from '~domains/product'
import { rootReducer } from '~domains/redux'
import { InfoLabel } from '.'

const store = createStore(rootReducer, {})
describe(InfoLabel, () => {
  it('renders variant-specific classes', () => {
    render(
      <Provider store={store}>
        <InfoLabel variant={InfoLabelEnum.Promotion}>Some promo</InfoLabel>
        <InfoLabel variant={InfoLabelEnum.Address}>Some address</InfoLabel>
        <InfoLabel variant={InfoLabelEnum.AddressDisabled}>
          Some disabled address
        </InfoLabel>
      </Provider>
    )
    expect(screen.getByText('Some promo')).toHaveClass(
      'bg-secondary-portland-orange text-primary-white'
    )
    expect(screen.getByText('Some address')).toHaveClass(
      'bg-primary-caribbean-green-light text-primary-oxford-blue flex max-h-3'
    )
    expect(screen.getByText('Some disabled address')).toHaveClass(
      'text-primary-oxford-blue bg-ui-guyabano flex max-h-3'
    )
  })
})
