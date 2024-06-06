import type { GetServerSideProps, NextPage } from 'next'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { MetaData } from '~components/meta/MetaData'
import {
  triggerReportPageViewed,
  triggerReportPromotionListViewed
} from '~domains/analytics'
import { createReduxStore } from '~domains/redux'
import { MainSectionHeader } from '~components/molecules/MainSectionHeader'
import { Promotions as PromotionsOverview } from '~components/molecules/Promotions/Promotions'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPromotionTrigger,
  selectTotal,
  handleUpdateSkip,
  selectSkip,
  selectData,
  selectIsLoading,
  getPromotionFulfill
} from '~domains/promotion'
import { skipPromotions } from '~domains/promotion/slices/content'
import { InfinitePagination } from '~components/molecules/InfinitePagination'
import { getAlternateLinks, getPageSlug } from '~domains/translated-routes'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { Promotion } from '~domains/contentful/normalizers/promotion'
import { selectSeoData, seoBlockFulfill, seoBlockTrigger } from '~domains/seo'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { ProductTileLoading } from '~components/molecules/ProductTile/ProductTileLoading'
import {
  getPageFilterFulfill,
  getPageFilterTrigger,
  selectFilters
} from '~domains/page-filter'
import { selectFilters as selectInitialFilters } from '~domains/promotion/selectors'
import { FilterList } from '~components/organisms/FilterList'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { SeoContentExpandable } from '~components/atoms/SeoContentExpandable'
import { parseHtml } from '~helpers'
import classNames from 'classnames'
import { SeoContent } from '~components/atoms/SeoContent'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

