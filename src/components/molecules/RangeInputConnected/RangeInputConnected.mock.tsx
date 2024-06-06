import { CurrentRefinement } from './RangeInputConnected'

const refine = (value: CurrentRefinement): boolean => {
  return value.min < value.max
}

export const rangeInputMock = {
  min: 28,
  max: 35143,
  currentRefinement: {
    min: 28,
    max: 35143
  },
  precision: 2,
  refine
}
