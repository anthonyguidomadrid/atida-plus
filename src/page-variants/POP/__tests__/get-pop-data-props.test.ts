import { GetServerSidePropsContext } from 'next'
import { findResultsState } from 'react-instantsearch-dom/server'
import { resultsMultipleProducts } from '~domains/algolia/__mocks__/results'
import { categoryPagePOP } from '~domains/page/__mocks__/contentfulCategoryContent'
import { RootState } from '~domains/redux'
import { getPOPDataProps } from '../get-pop-data-props'

jest.mock('react-instantsearch-dom/server')

describe(getPOPDataProps, () => {
  beforeEach(() => {
    ;(findResultsState as jest.Mock).mockResolvedValue(resultsMultipleProducts)
  })

  it('gets correct initial first-level category filter from context and returns it', async () => {
    const props = await getPOPDataProps(
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
                    ...categoryPagePOP,
                    category: {
                      ...categoryPagePOP.category,
                      level: 0
                    }
                  }
                }
              }
            }
          } as RootState)
      }
    )

    expect(props.searchFilters).toEqual(
      'attributes.categories.lvl0: "Medicines > Digestion"' // actual value not important, checking for the "lvl0" part
    )
  })

  it('gets correct initial second-level category filter from context and returns it', async () => {
    const props = await getPOPDataProps(
      ({
        locale: 'pt-pt',
        params: {
          all: ['some', 'category']
        }
      } as unknown) as GetServerSidePropsContext,
      {
        getState: () =>
          ({
            server: {
              page: {
                'page-content': {
                  content: categoryPagePOP
                }
              }
            }
          } as RootState)
      }
    )
    expect(props.searchFilters).toEqual(
      'attributes.categories.lvl1: "Medicines > Digestion"' // actual value not important, checking for the "lvl1" part
    )
  })

  it('gets correct initial third-level category filter from context and returns it', async () => {
    const props = await getPOPDataProps(
      ({
        locale: 'pt-pt',
        params: {
          all: ['some', 'category', 'page']
        }
      } as unknown) as GetServerSidePropsContext,
      {
        getState: () =>
          ({
            server: {
              page: {
                'page-content': {
                  content: {
                    ...categoryPagePOP,
                    category: {
                      ...categoryPagePOP.category,
                      level: 2
                    }
                  }
                }
              }
            }
          } as RootState)
      }
    )
    expect(props.searchFilters).toEqual(
      'attributes.categories.lvl2: "Medicines > Digestion"' // actual value not important, checking for the "lvl2" part
    )
  })

  it('defaults to level 0 category if category does not have a level assigned', async () => {
    const props = await getPOPDataProps(
      ({
        locale: 'pt-pt',
        params: {
          all: ['some', 'category', 'page']
        }
      } as unknown) as GetServerSidePropsContext,
      {
        getState: () =>
          (({
            server: {
              page: {
                'page-content': {
                  content: {
                    ...categoryPagePOP,
                    category: {
                      ...categoryPagePOP.category,
                      level: undefined
                    }
                  }
                }
              }
            }
          } as unknown) as RootState)
      }
    )

    expect(props.searchFilters).toEqual(
      'attributes.categories.lvl0: "Medicines > Digestion"' // actual value not important, checking for the "lvl0" part
    )
  })

  it('returns results state', async () => {
    const props = await getPOPDataProps(
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
                  content: categoryPagePOP
                }
              }
            }
          } as RootState)
      }
    )
    expect(props.resultsState).toEqual(resultsMultipleProducts)
  })
})