const Promotions: NextPage = () => {
  const dispatch = useDispatch()
  const [localPromotions, setLocalPromotions] = useState<Partial<Promotion>[]>(
    []
  )

  const { t } = useTranslation()
  const promotions = useSelector(selectData)
  const seo = useSelector(selectSeoData)
  const total = useSelector(selectTotal)
  const storeSkip = useSelector(selectSkip)
  const isLoading = useSelector(selectIsLoading)
  const filters = useSelector(selectFilters)
  const initialFilters = useSelector(selectInitialFilters)
  const activeFilters = useMemo(() => initialFilters ?? [], [initialFilters])
  const current = promotions?.length ?? 0
  const [currentSkip, setCurrentSkip] = useState(0)

  const isShowSEOCopyContentOnBrandsAndPromotionsEnabled = useFeatureFlag(
    FeatureFlag.SEO_SHOW_COPY_CONTENT_ON_BRANDS_AND_PROMOTIONS_PAGES
  )

  const isSmallScreen = !useBreakpoint(breakpoints.md)
  const SeoCopyExpandable = isShowSEOCopyContentOnBrandsAndPromotionsEnabled &&
    seo?.copyExpandable && (
      <article className="mb-4 md:mb-5 lg:mb-7">
        <SeoContentExpandable children={parseHtml(seo.copyExpandable)} />
      </article>
    )

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Promotions', pageType: 'promos' })
    )
  }, [dispatch])

  useEffect(() => {
    if (currentSkip !== 0) {
      dispatch(
        getPromotionTrigger({
          skip: currentSkip?.toString(),
          filters: activeFilters
        })
      )
    }
  }, [dispatch, currentSkip, activeFilters])

  useEffect(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    storage.removeItem('scroll-position-product-id-marker')
  }, [])

  const loadMorePromotions = () => {
    const newSkipValue = (storeSkip ?? 0) + skipPromotions
    setCurrentSkip(newSkipValue)
    dispatch(handleUpdateSkip({ newSkipValue: newSkipValue }))
  }

  if (promotions && localPromotions.length < promotions.length) {
    setLocalPromotions(promotions)
    dispatch(
      triggerReportPromotionListViewed({
        promotions
      })
    )
  }

  const handleFiltersSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        getPromotionTrigger({
          filters: [...activeFilters, e.target.value]
        })
      )
    } else {
      dispatch(
        getPromotionTrigger({
          filters: activeFilters.filter(filter => filter !== e.target.value)
        })
      )
    }
    setCurrentSkip(0)
  }

  return (
    <>
      <MetaData
        title={seo?.title}
        description={seo?.description}
        noIndex={seo?.noIndex}
        noFollow={seo?.noFollow}
        canonicalHrefOverride={seo?.canonicalHrefOverride}
      />
      <AlternateLinks links={getAlternateLinks('promotions')} />

      <MainSectionHeader backgroundColor={'ui-guyabano'}>
        {props => (
          <SimpleHeader title={t('our.promotions-heading')} {...props} />
        )}
      </MainSectionHeader>

      <main className="container container-fixed mx-auto min-h-screen-80 flex flex-col mt-4 md:mt-5 lg:mt-7 mb-6 sm:mb-8 md:mb-9 lg:mb-12">
        {/* Top SEO content Mobile */}
        {isSmallScreen && SeoCopyExpandable}

        <div className="md:flex">
          {filters && (
            <FilterList
              items={filters}
              handleFiltersSelection={handleFiltersSelection}
              activeFilters={activeFilters}
            />
          )}
          <div className="w-full max-w-full">
            {/* Top SEO content Desktop */}
            {!isSmallScreen && SeoCopyExpandable}

            {isLoading ? (
              <>
                <p className="text-primary-oxford-blue font-semibold text-base mb-2.5 text-center md:text-left">
                  {t('promotions')}
                </p>
                <ul className="flex flex-wrap mx-auto justify-between my-3">
                  {[...Array(6)].map(idx => (
                    <li
                      key={`promotion-${idx}`}
                      className="w-full sm:max-w-2.4/5 md:max-w-2.45/5 h-32 mb-3 justify-between"
                    >
                      <ProductTileLoading className={'h-full'} key={idx} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-primary-oxford-blue font-semibold text-base mb-2.5 text-center md:text-left">
                  {total} {t('promotions')}
                </p>
                <PromotionsOverview promotions={promotions} />
              </>
            )}
            {!isLoading && promotions && (
              <InfinitePagination
                itemsPartialNumber={'promotion.partial-number-of-promotions'}
                loadMoreText={t('promotions.load-more')}
                isLoading={isLoading}
                hasMore={current !== total}
                loadMore={loadMorePromotions}
                current={current}
                total={total}
              />
            )}
          </div>
        </div>
      </main>
      {/* Footer SEO content */}
      {isShowSEOCopyContentOnBrandsAndPromotionsEnabled && seo?.copy && (
        <section className="flex bg-ui-guyabano">
          <span
            className={classNames(
              'px-2',
              'sm:px-5',
              'md:px-8',
              'md:container-fixed md:mx-auto'
            )}
          >
            <SeoContent header={seo?.header} children={parseHtml(seo?.copy)} />
          </span>
        </section>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  /* TODO: Remove the passed test feature flag param, once implementation is proved on all environments */
  const featureFlags = await loadFeatureFlags(context.locale)

  const slug = getPageSlug('promotions', context.locale) || 'promotions'

  store.dispatch(getPageFilterTrigger({ slug }))
  store.dispatch(
    getPromotionTrigger({
      preview: context.preview,
      filters:
        context.query.filters && typeof context.query.filters === 'string'
          ? context.query.filters.split(',')
          : []
    })
  )
  store.dispatch(
    seoBlockTrigger({
      slug
    })
  )

  await Promise.all([
    store.dispatch({
      type: 'promotions',
      [WAIT_FOR_ACTION]: getPromotionFulfill().type
    }),
    store.dispatch({
      type: 'page-filter',
      [WAIT_FOR_ACTION]: getPageFilterFulfill().type
    }),
    store.dispatch({
      type: 'seo-block',
      [WAIT_FOR_ACTION]: seoBlockFulfill().type
    })
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Promotions
