import { RangeInput, RangeInputConnectedType } from './RangeInputConnected'
import { rangeInputMock } from './RangeInputConnected.mock'

export default {
  component: RangeInput,
  title: 'molecules/RangeInputConnected',
  parameter: { layout: 'fullscreen' },
  args: {
    ...rangeInputMock
  }
}

export const rangeInputConnected = (
  args: RangeInputConnectedType
): JSX.Element => <RangeInput {...args} />
