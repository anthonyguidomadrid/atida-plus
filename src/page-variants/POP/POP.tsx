import React, {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { SeoContent } from '~components/atoms/SeoContent'
import { HeroHeader } from '~components/molecules/HeroHeader'
import { MainSectionHeader } from '~components/molecules/MainSectionHeader'
import {
  ConditionalFacet,
  ProductSearchLayout
} from '~components/templates/ProductSearchLayout'
import { MetaData } from '~components/meta/MetaData'
import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { triggerReportPageViewed } from '~domains/analytics'
import { selectContent } from '~domains/page'
import { parseHtml } from '~helpers'
import { useTranslation } from 'react-i18next'
import {
  Panel,
  RefinementList as RefinementListForMemo
} from 'react-instantsearch-dom'
import { RangeInputConnected } from '~components/molecules/RangeInputConnected'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { transformContentSlugsToHreflang } from '~domains/translated-routes'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import {
  BreadcrumbsStructuredData,
  ItemListProps,
  ItemList
} from '~components/meta/StructuredData'
import { SearchState } from '~types/Search'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { getUserToken } from '~helpers/getUserToken'
import { storeAlgoliaABTestingID } from '~helpers/storeAlgoliaABTestingIDs'
import { Fonts } from '~components/meta/MetaData/PreloadFonts'
import { ReactComponent as CampaignFilter } from '~assets/svg/navigation-24px/CampaignFilter.svg'

const RefinementList = memo(RefinementListForMemo)

export type POPProps = {
  resultsState?: unknown & {
    rawResults: {
      hits?: ItemListProps['products']
      abTestVariantID?: number
      abTestID?: number
    }[]
  }
  searchFilters?: string
  searchState?: SearchState
}

export const POP: FunctionComponent<POPProps> = ({
  resultsState,
  searchFilters,
  searchState
}) => {
  const { locale } = useRouter()
  const content = useSelector(selectContent)
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const searchClient = createAlgoliaFrontendClient()
  const { t } = useTranslation()
  const categoryLvl0 = useMemo(
    () => content?.category?.path && content?.category?.path.id0,
    [content?.category?.path]
  )
  const categoryLvl1 = useMemo(
    () => content?.category?.path && content?.category?.path.id1,
    [content?.category?.path]
  )
  const categoryLvl2 = useMemo(
    () => content?.category?.path && content?.category?.path.id2,
    [content?.category?.path]
  )
  const listId = useMemo(
    () =>
      `${content?.type}/${categoryLvl0 && categoryLvl0}${
        categoryLvl1 !== undefined ? `/${categoryLvl1}` : ''
      }${categoryLvl2 !== undefined ? `/${categoryLvl2}` : ''}`,
    [categoryLvl0, categoryLvl1, categoryLvl2, content?.type]
  )
  const seoBreadcrumbs = useMemo(
    () => [
      {
        title: content?.category?.path?.title0,
        slug: content?.category?.path?.slug0
      },
      {
        title: content?.category?.path?.title1,
        slug: content?.category?.path?.slug1
      },
      {
        title: content?.category?.path?.title2
      }
    ],
    [content]
  )

  const breadcrumbs = useMemo(
    () => [
      {
        title: content?.category?.path?.title0,
        path: `/${content?.category?.path?.slug0}`,
        subpaths: [
          {
            title: content?.category?.path?.title1,
            path: `/${content?.category?.path?.slug1}`,
            subpaths: [
              {
                title: content?.category?.path?.title2,
                path: `/${content?.category?.path?.slug2}`
              }
            ]
          }
        ]
      }
    ],
    [content]
  )

  const isDesktopMenu = useBreakpoint(breakpoints.md)
  const algoliaScreenRuleContext = useMemo(
    () => (isDesktopMenu ? 'dev_desktop' : 'dev_mobile'),
    [isDesktopMenu]
  )

  const filtersLimit = useFeatureFlag(
    FeatureFlag.FILTER_LIST_FILTERS_LIMIT
  ) as number

  const filtersShowMoreLimit = useFeatureFlag(
    FeatureFlag.FILTER_LIST_FILTERS_SHOW_MORE_LIMIT
  ) as number

  const isSeoStructuredDataCopAndPopBreadcrumbs = useFeatureFlag(
    FeatureFlag.SEO_STRUCTURED_DATA_COP_AND_POP_BREADCRUMBS
  )

  // TODO: Remove once Black Friday ends
  const isNewCampaignFilterEnabled = useFeatureFlag(
    FeatureFlag.NEW_CAMPAIGN_FILTER
  )

  const transformCampaignItems = useCallback(
    (items: { label: string; value: string; [key: string]: unknown }[]) =>
      items.map(item => ({
        ...item,
        key: item.value,
        label: (
          <div className="flex items-center">
            <p className="font-semibold">
              {t(`search.filter.campaign.${item.label}`)}
            </p>
            <CampaignFilter className="w-2 h-2" />
          </div>
        )
      })),
    [t]
  )
  const campaignFacet = {
    title: t('search.filter.campaign.title'),
    facet: (
      <Panel header={t('search.filter.campaign.title')}>
        <RefinementList
          attribute="campaign"
          limit={filtersLimit}
          showMore
          showMoreLimit={filtersShowMoreLimit}
          transformItems={transformCampaignItems}
          translations={{
            showMore(expanded: boolean) {
              return expanded
                ? t('search.filter.show-less')
                : t('search.filter.show-more')
            },
            noResults: t('search.filter.no-results'),
            submitTitle: t('search.filter.no-results'),
            resetTitle: t('search.filter.reset-title'),
            placeholder: t('search.filter.placeholder', {
              filterName: t('search.filters.spf.title')
            })
          }}
        />
      </Panel>
    ),
    testId: 'filterCampaignPanel'
  }

  const facets = [
    ...(isNewCampaignFilterEnabled ? [campaignFacet] : []),
    {
      title: t('search.filters.brand.title'),
      facet: (
        <Panel header={t('search.filters.brand.title')}>
          <RefinementList
            attribute="attributes.brand.label"
            searchable
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filter.brand.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterBrandPanel'
    },
    {
      title: t('search.filters.sub_brand.title'),
      facet: (
        <ConditionalFacet
          ifSelected={{ refinementList: 'attributes.brand.label' }}
        >
          <Panel header={t('search.filters.sub_brand.title')}>
            <RefinementList
              attribute="attributes.brand_subbrand.label"
              searchable
              limit={filtersLimit}
              showMore
              showMoreLimit={filtersShowMoreLimit}
              translations={{
                showMore(expanded: boolean) {
                  return expanded
                    ? t('search.filter.show-less')
                    : t('search.filter.show-more')
                },
                noResults: t('search.filter.no-results'),
                submitTitle: t('search.filter.no-results'),
                resetTitle: t('search.filter.reset-title'),
                placeholder: t('search.filter.placeholder', {
                  filterName: t('search.filters.sub_brand.title')
                })
              }}
            />
          </Panel>
        </ConditionalFacet>
      ),
      testId: 'filterSubBrandPanel'
    },
    {
      title: t('search.filter.price.title'),
      facet: (
        <Panel header={t('search.filter.price.title')}>
          <RangeInputConnected attribute="price.sale" precision={2} />
        </Panel>
      ),
      testId: 'filterPricePanel'
    },
    {
      title: t('search.filters.spf.title'),
      facet: (
        <Panel header={t('search.filters.spf.title')}>
          <RefinementList
            attribute="attributes.spf.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.spf.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterSpfPanel'
    },
    {
      title: t('search.filters.color.title'),
      facet: (
        <Panel header={t('search.filters.color.title')}>
          <RefinementList
            attribute="attributes.color.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.color.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterColorPanel'
    },
    {
      title: t('search.filters.format.title'),
      facet: (
        <Panel header={t('search.filters.format.title')}>
          <RefinementList
            attribute="attributes.format.label"
            searchable
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.format.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterFormatPanel'
    },
    {
      title: '',
      facet: (
        <Panel header={t('search.filters.hair.color.title')}>
          <RefinementList
            attribute="attributes.hair_color.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.hair.color.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterHairColorPanel'
    },
    {
      title: t('search.filters.glass.title'),
      facet: (
        <Panel header={t('search.filters.glass.title')}>
          <RefinementList
            attribute="attributes.glass.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.glass.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterGlassPanel'
    },
    {
      title: t('search.filters.seasonality.list.multiselect.title'),
      facet: (
        <Panel header={t('search.filters.seasonality.list.multiselect.title')}>
          <RefinementList
            attribute="attributes.seasonality_list_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t(
                  'search.filters.seasonality.list.multiselect.title'
                )
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterSeasonalityListPanel'
    },
    {
      title: t('search.filters.minerals.multiselect.title'),
      facet: (
        <Panel header={t('search.filters.minerals.multiselect.title')}>
          <RefinementList
            attribute="attributes.minerals_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.minerals.multiselect.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterMineralsPanel'
    },

    {
      title: t('search.filters.absorption.level.title'),
      facet: (
        <Panel header={t('search.filters.absorption.level.title')}>
          <RefinementList
            attribute="attributes.absorption_level.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.absorption.level.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterAbsorptionLevelPanel'
    },
    {
      title: t('search.filters.occasion.multiselect.title'),
      facet: (
        <Panel header={t('search.filters.occasion.multiselect.title')}>
          <RefinementList
            attribute="attributes.occasion_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.occasion.multiselect.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterOccasionMultiselectPanel'
    },

    {
      title: t('search.filters.warnings.multiselect.title'),
      facet: (
        <Panel header={t('search.filters.warnings.multiselect.title')}>
          <RefinementList
            attribute="attributes.warnings_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.warnings.multiselect.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterWarningsMultiselectPanel'
    },

    {
      title: t('search.filters.taste.multiselect.title'),
      facet: (
        <Panel header={t('search.filters.taste.multiselect.title')}>
          <RefinementList
            attribute="attributes.taste_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.taste.multiselect.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterTasteMultiselectPanel'
    },

    {
      title: t('search.filters.size.title'),
      facet: (
        <Panel header={t('search.filters.size.title')}>
          <RefinementList
            attribute="attributes.size.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.size.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterSizePanel'
    },

    {
      title: t('search.filters.hair.type.title'),
      facet: (
        <Panel header={t('search.filters.hair.type.title')}>
          <RefinementList
            attribute="attributes.hair_type_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.hair.type.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterHairTypeMultiselectPanel'
    },

    {
      title: t('search.filters.skin.type.multiselect.title'),
      facet: (
        <Panel header={t('search.filters.skin.type.multiselect.title')}>
          <RefinementList
            attribute="attributes.skin_type_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.skin.type.multiselect.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterSkinTypeMultiselectPanel'
    },

    {
      title: t('search.filters.vitamins.title'),
      facet: (
        <Panel header={t('search.filters.vitamins.title')}>
          <RefinementList
            attribute="attributes.vitamins_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.vitamins.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filtersVitaminsPanel'
    },
    {
      title: t('search.filters.target.age.title'),
      facet: (
        <Panel header={t('search.filters.target.age.title')}>
          <RefinementList
            attribute="attributes.target_age_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.target.age.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filtersTargetAgePanel'
    },
    {
      title: t('search.filters.features.list.title'),
      facet: (
        <Panel header={t('search.filters.features.list.title')}>
          <RefinementList
            attribute="attributes.product_features_list_multiselect.label"
            limit={filtersLimit}
            showMore
            showMoreLimit={filtersShowMoreLimit}
            translations={{
              showMore(expanded: boolean) {
                return expanded
                  ? t('search.filter.show-less')
                  : t('search.filter.show-more')
              },
              noResults: t('search.filter.no-results'),
              submitTitle: t('search.filter.no-results'),
              resetTitle: t('search.filter.reset-title'),
              placeholder: t('search.filter.placeholder', {
                filterName: t('search.filters.features.list.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filtersProductFeaturesListPanel'
    }
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    const page = content?.category?.level === 0 ? 'Category' : 'Subcategory'
    content?.category &&
      dispatch(
        triggerReportPageViewed({
          page,
          pageType: 'pop',
          category: content?.category
        })
      )
  }, [dispatch, content?.category])

  const [products, setProducts] = useState([] as ItemListProps['products'])

  const [isPageLoaded, setIsPageLoaded] = useState(false)

  const abTestVariantID = resultsState?.rawResults[0].abTestVariantID
  const abTestID = resultsState?.rawResults[0].abTestID

  useEffect(() => {
    setIsPageLoaded(true)
    storeAlgoliaABTestingID(abTestID, abTestVariantID)
  }, [abTestID, abTestVariantID])

  useEffect(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    isPageLoaded && storage.removeItem('scroll-position-product-id-marker')
  }, [isPageLoaded])

  const userToken = getUserToken()

  return (
    <>
      <MetaData
        title={content?.seo?.title}
        description={content?.seo?.description}
        keywords={content?.seo?.keywords}
        image={content?.seo?.image?.url}
        preloadFonts={[Fonts.titleLight]}
        noIndex={content?.seo?.noIndex}
        noFollow={content?.seo?.noFollow}
        canonicalHrefOverride={content?.seo?.canonicalHrefOverride}
      />
      <ItemList products={products} />
      {isSeoStructuredDataCopAndPopBreadcrumbs && (
        <BreadcrumbsStructuredData breadcrumbs={seoBreadcrumbs} />
      )}
      <AlternateLinks
        links={transformContentSlugsToHreflang(
          locale as string,
          content?.allSlugs ?? undefined
        )}
      />

      <main data-testid="popLayout">
        <MainSectionHeader
          backgroundColor={content?.category?.color || 'ui-guyabano'}
        >
          {props =>
            content?.heroHeader ? (
              <HeroHeader contentBlock={content?.heroHeader} {...props} />
            ) : (
              <SimpleHeader
                title={content?.title ?? undefined}
                image={content?.category?.image}
                breadcrumbs={breadcrumbs}
                {...props}
              />
            )
          }
        </MainSectionHeader>

        <ProductSearchLayout
          // applying unique key here means that the component is forced to re-mount on SPA page transition - meaning less risk of data not being refreshed
          key={content?.category?.id}
          setProducts={setProducts}
          listId={listId}
          locale={locale}
          analyticsTags={['type_pop']}
          ruleContexts={['type_pop', algoliaScreenRuleContext]}
          facets={facets}
          indexName={indexName}
          seoContent={content?.seo?.copyExpandable}
          searchClient={searchClient}
          resultsState={resultsState}
          userToken={userToken}
          initialSearchState={searchState}
          filters={searchFilters}
          category={content?.category}
        />
        {/* Footer SEO content */}
        {content?.seo && (
          <section className="flex bg-ui-guyabano">
            <span
              className={classNames(
                'grid grid-cols-12 px-2',
                'sm:px-5',
                'md:px-8',
                'md:container-fixed md:mx-auto'
              )}
            >
              <SeoContent
                header={content?.seo?.header}
                children={parseHtml(content?.seo?.copy, {
                  ul: {
                    className: 'list-disc mt-2 ml-1'
                  },
                  ol: {
                    className: 'list-decimal mt-2 ml-1'
                  },
                  li: {
                    className: 'ml-2.25'
                  },
                  p: {
                    className: 'mb-1.5'
                  }
                })}
              />
            </span>
          </section>
        )}
      </main>
    </>
  )
}
