/**
 * @jest-environment node
 */
import {
  getMenuFailure,
  getMenuFulfill,
  getMenuSuccess,
  getMenuTrigger,
  menuSaga
} from '~domains/menu'
import { fetchMenuItemCollection } from '~domains/menu/services/fetch-menu-item-collection'
import { menuMock } from '~domains/page/__mocks__/contentfulCategoryContent'
import SagaTester from 'redux-saga-tester'
import type { DeepPartial } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

jest.mock('~domains/menu/services/fetch-menu-item-collection')

describe('menu saga - server', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const sagaTester = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    sagaTester.start(menuSaga)

    return sagaTester
  }

  describe('when menu is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the API, then dispatches success and fulfill actions', async () => {
        ;(fetchMenuItemCollection as jest.Mock).mockResolvedValue(menuMock)

        const saga = setup()
        saga.dispatch(getMenuTrigger({ menuTitle: 'testTitle' }))
        await saga.waitFor(getMenuFulfill().type)

        expect(fetchMenuItemCollection).toHaveBeenCalledWith(
          'cimode',
          'testTitle'
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
        ;(fetchMenuItemCollection as jest.Mock).mockRejectedValue({
          message: 'Something went horribly wrong'
        })

        const saga = setup()
        saga.dispatch(getMenuTrigger({ menuTitle: 'testTitle' }))
        await saga.waitFor(getMenuFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          getMenuFailure({ message: 'Something went horribly wrong' })
        )
        expect(saga.getCalledActions()).toContainEqual(getMenuFulfill())
      })
    })
  })
})
