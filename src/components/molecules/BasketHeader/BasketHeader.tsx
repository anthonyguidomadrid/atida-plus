import { useRouter } from 'next/router'
import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { Button } from '~components/atoms/Button'
import { useFormatPrice, Product } from '~domains/product'
import { BasketItem } from '~domains/basket/types'

export type BasketHeaderProps = {
  numberOfItems: number
  total: {
    value: number
    currency?: string
  }
  unavailableProducts?:
    | (BasketItem & {
        product: Omit<Partial<Product>, 'sku' | 'price'>
      })[]
    | undefined
  onOrderClick: () => void
  isLoading: boolean
}

export const BasketHeader: FunctionComponent<
  ComponentPropsWithoutRef<'header'> & BasketHeaderProps
> = ({
  className,
  numberOfItems,
  total,
  unavailableProducts,
  onOrderClick,
  isLoading,
  ...props
}) => {
  const { t } = useTranslation()
  const { back } = useRouter()
  const formatPrice = useFormatPrice()
  const totalPrice = formatPrice(total.value, total.currency)

  return (
    <header
      className={classNames('bg-ui-guyabano', className)}
      data-testid="basketHeader"
      {...props}
    >
      <div
        className={classNames(
          'container container-fixed mx-auto py-2',
          'sm:pb-3 sm:grid sm:auto-rows-auto sm:auto-cols-auto sm:w-full',
          'md:pb-4'
        )}
      >
        <Button
          variant="back"
          icon={<ChevronLeft role="presentation" className="icon-16" />}
          onClick={back}
          data-testid="backButton"
          className="sm:justify-self-start sm:self-start"
        >
          {t('shared.back')}
        </Button>

        <h1 className="my-1 sm:row-start-2 md:mt-3">{t('basket.heading')}</h1>

        <div className="flex items-end justify-between sm:row-start-1 sm:row-span-2 sm:flex-col sm:mt-1 md:row-start-2 md:row-span-1 md:mt-0">
          <div className="sm:flex sm:items-center sm:justify-between sm:min-w-36 sm:mb-1 md:mb-2 lg:min-w-38">
            <span
              className="block text-ui-grey-dark-alt text-sm mb-0.5"
              data-testid="basketHeaderNumberOfItems"
            >
              {t('basket.total-number-of-items', { count: numberOfItems })}
            </span>
            <span
              data-testid="basketHeaderTotal"
              className="block font-semibold text-xl sm:mt-0.5"
            >
              {numberOfItems > 0 ? (
                <>
                  <span className="text-7xl">
                    {totalPrice.integerAndDecimal}
                  </span>
                  <span className="align-top">{totalPrice.fraction}</span>
                </>
              ) : (
                <>
                  <span className="text-7xl">0,</span>
                  <span className="align-top">00</span>
                </>
              )}
            </span>
          </div>

          {numberOfItems > 0 && (
            <Button
              disabled={unavailableProducts && unavailableProducts.length > 0}
              type="button"
              variant="secondary"
              data-testid="basketHeaderOrderButton"
              aria-label={t('basket.order')}
              className="min-w-14 sm:min-w-34 md:min-w-36 lg:min-w-38"
              onClick={onOrderClick}
              isLoading={isLoading}
            >
              {t('basket.order')}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
