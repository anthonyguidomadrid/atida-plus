import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FunctionComponent } from 'react'
import {
  InstantSearch,
  Configure,
  ClearRefinements,
  connectCurrentRefinements,
  ToggleRefinement
} from 'react-instantsearch-dom'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { useTranslation } from 'react-i18next'
import type { CurrentRefinementsProvided } from 'react-instantsearch-core'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import type { Asset, Category } from '~domains/contentful'
import { Tag } from '~components/atoms/Tag'
import { TagList } from '~components/molecules/TagList'
import { SeoContentExpandable } from '~components/atoms/SeoContentExpandable'
import { parseHtml } from '~helpers'
import { Button } from '~components/atoms/Button'
import { FilterAndSort } from '~components/molecules/FilterAndSort'
import { ReactComponent as Filter } from '~assets/svg/navigation-24px/Filter.svg'
import { ReactComponent as SortIcon } from '~assets/svg/navigation-24px/SortIcon.svg'
import { ReactComponent as CampaignFilter } from '~assets/svg/navigation-24px/CampaignFilter.svg'
import { Facet } from '~types/Facet'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { AisStyleOverrides } from '~components/templates/ProductSearchLayout/AisStyleOverrides'
import getConfig from 'next/config'
import {
  ProductListWithStateConnected,
  SearchCountConnected
} from './connected'
import { Sort } from '.'

// TODO: Remove once implementation is proved on all environments
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useSyncSearchStateToUrl } from '~helpers/useSyncSearchStateToUrl'
import { SearchState } from '~types/Search'
import { AlgoliaProduct } from '~domains/product'
import { ReactComponent as ChevronUp } from '~assets/svg/navigation-16px/ChevronUp.svg'
import {
  scrollToTop,
  toggleBackToTopButtonVisibility
} from '~helpers/scrollToTop'
import { DEFAULT_PRODUCTS_PER_PAGE } from '~config/constants/products-per-page'
import { triggerReportMobileFilterAndSortOpened } from '~domains/analytics'
import { ProductFiltersProps } from '~components/molecules/ProductFilters/ProductFilters'
import dynamic from 'next/dynamic'
import { ProductFiltersPlaceHolder } from '~components/molecules/ProductFilters/ProductFIltersPlaceholder'
import { getDefaultLocale } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { GridListToggle } from '~components/atoms/GridListToggle'
import useHasSidebar from '~domains/page/hooks/useHasSidebar'

export type ProductSearchLayoutProps = InstantSearchProps & {
  filters?: string
  locale?: string
  seoContent?: string
  category?: Category
  query?: string
  headerImage?: Asset
  facets?: Facet[]
  analyticsTags?: string[]
  ruleContexts?: string[]
  userToken?: string
  listId?: string
  initialSearchState?: SearchState
  setProducts?: Dispatch<SetStateAction<AlgoliaProduct[]>>
}

const ProductFilters = dynamic<ProductFiltersProps>(
  () =>
    import('~components/molecules/ProductFilters').then(c => c.ProductFilters),
  {
    loading: () => <ProductFiltersPlaceHolder />
  }
)

