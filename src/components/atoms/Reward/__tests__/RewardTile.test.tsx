import { render, screen } from '@testing-library/react'
import { RewardTile } from '../RewardTile'
import { RewardProps } from '../types'
import { defaultListRewards } from '~components/molecules/RewardsGroup'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import userEvent from '@testing-library/user-event'
import { useFormatPrice } from '~domains/product'

describe(RewardTile, () => {
  const defaultProps = defaultListRewards[1]
  const setup = (props: Partial<RewardProps> = {}, isLargeFormat = true) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const component = render(<RewardTile {...defaultProps} {...props} />)
    reset()
    return component
  }

  it('renders the title and the content', async () => {
    setup()
    expect(screen.getByText('Newsletter subscription')).toBeInTheDocument()
    expect(
      screen.getByText('With your first order you get free Atida Coins.')
    ).toBeInTheDocument()
  })

  it('renders the value of the reward', async () => {
    const formatPrice = useFormatPrice()
    setup()
    expect(
      screen.getByText(
        `+ ${formatPrice(defaultListRewards[1].value).withCurrency}`
      )
    ).toBeInTheDocument()
  })

  describe('Claimed rewards', () => {
    it('uses gray colors', async () => {
      setup()
      expect(screen.getByTestId('rewardTileIcon')).toHaveClass('bg-ui-black-5')
      expect(screen.getByTestId('rewardTileValueTag')).toHaveClass(
        'bg-ui-grey-dark'
      )
    })

    it('the check icon - Mobile', () => {
      setup({}, false)
      expect(screen.getByTestId('rewardCheckIcon')).toBeInTheDocument()
      expect(screen.getByTestId('rewardCheckIcon')).toHaveClass(
        'absolute -top-0.5 right-0.5 icon-24'
      )
    })

    it('the check icon - Desktop', () => {
      setup({}, true)
      expect(screen.getByTestId('rewardCheckIcon')).toBeInTheDocument()
      expect(screen.getByTestId('rewardCheckIcon')).toHaveClass(
        'icon-24 text-primary-oxford-blue sm:w-5 sm:h-5'
      )
    })

    it('disables the button - Mobile', async () => {
      const onClick = jest.fn()
      setup({ onClick }, false)
      expect(screen.getByTestId('rewardTileButtonMobile')).toHaveClass(
        'pointer-events-none text-ui-grey'
      )
      expect(onClick).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('rewardTileButtonMobile'))
      expect(onClick).toHaveBeenCalledTimes(0)
    })

    it('disables the button - Desktop', async () => {
      const onClick = jest.fn()
      setup({ onClick })
      expect(
        screen.queryByTestId('rewardTileButtonMobile')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('rewardCheckIcon')).toBeInTheDocument()
      expect(screen.queryByTestId('rewardCheckIcon')).toHaveClass(
        'icon-24 text-primary-oxford-blue sm:w-5 sm:h-5'
      )
    })
  })

  describe('Unclaimed', () => {
    it('uses green colors', async () => {
      setup({ claimed: false })
      expect(screen.getByTestId('rewardTileIcon')).toHaveClass(
        'bg-ui-carribean-green-lightest'
      )
      expect(screen.queryByTestId('rewardCheckIcon')).not.toBeInTheDocument()
      expect(screen.getByTestId('rewardTileValueTag')).toHaveClass(
        'bg-primary-caribbean-green-dark'
      )
    })
    it('does not disable the button - Mobile', async () => {
      const onClick = jest.fn()
      setup({ claimed: false, onClick }, false)
      expect(screen.getByTestId('rewardTileButtonMobile')).not.toHaveClass(
        'pointer-events-none text-ui-grey'
      )
      expect(screen.getByTestId('rewardTileButtonMobile')).toHaveClass(
        'text-primary-caribbean-green-dark'
      )
      expect(onClick).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('rewardTileButtonMobile'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not disable the button - Desktop', async () => {
      const onClick = jest.fn()
      setup({ claimed: false, onClick })
      expect(
        screen.queryByTestId('rewardTileButtonDesktop')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('rewardCheckIcon')).not.toBeInTheDocument()
      expect(onClick).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('rewardTileButtonDesktop'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
