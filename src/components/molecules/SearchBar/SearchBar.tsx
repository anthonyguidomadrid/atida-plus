import React, {
  ComponentPropsWithoutRef,
  FunctionComponent,
  memo,
  useEffect,
  useState,
  useContext,
  useMemo
} from 'react'
import { Autocomplete } from '~components/molecules/Autocomplete/Autocomplete'
import { getAlgoliaResults } from '@algolia/autocomplete-js'
import type { SearchResponse } from '@algolia/client-search'
import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { default as Router, useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { Button } from '~components/atoms/Button'
import { SearchResult } from '~components/atoms/SearchResult'
import {
  AlgoliaABTestIDs,
  AlgoliaProduct,
  AlgoliaSuggestion,
  ChannelPrice,
  normalizeAlgoliaProduct,
  Product,
  useFormatAmount,
  useFormatPrice
} from '~domains/product'
import { UrlObject } from 'url'
import { useSearchTermFromUrl } from '~domains/search'
import { useDispatch } from 'react-redux'
import {
  triggerReportProductClicked,
  triggerReportProductsSearched
} from '~domains/analytics'
import { cookieStorageMechanism, defaultStorageMechanism } from '~helpers'
import { ReactComponent as NoProductsFound } from '~assets/svg/noProductsFound.svg'
import { ReactComponent as Search } from '~assets/svg/navigation-24px/Search.svg'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getUserToken } from '~helpers/getUserToken'
import { FeatureFlagsContext } from '~components/helpers/FeatureFlags/context'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { SessionChannelType } from '~domains/basket/types'

export type SearchBarProps = ComponentPropsWithoutRef<'div'> & {
  isHomepage?: boolean
}

