import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getBrandFailure,
  getBrandFulfill,
  getBrandTrigger
} from '~domains/brand/slices'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { getBrandSaga } from '../get-brand'
import type { DeepPartial } from '@reduxjs/toolkit'

const brands = {
  total: 1,
  items: [
    {
      title: 'Babaria',
      id: 'babaria-test-brand',
      url: 'brands/babaria',
      image: {
        description: '',
        title: 'Babaria Image',
        url:
          'https://images.ctfassets.net/7g2w796onies/38LA8ERIEBglSvG3XR2vCi/01fbdbc080c12381cf118fd8c90d1bf4/babaria-body-milk.jpeg',
        type: 'image/jpeg'
      }
    }
  ]
}
describe('brand/get-brands saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(getBrandSaga)

    return saga
  }

  describe('when getBrands is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          data: brands.items
        })

        const saga = setup()
        saga.dispatch(getBrandTrigger())
        await saga.waitFor(getBrandFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: false,
          locale: 'cimode'
        })
        expect(axios.get).toHaveBeenCalledWith('/api/brand/get')

        expect(saga.getCalledActions()).toContainEqual(getBrandFulfill())
      })
    })

    describe('and brands have already been fetched', () => {
      it('dispatches fulfill actions', async () => {
        const saga = setup({
          server: {
            brand: {
              content: {
                wasSuccess: true
              }
            }
          }
        })
        saga.dispatch(getBrandTrigger())
        await saga.waitFor(getBrandFulfill().type)

        expect(createClient).toHaveBeenCalled()
        expect(axios.get).toHaveBeenCalled()

        expect(saga.getCalledActions()).toContainEqual(getBrandFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(getBrandTrigger())
        await saga.waitFor(getBrandFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getBrandFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getBrandFulfill())
      })
    })

    describe('and request fails with multiple error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Some other unknown error',
                'And some unknown error'
              ]
            }
          }
        })

        const saga = setup()
        saga.dispatch(getBrandTrigger())
        await saga.waitFor(getBrandFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getBrandFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getBrandFulfill())
      })
    })
  })
})
