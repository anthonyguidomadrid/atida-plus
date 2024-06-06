import { RewardTypes } from '~components/atoms/Reward/types'

export const handleClaimReward = (type: RewardTypes): (() => void) => {
  // Depending on the type, we return a different method
  switch (type) {
    case 'basic':
    case 'advanced':
    default:
      return () => {
        // TODO: Update methods once the rewards service is ready
        return
      }
  }
}
