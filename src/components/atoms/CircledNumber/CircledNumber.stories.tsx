import {
  CircledNumber,
  CircledNumberProps
} from '~components/atoms/CircledNumber'

export default {
  component: CircledNumber,
  title: 'atoms/CircledNumber',
  args: {
    badge: 1
  }
}

export const Basic = (args: CircledNumberProps): JSX.Element => (
  <CircledNumber {...args} />
)
