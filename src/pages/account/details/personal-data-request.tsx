import type { GetServerSideProps } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createReduxStore } from '~domains/redux'
import {
  pageContentFulfill,
  pageContentTrigger,
  selectContent
} from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { useTranslation } from 'react-i18next'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { useSelector, useDispatch } from 'react-redux'
import { triggerReportPageViewed } from '~domains/analytics'
import { NextPage } from 'next'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { DEFAULT_SUPPORT_REQUEST_FORM } from '~config/constants/default-redirects'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const PersonalDataRequest: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const content = useSelector(selectContent)

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({
        page: 'Personal Data Request',
        pageType: 'account'
      })
    )
  }, [dispatch])

  return (
    <>
      <MetaData
        title={content?.seo?.title || content?.title || undefined}
        description={content?.seo?.description}
        indexation="noindex"
      />
      <AlternateLinks
        links={getAlternateLinks(
          'account/details/personal-data-request',
          locale
        )}
      />
      <div className="mx-3 sm:mx-0 with-layout">
        <div data-testid="personalDataRequestBody">
          <h2 className="mb-2">{t('account.personal-data-request.title')}</h2>
          <p className="mb-1">{t('account.personal-data-request.body')}</p>
          <ul className="mb-6">
            <li className="list-disc ml-3">
              {t('account.request-personal-data.bullet-list.personal-data')}
            </li>
            <li className="list-disc ml-3">
              {t('account.request-personal-data.bullet-list.order-history')}
            </li>
          </ul>
        </div>
        <div data-testid="personalDataRequestButtons">
          <NextLink
            href={DEFAULT_SUPPORT_REQUEST_FORM[locale ?? 'es-es']}
            passHref
            prefetch={false}
          >
            <Link className="no-underline justify-center border align-center border-primary-oxford-blue bg-primary-oxford-blue text-primary-white hover:text-primary-white w-full h-6 mb-2 sm:mb-0 sm:w-26 md:w-25 lg:w-24 sm:mr-3 md:mr-4">
              {t('account.request-my-data.cta')}
            </Link>
          </NextLink>
          <NextLink href="/account/details" passHref prefetch={false}>
            <Link className="no-underline justify-center border border-primary-oxford-blue text-primary-oxford-blue hover:text-primary-oxford-blue w-full h-6 sm:w-26 md:w-25 lg:w-24">
              {t('shared.cancel')}
            </Link>
          </NextLink>
        </div>
      </div>
    </>
  )
}

PersonalDataRequest.Layout = (page: JSX.Element) => (
  <AccountPageLayout>{page}</AccountPageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

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

export default PersonalDataRequest
