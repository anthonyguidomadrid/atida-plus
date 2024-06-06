import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ReactComponent as NoTransactions } from '~assets/svg/noTransactions.svg'
import { Button } from '~components/atoms/Button'

export const AtidaCashEmptyTransactionHistory = () => {
  const { t } = useTranslation()
  const { push } = useRouter()
  return (
    <div className="flex flex-col items-center mt-6 sm:mt-4 md:mt-5 lg:mt-6 max-w-38 sm:max-w-40 lg:max-w-50 mx-auto">
      <div className="w-20">
        <NoTransactions />
      </div>
      <h2 className="text-center mb-2 mt-3 lg:text-5xl">
        {t('account.no-transactions.label')}
      </h2>
      <p className="text-center mb-4">
        {t('account.no-transactions.description')}
      </p>
      <Button
        aria-label={t('account.no-transactions.go-shopping')}
        variant="secondary"
        className="border-none px-3 w-full sm:w-auto"
        onClick={() => push('/')}
      >
        {t('account.no-transactions.go-shopping')}
      </Button>
    </div>
  )
}
