import type { GetServerSideProps, NextPage } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import {
  pageContentFulfill,
  pageContentTrigger,
  selectContent
} from '~domains/page'
import {
  selectCashBalanceAmount,
  selectIsLoading as selectIsCashBalanceLoading
} from '~domains/account/selectors/cash-balance'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { useTranslation } from 'react-i18next'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { CashBalance } from '~components/organisms/CashBalance'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCashBalanceTrigger } from '~domains/account'
import { DeliverySteps } from '~components/molecules/DeliverySteps'
import { Accordion } from '~components/molecules/Accordion'
import { GroupOfStaticContentBlocks } from '~domains/contentful/normalizers'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import { parseHtml } from '~helpers'
import { RewardsGrid, RewardsList } from '~components/molecules/RewardsGroup'
import { RewardProps } from '~components/atoms/Reward/types'
import { getCurrency } from '~helpers/get-currency'
import { triggerReportPageViewed } from '~domains/analytics'

const MyAtidaCash: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { push, locale } = useRouter()
  const dispatch = useDispatch()
  const content = useSelector(selectContent)
  const cashBalance = useSelector(selectCashBalanceAmount)
  const isCashBalanceLoading = useSelector(selectIsCashBalanceLoading)

  const faqBlocks = content?.contentBlocks.find(
    contentBlock =>
      contentBlock.contentType === 'GroupOfStaticContentBlocks' &&
      contentBlock?.type === 'Accordion'
  ) as GroupOfStaticContentBlocks

  const atidaCashIntro = content?.contentBlocks?.find(
    contentBlock =>
      contentBlock?.contentType === 'GroupOfStaticContentBlocks' &&
      contentBlock?.type === 'Bullet points'
  ) as GroupOfStaticContentBlocks

  const isLoyaltyAtidaCashEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )

  const isLoyaltyAtidaCashRewardsEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH_REWARDS
  ) as RewardProps[]

  const basicRewards = isLoyaltyAtidaCashRewardsEnabled.filter(
    reward => reward.type === 'basic'
  )

  const advancedRewards = isLoyaltyAtidaCashRewardsEnabled.filter(
    reward => reward.type === 'advanced'
  )

  useEffect(() => {
    if (isLoyaltyAtidaCashEnabled) dispatch(getCashBalanceTrigger())
  }, [dispatch, isLoyaltyAtidaCashEnabled])

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'My Atida cash', pageType: 'account' })
    )
  }, [dispatch])

  const defaultSteps = [
    {
      text: t('account.atida-cash-step-one.title'),
      subText: t('account.atida-cash-step-one.description')
    },
    {
      text: t('account.atida-cash-step-two.title'),
      subText: t('account.atida-cash-step-two.description')
    },
    {
      text: t('account.atida-cash-step-three.title'),
      subText: t('account.atida-cash-step-three.description')
    }
  ]

  if (!isLoyaltyAtidaCashEnabled) {
    push('/account')
    return null
  }

  return (
    <>
      <MetaData title={t('seo.titles.my-atida-cash')} indexation="noindex" />
      <AlternateLinks links={getAlternateLinks('account', locale)} />
      <div className="mx-2 sm:mx-0">
        <h1 className="mb-2">{t('account.my-atida-cash')}</h1>

        <CashBalance
          isLoading={isCashBalanceLoading}
          className="mb-4"
          amount={cashBalance}
          currency={getCurrency(locale)}
          modalData={atidaCashIntro}
        />

        <RewardsGrid
          title={t('account.earn-more-atida-cash')}
          className="mb-4 md:mb-5 lg:mb-6"
          rewards={basicRewards ?? []}
        />

        <DeliverySteps
          className="mb-4 md:mb-5 lg:mb-6"
          steps={defaultSteps}
          isAtidaCashSteps
        />

        <div className="-mt-3" />

        <RewardsList
          title={t('account.ways-to-earn-more--atida-cash')}
          className="mb-4 md:mb-5 lg:mb-6"
          rewards={advancedRewards ?? []}
        />

        {faqBlocks?.blocks && faqBlocks?.blocks?.length > 0 && (
          <div className="mb-4 md:mb-5 lg:mb-6">
            <h4 className="text-lg-xl lg:text-2xl mb-2 sm:mb-3 lg:mb-4 font-semibold">
              {faqBlocks?.title?.replace('<br/>', '')}
            </h4>
            <Accordion controlled data-testid="faqAccordion">
              {faqBlocks?.blocks?.map((contentBlock, index) => (
                <AccordionPanel
                  key={`faq-${index}`}
                  heading={contentBlock.title}
                  data-testid={contentBlock.title}
                  isBold={true}
                >
                  <div className="bg-ui-guyabano p-3 -mx-2 md:mx-0">
                    {parseHtml(contentBlock.content, {
                      h2: {
                        className: 'mb-1'
                      },
                      p: {
                        className: 'inline-block mb-2'
                      }
                    })}
                  </div>
                </AccordionPanel>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </>
  )
}

MyAtidaCash.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH_REWARDS,
    FeatureFlag.ACCOUNT_LOYALTY_WELCOME_GIFT_RELEASE_DATE,
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH_HISTORY
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

export default MyAtidaCash
