import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { RewardsGroupProps } from './types'
import { RewardCard } from '~components/atoms/Reward'
import classNames from 'classnames'
import { ReactComponent as Gift } from '~assets/svg/navigation-24px/Gift.svg'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useTranslation } from 'react-i18next'
import { handleClaimReward } from './RewardsGroupHelpers'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomerDetails,
  selectCustomerReference
} from '~domains/account/selectors/customer'
import {
  getCustomerTrigger,
  orderHistoryTrigger,
  customerSelectors
} from '~domains/account'
import { selectAllNotCancelledOrdersFromHistory } from '~domains/account/selectors/order-history'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useRouter } from 'next/router'

type WelcomeGiftRewardProps =
  | {
      title: string
      content: string
      claimed: boolean
      openGift?: boolean
      cta?: string
      onClick?: () => void
    }
  | boolean

type WelcomeGiftReleaseDateProp = {
  [key: string]: { release: string; expire: string }
}

const WELCOME_GIFT_REWARD_TITLE = 'account.loyalty.welcome-gift-reward.title'
const WELCOME_GIFT_REWARD_CONTENT_NOT_CLAIMED =
  'account.loyalty.welcome-gift-reward.content-not-claimed'
const WELCOME_GIFT_REWARD_CONTENT_CLAIMED =
  'account.loyalty.welcome-gift-reward.content-claimed'
const WELCOME_GIFT_REWARD_CONTENT_USED =
  'account.loyalty.welcome-gift-reward.content-used'
const WELCOME_GIFT_REWARD_CTA = 'account.loyalty.welcome-gift-reward.cta'

