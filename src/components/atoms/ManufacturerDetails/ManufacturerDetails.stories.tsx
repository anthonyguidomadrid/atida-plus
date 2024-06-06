import {
  ManufacturerDetails,
  ManufacturerDetailsProps
} from './ManufacturerDetails'

export default {
  component: ManufacturerDetails,
  title: 'atoms/ManufacturerDetails',
  args: {
    name: 'Mead Johnson & Company, LLC.',
    address: {
      street: 'Sulzbacher Str. 40-50',
      city: '65824 Schwalbach am Taunus'
    }
  }
}

export const Basic = (args: ManufacturerDetailsProps): JSX.Element => (
  <ManufacturerDetails {...args} />
)
