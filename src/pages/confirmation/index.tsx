import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { pageContentFulfill, pageContentTrigger } from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { getPageUrlSlug } from '~helpers/getPageUrlSlug'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { MetaData } from '~components/meta/MetaData'
import { useEffect } from 'react'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const Confirmation: NextPage = () => {
  const { push } = useRouter()

  useEffect(() => {
    push('/')
  }, [push])

  return (
    <>
      <MetaData indexation="noindex" />
      <section className="h-40 flex justify-center mt-2 mb-9 mx-2 sm:mx-12 sm:mt-4 md:mx-8 md:mt-8 lg:mx-20 lg:mt-10">
        <LoadingSpinner />
      </section>
    </>
  )
}

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

export default Confirmation
