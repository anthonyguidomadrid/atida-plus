import { screen } from '@testing-library/react'
import { Promotions, PromotionsProps } from '.'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../__mocks__/routerMock'
import { promotions } from '~components/molecules/Promotions/Promotions.mock'
import { renderWithStore } from '~test-helpers'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe('Promotions', () => {
  const setup = (
    props: Partial<PromotionsProps> = {},
    isLargeFormat = false
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <RouterContext.Provider value={routerMock}>
        <Promotions {...props} />
      </RouterContext.Provider>
    )
    reset()
    return renderedComponent
  }

  it('renders component with promotion items', () => {
    setup({ promotions: promotions.items })
    expect(screen.getByTestId('promotions')).toBeInTheDocument()
    expect(screen.getByText('Make the most of your money')).toBeInTheDocument()
  })

  it('renders component without promotion items', () => {
    setup()
    expect(screen.getByTestId('promotions')).toBeInTheDocument()
  })
})
