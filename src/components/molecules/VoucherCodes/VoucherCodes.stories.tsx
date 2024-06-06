import { VoucherCodes } from '.'
import { VoucherCodes as VoucherCodesProps } from '~domains/contentful'

export default {
  component: VoucherCodes,
  title: 'molecules/VoucherCodes',
  args: {
    title: 'Voucher codes',
    items: [
      {
        title: 'with coupon ATIDA5',
        discount: '-10%',
        voucherCode: 'ATIDA5',
        description:
          'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
      },
      {
        title: 'with coupon ATIDA5',
        discount: '-10%',
        voucherCode: 'ATIDA5',
        description:
          'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
      },
      {
        title: 'with coupon ATIDA5',
        discount: '-10%',
        voucherCode: 'ATIDA5',
        description:
          'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
      }
    ]
  }
}

export const basic = (args: VoucherCodesProps): JSX.Element => (
  <VoucherCodes {...args} />
)
