import { screen } from '@testing-library/react'
import { AddressFormModalLayout, AddressFormModalLayoutProps } from '.'
import { renderWithStore } from '~test-helpers'
import { fireEvent } from '@testing-library/dom'

describe(AddressFormModalLayout, () => {
  const setIsAddressModalOpen = jest.fn()
  const defaultProps = {
    title: 'Test title',
    isOpen: true,
    setIsAddressModalOpen: setIsAddressModalOpen
  }

  const setup = (props: Partial<AddressFormModalLayoutProps> = {}) =>
    renderWithStore(<AddressFormModalLayout {...defaultProps} {...props} />)

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('AddressFormModalLayout')).toBeInTheDocument()
  })

  it('renders the close button', () => {
    setup()
    expect(
      screen.getByTestId('closeAddressFormModalLayout')
    ).toBeInTheDocument()
  })

  it('closes when the close button is clicked', () => {
    setup()
    const button = screen.getByTestId('closeAddressFormModalLayout')
    expect(setIsAddressModalOpen).toHaveBeenCalledTimes(0)
    fireEvent.click(button)
    expect(setIsAddressModalOpen).toHaveBeenCalledTimes(1)
  })
})
