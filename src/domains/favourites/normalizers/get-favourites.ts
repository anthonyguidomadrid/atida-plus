import { removeUndefinedPropertiesFromObject } from '~helpers'
import { SprykerFavouritesResponse, GetFavouritesResponse } from '../types'

export const normalizeGetFavourites = (
  favouritesListData?: SprykerFavouritesResponse
): GetFavouritesResponse =>
  removeUndefinedPropertiesFromObject({
    id: favouritesListData?.data && favouritesListData?.data[0]?.id,
    items: favouritesListData?.included?.map(item => item.id) ?? []
  })
