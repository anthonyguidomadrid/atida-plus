import { FunctionComponent } from 'react'
import { ReactComponent as Info } from '~assets/svg/navigation-16px/Info.svg'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useFormatPrice } from '~domains/product'
import { useRouter } from 'next/router'
import { getCurrency } from '~helpers/get-currency'

export type AtidaCashTransactionTileProps = {
  transaction_type: 'credit' | 'debit'
  amount: number
  expiry_date?: string
}

export const AtidaCashTransactionTile: FunctionComponent<
  AtidaCashTransactionTileProps & { className?: string }
> = ({ transaction_type, expiry_date, amount, className }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const formatPrice = useFormatPrice()
  const currency = getCurrency(locale)

  const isCredit = transaction_type === 'credit'
  return (
    <article
      data-testid="AtidaCashTransactionTile"
      className={classNames(
        'flex-row justify-between p-3 pb-2.5 border rounded-lg border-ui-grey-light',
        className
      )}
      role="presentation"
    >
      <div className="flex justify-between">
        <span className="text-base text-primary-oxford-blue">
          {t(
            isCredit
              ? 'account.atida-cash-earned'
              : 'account.atida-cash-redeemed'
          )}
        </span>
        <div
          data-testid="AtidaCashTransactionTileAmmount"
          className={classNames({
            'text-primary-caribbean-green-dark': isCredit
          })}
        >
          {(isCredit ? '+ ' : '- ') +
            formatPrice(amount, currency).withCurrency}
        </div>
      </div>
      {isCredit && (
        <div className="flex gap-1 text-sm text-ui-grey mt-1">
          <Info
            data-testid="AtidaCashTransactionTileInfoIcon"
            className="w-2 h-2"
          />
          <span className="font-light">
            {t('account.atida-cash-expiry', { expiry_date: expiry_date })}
          </span>
        </div>
      )}
    </article>
  )
}
