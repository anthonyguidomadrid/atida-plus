// TODO: should this be consistent with other search components where presentational component is not coupled to algolia??
import {
  ComponentPropsWithoutRef,
  Dispatch,
  FunctionComponent,
  memo,
  SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'
import type { StatsProvided } from 'react-instantsearch-core'
import { Button } from '~components/atoms/Button'
import { Accordion } from '~components/molecules/Accordion'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import {
  connectStats,
  ToggleRefinement,
  connectSortBy,
  DynamicWidgets
} from 'react-instantsearch-dom'
import { Facet } from '~types/Facet'
import getConfig from 'next/config'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { getDefaultLocale } from '~domains/translated-routes'
import { RadioInput } from '~components/atoms/RadioInput'
import classNames from 'classnames'

export type FilterAndSortMenuProps = {
  onClose?: () => void
  facets?: Facet[]
  locale?: string
  isSortMenu?: boolean
}

type SelectOptionType = {
  value: string
  label: string
  isRefined: boolean
}

type ConnectSortByType = {
  refine: Dispatch<SetStateAction<string>>
  items: SelectOptionType[]
  initialValue?: string | undefined
}

export const SortBy = ({ items, refine }: ConnectSortByType) => {
  return (
    <>
      {items &&
        items?.map(item => (
          <div key={item.value} className="mb-2">
            <RadioInput
              onClick={event => {
                event.preventDefault()
                refine(item.value)
              }}
              id={item.label}
              value={item.value}
              label={item.label}
              isChecked={item.isRefined}
            />
          </div>
        ))}
    </>
  )
}

const CustomSortBy = connectSortBy(SortBy)

const FilterAndSortMenuComponent: FunctionComponent<
  ComponentPropsWithoutRef<'ul'> & FilterAndSortMenuProps
> = ({ onClose, facets, locale, isSortMenu }) => {
  const { t } = useTranslation()
  const { publicRuntimeConfig } = getConfig()
  const defaultLocaleRefinement = locale
    ? publicRuntimeConfig.algolia.productIndexes[locale]
    : publicRuntimeConfig.algolia.productIndexes[getDefaultLocale()]

  const ShowResults = (results: StatsProvided, isSortMenu?: boolean) => (
    <div className="bg-primary-white fixed z-10 left-0 bottom-0 w-full sm:w-1/2 flex shadow-filters-btn">
      <Button
        className="mx-2 my-2 justify-center w-full border-none"
        title={t('search.filter.show-products', { count: results.nbHits })}
        onClick={onClose}
        variant="secondary"
      >
        {isSortMenu
          ? t('shared.sort.title')
          : t('search.filter.show-products', { count: results.nbHits })}
      </Button>
    </div>
  )
  const ConnectedShowResults = connectStats(nbHits =>
    ShowResults(nbHits, isSortMenu)
  )

  let priceFacet: Facet | undefined
  const filteredFacets: Facet[] = []
  facets?.forEach(facet => {
    if (facet?.testId === 'filterPricePanel') {
      priceFacet = facet
    } else {
      filteredFacets.push(facet)
    }
  })

  const toogleRefinementList =
    typeof document !== 'undefined'
      ? document.querySelectorAll(`.ais-ToggleRefinement--noRefinement`)
      : []

  // TODO: Remove once implementation is proved on all environments
  const isMobileAccordeonRefinementListEnabled = useFeatureFlag(
    FeatureFlag.MOBILE_ACCORDEON_REFINEMENT_LIST
  )

  const preventAdditionalRequestFromFetchingAllFacets = useFeatureFlag(
    FeatureFlag.ALGOLIA_PREVENT_ADDITIONAL_REQUEST_FROM_FETCHING_ALL_FACETS
  )

  return (
    <>
      <div
        className={classNames(
          'px-2 flex flex-col justify-between h-screen',
          { hidden: !isSortMenu },
          { visible: isSortMenu }
        )}
        data-testid="sortPanel"
      >
        <div>
          <summary className="font-semibold relative text-left py-2">
            {t('shared.sort.title')}
          </summary>

          <div className="flex flex-col">
            <CustomSortBy
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
            />
          </div>
        </div>
        <div className="flex md:hidden w-full">
          <ConnectedShowResults />
        </div>
      </div>
      <div className={classNames('px-2', { hidden: isSortMenu })}>
        <Accordion
          className="border-b-0 border-t-0"
          controlled
          data-testid="filterAndSortMenuAccordion"
        >
          <>
            <DynamicWidgets
              /* @ts-ignore */
              facets={
                preventAdditionalRequestFromFetchingAllFacets ? [] : ['*']
              }
            >
              {/*// @ts-ignore*/}
              {filteredFacets.length > 0 &&
                filteredFacets?.map(({ title, facet, testId }) => {
                  return (
                    <AccordionPanel
                      id={testId}
                      key={title}
                      className="px-2"
                      heading={title}
                      data-testid={testId}
                      // TODO: Remove once Black Friday is over
                      open={testId === 'filterCampaignPanel'}
                    >
                      {facet}
                    </AccordionPanel>
                  )
                })}
            </DynamicWidgets>
          </>
        </Accordion>
        {priceFacet !== undefined && (
          <details
            data-testid={priceFacet?.testId}
            className="border-t py-3 border-ui-grey-light px-2"
          >
            <summary className="font-semibold relative">
              <div className="mb-2">{priceFacet?.title}</div>
              {priceFacet?.facet}
            </summary>
          </details>
        )}
        <div
          data-testid="filterPromotionPanel"
          className={classNames('mb-15', {
            hidden:
              isMobileAccordeonRefinementListEnabled &&
              toogleRefinementList.length > 0
          })}
        >
          <span className="text-base font-body font-semibold border-b border-ui-grey-light mb-1.5 px-2 flex">
            {t('filter.special-offers')}
          </span>
          <ToggleRefinement
            attribute="has_promo"
            label={t('search.filter.promotions.title')}
            value={true}
            className="px-2"
          />
        </div>
        <div className="flex md:hidden w-full">
          <ConnectedShowResults />
        </div>
      </div>
    </>
  )
}

export const FilterAndSortMenu = memo(FilterAndSortMenuComponent)
