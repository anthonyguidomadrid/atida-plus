import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ClientToken, ClientTokenData } from '../types'

export const normalizeClientTokenData = (
  clientTokenData?: ClientTokenData
): ClientToken =>
  removeUndefinedPropertiesFromObject({
    clientToken: clientTokenData?.client_token
  })
