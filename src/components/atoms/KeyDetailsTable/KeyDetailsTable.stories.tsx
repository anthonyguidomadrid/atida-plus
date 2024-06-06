import { KeyDetailsTable, KeyDetailsTableProps } from './index'

export default {
  component: KeyDetailsTable,
  title: 'atoms/KeyDetailsTable',
  args: {
    format: {
      code: 'shampooCode',
      label: 'Shampoo'
    },
    unitPrice: {
      value: 516,
      currency: 'EUR',
      unit: '100 ml'
    },
    brand: { code: 'beiersdorf', label: 'Beiersdorf AG Eucerin' },
    msrp: {
      value: 3990,
      currency: 'EUR'
    }
  }
}

export const Basic = (args: KeyDetailsTableProps): JSX.Element => (
  <KeyDetailsTable {...args} />
)
