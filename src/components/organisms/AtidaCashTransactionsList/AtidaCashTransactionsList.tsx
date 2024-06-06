import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { AtidaCashTransactionTile } from '~components/molecules/AtidaCashTransactionTile'
import { Pagination } from '~components/molecules/Pagination'
import { AtidaCashTransactionsHistoryByDate } from '~domains/account'
import { DateTimeFormat } from '~helpers'

export type AtidaCashTransactionListProps = {
  transactions: AtidaCashTransactionsHistoryByDate
  totalPages: number | undefined
}

const MAX_SHOWN_PAGES = 3

export const AtidaCashTransactionList: FunctionComponent<AtidaCashTransactionListProps> = ({
  transactions,
  totalPages
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dateTimeFormat: DateTimeFormat = {
    dateStyle: 'long'
  }
  return (
    <>
      <ul>
        {transactions.map(transactionsByDate => {
          const formatedDate = Intl.DateTimeFormat(
            locale,
            dateTimeFormat
          ).format(new Date(transactionsByDate.date))
          const transactionDate = new Date(transactionsByDate.date)
          const today = new Date()
          const isToday =
            transactionDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
          return (
            <li className="my-3 md:my-4">
              <h5 className="mb-2">
                {isToday ? t('shared.today') : formatedDate}
              </h5>
              {transactionsByDate.transactions.map((transaction, index) => {
                const formatedDate = transaction.expiry_date
                  ? Intl.DateTimeFormat(locale, dateTimeFormat).format(
                      new Date(transaction.expiry_date)
                    )
                  : undefined
                return (
                  <AtidaCashTransactionTile
                    className="mt-1 sm:mt-2"
                    key={`atida-cash-transaction-${index}`}
                    transaction_type={transaction.transaction_type}
                    amount={transaction.amount}
                    expiry_date={formatedDate}
                  />
                )
              })}
            </li>
          )
        })}
      </ul>
      <Pagination pages={totalPages ?? 1} maxShownPages={MAX_SHOWN_PAGES} />
    </>
  )
}
