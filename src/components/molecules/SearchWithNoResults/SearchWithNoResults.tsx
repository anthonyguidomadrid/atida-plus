import type { FunctionComponent } from 'react'
import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '~components/atoms/Button'
import { ReactComponent as NoResultsImg } from '~assets/svg/SearchWithNoResults.svg'
import { ExponeaRecommendationBlock } from '~components/organisms/ExponeaRecommendationBlock'
import { RECOMMENDATIONS_TYPES } from '~config/constants/recommendations'

export type SearchWithNoResultsProps = {
  query?: string
}

export const SearchWithNoResults: FunctionComponent<SearchWithNoResultsProps> = ({
  query
}) => {
  const { t } = useTranslation()
  //TODO find a better way to focus the search bar when he button is clicked
  const focusSearchBar = () => {
    const button = document.getElementsByClassName(
      'aa-DetachedSearchButton'
    )[0] as HTMLElement
    if (button) {
      button.click()
      return
    }
    ;(document.getElementsByClassName('aa-Input')[0] as HTMLElement).focus()
  }
  return (
    <div
      data-testid="searchWithNoResults"
      className={classNames(
        'flex justify-center flex-col items-center mt-4 mb-22',
        'sm:mt-6 sm:mb-19',
        'md:mt-5 md:mb-15',
        'lg:mt-7'
      )}
    >
      <div
        className={classNames(
          'flex flex-col w-43 text-center m-2 mb-8',
          'sm:w-41',
          'lg:w-38'
        )}
      >
        <NoResultsImg
          data-testid={'searchWithNoResultsImg'}
          className={classNames(
            'self-center max-w-20 max-h-20',
            'sm:max-w-26 sm:max-h-26'
          )}
        />
        <h2
          data-testid={'searchWithNoResultsTitle'}
          className={classNames('mt-5 sm:mt-3', 'sm:mb-1')}
        >
          {t('search.no-products-found')}
        </h2>
        {query && (
          <h4
            data-testid={'searchWithNoResultsQuery'}
            className="text-ui-grey-dark"
          >
            {`"${query}"`}
          </h4>
        )}

        <Button
          variant="secondary"
          data-testid={'searchWithNoResultsButton'}
          onClick={focusSearchBar}
          className={classNames('w-full mt-3', 'sm:mt-2.5', 'lg:mt-3')}
        >
          {t('search.search-again')}
        </Button>
      </div>

      <ExponeaRecommendationBlock
        recommendationType={RECOMMENDATIONS_TYPES.SEARCH_WITH_NO_RESULTS_PAGE}
        loading="lazy"
      />
    </div>
  )
}
