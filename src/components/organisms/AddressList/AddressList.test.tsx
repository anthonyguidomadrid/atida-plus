import { screen } from '@testing-library/react'
import { AddressList } from '.'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import {
  unsortedCustomerAddresses,
  unsortedCustomerAddressesISO801Compatible
} from '~domains/account/__mocks__/get-customer-addresses'
import { FeatureFlag } from '~config/constants/feature-flags'

describe('Address List - ISO8601 date format disabled', () => {
  beforeEach(() => {
    const { reset } = setupMatchMediaMock(false)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <RouterContext.Provider value={routerMock}>
        <AddressList
          locale={'es-es'}
          initialAddresses={unsortedCustomerAddresses}
          reference="ES-12345"
          companyName="Testing, Inc."
          isMinified={false}
          updateAddress={jest.fn()}
          deleteAddress={jest.fn()}
          updateIsPending={false}
          setIsAddressModalOpen={jest.fn()}
          setSelectedAddress={jest.fn()}
          setShowCheckoutNotification={jest.fn()}
        />
      </RouterContext.Provider>,
      {
        featureFlags: {
          [FeatureFlag.ADDRESS_ADDRESS_ISO8601_DATE_FORMAT]: false
        }
      }
    )
    reset()
    return renderedComponent
  })

  it('renders the Address List', async () => {
    expect(screen.getByTestId('addressList')).toBeInTheDocument()
  })

  it('renders the Address List items in the expected order', async () => {
    const addresses = screen.getAllByTestId('AddressSummaryTile-Address1')
    addresses.forEach((address, idx) => {
      expect(address).toHaveTextContent(`P${idx}`)
    })
  })
})

describe('Address List - ISO8601 date format enabled', () => {
  beforeEach(() => {
    const { reset } = setupMatchMediaMock(false)
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <RouterContext.Provider value={routerMock}>
        <AddressList
          locale={'es-es'}
          initialAddresses={unsortedCustomerAddressesISO801Compatible}
          reference="ES-12345"
          companyName="Testing, Inc."
          isMinified={false}
          updateAddress={jest.fn()}
          deleteAddress={jest.fn()}
          updateIsPending={false}
          setIsAddressModalOpen={jest.fn()}
          setSelectedAddress={jest.fn()}
          setShowCheckoutNotification={jest.fn()}
        />
      </RouterContext.Provider>,
      {
        featureFlags: {
          [FeatureFlag.ADDRESS_ADDRESS_ISO8601_DATE_FORMAT]: true
        }
      }
    )
    reset()
    return renderedComponent
  })

  it('renders the Address List', async () => {
    expect(screen.getByTestId('addressList')).toBeInTheDocument()
  })

  it('renders the Address List items in the expected order', async () => {
    const addresses = screen.getAllByTestId('AddressSummaryTile-Address1')
    addresses.forEach((address, idx) => {
      expect(address).toHaveTextContent(`P${idx}`)
    })
  })
})
