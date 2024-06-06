import { ProgressBar, ProgressBarProps } from '.'

export default {
  component: ProgressBar,
  title: 'atoms/ProgressBar',
  args: {
    now: 150,
    max: 319
  }
}

export const Standard = (args: ProgressBarProps): JSX.Element => (
  <ProgressBar {...args} />
)
