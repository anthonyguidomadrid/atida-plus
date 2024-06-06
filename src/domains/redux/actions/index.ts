import { createAction } from '@reduxjs/toolkit'
import type { DeepPartial } from '@reduxjs/toolkit'
import { RootState } from '../reducers'

export const hydrate = createAction<
  DeepPartial<RootState['server']> | undefined
>('hydrate')

export const clearStateErrors = createAction('clearStateErrors')
