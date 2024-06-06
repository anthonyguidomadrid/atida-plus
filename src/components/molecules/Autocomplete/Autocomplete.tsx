import { autocomplete } from '@algolia/autocomplete-js'
import type { AutocompleteOptions } from '@algolia/autocomplete-js'
import React, {
  ComponentPropsWithoutRef,
  createElement,
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useCallback,
  ReactElement,
  useMemo
} from 'react'
import { render } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  AlgoliaProduct,
  normalizeAlgoliaProduct,
  AlgoliaSuggestion,
  AlgoliaCategory,
  AlgoliaABTestIDs,
  ChannelPrice,
  Product
} from '~domains/product'
import { useSearchTermFromUrl } from '~domains/search'
import {
  triggerReportPageViewed,
  triggerReportProductListViewed,
  triggerReportProductsSearched
} from '~domains/analytics'
import { useRouter } from 'next/router'
import { selectContent } from '~domains/page'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import 'globalthis'
import { useTranslation } from 'react-i18next'
import { storeAlgoliaABTestingID } from '~helpers/storeAlgoliaABTestingIDs'
import { cookieStorageMechanism } from '~helpers'
import { getSessionChannelName } from '~domains/account/helpers/get-session-channel-name'
import { SessionChannelType } from '~domains/basket/types'

export type AutocompleteProps = Omit<
  ComponentPropsWithoutRef<'form'>,
  'onSubmit'
> &
  Partial<
    AutocompleteOptions<
      AlgoliaProduct & AlgoliaSuggestion & AlgoliaCategory & AlgoliaABTestIDs
    >
  >

