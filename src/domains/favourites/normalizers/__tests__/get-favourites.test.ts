import {
  SprykerFavouritesResponse,
  GetFavouritesResponse
} from '~domains/favourites/types'
import {
  SprykerFavouritesResponseMock,
  GetFavouritesResponseMock
} from '~domains/favourites/__mocks__/get-favourites'
import { normalizeGetFavourites } from '../get-favourites'

describe(normalizeGetFavourites, () => {
  it('normalizes the data recieved', () => {
    const normalizedData = normalizeGetFavourites(
      SprykerFavouritesResponseMock as SprykerFavouritesResponse
    )

    expect(normalizedData).toEqual(
      GetFavouritesResponseMock as GetFavouritesResponse
    )
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeGetFavourites(
      {} as SprykerFavouritesResponse
    )
    expect(normalizedData).toEqual({ items: [] })
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeGetFavourites()
    expect(normalizedData).toEqual({ items: [] })
  })
})
