import { render, screen } from '@testing-library/react'
import { VoucherCodes } from '.'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { VoucherCodes as VoucherCodesProps } from '~domains/contentful'

describe('VoucherCodes', () => {
  const defaultProps = {
    title: 'VoucherCodes',
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
  const setup = (
    props: Partial<VoucherCodesProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = render(
      <VoucherCodes {...defaultProps} {...props} />
    )
    reset()
    return renderedComponent
  }

  describe('voucher codes', () => {
    it('renders voucher codes component', () => {
      setup()
      expect(screen.getByTestId('voucherCodes')).toBeInTheDocument()
    })

    it("doesn't error if voucher codes are not passed", () => {
      const { container } = setup({
        ...defaultProps,
        items: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no title is passed", () => {
      const { container } = setup({
        ...defaultProps,
        title: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it("doesn't error if no block data is passed", () => {
      const { container } = setup({
        ...defaultProps,
        items: [
          ...defaultProps.items,
          {
            title: undefined,
            description: undefined,
            code: undefined,
            discount: undefined
          }
        ]
      })
      expect(container).toBeInTheDocument()
    })
  })
})
