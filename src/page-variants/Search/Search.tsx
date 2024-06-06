import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  ConditionalFacet,
  ProductSearchLayout
} from '~components/templates/ProductSearchLayout'
import { MetaData } from '~components/meta/MetaData'
import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { triggerReportPageViewed } from '~domains/analytics'
import { Panel, RefinementList } from 'react-instantsearch-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CampaignFilter } from '~assets/svg/navigation-24px/CampaignFilter.svg'
import { RangeInputConnected } from '~components/molecules/RangeInputConnected'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { ResultsState } from '~types/Search'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { getUserToken } from '~helpers/getUserToken'
import { getEnabledLocales } from '~domains/translated-routes'

export type SearchProps = {
  resultsState?: ResultsState
  searchFilters?: string
  searchQuery?: string
}

export const Search: FunctionComponent<SearchProps> = ({
  resultsState,
  searchFilters,
  searchQuery
}) => {
  const { asPath, locale = '' } = useRouter()
  const searchPageCanonical = asPath
    ? `${asPath.replace(/^\/+/, '')?.toLocaleLowerCase() ?? ''}`
    : ''
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const searchClient = createAlgoliaFrontendClient()
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()

  const isDesktopMenu = useBreakpoint(breakpoints.md)
  const algoliaScreenRuleContext = isDesktopMenu ? 'dev_desktop' : 'dev_mobile'

  //TODO: Remove once proven to all environments
  const isHideFakeCategoriesEnabled = useFeatureFlag(
    FeatureFlag.HIDE_FAKE_CATEGORIES_FROM_CATEGORY_FILTER
  )

  const categoryTranslations = useMemo(
    () =>
      isHideFakeCategoriesEnabled &&
      Object.keys(i18n?.store?.data?.[locale]?.['category-title']),
    [i18n?.store?.data, isHideFakeCategoriesEnabled, locale]
  )

  // Filter out the category if we don't have translation for it
  const filterFakeCategories = useCallback(
    (item: { label: string; value: string; [key: string]: unknown }) =>
      isHideFakeCategoriesEnabled
        ? categoryTranslations && categoryTranslations.includes(item.label)
        : true,
    [categoryTranslations, isHideFakeCategoriesEnabled]
  )
  const transformCategoryRefinementItems = useCallback(
    (items: { label: string; value: string; [key: string]: unknown }[]) =>
      items.filter(filterFakeCategories).map(item => {
        return {
          ...item,
          key: item.value,
          label: t(`category-title:${item.label}`)
        }
      }),
    [t, filterFakeCategories]
  )

  const userToken = getUserToken()

  const filtersLimit = useFeatureFlag(
    FeatureFlag.FILTER_LIST_FILTERS_LIMIT
  ) as number

  const filtersShowMoreLimit = useFeatureFlag(
    FeatureFlag.FILTER_LIST_FILTERS_SHOW_MORE_LIMIT
  ) as number

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
      title: t('search.filters.category.title'),
      facet: (
        <Panel header={t('search.filters.category.title')}>
          <RefinementList
            attribute="attributes.categories.lvl0"
            transformItems={transformCategoryRefinementItems}
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
                filterName: t('search.filters.category.title')
              })
            }}
          />
        </Panel>
      ),
      testId: 'filterCategoryPanel'
    },
    {
      title: t('search.filters.category.level1.title'),
      facet: (
        <ConditionalFacet
          ifSelected={{ refinementList: 'attributes.categories.lvl0' }}
        >
          <Panel header={t('search.filters.category.level1.title')}>
            <RefinementList
              attribute="attributes.categories.lvl1"
              transformItems={transformCategoryRefinementItems}
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
                  filterName: t('search.filters.category.level1.title')
                })
              }}
            />
          </Panel>
        </ConditionalFacet>
      ),
      testId: 'filterCategoryLevel1Panel'
    },
    {
      title: t('search.filters.category.level2.title'),
      facet: (
        <ConditionalFacet
          ifSelected={{
            refinementList: 'attributes.categories.lvl1'
          }}
        >
          <Panel header={t('search.filters.category.level2.title')}>
            <RefinementList
              attribute="attributes.categories.lvl2"
              transformItems={transformCategoryRefinementItems}
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
                  filterName: t('search.filters.category.level2.title')
                })
              }}
            />
          </Panel>
        </ConditionalFacet>
      ),
      testId: 'filterCategoryLevel2Panel'
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
      title: t('search.filters.hair.color.title'),
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

  useEffect(() => {
    dispatch(triggerReportPageViewed({ page: 'Search', pageType: 'pop' }))
  }, [dispatch])

  return (
    <>
      <MetaData
        hideCanonicalLink={true}
        title={searchQuery}
        canonicalHref={searchPageCanonical}
        indexation="noindex"
      />
      <AlternateLinks
        links={getEnabledLocales().map((alternateLocale: string) => ({
          hrefLang: alternateLocale,
          href: `/${alternateLocale}`
        }))}
      />
      <main data-testid="searchLayout">
        <ProductSearchLayout
          // applying unique key here means that the component is forced to re-mount on SPA page transition - meaning less risk of data not being refreshed
          key={searchQuery}
          locale={locale}
          facets={facets}
          indexName={indexName}
          searchClient={searchClient}
          resultsState={resultsState}
          filters={searchFilters}
          query={searchQuery}
          analyticsTags={['type_searchresults']}
          ruleContexts={['type_searchresults', algoliaScreenRuleContext]}
          userToken={userToken}
        />
      </main>
    </>
  )
}
