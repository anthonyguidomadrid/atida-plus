/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { validateAddress } from '../validate-address'
import getConfig from 'next/config'
import {
  qualifiedQuery,
  validatedAddress
} from '~domains/address/__mocks__/addresses'

describe(validateAddress, () => {
  const data = qualifiedQuery
  beforeEach(() => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: validatedAddress })
  })

  const { serverRuntimeConfig } = getConfig()

  it('creates the client and calls the Here Geocode API', async () => {
    await validateAddress('es-es', data)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'es-es'
    })
    expect(axios.get).toHaveBeenCalledTimes(1)

    expect(axios.get).toHaveBeenCalledWith(
      `${serverRuntimeConfig.geoCode.baseUrl}?apiKey=${serverRuntimeConfig.geoCode.apiKey}&qq=postalCode=SomeZipCode;houseNumber=SomeHouseNumber&q=SomeStreet&in=countryCode:ESP&lang=es`
    )
  })

  it('returns the normalized create order response', async () => {
    const response = await validateAddress('es-es', data)
    expect(response).toEqual(validatedAddress)
  })
})