export const RewardsGrid: FunctionComponent<RewardsGroupProps> = ({
  title,
  rewards,
  className
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const isTablet = useBreakpoint(breakpoints.sm)
  const [
    welcomeGiftRewardState,
    setWelcomeGiftRewardState
  ] = useState<WelcomeGiftRewardProps>(false)

  const customer = useSelector(selectCustomerDetails)
  const selectCustomerWassSuccess = useSelector(
    customerSelectors.selectWasSuccess
  )
  const selectCustomerIsLoading = useSelector(customerSelectors.selectIsLoading)

  const customerDate = useMemo(() => new Date(customer?.createdAt ?? ''), [
    customer
  ])
  const customerReference = useSelector(selectCustomerReference)
  const orderHistory = useSelector(selectAllNotCancelledOrdersFromHistory)

  const welcomeGiftReleaseDate = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_WELCOME_GIFT_RELEASE_DATE
  ) as WelcomeGiftReleaseDateProp

  const currentDate = useMemo(() => new Date(), [])
  const releaseDate = useMemo(
    () => new Date(welcomeGiftReleaseDate[locale ?? '']?.release),
    [locale, welcomeGiftReleaseDate]
  )

  const isNewCustomer = releaseDate < customerDate

  const expirationDate = useMemo(() => {
    const firstOrderDate = orderHistory?.[0]?.unFormattedDate
    const date = new Date(firstOrderDate ?? '')
    return new Date(
      isNewCustomer
        ? firstOrderDate
          ? date.setFullYear(date.getFullYear() + 1)
          : new Date('2099-01-01') // If there are no orders, dont expire it
        : welcomeGiftReleaseDate[locale ?? '']?.expire
    )
  }, [locale, welcomeGiftReleaseDate, isNewCustomer, orderHistory])

  const isReleased = useMemo(() => currentDate > releaseDate, [
    currentDate,
    releaseDate
  ])
  const isWelcomeGiftExpired = useMemo(() => currentDate > expirationDate, [
    currentDate,
    expirationDate
  ])

  const shouldRenderWelcomeGift = useMemo(
    () =>
      (welcomeGiftReleaseDate[locale ?? '']?.release &&
        welcomeGiftReleaseDate[locale ?? '']?.expire &&
        !isWelcomeGiftExpired &&
        isReleased) ||
      selectCustomerIsLoading,
    [
      welcomeGiftReleaseDate,
      isWelcomeGiftExpired,
      isReleased,
      selectCustomerIsLoading,
      locale
    ]
  )

  const shouldRenderRewards = useMemo(
    () => (rewards && rewards.length > 0) || shouldRenderWelcomeGift,
    [rewards, shouldRenderWelcomeGift]
  )

  const handleWelcomeGiftRewardState = useCallback((): WelcomeGiftRewardProps => {
    if (isNewCustomer) {
      if (
        orderHistory &&
        orderHistory?.length === 1 &&
        orderHistory[0]?.orderHistory?.length === 1
      ) {
        return {
          title: WELCOME_GIFT_REWARD_TITLE,
          content: WELCOME_GIFT_REWARD_CONTENT_CLAIMED,
          openGift: true,
          cta: t(WELCOME_GIFT_REWARD_CTA, {
            expirationDate: expirationDate.toLocaleDateString()
          }),
          claimed: true
        }
      }
      if (
        orderHistory &&
        (orderHistory?.length > 1 ||
          (orderHistory?.length === 1 &&
            orderHistory[0]?.orderHistory &&
            orderHistory[0].orderHistory?.length > 1))
      ) {
        return {
          title: WELCOME_GIFT_REWARD_TITLE,
          content: WELCOME_GIFT_REWARD_CONTENT_USED,
          cta: 'shared.claimed',
          claimed: true
        }
      }
      if (isWelcomeGiftExpired) return false
      return {
        title: WELCOME_GIFT_REWARD_TITLE,
        content: WELCOME_GIFT_REWARD_CONTENT_NOT_CLAIMED,
        claimed: false
      }
    }
    if (!isNewCustomer) {
      const lastOrder = orderHistory?.[0]
      if (
        !lastOrder ||
        releaseDate > new Date(lastOrder?.unFormattedDate ?? '')
      ) {
        if (isWelcomeGiftExpired) return false
        return {
          title: WELCOME_GIFT_REWARD_TITLE,
          content: WELCOME_GIFT_REWARD_CONTENT_CLAIMED,
          cta: t(WELCOME_GIFT_REWARD_CTA, {
            expirationDate: expirationDate.toLocaleDateString()
          }),
          openGift: true,
          claimed: true
        }
      }
      return {
        title: WELCOME_GIFT_REWARD_TITLE,
        content: WELCOME_GIFT_REWARD_CONTENT_USED,
        cta: 'shared.claimed',
        claimed: true
      }
    }
    return false
  }, [
    t,
    isNewCustomer,
    isWelcomeGiftExpired,
    orderHistory,
    releaseDate,
    expirationDate
  ])

  useEffect(() => {
    if (!customerDate && customerReference) {
      dispatch(getCustomerTrigger({ customerReference }))
    }
  }, [customerReference, customerDate, dispatch])

  useEffect(() => {
    if (customerDate && selectCustomerWassSuccess) {
      // A - prefix will sort DESC instead of the default ASC.
      dispatch(
        orderHistoryTrigger({
          page: 1,
          sort: isNewCustomer ? 'created_at' : '-created_at'
        })
      )
    }
  }, [dispatch, isNewCustomer, customerDate, selectCustomerWassSuccess])

  useEffect(() => {
    orderHistory && setWelcomeGiftRewardState(handleWelcomeGiftRewardState())
  }, [handleWelcomeGiftRewardState, orderHistory])

  if (!shouldRenderRewards) return null

  return isNewCustomer ||
    locale === 'pt-pt' ||
    (rewards && rewards.length > 0) ? (
    <div className={className}>
      {title && (
        <h4 className="text-lg-xl font-semibold lg:text-2xl mb-2 sm:mb-3 lg:mb-4">
          {t(title)}
        </h4>
      )}
      <ul className="flex flex-col gap-2 sm:grid sm:grid-flow-row sm:grid-cols-2 lg:gap-3">
        {shouldRenderWelcomeGift && (
          <RewardCard
            dataTestId={'welcomeGiftRewardCard'}
            key={`welcome-gift-reward-card`}
            {...(typeof welcomeGiftRewardState === 'object'
              ? welcomeGiftRewardState
              : { title: '', content: '', claimed: false })}
            isLoading={!welcomeGiftRewardState}
            type="basic"
            value={250}
          />
        )}
        {(rewards ?? []).map(reward => {
          return (
            <RewardCard
              key={`reward-grid-item-${reward.title}`}
              onClick={handleClaimReward(reward.type)}
              {...reward}
            />
          )
        })}
        {((rewards ?? []).length + (shouldRenderWelcomeGift ? 1 : 0)) % 2 ===
          1 &&
          isTablet && (
            <li
              key="moreRewards"
              data-testid="moreRewardsCard"
              className={classNames(
                'flex flex-col bg-ui-guyabano rounded-lg text-ui-grey-light items-center justify-center'
              )}
            >
              <Gift className="icon-24 mb-2" />
              <span>{t('account.loyalty-more-rewards-coming-soon')}</span>
            </li>
          )}
      </ul>
      {(((rewards ?? []).length + (shouldRenderWelcomeGift ? 1 : 0)) % 2 ===
        0 ||
        !isTablet) && (
        <div
          data-testid="moreRewards"
          className={classNames(
            'h-6 flex flex-row gap-1.5 mt-3 text-ui-grey-dark justify-center border border-t-0 border-l-0 border-r-0 border-ui-grey-light lg:h-7 lg:mt-4'
          )}
        >
          <div className="w-3 h-3">
            <Gift className="icon-24 mb-2" />
          </div>
          <span className="h-3 pt-0.5">
            {t('account.loyalty-more-rewards-coming-soon')}
          </span>
        </div>
      )}
    </div>
  ) : (
    <></>
  )
}
