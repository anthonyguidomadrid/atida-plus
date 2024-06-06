import { screen } from '@testing-library/react'
import { RewardsGrid } from '../RewardsGrid'
import { RewardsGroupProps } from '../types'
import { defaultGridRewards } from '../__mocks__/RewardsGroup'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useRouter } from 'next/router'

describe(RewardsGrid, () => {
  const defaultProps = {
    title: 'Some title',
    rewards: defaultGridRewards
  }

  const today = new Date()
  today.setHours(today.getHours() - 8)
  const previousMonth = new Date()
  previousMonth.setMonth(previousMonth.getMonth() - 1)
  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 1)

  const setup = (
    props: Partial<RewardsGroupProps> = {},
    isLargeFormat = true,
    welcomeGiftReward = {}
  ) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      locale: 'pt-pt'
    }))
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const component = renderWithStoreAndFeatureFlags(
      <RewardsGrid {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_LOYALTY_WELCOME_GIFT_RELEASE_DATE]: welcomeGiftReward
        }
      }
    )
    reset()
    return component
  }

  it('renders the title of the grid', async () => {
    setup()
    expect(screen.getByText('Some title')).toBeInTheDocument()
  })

  it('renders all the rewards', async () => {
    setup()
    expect(screen.getAllByTestId('rewardCard')).toHaveLength(3)
  })

  it('renders the "more rewards coming soon..." block as a rewardCard when the number of rewards is odd - Welcome Gift turned off', async () => {
    setup()
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).not.toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block as a rewardCard when the number of rewards is odd - Welcome Gift disabled on a specific country', async () => {
    setup({}, true, {
      'es-es': { release: today, expire: nextMonth }
    })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).not.toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block as a rewardCard when the number of rewards is odd - Welcome Gift expired on a specific country', async () => {
    setup({}, true, {
      'pt-pt': { release: previousMonth, expire: previousMonth }
    })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).not.toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block as a rewardCard when the number of rewards is odd - Welcome Gift is not released on a specific country yet', async () => {
    setup({}, true, {
      'pt-pt': { release: nextMonth, expire: nextMonth }
    })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).not.toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block at the botton when the number of rewards is even - Welcome Gift turned off', async () => {
    setup({ rewards: defaultGridRewards.slice(0, 2) })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block at the botton when the number of rewards is even - Welcome Gift disabled on a specific country', async () => {
    setup({ rewards: defaultGridRewards.slice(0, 2) }, true, {
      'es-es': { release: today, expire: nextMonth }
    })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block at the botton when the number of rewards is even - Welcome Gift expired on a specific country', async () => {
    setup({ rewards: defaultGridRewards.slice(0, 2) }, true, {
      'pt-pt': { release: previousMonth, expire: previousMonth }
    })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block at the botton when the number of rewards is even - Welcome Gift is not released on a specific country yet', async () => {
    setup({ rewards: defaultGridRewards.slice(0, 2) }, true, {
      'pt-pt': { release: nextMonth, expire: nextMonth }
    })
    expect(
      screen.queryByTestId('welcomeGiftRewardCard')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block as a rewardCard when the number of rewards is odd - Welcome Gift enabled', async () => {
    setup({}, true, {
      'pt-pt': { release: today, expire: nextMonth }
    })
    expect(screen.queryByTestId('welcomeGiftRewardCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).not.toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).toBeInTheDocument()
  })

  it('renders the "more rewards coming soon..." block at the botton when the number of rewards is even - Welcome Gift enabled', async () => {
    setup({ rewards: defaultGridRewards.slice(0, 2) }, true, {
      'pt-pt': { release: today, expire: nextMonth }
    })
    expect(screen.queryByTestId('welcomeGiftRewardCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewardsCard')).toBeInTheDocument()
    expect(screen.queryByTestId('moreRewards')).not.toBeInTheDocument()
  })

  it('renders the Welcome Gift if there are no basic rewards', async () => {
    const { container } = setup({ rewards: undefined }, true, {
      'pt-pt': { release: today, expire: nextMonth }
    })
    expect(container.childElementCount).toEqual(1)
    expect(screen.queryByTestId('welcomeGiftRewardCard')).toBeInTheDocument()
  })
})
