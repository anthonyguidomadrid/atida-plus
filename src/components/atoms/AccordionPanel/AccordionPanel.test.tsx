import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AccordionPanel, AccordionPanelProps } from './AccordionPanel'
import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/NavBasket.svg'

describe(AccordionPanel, () => {
  const setup = (props: Partial<AccordionPanelProps> = {}) =>
    render(
      <AccordionPanel heading="Expand me" {...props}>
        <p>Some content that can be expanded</p>
      </AccordionPanel>
    )

  it('should render a string title', () => {
    setup()
    expect(screen.getByText('Expand me')).toBeInTheDocument()
  })

  it('should render a component title', () => {
    setup({
      heading: <span>Click this component</span>
    })
    expect(screen.getByText('Click this component')).toBeInTheDocument()
  })

  it('should render the content', () => {
    setup()
    expect(
      screen.getByText('Some content that can be expanded')
    ).toBeInTheDocument()
  })

  it('should call onClick handler', () => {
    const onClick = jest.fn()
    setup({ onClick })

    userEvent.click(screen.getByText('Expand me'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should not have open attribute', () => {
    setup()
    expect(
      screen.getByText('Expand me').closest('details')
    ).not.toHaveAttribute('open')
  })

  it('should pass through open state', () => {
    setup({ open: true })
    expect(screen.getByText('Expand me').closest('details')).toHaveAttribute(
      'open'
    )
  })

  it('should reveal the content when title is clicked', () => {
    setup()
    expect(
      screen.getByText('Some content that can be expanded')
    ).not.toBeVisible()
    userEvent.click(screen.getByText('Expand me'))
    expect(screen.getByText('Some content that can be expanded')).toBeVisible()
  })

  it('can display an icon', () => {
    setup({
      icon: <NavBasket aria-label="icon" />
    })
    expect(screen.getByLabelText('icon')).toBeInTheDocument()
  })
  it('only renders bold title when needed', () => {
    setup({
      isBold: false
    })
    expect(
      screen.getByTestId('dropdownWithContent').firstChild
    ).not.toHaveClass('font-semibold')
  })

  it('displays circledNumber when isUsedForCoupon is true and badge is not zero', () => {
    setup({ badge: 1, isUsedForCoupon: true })
    expect(screen.getByTestId('circledNumber')).toBeInTheDocument()
  })
  it('does not display circledNumber when badge is undefined', () => {
    setup({ isUsedForCoupon: true })
    expect(screen.queryByTestId('circledNumber')).not.toBeInTheDocument()
  })
  it('does not display circledNumber when isUsedForCoupon is false', () => {
    setup({ badge: 1 })
    expect(screen.queryByTestId('circledNumber')).not.toBeInTheDocument()
  })
})
