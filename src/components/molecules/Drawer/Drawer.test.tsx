import { render, screen } from '@testing-library/react'
import { Drawer, DrawerProps } from './index'

describe(Drawer, () => {
  const defaultProps = {
    title: 'My account',
    onClickCloseIcon: jest.fn()
  }

  const setup = (props: Partial<DrawerProps> = {}) =>
    render(<Drawer {...defaultProps} {...props} />)

  it('renders Drawer component', () => {
    setup()
    expect(screen.getByTestId('drawer')).toBeInTheDocument()
  })

  it('it renders drawer header if title is not passed', () => {
    setup({ title: undefined })
    expect(screen.getByTestId('drawerHeader')).toBeInTheDocument()
  })
})
