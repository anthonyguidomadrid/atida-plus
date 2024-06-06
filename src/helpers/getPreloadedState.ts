import type { DeepPartial } from '@reduxjs/toolkit'
import { CommonState } from '~domains/page/slices/common'
import { RootState } from '~domains/redux'

export const getPreloadedState = (
  reduxState: DeepPartial<RootState>,
  commonState: CommonState
): DeepPartial<RootState> => {
  if (reduxState?.server?.page && commonState)
    reduxState.server.page.common = commonState
  return reduxState
}
