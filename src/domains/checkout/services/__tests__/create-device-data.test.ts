/**
 * @jest-environment node
 */
import axios from 'axios'
import { sentDeviceData } from '../../__mocks__/create-device-data'
import { createClient } from '~helpers'
import { createDeviceData } from '../create-device-data'
import { customerData } from '~domains/checkout/__mocks__/checkout'

describe(createDeviceData, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({})
  })

  it('creates the client and passes the locale', async () => {
    await createDeviceData('en-gb', sentDeviceData, 'some-user-token')

    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      addAnonymousCustomerUniqueId: false,
      options: {
        baseURL: 'payment-plus'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(
      '/create-device-data',
      {
        customer_browser: 'Chrome',
        ip_address: '18.198.20.189',
        device_data: '{"correlation_id":"ae723865445b06920bffcf36a0d15ab8"}',
        customer: customerData
      },
      {
        headers: {
          Authorization: 'Bearer some-user-token'
        }
      }
    )
  })
})
