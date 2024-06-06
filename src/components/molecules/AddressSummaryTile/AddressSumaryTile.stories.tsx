import { addressNoDefault } from './AddressSummaryTile.mock'
import { AddressSummaryTile, AddressSummaryTileProps } from '.'

export default {
  component: AddressSummaryTile,
  title: 'molecules/AddressSummaryTile',
  parameters: { layout: 'fullscreen' },
  args: {
    ...addressNoDefault,
    idx: 1
  }
}

export const withContentFromDesign = (
  args: AddressSummaryTileProps
): JSX.Element => <AddressSummaryTile {...args} />
