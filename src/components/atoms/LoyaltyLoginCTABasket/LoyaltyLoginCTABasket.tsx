import classNames from 'classnames'
import router from 'next/router'
import { ReactComponent as MyAtidaWallet } from '~assets/svg/MyAtidaWallet.svg'
import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useFormatPrice } from '~domains/product'
import { priceCurrencyFormatter } from '~helpers/price-formatter'
import { Button } from '../Button'

export type LoyaltyLoginCTABasketProps = ComponentPropsWithoutRef<'div'> & {
  currency: string
  rewardTotal: number
}

export const LoyaltyLoginCTABasket: FunctionComponent<LoyaltyLoginCTABasketProps> = ({
  currency,
  rewardTotal
}) => {
  const isDesktop = useBreakpoint(breakpoints.sm)
  const isMobile = useBreakpoint(breakpoints.xs)
  const { t } = useTranslation()
  const accountCreationUrl = 'create-account?loyaltyBanner=true'

  const formatPrice = useFormatPrice()
  const rewardTotalFormated = formatPrice(rewardTotal, currency).asOne
  const loyaltyAtidaCash = priceCurrencyFormatter(
    rewardTotalFormated,
    currency,
    true
  )

  return (
    <div
      data-testid="loyaltyLoginCTABasket"
      className="bg-ui-carribean-green-lightest m-2 sm:my-2 sm:mx-0 rounded-lg sm:flex justify-center items-center sm:px-2"
    >
      <div className="xs:grid grid-cols-[30%_70%]">
        <div className="w-full h-full flex flex-col justify-center text-center pt-1.5 pb-1">
          <MyAtidaWallet className="max-w-10 max-h-13" />
        </div>
        <p
          className={classNames(
            'pr-2 py-3 text-sm md:leading-5.375 lg:leading-6 pl-2',
            {
              'text-center': !isMobile
            }
          )}
        >
          {t('basket.loyalty-cta', {
            loyaltyAtidaCash
          })}
        </p>
      </div>
      <Button
        className={classNames('shrink-0', {
          'w-full rounded-none bg-transparent text-primary-oxford-blue border-x-0 border-b-0 border-primary-oxford-blue-20': !isDesktop
        })}
        variant="tertiary"
        onClick={() => accountCreationUrl && router.push(accountCreationUrl)}
      >
        {t('basket.loyalty-cta.button')}
      </Button>
    </div>
  )
}
