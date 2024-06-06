import { Countdown, CountdownProps } from '.'

export default {
  component: Countdown,
  title: 'atoms/Countdown',
  parameters: { layout: 'fullscreen' },
  args: { finishingDate: '2021-10-09T00:00:00.000+02:00' }
}

export const withContentFromDesign = (args: CountdownProps): JSX.Element => (
  <Countdown {...args} />
)
