import { fireEvent, screen } from '@testing-library/react'
import {
  addressNoDefault,
  addressDefaultShipping,
  addressDefaultBilling,
  addressDefaultShippingAndBilling
} from './AddressSummaryTile.mock'
import { AddressSummaryTile, AddressSummaryTileProps } from '.'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { Address } from '~domains/checkout/types'
import { renderWithStore } from '~test-helpers'
import userEvent from '@testing-library/user-event'
import { DeleteAddressItemState } from '~domains/address'
import { useRouter } from 'next/router'

describe(AddressSummaryTile, () => {
  const defaultProps = {
    reference: 'test123',
    updateAddress: jest.fn(),
    deleteAddress: jest.fn(),
    updateIsPending: false,
    setIsAddressModalOpen: jest.fn(),
    setSelectedAddress: jest.fn(),
    setShowCheckoutNotification: jest.fn()
  }

  const setup = (
    address: Partial<Address>,
    props: Partial<AddressSummaryTileProps>,
    isDisabled: boolean,
    isLargeFormat = true,
    deletedItems?: DeleteAddressItemState[]
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <AddressSummaryTile
        address={address}
        {...defaultProps}
        {...props}
        isDisabled={isDisabled}
      />,
      {
        initialState: {
          client: {
            address: {
              'delete-address': {
                isLoading: false,
                wasSuccess: true,
                wasError: false,
                items: deletedItems
              }
            }
          }
        }
      }
    )
    reset()
    return renderedComponent
  }

  it('renders the Address Summary Tile', () => {
    setup(addressNoDefault, defaultProps, false, true)
    expect(screen.queryByTestId('AddressSummaryTile')).toBeInTheDocument()
  })

  it('renders appropriate default buttons when default delivery and not default billing', () => {
    setup(addressDefaultShipping, defaultProps, false, true)
    expect(screen.queryByTestId('setAsDefaultDelivery')).not.toBeInTheDocument()
    expect(screen.queryByTestId('setAsDefaultBilling')).toBeInTheDocument()
  })

  it('renders appropriate default buttons when default billing and not default delivery', () => {
    setup(addressDefaultBilling, defaultProps, false, true)
    expect(screen.queryByTestId('setAsDefaultDelivery')).toBeInTheDocument()
    expect(screen.queryByTestId('setAsDefaultBilling')).not.toBeInTheDocument()
  })

  it('renders set as default shipping button and billing button if not currently defaults', () => {
    setup(addressNoDefault, defaultProps, false, true)
    expect(screen.queryByTestId('setAsDefaultDelivery')).toBeInTheDocument()
    expect(screen.queryByTestId('setAsDefaultBilling')).toBeInTheDocument()
  })

  it('does not render set as default shipping button or billing button if currently default', () => {
    setup(addressDefaultShippingAndBilling, defaultProps, false, true)
    expect(screen.queryByTestId('setAsDefaultDelivery')).not.toBeInTheDocument()
    expect(screen.queryByTestId('setAsDefaultBilling')).not.toBeInTheDocument()
  })

  it('renders the delete button', () => {
    setup(addressDefaultShippingAndBilling, defaultProps, false, true)
    expect(screen.queryByTestId('deleteAddressButton')).toBeInTheDocument()
  })

  it('renders the delete button as enabled when no default shipping or billing defined', () => {
    setup(addressNoDefault, defaultProps, false, true)
    expect(screen.queryByTestId('deleteAddressButton')).not.toHaveClass(
      'text-ui-grey'
    )
  })

  it('renders the delete button as disabled if the current item is set as default shipping', () => {
    setup(addressDefaultShipping, defaultProps, false, true)
    expect(screen.queryByTestId('deleteAddressButton')).toHaveClass(
      'text-ui-grey'
    )
  })

  it('renders the delete button as disabled if the current item is set as default billing', () => {
    setup(addressDefaultShipping, defaultProps, false, true)
    expect(screen.queryByTestId('deleteAddressButton')).toHaveClass(
      'text-ui-grey'
    )
  })

  it('calls the deleteAddress when clicking on the delete button', () => {
    setup(addressNoDefault, defaultProps, false, true)
    expect(defaultProps.deleteAddress).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('deleteAddressButton'))
    expect(defaultProps.deleteAddress).toHaveBeenCalledTimes(1)
  })

  it('calls the setIsAddressModalOpen when clicking on the edit button', () => {
    setup(addressNoDefault, defaultProps, false, true)
    expect(defaultProps.setIsAddressModalOpen).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('editAddressButton'))
    expect(defaultProps.setIsAddressModalOpen).toHaveBeenCalledTimes(1)
  })

  it('calls the setShowCheckoutNotification when clicking on the edit button', () => {
    setup(addressNoDefault, defaultProps, false, true)
    expect(defaultProps.setShowCheckoutNotification).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('editAddressButton'))
    expect(defaultProps.setShowCheckoutNotification).toHaveBeenCalledTimes(1)
  })

  it('calls the setSelectedAddress when clicking on the edit button', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: undefined,
      locale: 'es-es'
    }))

    setup(addressNoDefault, defaultProps, false, true)
    expect(defaultProps.setSelectedAddress).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('editAddressButton'))
    expect(defaultProps.setSelectedAddress).toHaveBeenCalledTimes(1)
    expect(defaultProps.setSelectedAddress).toHaveBeenCalledWith({
      id: 'some-address-id',
      firstName: 'Julia',
      lastName: 'Lopez',
      address1: 'Avenida Marconi 4C',
      houseNumber: undefined,
      addition: undefined,
      zipCode: '1000-205',
      city: 'Lisbon',
      subdivision: 'Test province',
      country: 'Portugal',
      isDefaultShipping: false,
      isDefaultBilling: false
    })
  })

  it('calls the setSelectedAddress with expected payload when clicking on the edit button', () => {
    setup(addressNoDefault, defaultProps, false, true)
    userEvent.click(screen.getByTestId('editAddressButton'))
    expect(defaultProps.setSelectedAddress).toHaveBeenCalledTimes(1)
  })

  it('renders the edit button', () => {
    setup(addressDefaultShippingAndBilling, defaultProps, false, true)
    expect(screen.queryByTestId('editAddressButton')).toBeInTheDocument()
  })

  it('does not render the Delete button, the Edit button, the set as default shipping button and billing button if disabled', () => {
    setup(addressNoDefault, defaultProps, true, true)
    expect(screen.queryByTestId('deleteAddressButton')).not.toBeInTheDocument()
    expect(screen.queryByTestId('editAddressButton')).not.toBeInTheDocument()
    expect(screen.queryByTestId('setAsDefaultDelivery')).not.toBeInTheDocument()
    expect(screen.queryByTestId('setAsDefaultBilling')).not.toBeInTheDocument()
  })

  it('disables the address tile if disabled', () => {
    setup(addressNoDefault, defaultProps, true, true)
    expect(screen.queryByTestId('AddressSummaryTile')).toHaveClass(
      'opacity-50 pointer-events-none'
    )
  })

  it('shows the company name when passed as a prop', () => {
    setup(
      addressNoDefault,
      { ...defaultProps, companyName: 'Company Name' },
      false,
      false
    )
    expect(screen.getByText('Company Name')).toBeInTheDocument()
  })

  it('shows the first name when last name is missing', () => {
    setup(
      { ...addressNoDefault, firstName: 'First Name', lastName: undefined },
      { ...defaultProps },
      false,
      false
    )
    expect(screen.getByText('First Name')).toBeInTheDocument()
  })

  it('shows the last name when first name is missing', () => {
    setup(
      { ...addressNoDefault, firstName: undefined, lastName: 'Last Name' },
      { ...defaultProps },
      false,
      false
    )
    expect(screen.getByText('Last Name')).toBeInTheDocument()
  })

  it('shows the loading animation when deleting an item', () => {
    setup(
      { ...addressNoDefault, firstName: undefined, lastName: 'Last Name' },
      { ...defaultProps },
      false,
      false,
      [
        {
          id: 'some-address-id',
          isLoading: true,
          wasSuccess: false,
          wasError: false
        }
      ]
    )
    expect(screen.getByTestId('deleteAddressButton')).toHaveClass(
      'button--loading'
    )
  })

  it('does not display the address form modal layout when pressing any key on the tile', () => {
    setup({ ...addressNoDefault }, { ...defaultProps }, false, false)
    fireEvent.keyDown(screen.getByTestId('AddressSummaryTile'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13
    })
    expect(
      screen.queryByTestId('AddressFormModalLayout')
    ).not.toBeInTheDocument()
  })

  it('calls the updateAddress when clicking on setAsDefaultDelivery button', () => {
    setup({ ...addressNoDefault }, { ...defaultProps }, false, false)
    userEvent.click(screen.getByTestId('setAsDefaultDelivery'))
    expect(defaultProps.updateAddress).toHaveBeenCalledTimes(1)
  })

  it('calls the updateAddress when clicking on setAsDefaultBilling button', () => {
    setup({ ...addressNoDefault }, { ...defaultProps }, false, false)
    userEvent.click(screen.getByTestId('setAsDefaultBilling'))
    expect(defaultProps.updateAddress).toHaveBeenCalledTimes(1)
  })
})
