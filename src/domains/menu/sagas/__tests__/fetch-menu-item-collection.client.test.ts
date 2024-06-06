import SagaTester from 'redux-saga-tester'
import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '~domains/redux'
import {
  getMenuFailure,
  getMenuFulfill,
  getMenuSuccess,
  getMenuTrigger,
  menuSaga
} from '~domains/menu'
import { menuMock } from '~domains/page/__mocks__/contentfulCategoryContent'

describe('menu saga - client', () => {
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
    saga.start(menuSaga)

    return saga
  }

  describe('when menu is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the API, then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          status: 200,
          data: menuMock
        })

        const saga = setup()
        saga.dispatch(getMenuTrigger({ menuTitle: 'testTitle' }))
        await saga.waitFor(getMenuFulfill().type)

        expect(axios.get).toHaveBeenCalledWith(
          '/api/submenu/get?menuTitle=testTitle'
        )

        expect(saga.getCalledActions()).toContainEqual(
          getMenuSuccess({
            ...menuMock
          })
        )
        expect(saga.getCalledActions()).toContainEqual(getMenuFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the API, then dispatches failure action', async () => {
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
        saga.dispatch(getMenuTrigger({ menuTitle: 'testTitle' }))
        await saga.waitFor(getMenuFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getMenuFailure({ message: 'Some unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(getMenuFulfill())
      })
    })
  })
})
