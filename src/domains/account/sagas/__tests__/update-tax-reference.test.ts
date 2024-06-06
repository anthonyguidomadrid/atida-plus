import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  updateTaxReferenceFailure,
  updateTaxReferenceFulfill,
  updateTaxReferenceSuccess,
  updateTaxReferenceTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { updateTaxReferenceSaga } from '../update-tax-reference'

describe('account/updatetax.reference saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(updateTaxReferenceSaga)

    return saga
  }

  describe('when updateTaxReference is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.patch as jest.Mock).mockResolvedValue({})
        const saga = setup()
        saga.dispatch(
          updateTaxReferenceTrigger({
            customerReference: 'some-customer-reference',
            taxReference: 'some-tax-reference'
          })
        )
        await saga.waitFor(updateTaxReferenceFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/update-tax-reference',
          {
            customerReference: 'some-customer-reference',
            taxReference: 'some-tax-reference'
          }
        )

        expect(saga.getCalledActions()).toContainEqual(
          updateTaxReferenceSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          updateTaxReferenceFulfill()
        )
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(
          updateTaxReferenceTrigger({
            customerReference: 'some-customer-reference',
            taxReference: 'some-tax-reference'
          })
        )
        await saga.waitFor(updateTaxReferenceFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateTaxReferenceFailure({
            message: 'Some unknown error'
          })
        )
      })
    })

    describe('and request fails with multiple error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
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
        saga.dispatch(
          updateTaxReferenceTrigger({
            customerReference: 'some-customer-reference',
            taxReference: 'some-tax-reference'
          })
        )
        await saga.waitFor(updateTaxReferenceFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          updateTaxReferenceFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
