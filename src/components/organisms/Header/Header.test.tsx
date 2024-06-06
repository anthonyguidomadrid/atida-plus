import { screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { Header, HeaderProps } from '.'
import { renderWithStoreAndFeatureFlags, setWindowSize } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

describe('Header', () => {
  const defaultProps = {
    basketItems: 2,
    favouritesCount: 3
  }
  const setup = (
    props: Partial<HeaderProps> = {},
    isLargeFormat = false,
    width = 1440,
    height = 500
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    setWindowSize({ width, height })
    renderWithStoreAndFeatureFlags(<Header {...props} />, {
      featureFlags: {
        [FeatureFlag.ACCOUNT_FAVOURITES_HEADER_NAVIGATION]: true,
        [FeatureFlag.NAVIGATION_STICKY_HEADER_MENU_ON_MOBILE]: true,
        [FeatureFlag.BF_COUNTDOWN_PENCIL_BANNER]: {
          on: true,
          endDate: '2022-12-24T00:00:00.000+02:00',
          url: '/bf-test-url'
        }
      }
    })
    reset()
  }

  it('renders as an accessible element', () => {
    setup()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the basket link as an accessible link', () => {
    setup()
    expect(screen.getByRole('link', { name: 'shared.basket' })).toHaveAttribute(
      'href',
      '/basket'
    )
  })

  it('does render the searchbar in the header component if it is not the homepage', () => {
    setup({ isFrontPage: false })
    expect(screen.queryAllByTestId('headerSearchBarWrapper')).toHaveLength(2)
  })

  it('does not render the searchbar in the header component if it is the homepage', () => {
    setup({ isFrontPage: true })
    expect(screen.queryByRole('search')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('headerSearchBarWrapper')
    ).not.toBeInTheDocument()
  })

  it('renders the favourites badge when favourites count is more than zero', () => {
    setup({ favouritesCount: 3 })
    expect(screen.getByTestId('favouritesBadge')).toBeInTheDocument()
  })

  it('does not render the favourites badge when favourites count is zero', () => {
    setup({ favouritesCount: 0 })
    expect(screen.queryByTestId('favouritesBadge')).not.toBeInTheDocument()
  })

  it('renders the basket badge', () => {
    setup({ basketItems: 2 })
    expect(screen.getByTestId('basketItems')).toHaveTextContent(
      `${defaultProps.basketItems}`
    )
  })

  it('renders the site navigation in the header', () => {
    setup()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the search icon', () => {
    setup()
    expect(screen.getByTestId('searchIcon')).toBeInTheDocument()
  })

  it('focus searchbar input when button clicked', () => {
    setup()
    userEvent.click(screen.getByTestId('searchIcon'))
    expect(screen.getByTestId('searchIcon')).toHaveFocus()
  })

  it('does redirect to /favourites when the customer is logged in', () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push
    }))

    setup({ isLoggedIn: true })
    userEvent.click(screen.getByTestId('favouritesIcon'))
    expect(push).toHaveBeenCalledWith('/favourites')
  })

  it('does redirect to /login/favourites when the customer is NOT logged in', () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push
    }))

    setup({ isLoggedIn: false })
    userEvent.click(screen.getByTestId('favouritesIcon'))
    expect(push).toHaveBeenCalledWith('/login/favourites')
  })

  describe('black friday pencil banner', () => {
    it('renders the Black Friday pencil banner, when the FFs on property is true', async () => {
      setup()

      // The red bf button always appears on the banner. We can use this to determine whether the banner is rendered or not
      const bfFakeButton = await screen.findByText(
        'campaign-promo.black-friday'
      )
      expect(bfFakeButton).toBeInTheDocument()
    })

    it('redirects to the BF landing page, when the banner is clicked', async () => {
      const push = jest.fn()
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        push
      }))
      setup()

      const bfFakeButton = await screen.findByText(
        'campaign-promo.black-friday'
      )
      await userEvent.click(bfFakeButton)

      expect(push).toHaveBeenCalledWith('/bf-test-url')
    })

    describe('renders a sales text and the button icon with "learn more" only on desktop', () => {
      it('on mobile', async () => {
        setup(
          {
            ...defaultProps
          },
          false,
          375
        )

        const salesText = await screen.queryByText('bf-pencil-banner.sale-ends')
        const learMore = await screen.queryByText('bf-pencil-banner.learn-more')
        expect(salesText).not.toBeInTheDocument()
        expect(learMore).not.toBeInTheDocument()
      })

      it('on desktop', async () => {
        setup(
          {
            ...defaultProps
          },
          true,
          1440
        )

        const salesText = await screen.queryByText('bf-pencil-banner.sale-ends')
        const learMore = await screen.queryByText('bf-pencil-banner.learn-more')
        expect(salesText).toBeInTheDocument()
        expect(learMore).toBeInTheDocument()
      })
    })
  })
})
