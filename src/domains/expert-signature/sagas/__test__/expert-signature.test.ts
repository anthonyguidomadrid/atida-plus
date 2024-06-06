/**
 * @jest-environment node
 */
// @ts-ignore
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  expertSignatureTrigger,
  expertSignatureFulfill,
  expertSignatureFailure
} from '~domains/expert-signature/slices'
import { RootState } from '~domains/redux'
import { expertSignatureSaga } from '../expert-signature'
import type { DeepPartial } from '@reduxjs/toolkit'
import { expertSignature } from '~domains/expert-signature/__mocks__/expert-signature'

describe('expert/expert-signature saga', () => {
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
    saga.start(expertSignatureSaga)

    return saga
  }

  describe('when expertSignature is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          data: expertSignature.experts
        })

        const saga = setup()
        saga.dispatch(
          expertSignatureTrigger({
            categoryId: 'beauty'
          })
        )
        await saga.waitFor(expertSignatureFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(expertSignatureFulfill())
      })
    })

    // TODO: fix this test
    xdescribe('and request fails with multiple error messages', () => {
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
        saga.dispatch(
          expertSignatureTrigger({
            categoryId: 'beauty'
          })
        )
        await saga.waitFor(expertSignatureFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          expertSignatureFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(expertSignatureFulfill())
      })
    })
  })
})
