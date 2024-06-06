import { FunctionComponent } from 'react'
import classNames from 'classnames'

import { ReactComponent as Arrow } from '~assets/svg/navigation-24px/ArrowForward.svg'
import { ReactComponent as Check } from '~assets/svg/Check.svg'
import { ReactComponent as CheckSmall } from '~assets/svg/CheckSmall.svg'

import { ReactComponent as Gift } from '~assets/svg/navigation-24px/Gift.svg'

import { RewardProps } from './types'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useFormatPrice } from '~domains/product'
import { useTranslation } from 'react-i18next'

export const RewardTile: FunctionComponent<RewardProps> = ({
  title,
  content,
  value,
  cta,
  claimed,
  onClick
}) => {
  const { t } = useTranslation()
  const isDesktop = useBreakpoint(breakpoints.sm)
  const formatPrice = useFormatPrice()

  return (
    <li
      key={title}
      data-testid="rewardTile"
      className={classNames('flex flex-col rounded-b-lg', {
        'bg-ui-guyabano': claimed
      })}
    >
      <div className="w-full min-h-16 p-3 flex flex-row-reverse sm:flex-row justify-between gap-2 sm:pr-5">
        <div className="flex relative min-w-10 h-10 xs-only:self-center justify-center items-start">
          <div
            data-testid="rewardTileIcon"
            className={classNames(
              'flex w-8 h-8 rounded-full justify-center items-center',
              {
                'bg-ui-black-5': claimed,
                'bg-ui-carribean-green-lightest': !claimed
              }
            )}
          >
            <Gift className="icon-24" />
            {!isDesktop && claimed && (
              <CheckSmall
                data-testid="rewardCheckIcon"
                className="absolute -top-0.5 right-0.5 icon-24"
              />
            )}
            <span
              data-testid="rewardTileValueTag"
              className={classNames(
                'px-1 py-0.25 inset-x-auto absolute rounded-3xl bottom-0 outline outline-2 leading-0',
                {
                  'bg-ui-grey-dark outline-ui-guyabano': claimed,
                  'bg-primary-caribbean-green-dark outline-primary-white': !claimed
                }
              )}
            >
              <span className="block text-primary-white text-xs font-semibold">
                + {formatPrice(value).withCurrency}
              </span>
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col self-center">
          <span className="font-bold mb-0.5 sm:mb-0.25">{t(title)}</span>
          <span>{t(content)}</span>
          {!isDesktop && (
            <button
              data-testid="rewardTileButtonMobile"
              className={classNames(
                'font-semibold text-sm-base text-left mt-1',
                {
                  'pointer-events-none text-ui-grey': claimed,
                  'text-primary-caribbean-green-dark': !claimed
                }
              )}
              onClick={onClick}
              disabled={claimed}
            >
              {!claimed ? (
                <span className="pt-0.25">{t('shared.claimed')}</span>
              ) : cta ? (
                t(cta)
              ) : (
                ''
              )}
            </button>
          )}
        </div>
        {isDesktop && (
          <div className="flex flex-shrink-0 justify-center self-center w-5">
            {claimed ? (
              <Check
                data-testid="rewardCheckIcon"
                className="icon-24 text-primary-oxford-blue sm:w-5 sm:h-5"
              />
            ) : (
              <button
                data-testid="rewardTileButtonDesktop"
                disabled={claimed}
                onClick={onClick}
              >
                <Arrow className="icon-24 text-primary-oxford-blue" />
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
