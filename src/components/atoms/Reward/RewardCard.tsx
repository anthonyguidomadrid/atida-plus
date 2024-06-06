import { FunctionComponent, MouseEvent } from 'react'
import classNames from 'classnames'
import { Button } from '~components/atoms/Button'
import { ReactComponent as UnclaimedReward } from '~assets/svg/UnclaimedReward.svg'
import { ReactComponent as ClaimedReward } from '~assets/svg/ClaimedReward.svg'
import { ReactComponent as ClaimedRewardGreen } from '~assets/svg/ClaimedRewardGreen.svg'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { ReactComponent as Check } from '~assets/svg/Check.svg'
import { ReactComponent as CheckSmall } from '~assets/svg/CheckSmall.svg'

import { RewardProps } from './types'
import { useTranslation } from 'react-i18next'
import { useBreakpoint, breakpoints } from '~domains/breakpoints'
import { LoadingSpinner } from '../LoadingSpinner'

export const RewardCard: FunctionComponent<RewardProps> = ({
  dataTestId,
  title,
  content,
  cta,
  openGift = false,
  claimed,
  isLoading,
  onClick
}) => {
  const { t } = useTranslation()
  const isDesktop = useBreakpoint(breakpoints.sm)

  const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation?.()
    onClick?.()
  }

  return (
    <li
      key={title}
      data-testid={dataTestId ?? 'rewardCard'}
      className={classNames(
        'flex sm:min-h-32.75 lg:min-h-34.75 flex-col xs-only:divide-y rounded-lg sm:justify-between',
        {
          'min-h-[209px]': cta && onclick,
          'min-h-19 sm:min-h-27 md:min-h-30 lg:min-h-29': !cta && !onclick,
          'bg-ui-guyabano xs-only:divide-primary-oxford-blue-10': claimed,
          'cursor-pointer transition-colors ease-out duration-200 border border-ui-grey-light hover:border-ui-grey-medium xs-only:divide-primary-oxford-blue': !claimed
        }
      )}
      role="presentation"
      onClick={onClick}
    >
      {!isLoading ? (
        <>
          <div
            data-testid="rewardContent"
            className={classNames(
              'w-full p-3 flex flex-row gap-1',
              'xs-only:justify-between',
              'sm:justify-end sm:flex-col-reverse sm:text-center sm:relative',
              'lg:p-4 lg:pb-3',
              { 'opacity-50': claimed && cta === 'shared.claimed' }
            )}
          >
            <div className="flex flex-col gap-1 self-center">
              <span className="font-semibold">{t(title)}</span>
              <span>{t(content)}</span>
            </div>
            <div className="xs-only:relative sm:self-center">
              {claimed || openGift ? (
                <>
                  {!openGift ? (
                    <ClaimedReward
                      data-testid="claimedRewardIcon"
                      className="w-10 h-10"
                    />
                  ) : (
                    <ClaimedRewardGreen
                      data-testid="claimedRewardGreenIcon"
                      className="w-10 h-10"
                    />
                  )}
                  {isDesktop ? (
                    <Check
                      data-testid="claimedRewardSuccessIcon"
                      className="absolute text-primary-oxford-blue w-5 h-5 top-3 right-3 lg:top-4 lg:right-4"
                    />
                  ) : (
                    <CheckSmall
                      data-testid="claimedRewardSuccessIcon"
                      className="absolute top-0 right-0 icon-24 text-primary-oxford-blue"
                    />
                  )}
                </>
              ) : (
                <UnclaimedReward
                  data-testid="unclaimedRewardIcon"
                  className="w-10 h-10"
                />
              )}
            </div>
          </div>
          {cta && onClick ? (
            <div className="sm:p-3 sm:pt-0 lg:p-4 lg:pt-0 rounded-b-lg overflow-hidden">
              <Button
                data-testid="rewardCardButton"
                className={classNames(
                  'py-2 sm:border hover:bg-primary-oxford-blue-5 hover:text-primary-oxford-blue w-full',
                  'sm:py-[11px]',
                  {
                    'md:text-sm-base lg:text-base text-ui-grey font-light border-0':
                      !claimed && cta !== 'shared.claimed',
                    'border-0 pointer-events-none text-ui-grey-dark sm:border-ui-grey-light bg-primary-oxford-blue-5 font-light md:text-sm-base lg:text-base':
                      claimed && cta !== 'shared.claimed',
                    'pointer-events-none text-primary-oxford-blue-20 sm:border-ui-grey-light bg-ui-guyabano':
                      claimed && cta === 'shared.claimed border-0',
                    'bg-primary-white': !claimed
                  }
                )}
                icon={
                  claimed && cta === 'shared.claimed' ? (
                    <Checkmark className="icon-24" />
                  ) : (
                    <></>
                  )
                }
                variant="add-address"
                disabled={claimed}
                onClick={onButtonClick}
              >
                {t(cta)}
              </Button>
            </div>
          ) : (
            cta && (
              <div
                data-testid="rewardCardState"
                className={classNames(
                  'w-full flex flex-row justify-center text-center text-ui-grey font-light p-1.5 sm:p-3 sm:pt-0 lg:p-4 lg:pt-0 rounded-b-lg overflow-hidden gap-1',
                  {
                    'xs-only:bg-primary-oxford-blue-5': cta !== 'shared.claimed'
                  }
                )}
              >
                {claimed && cta === 'shared.claimed' && (
                  <Checkmark className="-mt-0.25 icon-24" />
                )}
                <span>{t(cta)}</span>
              </div>
            )
          )}
        </>
      ) : (
        <LoadingSpinner className="h-34" />
      )}
    </li>
  )
}
