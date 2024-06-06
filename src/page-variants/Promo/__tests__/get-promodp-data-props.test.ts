import { GetServerSidePropsContext } from 'next'
import { findResultsState } from 'react-instantsearch-dom/server'

import { resultsMultipleProducts } from '~domains/algolia/__mocks__/results'
import { promoPage } from '~domains/page/__mocks__/contentfulPromotionContent'
import { RootState } from '~domains/redux'
import { getPromoDPDataProps } from '../get-promodp-data-props'

jest.mock('react-instantsearch-dom/server')

describe(getPromoDPDataProps, () => {
  beforeEach(() => {
    ;(findResultsState as jest.Mock).mockResolvedValue(resultsMultipleProducts)
  })

  it('filters the correct promo', async () => {
    const props = await getPromoDPDataProps(
      ({
        locale: 'pt-PT',
        params: {
          all: ['promotions']
        }
      } as unknown) as GetServerSidePropsContext,
      {
        getState: () =>
          ({
            server: {
              page: {
                'page-content': {
                  content: promoPage
                }
              }
            }
          } as RootState)
      }
    )
    expect(props.searchFilters).toEqual(
      'promos: "Jason 10% off update1"' // actual value not important, checking for the "lvl1" part
    )
  })

  it('returns results state', async () => {
    const props = await getPromoDPDataProps(
      ({
        locale: 'pt-PT',
        params: {
          all: ['some']
        }
      } as unknown) as GetServerSidePropsContext,
      {
        getState: () =>
          ({
            server: {
              page: {
                'page-content': {
                  content: promoPage
                }
              }
            }
          } as RootState)
      }
    )
    expect(props.resultsState).toEqual(resultsMultipleProducts)
  })
})
