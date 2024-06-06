import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { AtidaCashTransactionList, AtidaCashTransactionListProps } from '.'
import { mockedTransactionHistory } from '~domains/account/__mocks__/get-cash-transactions'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { normalizeTransactions } from '~domains/account/normalizers/transactions'

describe(AtidaCashTransactionList, () => {
  const defaultProps = {
    transactions: normalizeTransactions(mockedTransactionHistory),
    totalPages: 3
  } as AtidaCashTransactionListProps

  const setup = (
    props: Partial<AtidaCashTransactionListProps>,
    locale = 'es-es'
  ) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      route: '/account/my-atida-cash/history?page=1',
      query: { page: '1' },
      locale: locale
    }))
    setupMatchMediaMock(true)
    return render(<AtidaCashTransactionList {...defaultProps} {...props} />)
  }

  it('renders all the AtidaCashTransactionTiles', () => {
    setup({ ...defaultProps })
    expect(screen.getAllByTestId('AtidaCashTransactionTile')).toHaveLength(8)
  })

  it('renders the correct dates - Spain', () => {
    setup({ ...defaultProps })
    expect(screen.getByText('4 de octubre de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de julio de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de junio de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de mayo de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de abril de 2022')).toBeInTheDocument()
  })

  it('renders the correct dates - Portugal', () => {
    setup({ ...defaultProps }, 'pt-pt')
    expect(screen.getByText('4 de outubro de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de julho de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de junho de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de maio de 2022')).toBeInTheDocument()
    expect(screen.getByText('23 de abril de 2022')).toBeInTheDocument()
  })
})
