import { FunctionComponent } from 'react'
import { RewardsGroupProps } from './types'
import { RewardTile } from '~components/atoms/Reward'
import { useTranslation } from 'react-i18next'
import { handleClaimReward } from './RewardsGroupHelpers'

export const RewardsList: FunctionComponent<RewardsGroupProps> = ({
  title,
  rewards,
  className
}) => {
  const { t } = useTranslation()

  if (!rewards || rewards.length === 0) return null

  return (
    <div className={className}>
      {title && (
        <h4 className="text-lg-xl font-semibold lg:text-2xl mb-2 sm:mb-3 lg:mb-4">
          {t(title)}
        </h4>
      )}
      <ul className="flex flex-col divide-y divide-ui-grey-lightest border border-ui-grey-lightest rounded-lg">
        {rewards.map((reward, index) => {
          return (
            <RewardTile
              key={`reward-list-item-${index}`}
              onClick={handleClaimReward(reward.type)}
              {...reward}
            />
          )
        })}
      </ul>
    </div>
  )
}
