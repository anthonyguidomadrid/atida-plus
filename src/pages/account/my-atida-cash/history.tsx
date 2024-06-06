import type { GetServerSideProps, NextPage } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { useTranslation } from 'react-i18next'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  cashTransactionsSelectors,
  getCashBalanceTrigger,
  getCashTransactionsTrigger
} from '~domains/account'
import { CashBalance } from '~components/organisms/CashBalance'
import {
  selectCashBalanceAmount,
  selectIsLoading as selectIsCashBalanceLoading
} from '~domains/account/selectors/cash-balance'
import { getCurrency } from '~helpers/get-currency'

import { AtidaCashTransactionList } from '~components/organisms/AtidaCashTransactionsList'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { AtidaCashEmptyTransactionHistory } from '~components/organisms/AtidaCashEmptyTransactionHistory'

const MAX_TRANSACTIONS_PER_PAGE = 8

const History: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { push, locale, query } = useRouter()
  const dispatch = useDispatch()
  const cashBalance = useSelector(selectCashBalanceAmount)
  const isCashBalanceLoading = useSelector(selectIsCashBalanceLoading)
  const cashTransactions = useSelector(
    cashTransactionsSelectors.selectCashTransactionsByDate
  )
  const cashTransactionsTotalPages = useSelector(
    cashTransactionsSelectors.selectCashTransactionsTotalPages
  )
  const cashTransactionsWasError = useSelector(
    cashTransactionsSelectors.selectWasError
  )
  const cashTransactionsWasSuccess = useSelector(
    cashTransactionsSelectors.selectWasSuccess
  )

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isLoyaltyAtidaCashHistoryEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH_HISTORY
  )

  useEffect(() => {
    const offset =
      (+((query?.page ?? '1') as string) - 1) * MAX_TRANSACTIONS_PER_PAGE
    dispatch(
      getCashTransactionsTrigger({ limit: '8', offset: offset.toString() })
    )
  }, [dispatch, query])

  useEffect(() => {
    if (isLoyaltyAtidaCashEnabled) dispatch(getCashBalanceTrigger())
  }, [dispatch, isLoyaltyAtidaCashEnabled])

  if (!isLoyaltyAtidaCashEnabled || !isLoyaltyAtidaCashHistoryEnabled) {
    push('/account')
    return null
  }

  return (
    <>
      <MetaData
        title={t('seo.titles.atida-cash-history')}
        indexation="noindex"
      />
      <AlternateLinks links={getAlternateLinks('account', locale)} />
      <main className="mx-2 sm:mx-0">
        <h1 className="mb-3 md:mb-4">{t('account.atida-cash-history')}</h1>
        <CashBalance
          isLoading={isCashBalanceLoading}
          className="mb-3 md:mb-4"
          amount={cashBalance}
          currency={getCurrency(locale)}
          isMinified
        />
        {cashTransactionsWasError || cashTransactionsWasSuccess ? (
          cashTransactions.length > 0 ? (
            <AtidaCashTransactionList
              transactions={cashTransactions}
              totalPages={cashTransactionsTotalPages ?? 1}
            />
          ) : (
            <AtidaCashEmptyTransactionHistory />
          )
        ) : (
          <LoadingSpinner />
        )}
      </main>
    </>
  )
}

History.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH_HISTORY,
    FeatureFlag.ACCOUNT_TRANSACTION_HISTORY_MOCKED_DATA
  ])

  store.dispatch(pageContentTrigger({ slug: getPageUrlSlug(context) }))

  await store.dispatch({
    type: 'page-content',
    [WAIT_FOR_ACTION]: pageContentFulfill().type
  })

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default History
