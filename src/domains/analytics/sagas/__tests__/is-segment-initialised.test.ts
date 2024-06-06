import SagaTester from 'redux-saga-tester'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { emitIsSegmentInitialisedSaga } from '~domains/analytics/sagas/is-segment-initialised'
import { fireEvent } from '@testing-library/react'
import {
  setAsInitialised,
  triggerEmitIsSegmentInitialised
} from '~domains/analytics'
import { IS_SEGMENT_INITIALISED } from '~config/constants/events'

describe('analytics/report user interaction', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({})
    saga.start(emitIsSegmentInitialisedSaga)
    return saga
  }

  describe('when reportUserInteraction is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      const isSegmentInitialised = new Event(IS_SEGMENT_INITIALISED)
      fireEvent(window, isSegmentInitialised)
      expect(saga.getCalledActions()).toContainEqual(
        triggerEmitIsSegmentInitialised()
      )
      expect(saga.getCalledActions()).toContainEqual(setAsInitialised())
    })
  })
  describe('when called server side', () => {
    it('gets ignored', async () => {
      const saga = setup()
      const { window } = global
      // @ts-ignore
      delete global.window
      expect(global.window).toEqual(undefined)
      expect(saga.getCalledActions()).not.toContainEqual(
        triggerEmitIsSegmentInitialised()
      )
      global.window = window
    })
  })
})
