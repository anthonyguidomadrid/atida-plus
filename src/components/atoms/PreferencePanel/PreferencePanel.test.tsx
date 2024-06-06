import { render, screen, waitFor } from '@testing-library/react'
import { PreferencePanel, PreferencePanelProps } from './index'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { ReactNode } from 'react'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe(PreferencePanel, () => {
  const defaultProps = {
    title: 'Change personal details',
    href: '/'
  }
  const setup = (
    props: Partial<PreferencePanelProps> = {},
    isLargeFormat = false,
    children: ReactNode | null = null
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const component = render(
      <PreferencePanel {...defaultProps} {...props}>
        {children}
      </PreferencePanel>
    )
    reset()
    return component
  }

  it('renders PreferencePanel component', () => {
    setup()
    expect(screen.getByTestId('preference-panel')).toBeInTheDocument()
  })

  it('renders the preference panel as a link', () => {
    setup()
    expect(screen.getByTestId('preference-panel-link')).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('can display an icon', () => {
    setup({ icon: <NavUser aria-label="icon" /> })
    expect(screen.getByLabelText('icon')).toBeInTheDocument()
  })

  it('can display a children', () => {
    const children = <span data-testid="child-element" />
    setup({}, false, children)
    expect(screen.getByTestId('child-element')).toBeInTheDocument()
  })

  it('can display a tag', () => {
    setup({
      tag: (
        <span
          data-testid="navigationItemIsNewTag"
          className="h-2.5 ml-1 mb-0.25 pt-0.125 px-0.75 flex rounded-sm justify-center self-center text-primary-white text-xs bg-primary-caribbean-green"
        >
          New
        </span>
      )
    })
    expect(screen.getByTestId('navigationItemIsNewTag')).toBeInTheDocument()
  })

  it('displays the cash balance - Desktop', async () => {
    setup(
      {
        cashBalance: '3,00 €'
      },
      true
    )
    waitFor(() => {
      expect(screen.getByTestId('cashBalanceAmount')).toBeInTheDocument()
      expect(
        screen.queryByText('account.my-cash-balance.balance-title')
      ).toBeInTheDocument()
    })
  })

  it('displays the cash balance - Mobile', () => {
    setup({
      cashBalance: '3,00 €'
    })
    expect(screen.getByTestId('cashBalanceAmount')).toBeInTheDocument()
    expect(
      screen.queryByText('account.my-cash-balance.balance-title')
    ).not.toBeInTheDocument()
  })
})