const SearchBarComponent: FunctionComponent<SearchBarProps> = ({
  placeholder,
  isHomepage,
  className,
  ...props
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const formatPrice = useFormatPrice()
  const formatAmount = useFormatAmount()
  const searchClient = createAlgoliaFrontendClient()
  const [triggerDetachedMediaQuery, setTriggerDetachedMediaQuery] = useState(
    false
  )

  const onSubmitHandler = (autocompleteQuery: string) => {
    const query = autocompleteQuery
    if (query) {
      Router.push(`/?search=${query}`)
    }
  }

  const onItemClickHandler = (url?: string | UrlObject) => {
    if (url) {
      Router.push(url)
    }
  }

  const searchTerm = useSearchTermFromUrl()
  const dispatch = useDispatch()
  const storage = globalThis?.sessionStorage

  const sessionChannelCookie = cookieStorageMechanism().get(
    getSessionChannelName()
  )
  const sessionChannel = useMemo(() => {
    if (!sessionChannelCookie || sessionChannelCookie === '') return undefined
    return JSON.parse(sessionChannelCookie) as SessionChannelType
  }, [sessionChannelCookie])

  const isAutocompleteDebugModeEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_ENABLE_AUTOCOMPLETE_DEBUG_MODE
  )
  const featureFlags = useContext(FeatureFlagsContext)
  const isFixProductPositionInSearchAsYouTypeEnabled = useFeatureFlag(
    FeatureFlag.NAVIGATION_FIX_PRODUCT_POSITION_IN_SEARCH_AS_YOU_TYPE
  )
  const isHrefWithoutLocaleEnabled = useFeatureFlag(
    FeatureFlag.SEARCHBAR_RESULTS_TILES_ANCHOR_HREF_WITHOUT_LOCALE_FIX
  )
  // TODO: Remove when the price channels on products are ready to be used
  const mockedProductPriceChannels = useFeatureFlag(
    FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
  ) as { channel_prices: ChannelPrice[] }

  const isDesktopMenu = useBreakpoint(breakpoints.md)
  const algoliaScreenRuleContext = isDesktopMenu ? 'dev_desktop' : 'dev_mobile'

  const handleTriggerDetachedMediaQuery = () => {
    if (globalThis?.document?.visibilityState !== 'visible') {
      setTriggerDetachedMediaQuery(true)
    } else {
      setTriggerDetachedMediaQuery(false)
      globalThis?.document
        ?.querySelector('body')
        ?.classList.remove('aa-Detached')
    }
  }

  useEffect(() => {
    document.addEventListener(
      'visibilitychange',
      handleTriggerDetachedMediaQuery
    )
    return function cleanup() {
      document.removeEventListener(
        'visibilitychange',
        handleTriggerDetachedMediaQuery
      )
    }
  }, [])

  useEffect(() => {
    if (sessionChannel) {
      const productsListString: string =
        storage.getItem('productsListSearched') || '{}'
      const productsListArray =
        productsListString !== '{}' ? JSON.parse(productsListString) : []
      productsListArray.find(
        (product: AlgoliaProduct | Partial<Product> | undefined) => {
          if (product?.sku === sessionChannel?.sku) {
            product = normalizeAlgoliaProduct(
              locale,
              product as AlgoliaProduct,
              sessionChannel,
              mockedProductPriceChannels.channel_prices
            )
          }
        }
      )
    }
  }, [
    locale,
    mockedProductPriceChannels.channel_prices,
    sessionChannel,
    storage
  ])

  const userToken = getUserToken()

  return (
    <>
      <div
        className="relative w-full h-7 md:h-6 z-20"
        data-testid="searchBarWrapper"
        {...props}
      >
        <Autocomplete
          placeholder={
            searchTerm
              ? searchTerm
              : isHomepage
              ? placeholder
              : t('search.placeholder')
          }
          key={isHomepage?.toString()}
          onSubmit={autoComplete => {
            // TODO move dispatch to onSubmitHandler correctly specifying its type
            dispatch(
              triggerReportProductsSearched({
                query: autoComplete.state.query
              })
            )
            onSubmitHandler(autoComplete.state.query)
          }}
          detachedMediaQuery={triggerDetachedMediaQuery ? 'none' : ''}
          openOnFocus={true}
          // We have agreed to keep the debug mode to true as it keeps the autocomplete panel open when the blur event occurs,
          // which has positive impact on the accessibility of the autocomplete panel.
          // Also if set to false the search icon is not functioning on mouse click.
          debug={isAutocompleteDebugModeEnabled ? true : false}
          // @ts-ignore TODO: probably needs a refactor to fix type
          getSources={({ query, setContext, state, setQuery }) => {
            !state.isOpen && searchTerm && setQuery(searchTerm)

            const suggestions: string =
              (storage && storage.getItem('popularSuggestions')) || ''
            const popularSuggestions = suggestions.split('-')

            const products = state.context.productsList as AlgoliaProduct[]

            return [
              {
                sourceId: 'querySuggestions',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: getAlgoliaIndex(locale, 'suggestionIndexes'),
                        query,
                        params: {
                          hitsPerPage: isDesktopMenu ? 5 : 4
                        }
                      }
                    ],
                    transformResponse({ hits }) {
                      setContext({
                        querySuggestions: hits[0] as AlgoliaSuggestion[]
                      })
                      return hits
                    }
                  })
                },
                templates: {
                  item({ item, components }) {
                    return (
                      <div className="aa-ItemHolder">
                        <div className="aa-ItemContent">
                          <div className="aa-ItemNameHolder">
                            <a
                              onClick={event => {
                                event.preventDefault()
                                event.stopPropagation()
                                document.body.setAttribute('class', '')
                                dispatch(
                                  triggerReportProductsSearched({
                                    query,
                                    suggestion: item.query
                                  })
                                )
                                onSubmitHandler(item.query)
                              }}
                              className="text-ui-grey-dark md:text-primary-oxford-blue block"
                              href={`${locale}/?search=${item.query}`}
                            >
                              <Search className="icon-16 inline-block align-middle mr-1 text-primary-oxford-blue" />
                              <components.Highlight
                                hit={item}
                                attribute="query"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  },
                  noResults() {
                    return (
                      <>
                        {products?.length === 0 ? (
                          <div className="popular-suggestions-holder">
                            {popularSuggestions &&
                              popularSuggestions.map((suggestion: string) => {
                                return (
                                  <div
                                    key={suggestion}
                                    className="aa-ItemHolder"
                                  >
                                    <div className="aa-ItemContent">
                                      <div className="aa-ItemNameHolder">
                                        <button
                                          className="popular-suggestion"
                                          onClick={() =>
                                            onSubmitHandler(suggestion)
                                          }
                                        >
                                          {suggestion}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        ) : (
                          <div className="aa-footer text-left no-found-text">
                            <p>{t('search.no-suggestions-found')}</p>
                          </div>
                        )}
                      </>
                    )
                  },
                  header() {
                    return (
                      <div className="aa-footer text-left">
                        <p className="aa-ItemsHeader">
                          {(products && products.length === 0) || !query
                            ? t('search.popular-suggestions')
                            : t('search.suggestions')}
                        </p>
                      </div>
                    )
                  }
                }
              },
              {
                sourceId: 'categories',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: getAlgoliaIndex(locale, 'categoryIndexes'),
                        query
                      }
                    ]
                  })
                },
                templates: {
                  item({ item, components }) {
                    return (
                      <div className="aa-ItemHolder">
                        <div className="aa-ItemContent">
                          <div className="aa-ItemNameHolder">
                            <a
                              onClick={event => {
                                event.preventDefault()
                                event.stopPropagation()
                                document.body.setAttribute('class', '')
                                onItemClickHandler(`/${item.category_slug}`)
                              }}
                              href={`${locale}/${item.category_slug}`}
                              className="block"
                            >
                              <Search className="icon-16 flex-shrink-0 inline-block align-middle mr-1 text-primary-oxford-blue" />
                              <components.Highlight
                                hit={item}
                                attribute="category_path"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  },
                  noResults() {
                    return (
                      <div className="aa-footer text-left pb-2 no-found-text">
                        <p>{t('search.no-categories-found')}</p>
                      </div>
                    )
                  },
                  header() {
                    return (
                      <div className="aa-footer text-left">
                        <p className="aa-ItemsHeader">
                          {!query
                            ? t('search.popular-categories')
                            : t('search.categories')}
                        </p>
                      </div>
                    )
                  }
                }
              },
              {
                sourceId: 'products',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: getAlgoliaIndex(locale, 'productIndexes'),
                        query,
                        params: {
                          clickAnalytics: true,
                          analyticsTags: ['type_searchbar'],
                          ruleContexts: [
                            'type_searchbar',
                            algoliaScreenRuleContext
                          ],
                          userToken,
                          getRankingInfo: true
                        }
                      }
                    ],
                    transformResponse({ results, hits }) {
                      setContext({
                        nbProducts: (results[0] as SearchResponse<AlgoliaProduct>)
                          ?.nbHits,
                        productsList: hits[0] as AlgoliaProduct[],
                        abTestVariantID: (results[0] as SearchResponse<AlgoliaABTestIDs>)
                          ?.abTestVariantID,
                        // @ts-ignore
                        abTestID: results[0]?.abTestID
                      })
                      return hits
                    }
                  })
                },
                templates: {
                  item({ item, components }) {
                    const storageMechanism = defaultStorageMechanism()
                    storageMechanism?.set(
                      'algoliaQueryId',
                      item.__autocomplete_queryID ?? ''
                    )

                    const product = normalizeAlgoliaProduct(
                      locale,
                      item,
                      sessionChannel,
                      mockedProductPriceChannels?.channel_prices
                    )
                    const suggestionsArr = globalThis?.document?.querySelectorAll(
                      '.aa-ItemHolder'
                    )
                    const position =
                      item.__autocomplete_id !== undefined &&
                      item.__autocomplete_id !== null
                        ? item.__autocomplete_id + 1
                        : -1

                    const productPosition =
                      item.__autocomplete_id !== undefined &&
                      item.__autocomplete_id !== null &&
                      item.__autocomplete_id + 1

                    const positionAfterExcludingSuggestions = productPosition
                      ? productPosition - suggestionsArr.length
                      : -1

                    const mainPrice = formatPrice(
                      product?.price?.value,
                      product?.price?.currency
                    )
                    const rrpPrice = formatPrice(
                      product?.rrp?.value,
                      product?.rrp?.currency
                    )
                    const formattedUnitVolume = product.unitVolume
                      ? formatAmount(
                          product?.unitVolume?.amount,
                          product?.unitVolume?.unit,
                          product?.unitVolume?.unitLabel
                        )
                      : null

                    const handleClick = () => {
                      document.body.setAttribute('class', '')
                      onItemClickHandler(product.url)
                      dispatch(
                        triggerReportProductClicked({
                          product,
                          positionInTheList: isFixProductPositionInSearchAsYouTypeEnabled
                            ? positionAfterExcludingSuggestions
                            : position,
                          list_id: 'search/search_autocomplete'
                        })
                      )
                    }

                    return (
                      <SearchResult
                        product={product}
                        handleClick={handleClick}
                        mainPrice={mainPrice}
                        rrpPrice={rrpPrice}
                        formattedUnitVolume={formattedUnitVolume}
                        featureFlags={featureFlags}
                        locale={isHrefWithoutLocaleEnabled ? undefined : locale}
                      >
                        <components.Highlight hit={item} attribute="name" />
                      </SearchResult>
                    )
                  },
                  header() {
                    return (
                      <div className="aa-footer text-left">
                        {products && products.length === 0 ? null : (
                          <p className="aa-ItemsHeader">
                            {!query
                              ? t('search.popular-products')
                              : t(
                                  'search.autocomplete.header.trending-products'
                                )}
                          </p>
                        )}
                      </div>
                    )
                  },

                  noResults() {
                    return (
                      <div className="aa-footer products-no-results">
                        <NoProductsFound className="inline-block" />
                        <p className="no-products-heading">
                          {t('search.no-products-found')}
                        </p>

                        <p className="no-products-found-text">
                          {t('search.no-products-found-check')}
                        </p>
                      </div>
                    )
                  },

                  footer(e) {
                    const onClickHandler = () => {
                      // TODO move dispatch to onSubmitHandler correctly specifying its type
                      document.body.setAttribute('class', '')
                      dispatch(
                        triggerReportProductsSearched({
                          query: state.query
                        })
                      )
                      onSubmitHandler(state.query)
                    }
                    const resultsCount = e.state.context.nbProducts as number
                    return (
                      state.query &&
                      resultsCount > 0 && (
                        <div className="aa-footer text-center">
                          <Button
                            data-testid="searchbarViewAll"
                            className="show-products w-full mb-2 md:min-w-36 lg:min-w-36 sm:min-w-36 mt-2 sm:mt-3"
                            onClick={onClickHandler}
                            variant="tertiary"
                          >
                            {t('search.autocomplete-view-all-results', {
                              count: resultsCount as number
                            })}
                          </Button>
                        </div>
                      )
                    )
                  }
                }
              }
            ]
          }}
        />
      </div>
    </>
  )
}

export const SearchBarPlaceholder: FunctionComponent<
  ComponentPropsWithoutRef<'button'>
> = () => {
  const { t } = useTranslation()
  return (
    <div className="relative w-full h-7 md:h-6 z-20">
      <button
        aria-label={t('accessibility.open-search-bar')}
        className="aa-DetachedSearchButton"
        type="button"
        data-testid="headerSearchBarWrapper"
      />
    </div>
  )
}

export const SearchBar = memo(SearchBarComponent)
