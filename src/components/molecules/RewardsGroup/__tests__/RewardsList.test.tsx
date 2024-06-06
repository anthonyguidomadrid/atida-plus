import { render, screen } from '@testing-library/react'
import { RewardsList } from '../RewardsList'
import { RewardsGroupProps } from '../types'
import { defaultListRewards } from '../__mocks__/RewardsGroup'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'

describe(RewardsList, () => {
  const defaultProps = {
    title: 'Some title',
    rewards: defaultListRewards
  }
  const setup = (
    props: Partial<RewardsGroupProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const component = render(<RewardsList {...defaultProps} {...props} />)
    reset()
    return component
  }

  it('renders the title of the list', async () => {
    setup()
    expect(screen.getByText('Some title')).toBeInTheDocument()
  })

  it('renders all the rewards', async () => {
    setup()
    expect(screen.getAllByTestId('rewardTile')).toHaveLength(2)
  })

  it('does not render anything if there are no rewards', async () => {
    const { container } = setup({ rewards: undefined })
    expect(container.childElementCount).toEqual(0)
  })
})
