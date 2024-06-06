import { render, screen } from '@testing-library/react'
import { AtidaCashTransactionTile, AtidaCashTransactionTileProps } from '.'

describe(AtidaCashTransactionTile, () => {
  const defaultProps = {
    transaction_type: 'credit',
    amount: 100,
    expiry_date: '2023-07-23T14:20:22.029764445Z'
  } as AtidaCashTransactionTileProps

  const setup = (props: Partial<AtidaCashTransactionTileProps>) => {
    return render(<AtidaCashTransactionTile {...defaultProps} {...props} />)
  }

  describe('Credit', () => {
    it('renders the correct copies', () => {
      setup({ ...defaultProps })
      expect(screen.getByText('account.atida-cash-earned')).toBeInTheDocument()
      expect(
        screen.getByText(
          'account.atida-cash-expiry 2023-07-23T14:20:22.029764445Z'
        )
      ).toBeInTheDocument()
    })
    it('renders the info icon', () => {
      setup({ ...defaultProps })
      expect(
        screen.getByTestId('AtidaCashTransactionTileInfoIcon')
      ).toBeInTheDocument()
    })
    it('renders the correct ammount', () => {
      setup({ ...defaultProps })
      expect(screen.getByText('+ €1.00')).toBeInTheDocument()
      expect(screen.getByTestId('AtidaCashTransactionTileAmmount')).toHaveClass(
        'text-primary-caribbean-green-dark'
      )
    })
  })

  describe('Debit', () => {
    it('renders the correct copy', () => {
      setup({ ...defaultProps, transaction_type: 'debit' })
      expect(
        screen.getByText('account.atida-cash-redeemed')
      ).toBeInTheDocument()
    })
    it('renders the correct ammount', () => {
      setup({ ...defaultProps, transaction_type: 'debit' })
      expect(screen.getByText('- €1.00')).toBeInTheDocument()
      expect(
        screen.getByTestId('AtidaCashTransactionTileAmmount')
      ).not.toHaveClass('text-primary-caribbean-green-dark')
    })
  })
})
