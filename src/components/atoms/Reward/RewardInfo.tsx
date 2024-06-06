import { FunctionComponent, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { Product } from '~domains/product'
import { CalculateProductReward } from '~helpers/calculateProductReward'
import { ReactComponent as Coins } from '~assets/svg/navigation-24px/Coins.svg'
import { useTranslation } from 'react-i18next/'

export type RewardInfoProps = {
  product: Partial<Product>
}

export type rewardsInfoType = {
  [key: string]: {
    brands: {
      [key: string]: number
    }[]
    categories: {
      [key: string]: number
    }[]
    products: {
      [key: string]: number
    }[]
    base: number
  }
}

export const RewardInfo: FunctionComponent<RewardInfoProps> = ({ product }) => {
  const { t } = useTranslation()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const rewardInfo = CalculateProductReward(product)

  const rewardPercentage = useMemo(
    () => rewardInfo && `${rewardInfo.rewardPercentage}%`,
    [rewardInfo]
  )

  const rewardCashSaved = useMemo(
    () => rewardInfo && `+${rewardInfo.cashSaved}`,
    [rewardInfo]
  )

  if (!rewardInfo || rewardInfo.rewardPercentage === 0) return null

  return (
    <div
      className="flex flex-col gap-1 bg-ui-carribean-green-lightest p-3 rounded-md"
      data-testid="rewards-info"
    >
      <div className="flex flex-row gap-1">
        <Coins className="icon-24" />
        <p className="font-semibold" data-testid="reward-info-title">
          {t('loyalty.reward-info.title', {
            rewardPercentage,
            rewardCashSaved
          })}
        </p>
      </div>
      {!isLoggedIn && (
        <p data-testid="reward-info-description">
          {t('loyalty.reward-info.description')}
        </p>
      )}
    </div>
  )
}
