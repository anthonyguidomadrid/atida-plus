import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  getPageFilterTrigger,
  getPageFilterFailure,
  getPageFilterFulfill
} from '../../slices'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { getPageFilterSaga } from '../get-page-filter'
import { items } from '~components/organisms/FilterList/FilterList.mock'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('promotion/get-page-filter saga', () => {
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
    saga.start(getPageFilterSaga)

    return saga
  }

  describe('when getPageFilter is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          data: items
        })

        const saga = setup()
        saga.dispatch(getPageFilterTrigger({ slug: 'hello' }))
        await saga.waitFor(getPageFilterFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: false,
          locale: 'cimode'
        })
        expect(axios.get).toHaveBeenCalledWith('/api/page-filter/get', {
          params: { locale: 'cimode' }
        })

        expect(saga.getCalledActions()).toContainEqual(getPageFilterFulfill())
      })
    })

    describe('and page filter has already been fetched', () => {
      it('dispatches fulfill actions', async () => {
        const saga = setup({
          server: {
            promotion: {
              content: {
                wasSuccess: true
              }
            }
          }
        })
        saga.dispatch(getPageFilterTrigger())
        await saga.waitFor(getPageFilterFulfill().type)

        expect(createClient).toHaveBeenCalled()
        expect(axios.get).toHaveBeenCalled()

        expect(saga.getCalledActions()).toContainEqual(getPageFilterFulfill())
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
        saga.dispatch(getPageFilterTrigger())
        await saga.waitFor(getPageFilterFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getPageFilterFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getPageFilterFulfill())
      })
    })

    describe('and request fails with multpile error messages', () => {
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
        saga.dispatch(getPageFilterTrigger())
        await saga.waitFor(getPageFilterFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getPageFilterFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getPageFilterFulfill())
      })
    })
  })
})
