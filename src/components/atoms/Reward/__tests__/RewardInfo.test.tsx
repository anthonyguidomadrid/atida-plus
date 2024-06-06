import { screen } from '@testing-library/react'
import { rewardProducts } from '../__mocks__/productsWithRewardsMockup'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { RewardInfo, RewardInfoProps } from '../RewardInfo'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { routerMock } from '../../../../__mocks__/routerMock'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { useRouter } from 'next/router'
;(useRouter as jest.Mock).mockImplementation(() => ({
  locale: 'en-gb'
}))

export const testInitialStateLogged = {
  client: {
    account: {
      customer: {
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        showNotification: false,
        reference: 'PT--108',
        details: {
          salutation: 'Mr',
          firstName: 'Román',
          lastName: 'Pérez Fernández',
          email: 'r.perez@mifarma.es',
          accountType: 'Personal' as 'Personal' | 'Business' | undefined,
          receivePersonalRecommendations: true,
          receivePinnedProductsNotifications: false,
          hasPreviousSuccessfulOrder: false
        }
      }
    }
  }
}

describe(RewardInfo, () => {
  const defaultProps = {
    product: rewardProducts[0]
  }

  const setup = (props: Partial<RewardInfoProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      locale: 'en-gb'
    }))

    const renderedComponent = renderWithStoreAndFeatureFlags(
      <RouterContext.Provider value={routerMock}>
        <RewardInfo {...defaultProps} {...props} />
      </RouterContext.Provider>,
      {
        featureFlags: {
          [FeatureFlag.PDP_LOYALTY_INFO]: {
            GB: {
              base: 4,
              brands: [
                {
                  garnier: 3
                }
              ],
              categories: [
                {
                  beauty: 19
                },
                {
                  for_men_beard_shave: 6
                }
              ],
              products: [
                {
                  '997296201082': 8
                }
              ]
            }
          }
        },

        initialState: testInitialStateLogged
      }
    )

    reset()
    return renderedComponent
  }

  it('renders the component', () => {
    setup()
    expect(screen.getByTestId('rewards-info')).toBeInTheDocument()
  })

  it('render base reward if no brand or category or sku', () => {
    setup()
    expect(
      screen.getByText('loyalty.reward-info.title 4%,+€2.40')
    ).toBeInTheDocument()
  })

  it('render brand reward if brand is set', () => {
    setup({ ...defaultProps, product: rewardProducts[1] })
    expect(
      screen.getByText('loyalty.reward-info.title 8%,+€8.00')
    ).toBeInTheDocument()
  })

  it('render category reward if category is set', () => {
    setup({ ...defaultProps, product: rewardProducts[2] })
    expect(
      screen.getByText('loyalty.reward-info.title 19%,+€19.00')
    ).toBeInTheDocument()
  })

  it('render sku reward if sku is set', () => {
    setup({ ...defaultProps, product: rewardProducts[3] })
    expect(
      screen.getByText('loyalty.reward-info.title 8%,+€8.00')
    ).toBeInTheDocument()
  })

  it('product has sku,brand,category and base Loyalties use product sku Loyalty', () => {
    setup({ ...defaultProps, product: rewardProducts[4] })
    expect(
      screen.getByText('loyalty.reward-info.title 8%,+€8.00')
    ).toBeInTheDocument()
  })
  it('render loyalty info description if user is logged in', () => {
    setup()
    expect(
      screen.queryByTestId('reward-info-description')
    ).not.toBeInTheDocument()
  })
})