export const Autocomplete: FunctionComponent<AutocompleteProps> = ({
  ...props
}) => {
  const searchTerm = useSearchTermFromUrl()
  const containerRef = useRef<HTMLDivElement>(null)
  const { locale } = useRouter()
  const content = useSelector(selectContent)
  const dispatch = useDispatch()
  const isSegmentSearchAsYouTypeEnabled = useFeatureFlag(
    FeatureFlag.SEGMENT_SEARCH_AS_YOU_TYPE
  )
  // TODO: Remove when the price channels on products are ready to be used
  const mockedProductPriceChannels = useFeatureFlag(
    FeatureFlag.MUTLICHANNEL_PRICES_MOCKED_PRODUCT_PRICE_CHANNEL
  ) as { channel_prices: ChannelPrice[] }

  const backArrow = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g id="Size=24px, Type=Back, Menu=Other">
  <g id="Frame" clip-path="url(#clip0)">
  <path id="Vector" d="M21 11H5.4L10.7 5.7C11.1 5.3 11.1 4.7 10.7 4.3C10.3 3.9 9.7 3.9 9.3 4.3L2.3 11.3C1.9 11.7 1.9 12.3 2.3 12.7L9.3 19.7C9.5 19.9 9.7 20 10 20C10.3 20 10.5 19.9 10.7 19.7C11.1 19.3 11.1 18.7 10.7 18.3L5.4 13H21C21.6 13 22 12.6 22 12C22 11.4 21.6 11 21 11Z" fill="#1A1D32"/>
  </g>
  </g>
  <defs>
  <clipPath id="clip0">
  <rect width="20" height="16" fill="white" transform="translate(2 4)"/>
  </clipPath>
  </defs>
  </svg>`

  const changeButtonText = useCallback(() => {
    const cancelButton = globalThis?.document?.querySelector(
      '.aa-DetachedCancelButton'
    )

    if (cancelButton) {
      cancelButton.innerHTML = backArrow
    }
  }, [backArrow])

  const storage = globalThis?.sessionStorage

  const sessionChannelCookie = cookieStorageMechanism().get(
    getSessionChannelName()
  )
  const sessionChannel = useMemo(() => {
    if (!sessionChannelCookie || sessionChannelCookie === '') return undefined
    return JSON.parse(sessionChannelCookie) as SessionChannelType
  }, [sessionChannelCookie])

  const setAlgoliaSearchModalTopPosition = useCallback(() => {
    const searchBarPosition = containerRef.current?.getBoundingClientRect()
    const searchModalTopPosition = `${
      searchBarPosition && searchBarPosition.top
    }px`
    const root = document.querySelector(':root') as HTMLElement
    root.style.setProperty('--aa-detached-modal-top', searchModalTopPosition)
  }, [])

  const storeSearchProps = useCallback(
    (query: string, productsList: AlgoliaProduct[]) => {
      if (!storage) return
      storage.setItem('searchQuery', `${query}`)
      const productListString = JSON.stringify(productsList)
      storage.setItem('productsListSearched', productListString)
    },
    [storage]
  )

  const disableSubmitSearchButton = useCallback((searchTerm: string) => {
    const root = document.querySelector(':root') as HTMLElement
    const submitSearchButton = globalThis?.document?.querySelector(
      '.aa-SubmitButton'
    )
    !searchTerm
      ? root.style.setProperty('--aa-placeholder-padding-left', '48px')
      : root.style.setProperty('--aa-placeholder-padding-left', '24px')

    !searchTerm
      ? root.style.setProperty('--aa-submit-icon-left-position', '0')
      : root.style.setProperty('--aa-submit-icon-left-position', 'none')

    !searchTerm
      ? submitSearchButton?.setAttribute('disabled', 'true')
      : submitSearchButton?.removeAttribute('disabled')
  }, [])

  const storeSearchSuggestions = useCallback(
    (suggestions: AlgoliaSuggestion[]) => {
      if (!storage) return
      const popularSuggestionListString =
        suggestions &&
        suggestions.reduce((arr: string[] = [], suggestion) => {
          arr.push(suggestion.query)
          return arr
        }, [])

      storage.setItem(
        'popularSuggestions',
        popularSuggestionListString && popularSuggestionListString.join('-')
      )
    },
    [storage]
  )

  const getSearchProps = useCallback(() => {
    if (!storage) return

    const query: string = storage.getItem('searchQuery') || ''
    const productsListString: string =
      storage.getItem('productsListSearched') || ''
    const productsListArray = JSON.parse(productsListString)

    const algoliaABTestId: string = storage.getItem('algoliaABTestID') || ''

    return {
      query,
      productsList: productsListArray,
      algoliaABTestId
    }
  }, [storage])

  const reportSegmentSearchAsYouType = useCallback(
    (
      query: string,
      productsList: AlgoliaProduct[],
      algoliaABTestId: string
    ) => {
      const products = productsList.map((product: AlgoliaProduct) =>
        normalizeAlgoliaProduct(
          locale,
          product,
          sessionChannel,
          mockedProductPriceChannels?.channel_prices
        )
      )
      dispatch(
        triggerReportPageViewed({
          page: 'Search As You Type',
          pageType: 'shopping'
        })
      )
      dispatch(
        triggerReportProductsSearched({
          query,
          isSearchAsYouType: true,
          algoliaABTestId
        })
      )
      products &&
        dispatch(
          triggerReportProductListViewed({
            products,
            type: content?.type,
            list_id: 'search_bar',
            algoliaABTestId
          })
        )
    },
    [content?.type, dispatch, locale]
  )

  const timer = useRef<number | undefined>()

  const handleKeyUp = useCallback(() => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      const searchAsYouTypeProps = getSearchProps()
      searchAsYouTypeProps?.query &&
        isSegmentSearchAsYouTypeEnabled &&
        reportSegmentSearchAsYouType(
          searchAsYouTypeProps?.query,
          searchAsYouTypeProps?.productsList,
          searchAsYouTypeProps?.algoliaABTestId
        )
    }, 1000)
  }, [
    getSearchProps,
    isSegmentSearchAsYouTypeEnabled,
    reportSegmentSearchAsYouType
  ])

  const handleKeyPress = () => {
    window.clearTimeout(timer.current)
  }

  const setAlgoliaPanelLayoutClassName = useCallback(() => {
    const wrapper = document.querySelector('.aa-PanelLayout')
    wrapper && wrapper.classList.add('panelWrapper')
  }, [])

  const setAlgoliaInputEventListener = useCallback(() => {
    const algoliaInput = document.querySelector('.aa-Input')
    algoliaInput && algoliaInput.addEventListener('input', handleKeyUp)
  }, [handleKeyUp])

  const { t } = useTranslation()

  const resetInputPlaceholder = useCallback(() => {
    const algoliaInput = document.querySelector('.aa-Input') as HTMLInputElement
    if (algoliaInput) algoliaInput.placeholder = `${t('search.placeholder')}`
  }, [t])

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }
    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children as ReactElement, root)
      },
      initialState: {
        query: searchTerm
      },
      onStateChange({ state }) {
        window.setTimeout(() => {
          setAlgoliaPanelLayoutClassName()
          resetInputPlaceholder()
        }, 0)
        !state.query &&
          storeSearchSuggestions(
            state.context.querySuggestions as AlgoliaSuggestion[]
          )
        state.query &&
          storeSearchProps(
            state.query,
            state.context.productsList as AlgoliaProduct[]
          )
        setAlgoliaInputEventListener()

        disableSubmitSearchButton(state.query)

        changeButtonText()

        storeAlgoliaABTestingID(
          state.context.abTestID as number,
          state.context.abTestVariantID as number
        )
      },
      ...props
    })

    return () => {
      search.destroy()
    }
  }, [
    props,
    searchTerm,
    isSegmentSearchAsYouTypeEnabled,
    storeSearchProps,
    storeSearchSuggestions,
    setAlgoliaPanelLayoutClassName,
    storage,
    setAlgoliaInputEventListener,
    disableSubmitSearchButton,
    changeButtonText,
    resetInputPlaceholder
  ])

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

  return (
    <div
      data-testid="autoComplete"
      role="searchbox"
      tabIndex={0}
      onClick={() => {
        setAlgoliaPanelLayoutClassName()
        setAlgoliaSearchModalTopPosition()
      }}
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
      ref={containerRef}
    />
  )
}
