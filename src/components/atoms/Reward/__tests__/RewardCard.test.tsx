import { render, screen } from '@testing-library/react'
import { RewardCard } from '../RewardCard'
import { RewardProps } from '../types'
import { defaultGridRewards } from '~components/molecules/RewardsGroup'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import userEvent from '@testing-library/user-event'

describe(RewardCard, () => {
  const defaultProps = defaultGridRewards[0]
  const onClick = jest.fn()
  const setup = (
    props: Partial<RewardProps> = {},
    isLargeFormat = true,
    isLoading = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const component = render(
      <RewardCard
        {...defaultProps}
        onClick={onClick}
        isLoading={isLoading}
        {...props}
      />
    )
    reset()
    return component
  }
  it('renders the title and the content', async () => {
    setup()
    expect(screen.getByText('Welcome gift')).toBeInTheDocument()
    expect(
      screen.getByText('We added 2,50 € discount to your next order')
    ).toBeInTheDocument()
  })

  describe('Claimed rewards', () => {
    it('renders right icons - Gift openned', async () => {
      setup({ openGift: true })
      expect(screen.getByTestId('claimedRewardGreenIcon')).toBeInTheDocument()
      expect(screen.getByTestId('claimedRewardSuccessIcon')).toBeInTheDocument()
    })

    it('renders right icons - Gift closed', async () => {
      setup({ openGift: false })
      expect(screen.getByTestId('claimedRewardIcon')).toBeInTheDocument()
      expect(screen.getByTestId('claimedRewardSuccessIcon')).toBeInTheDocument()
    })

    it('hides the button when no cta and onClick is passed', async () => {
      setup({ onClick: undefined, cta: undefined })
      expect(screen.queryByTestId('rewardCardButton')).not.toBeInTheDocument()
    })

    it('hides the button when no onClick is passed', async () => {
      setup({ onClick: undefined })
      expect(screen.queryByTestId('rewardCardButton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('rewardCardState')).toBeInTheDocument()
    })

    it('does not trigger on button click', async () => {
      const onClick = jest.fn()
      setup({ onClick })
      expect(onClick).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('rewardCardButton'))
      expect(onClick).toHaveBeenCalledTimes(0)
    })
  })

  describe('Unclaimed', () => {
    it('renders right icon', async () => {
      setup({ claimed: false })
      expect(screen.getByTestId('unclaimedRewardIcon')).toBeInTheDocument()
    })
    it('does not disables the button', async () => {
      setup({ claimed: false })
      expect(screen.getByTestId('rewardCardButton')).not.toHaveClass(
        'pointer-events-none text-primary-oxford-blue-20 sm:border-ui-grey-light'
      )
      expect(screen.getByTestId('rewardCardButton')).toHaveClass(
        'bg-primary-white'
      )
    })
    it('triggers on button click', async () => {
      const onClick = jest.fn()
      setup({ claimed: false, onClick })
      expect(onClick).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('rewardCardButton'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('On mobile', () => {
    it('place the contnet in the right order', () => {
      setup({}, false)
      expect(screen.getByTestId('rewardContent')).toHaveClass('flex-row')
    })
  })
  describe('On desktop', () => {
    it('place the contnet in the right order', () => {
      setup()
      expect(screen.getByTestId('rewardContent')).toHaveClass(
        'sm:flex-col-reverse'
      )
    })
  })

  describe('On Welcome Gift', () => {
    it('hides the button', () => {
      setup({ onClick: undefined })
      expect(screen.queryByTestId('rewardCardButton')).not.toBeInTheDocument()
    })
    it('hides the content when loading', () => {
      setup({}, true, true)
      expect(screen.queryByTestId('rewardContent')).not.toBeInTheDocument()
      expect(screen.queryByTestId('loadingSpinner')).toBeInTheDocument()
    })
  })
})
