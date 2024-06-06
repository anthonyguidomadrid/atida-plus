import { queryToSearchState, searchStateToQuery } from '../queryToSearchState'

describe(queryToSearchState, () => {
  it('returns searchState with page=1', () => {
    const searchState = { all: ['beleza', 'rosto'] }
    expect(queryToSearchState(searchState)).toEqual({
      all: ['beleza', 'rosto'],
      page: '1'
    })
  })
  it('returns searchState with page=2', () => {
    const searchState = { all: ['beleza', 'rosto'], page: '2' }
    expect(queryToSearchState(searchState)).toEqual({
      all: ['beleza', 'rosto'],
      page: '2'
    })
  })
  it('returns searchState with page=2 and search=sun', () => {
    const searchState = { all: ['beleza', 'rosto'], search: 'sun', page: '2' }
    expect(queryToSearchState(searchState)).toEqual({
      all: ['beleza', 'rosto'],
      search: 'sun',
      page: '2'
    })
  })

  it('returns searchState with refinementList', () => {
    const searchState = { all: ['beleza', 'rosto'], brand: 'Sesderma' }
    expect(queryToSearchState(searchState, true)).toEqual({
      all: ['beleza', 'rosto'],
      brand: 'Sesderma',
      page: '1',
      refinementList: {
        'attributes.brand.label': ['Sesderma']
      }
    })
  })

  it('returns searchState with price range', () => {
    const searchState = { all: ['beleza', 'rosto'], priceRange: '5-10' }
    expect(queryToSearchState(searchState, true)).toEqual({
      all: ['beleza', 'rosto'],
      priceRange: '5-10',
      page: '1',
      range: {
        'price.sale': {
          min: 500,
          max: 1000
        }
      }
    })
  })

  it('returns searchState with toggle has_promo', () => {
    const searchState = { all: ['beleza', 'rosto'], hasPromo: 'true' }
    expect(queryToSearchState(searchState, true)).toEqual({
      all: ['beleza', 'rosto'],
      hasPromo: 'true',
      page: '1',
      toggle: {
        has_promo: 'true'
      }
    })
  })
})

describe(searchStateToQuery, () => {
  it('returns query without page', () => {
    const searchState = { all: ['beleza', 'rosto'] }
    expect(searchStateToQuery(searchState)).toEqual({})
  })

  it('returns query with page=2', () => {
    const searchState = { all: ['beleza', 'rosto'], page: '2' }
    expect(searchStateToQuery(searchState)).toEqual({
      page: '2'
    })
  })

  it('returns query with search', () => {
    const searchState = { all: ['beleza', 'rosto'], search: 'test' }
    expect(searchStateToQuery(searchState)).toEqual({
      search: 'test'
    })
  })

  it('returns query with url params', () => {
    const searchState = { all: ['beleza', 'rosto'], page: '2' }
    const urlParams = { utm: 'test' }
    expect(searchStateToQuery(searchState, urlParams)).toEqual({
      page: '2',
      utm: 'test'
    })
  })

  it('returns query with sorting', () => {
    const searchState = { all: ['beleza', 'rosto'], sortBy: 'priceUp' }
    expect(searchStateToQuery(searchState, undefined, true)).toEqual({
      sortBy: 'priceUp'
    })
  })

  it('returns query with brand string', () => {
    const searchState = {
      all: ['beleza', 'rosto'],
      refinementList: {
        'attributes.brand.label': ['Sesderma', 'Bioderma']
      }
    }
    expect(searchStateToQuery(searchState, undefined, true)).toEqual({
      brand: 'Sesderma_Bioderma'
    })
  })

  it('returns query with priceRange', () => {
    const searchState = {
      all: ['beleza', 'rosto'],
      range: {
        'price.sale': {
          min: 500,
          max: 1000
        }
      }
    }
    expect(searchStateToQuery(searchState, undefined, true)).toEqual({
      priceRange: '5-10'
    })
  })

  it('returns query with toggle', () => {
    const searchState = {
      all: ['beleza', 'rosto'],
      toggle: {
        has_promo: 'true'
      }
    }
    expect(searchStateToQuery(searchState, undefined, true)).toEqual({
      hasPromo: 'true'
    })
  })
})