export const ProductSearchLayout: FunctionComponent<ProductSearchLayoutProps> = ({
  filters,
  locale,
  seoContent,
  category,
  query,
  facets,
  headerImage,
  listId,
  initialSearchState,
  setProducts,
  analyticsTags,
  ruleContexts,
  userToken,
  ...props
}) => {
  const { t } = useTranslation()
  const [filtersMenu, setFiltersMenu] = useState<boolean>(false)
  const [sortMenu, setSortMenu] = useState<boolean>(false)
  const [showPromotionLabel, setShowPromotionLabel] = useState<boolean>(true)
  const [appliedFiltersNumber, setAppliedFiltersNumber] = useState<number>(0)

  const dispatch = useDispatch()
  const router = useRouter()

  // TODO: Remove once Black Friday ends
  const [selectedState, setSelectedState] = useState(false)
  const [campaignHref, setCampaignHref] = useState<string>(router?.asPath)

  const handleOpenFiltersMenu = useCallback(() => {
    setFiltersMenu(!filtersMenu)
    removeHeaderZIndex()
    dispatch(triggerReportMobileFilterAndSortOpened())
  }, [filtersMenu, dispatch])

  const handleClosingFiltersMenu = useCallback(() => {
    setFiltersMenu(!filtersMenu)
    addHeaderZIndex()
  }, [filtersMenu])

  const handleOpenSortMenu = useCallback(() => {
    setSortMenu(!sortMenu)
    removeHeaderZIndex()
    dispatch(triggerReportMobileFilterAndSortOpened())
  }, [sortMenu, dispatch])

  const handleClosingSortMenu = useCallback(() => {
    setSortMenu(!sortMenu)
    addHeaderZIndex()
  }, [sortMenu])

  const { publicRuntimeConfig } = getConfig()
  const defaultLocaleRefinement = locale
    ? publicRuntimeConfig.algolia.productIndexes[locale]
    : publicRuntimeConfig.algolia.productIndexes[getDefaultLocale()]

  const CurrentRefinements = ({ items = [] }: CurrentRefinementsProvided) => {
    useEffect(() => {
      setAppliedFiltersNumber(
        Array.from(new Map(items.map(o => [o.id, o])).keys()).length
      )
    }, [items])

    return (
      <div className="inline-block rounded-full h-3 w-3 ml-1 pt-fixed-1px bg-primary-oxford-blue font-light text-center text-primary-white">
        {appliedFiltersNumber}
      </div>
    )
  }

  const {
    searchState,
    onSearchStateChange,
    createURL
  } = useSyncSearchStateToUrl(initialSearchState)

  const CustomCurrentRefinementsButton = connectCurrentRefinements(
    CurrentRefinements
  )

  const removeHeaderZIndex = () => {
    const header = globalThis?.document?.getElementsByTagName('header')?.[0]
    header && header.classList.remove('z-40')
  }
  const addHeaderZIndex = () => {
    const header = globalThis?.document?.getElementsByTagName('header')?.[0]
    header && header.classList.add('z-40')
  }

  useEffect(() => {
    !filtersMenu && !sortMenu
      ? document.body.setAttribute('style', 'overflow: visible')
      : document.body.setAttribute('style', 'overflow: hidden')
  }, [filtersMenu, sortMenu])
  const screenSizeIsDesktopOrLarger = useBreakpoint(breakpoints.lg)

  const PRODUCTS_PER_PAGE =
    (useFeatureFlag(FeatureFlag.PRODUCT_LIST_PRODUCTS_PER_PAGE) as number) ||
    DEFAULT_PRODUCTS_PER_PAGE

  const isNewTagCampaignEnabled =
    (useFeatureFlag(FeatureFlag.NEW_CAMPAIGN_TAG_FILTER) as Record<
      string,
      unknown
    >) || ''

  const isNewCampaignFilter = useFeatureFlag(
    FeatureFlag.NEW_CAMPAIGN_FILTER
  ) as boolean

  const campaignPanel =
    typeof document !== 'undefined' &&
    document.querySelector(
      '[data-testid="filterCampaignPanel"] .ais-Panel--noRefinement'
    )

  useEffect(() => {
    const noRefinementForPromotionFilter = globalThis?.document?.getElementsByClassName(
      'ais-ToggleRefinement--noRefinement'
    )

    const showPromotionLabel =
      noRefinementForPromotionFilter && noRefinementForPromotionFilter[0]

    showPromotionLabel
      ? setShowPromotionLabel(false)
      : setShowPromotionLabel(true)
  }, [])

  useEffect(() => {
    toggleBackToTopButtonVisibility()
    window.addEventListener('scroll', toggleBackToTopButtonVisibility)

    return function cleanup() {
      window.removeEventListener('scroll', toggleBackToTopButtonVisibility)
    }
  }, [])

  const hasSidebar = useHasSidebar()
  // TODO: Remove once Black Friday ends
  const handleUrlTagCampaign = useCallback(() => {
    if (searchState.refinementList?.campaign) {
      router.replace({
        query: {
          ...router.query,
          campaign: undefined
        }
      })
      setCampaignHref(router?.asPath)
    } else {
      router.push({
        query: {
          ...router.query,
          campaign: isNewTagCampaignEnabled?.campaign as string
        }
      })
      setCampaignHref(router?.asPath)
    }
  }, [searchState, isNewTagCampaignEnabled, router])

  useEffect(() => {
    if (searchState.refinementList?.campaign) {
      setSelectedState(true)
    } else {
      setSelectedState(false)
    }
  }, [searchState])

  const renderFilters = useCallback(
    (nbHits = 0) => {
      // at least two products are found or at least one filter is applied
      const isFiltersAndSortVisible = nbHits > 1 || appliedFiltersNumber > 0

      return (
        <>
          {isFiltersAndSortVisible && (
            <aside
              data-sidebar
              className="hidden md:block md:col-start-1 md:col-end-4 lg:col-end-3 md:row-start-1 md:row-end-6 px-2 sm:px-0"
            >
              <div className="w-full flex mb-3">
                <span className="flex-1 text-base font-body font-semibold">
                  {t('search.filters.title')}
                </span>
                <ClearRefinements
                  translations={{
                    reset: t('search.filters.clear-all')
                  }}
                />
              </div>

              <ProductFilters facets={facets} />

              <div data-testid="promotionFilter">
                {showPromotionLabel && (
                  <span className="text-base font-body font-semibold border-b border-ui-grey-light mb-1.5 flex">
                    {t('filter.special-offers')}
                  </span>
                )}

                <ToggleRefinement
                  attribute="has_promo"
                  label={t('search.filter.promotions.title')}
                  value={true}
                />
              </div>
            </aside>
          )}
          <aside
            id="filtersAndProductViewWrapper"
            data-testid="filtersAndProductViewWrapper"
            className="flex flex-col mb-2 sm:mb-4 sm:mt-2 md:mb-2 col-span-12 sm:flex-row sm:justify-between md:col-start-4 lg:col-start-3 md:col-end-13 px-2 sm:px-0 bg-primary-white"
          >
            {/* Mobile Filter and Sort buttons */}
            {isFiltersAndSortVisible && (
              <div
                id="filtersAndSortButton"
                data-testid="filtersAndSortButton"
                className="flex col-span-12 mb-3 sm:mb-0 md:hidden"
              >
                {/* Filters button */}
                <div className="w-full mr-1 sm:mr-2">
                  <Button
                    className="w-full bg-primary-white sm:px-3 sm:py-2"
                    variant="tertiary"
                    title="Filters"
                    icon={<Filter className="w-3 h-3" />}
                    onClick={handleOpenFiltersMenu}
                  >
                    <span className="flex">
                      {t('shared.filter.title')}
                      <CustomCurrentRefinementsButton />
                    </span>
                  </Button>
                  <div
                    className={classNames(
                      'fixed z-50 top-0 right-0 bottom-0',
                      { invisible: !filtersMenu },
                      { visible: filtersMenu }
                    )}
                  >
                    <FilterAndSort
                      locale={locale}
                      facets={facets}
                      onClose={handleClosingFiltersMenu}
                    />
                  </div>
                </div>

                {/* Sort button */}
                <div className="w-full">
                  <Button
                    className="w-full bg-primary-white sm:hidden"
                    variant="tertiary"
                    title="Sort"
                    icon={<SortIcon className="w-3 h-3" />}
                    onClick={handleOpenSortMenu}
                  >
                    {t('shared.sort.title')}
                  </Button>
                  <div
                    className={classNames(
                      'fixed z-50 top-0 right-0 bottom-0',
                      { invisible: !sortMenu },
                      { visible: sortMenu }
                    )}
                  >
                    <FilterAndSort
                      isSortMenu={sortMenu}
                      locale={locale}
                      facets={facets}
                      onClose={handleClosingSortMenu}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between w-full">
              {/* Search count */}
              {nbHits > 0 && (
                <SearchCountConnected data-testid="productSearchTotalCount" />
              )}

              {/* Desktop Sorting */}
              {isFiltersAndSortVisible && (
                <div className="sm:flex col-span-12">
                  <Sort
                    defaultRefinement={defaultLocaleRefinement}
                    items={[
                      {
                        value: defaultLocaleRefinement,
                        label: t('search.sort.default')
                      },
                      {
                        value: `${defaultLocaleRefinement}_price_up`,
                        label: t('search.sort.ascending')
                      },
                      {
                        value: `${defaultLocaleRefinement}_price_down`,
                        label: t('search.sort.descending')
                      }
                    ]}
                    initialValue={searchState?.sortBy}
                  />

                  {hasSidebar && (
                    <hr className="hidden sm:block w-px h-3 align-middle bg-ui-grey-lightest mr-2 mt-2.25 md:mt-1" />
                  )}

                  {/* Toggle list/grid view */}
                  <GridListToggle data-testid="gridListToggle" />
                </div>
              )}
            </div>
          </aside>
        </>
      )
    },
    [
      appliedFiltersNumber,
      t,
      facets,
      showPromotionLabel,
      handleOpenFiltersMenu,
      CustomCurrentRefinementsButton,
      filtersMenu,
      locale,
      handleClosingFiltersMenu,
      handleOpenSortMenu,
      sortMenu,
      handleClosingSortMenu,
      defaultLocaleRefinement,
      searchState?.sortBy,
      hasSidebar
    ]
  )

  return (
    <InstantSearch
      onSearchStateChange={onSearchStateChange}
      createURL={createURL}
      searchState={searchState}
      {...props}
    >
      <AisStyleOverrides />
      <Configure
        hitsPerPage={PRODUCTS_PER_PAGE}
        filters={filters}
        query={query}
        clickAnalytics
        analyticsTags={analyticsTags}
        ruleContexts={ruleContexts}
        userToken={userToken}
        getRankingInfo={true}
      />
      {/* Mobile header image */}
      {headerImage && headerImage.url && (
        <div className="container-fixed mx-auto px-2 mt-3 sm:px-5 md:hidden">
          <img
            data-testid="mobileHeaderImage"
            className="mx-auto"
            src={headerImage?.url}
            alt={headerImage?.title}
            loading="lazy"
          />
        </div>
      )}
      <section className="container-fixed mx-auto grid gap-x-4 grid-cols-12 grid-rows-7-auto sm:px-5 md:px-8 mt-4 sm:mt-5 md:mt-6 lg:mt-7">
        {/* Desktop header image */}
        {headerImage && headerImage.url && (
          <div className="hidden col-span-12 col-start-4 col-end-13 mb-3 mx-auto md:block">
            <img
              data-testid="desktopHeaderImage"
              className="mx-auto"
              src={headerImage?.url}
              alt={headerImage?.title}
              loading="lazy"
            />
          </div>
        )}
        {/* Top SEO content */}
        {seoContent && seoContent !== '<p></p>' && (
          <article className="px-2 col-span-12 mb-3 sm:block sm:px-0 md:col-start-4 lg:col-start-3 md:col-end-13">
            <SeoContentExpandable
              children={parseHtml(seoContent, {
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
          </article>
        )}

        {/* Category 3 Menu */}
        {(category?.subcategories?.length ?? 0) > 0 && (
          <aside
            data-testid="subcategoryList"
            className="col-span-12 p-2 sm:p-0 md:col-start-4 lg:col-start-3 md:col-end-13"
          >
            <TagList>
              {isNewCampaignFilter &&
                isNewTagCampaignEnabled &&
                Object.keys(isNewTagCampaignEnabled).length > 0 && (
                  // TODO: Remove once Black Friday ends
                  <Tag
                    isSelected={selectedState}
                    href={campaignHref}
                    onClick={handleUrlTagCampaign}
                    className={classNames({ hidden: campaignPanel })}
                  >
                    {
                      <span className="text-base font-body font-semibold flex items-center">
                        {t('search.filter.campaign.name')}
                        <CampaignFilter className="w-2 h-2" />
                      </span>
                    }
                  </Tag>
                )}

              {category?.subcategories?.map(subcategory => (
                <Tag key={subcategory.id} href={subcategory.url}>
                  {subcategory.title}
                </Tag>
              ))}
            </TagList>
          </aside>
        )}

        {/* Product list */}
        <ProductListWithStateConnected
          setProducts={setProducts}
          listId={listId}
          locale={locale}
          data-testid="productSearchList"
          isDesktop={screenSizeIsDesktopOrLarger}
          renderFilters={renderFilters}
        />
      </section>

      <Button
        id="backToTopButton"
        onClick={() => scrollToTop()}
        className="fixed bottom-3 z-20 transition-opacity duration-500 right-1 md:right-5 bg-primary-white text-primary-oxford-blue focus:outline-none"
        icon={<ChevronUp className="icon-16" />}
      />
    </InstantSearch>
  )
}
