import { render, screen } from '@testing-library/react'
import { NavigationItem, NavigationItemProps } from './index'
import { ReactComponent as Eye } from '~assets/svg/navigation-24px/Eye.svg'

describe(NavigationItem, () => {
  const defaultProps = {
    title: 'Overview',
    href: '/',
    isActive: true
  }
  const setup = (props: Partial<NavigationItemProps> = {}) =>
    render(<NavigationItem {...defaultProps} {...props} />)

  it('renders NavigationItem component', () => {
    setup()
    expect(screen.getByTestId('navigationItem')).toBeInTheDocument()
  })

  it('renders the navigation item as link', () => {
    setup()
    expect(screen.getByTestId('navigationItemLink')).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('can display an icon', () => {
    setup({ icon: <Eye aria-label="icon" /> })
    expect(screen.getByLabelText('icon')).toBeInTheDocument()
  })

  it('can display isActive border', () => {
    setup({ isTopMenuActive: true })
    expect(screen.getByTestId('isActiveBorder')).toBeInTheDocument()
  })

  it('can display tag', () => {
    setup({
      tag: (
        <span
          data-testid="navigationItemTag"
          className="h-2.5 ml-1 mb-0.25 pt-0.125 px-0.75 flex rounded-sm justify-center self-center text-primary-white text-xs bg-primary-caribbean-green"
        >
          New
        </span>
      )
    })
    expect(screen.getByTestId('navigationItemTag')).toBeInTheDocument()
  })
})
