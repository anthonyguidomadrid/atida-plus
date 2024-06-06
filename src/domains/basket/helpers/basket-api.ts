import { BasketApiConfig } from '../types'
import { basketApiConfig } from '../config'

export const getBasketApiConfig = (token?: string): BasketApiConfig => {
  return token ? basketApiConfig.authorised : basketApiConfig.guest
}
