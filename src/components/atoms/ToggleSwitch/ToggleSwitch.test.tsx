import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToggleSwitch } from '.'

describe(ToggleSwitch, () => {
  const onClick = jest.fn(() => {
    defaultProps.toggleEnabled = !defaultProps.toggleEnabled
  })
  const defaultProps = {
    isToggleLocked: false,
    toggleEnabled: true,
    isLoading: false,
    onToggleSwitch: onClick
  }

  const setup = (props = {}) =>
    render(<ToggleSwitch {...defaultProps} {...props} />)

  it('renders toggle switch and turn it off when clicking the switch', () => {
    const tester = setup({ toggleEnabled: true })
    userEvent.click(screen.getByTestId('toggleSwitchButton'))
    tester.rerender(<ToggleSwitch {...defaultProps} />)
    expect(screen.getByTestId('toggleSwitchOff')).toBeInTheDocument()
  })

  it('renders toggle switch', () => {
    setup()
    expect(screen.getByTestId('toggleSwitch')).toBeInTheDocument()
  })

  it('renders and show the loading state of toggle', () => {
    setup({ isLoading: true })
    expect(screen.getByTestId('buttonLoadingSpinner')).toBeInTheDocument()
  })

  it('renders locked and enabled switch', () => {
    setup({ isToggleLocked: true })

    expect(screen.getByTestId('toggleSwitchDisabledIcon')).toBeInTheDocument()
    expect(screen.getByTestId('toggleSwitchButton')).toHaveClass(
      'cursor-not-allowed bg-ui-grey-light'
    )
  })
})
