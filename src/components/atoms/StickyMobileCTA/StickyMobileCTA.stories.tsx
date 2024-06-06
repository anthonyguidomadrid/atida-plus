import { StickyMobileCTA, StickyMobileCTAProps } from './index'

export default {
  component: StickyMobileCTA,
  title: 'atoms/StickyMobileCTA',
  args: {
    grandTotal: 699,
    currency: 'EUR',
    isLoading: false
  }
}

export const Basic = (args: StickyMobileCTAProps): JSX.Element => (
  <StickyMobileCTA {...args} />
)
