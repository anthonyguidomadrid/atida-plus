import type { PayloadAction } from '@reduxjs/toolkit'
import type { SagaIterator } from 'redux-saga'
import { all, takeLatest } from 'redux-saga/effects'
import { triggerRefreshYotpoWidgets } from '..'

declare global {
  interface Window {
    yotpo?: {
      initialized: boolean
      refreshWidgets: () => void
    }
  }
}

export function* doRefreshYotpoWidgets({}: PayloadAction): SagaIterator {
  if (typeof window?.yotpo !== 'undefined' && window?.yotpo?.initialized) {
    window?.yotpo?.refreshWidgets()
  }
}

export function* refreshYotpoWidgets(): SagaIterator {
  yield all([takeLatest(triggerRefreshYotpoWidgets, doRefreshYotpoWidgets)])
}
