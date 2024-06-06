import { GetServerSidePropsContext } from 'next'
import { findResultsState } from 'react-instantsearch-dom/server'
import { FeatureFlag } from '~config/constants/feature-flags'
import { resultsMultipleProducts } from '~domains/algolia/__mocks__/results'
import { brandPage } from '~domains/page/__mocks__/contentfulBrandContent'
import { RootState } from '~domains/redux'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getBrandPageDataProps } from '../get-brand-page-data-props'

jest.mock('react-instantsearch-dom/server')

describe(getBrandPageDataProps, () => {
  beforeEach(() => {
    ;(findResultsState as jest.Mock).mockResolvedValue(resultsMultipleProducts)
    ;(loadFeatureFlags as jest.Mock).mockResolvedValue({
      [FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS]: false
    })
  })

  afterEach(() => {
    ;(loadFeatureFlags as jest.Mock).mockReset()
  })

  it('gets correct initial brand filter from context and returns it', async () => {
    const props = await getBrandPageDataProps(
      ({
        locale: 'pt-pt',
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
                  content: {
                    ...brandPage
                  }
                }
              }
            }
          } as RootState)
      }
    )

    expect(props.searchFilters).toEqual('attributes.brand.code: "avene"')
  })

  it('returns results state', async () => {
    const props = await getBrandPageDataProps(
      ({
        locale: 'pt-pt',
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
                  content: brandPage
                }
              }
            }
          } as RootState)
      }
    )
    expect(props.resultsState).toEqual(resultsMultipleProducts)
  })

  describe('feature flag: BRAND_PAGE_CATEGORY_FILTERS', () => {
    it("when feature flag is off, it doesn't return any namespaces", async () => {
      const props = await getBrandPageDataProps(
        ({
          locale: 'pt-pt',
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
                    content: brandPage
                  }
                }
              }
            } as RootState)
        }
      )
      expect(props.i18nNamespaces).toEqual(undefined)
    })

    it('when feature flag is on, it returns category-title namespace', async () => {
      ;(loadFeatureFlags as jest.Mock).mockResolvedValue({
        [FeatureFlag.BRAND_PAGE_CATEGORY_FILTERS]: true
      })
      const props = await getBrandPageDataProps(
        ({
          locale: 'pt-pt',
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
                    content: brandPage
                  }
                }
              }
            } as RootState)
        }
      )
      expect(props.i18nNamespaces).toEqual(['category-title'])
    })
  })
})
