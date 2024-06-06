import SagaTester from 'redux-saga-tester'
import { triggerRefreshYotpoWidgets } from '~domains/yotpo'
import { refreshYotpoWidgets } from '../refresh-yotpo-widgets'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('yotpo widgets refresh saga', () => {
  const setup = (
    refreshWidgetsFunction: () => void,
    initialized: boolean
  ): SagaTester<DeepPartial<RootState>> => {
    window.yotpo = {
      refreshWidgets: refreshWidgetsFunction,
      initialized: initialized
    }
    const saga = new SagaTester({})

    saga.start(refreshYotpoWidgets)
    return saga
  }

  describe('when refreshYotpoWidgets is triggered', () => {
    it('calls the refreshWidgets() function', async () => {
      const saga = setup(jest.fn(), true)
      saga.dispatch(triggerRefreshYotpoWidgets())

      expect(window?.yotpo?.refreshWidgets).toHaveBeenCalledTimes(1)
    })
  })

  describe('when refreshYotpoWidgets is triggered but yotpo is not initialized', () => {
    it('does not call the refreshWidgets() function', async () => {
      const saga = setup(jest.fn(), false)
      saga.dispatch(triggerRefreshYotpoWidgets())

      expect(window?.yotpo?.refreshWidgets).toHaveBeenCalledTimes(0)
    })
  })
})
