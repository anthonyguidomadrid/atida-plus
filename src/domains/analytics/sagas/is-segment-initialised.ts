import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import type { SagaIterator } from 'redux-saga'
import { setAsInitialised, triggerEmitIsSegmentInitialised } from '..'
import { IS_SEGMENT_INITIALISED } from '~config/constants/events'

// As on page load CookiePro consent manager takes time to initialize
// Segment tracking snippet, some analytics events fire too early and
// get lost. In order to delay them until Segment instance is ready,
// such events wait for Segment to execute its 'ready' callback function.
// This callback dispatches a 'isSegmentInitialised' event on window.
// The code below watches the window event in a Saga channel and emits
// triggerEmitIsSegmentInitialised that unblocks delayed Segment events.

const createSegmentIsReadyEventChannel = () => {
  return eventChannel(emit => {
    const handleTrigger = () => {
      emit(triggerEmitIsSegmentInitialised())
    }
    if (typeof window !== 'undefined')
      window.addEventListener(IS_SEGMENT_INITIALISED, handleTrigger)
    const unsubscribe = () => {
      if (typeof window !== 'undefined')
        window.removeEventListener(IS_SEGMENT_INITIALISED, handleTrigger)
    }

    return unsubscribe
  })
}

export function* emitIsSegmentInitialisedSaga(): SagaIterator {
  const eventChannel = yield call(createSegmentIsReadyEventChannel)
  const action = yield take(eventChannel)
  yield put(action)
  yield put(setAsInitialised())
}
