import type { GetServerSideProps, NextPage } from 'next'
import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { useDispatch, useSelector } from 'react-redux'

import { MetaData } from '~components/meta/MetaData'
import { getAlternateLinks } from '~domains/translated-routes'
import { Link } from '~components/atoms/Link'
import { useTranslation } from 'react-i18next'
import { createReduxStore } from '~domains/redux'
import {
  pageContentFulfill,
  pageContentTrigger,
  selectContent
} from '~domains/page'
import { customerSelectors, getCustomerTrigger } from '~domains/account'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { triggerReportPageViewed } from '~domains/analytics'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { ContentBlocksLayout } from '~components/templates/ContentBlocksLayout'
import { DEFAULT_SUPPORT_REQUEST_FORM } from '~config/constants/default-redirects'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { ContentBlockWithImage } from '~domains/contentful'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const DeleteAccountPage: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const dispatch = useDispatch()
  const reference = useSelector(customerSelectors.selectCustomerReference)
  const content = useSelector(selectContent)
  const customer = useSelector(customerSelectors.selectCustomerDetails)

  const modifiedContentBlocks = content?.contentBlocks.map(block => {
    const contentWithUserEmail = (block as ContentBlockWithImage).content.replace(
      '{{userEmail}}',
      customer?.email as string
    )
    return {
      ...block,
      content: contentWithUserEmail
    }
  })

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Delete Account', pageType: 'account' })
    )
  }, [dispatch])

  useEffect(() => {
    if (reference) {
      dispatch(getCustomerTrigger({ customerReference: reference }))
    }
  }, [dispatch, reference])

  return (
    <>
      <MetaData
        title={content?.seo?.title || content?.title || undefined}
        description={content?.seo?.description}
        indexation="noindex"
      />
      <AlternateLinks
        links={getAlternateLinks('account/details/delete-account', locale)}
      />
      <div className="mx-3 sm:mx-0 with-layout">
        {customer?.email && (
          <ContentBlocksLayout
            contentBlocks={modifiedContentBlocks ?? []}
            isContainer={false}
          />
        )}
        <div data-testid="personalDataRequestButtons">
          <NextLink
            href={DEFAULT_SUPPORT_REQUEST_FORM[locale ?? 'es-es']}
            passHref
            prefetch={false}
          >
            <Link className="no-underline justify-center border align-center border-primary-oxford-blue bg-primary-oxford-blue text-primary-white hover:text-primary-white w-full h-6 mb-2 sm:mb-0 sm:w-26 md:w-25 lg:w-24 sm:mr-3 md:mr-4">
              {t('account.delete-my-account.cta')}
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

DeleteAccountPage.Layout = (page: JSX.Element) => (
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

export default DeleteAccountPage
