import { FeatureFlag } from '~config/constants/feature-flags'
import { product } from '~domains/product/__mocks__/product'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PDPMetaData, PDPMetaDataProps } from '../PDPMetaData'

describe(PDPMetaData, () => {
  const setup = (props: Partial<PDPMetaDataProps> = {}, ff = false) =>
    renderWithStoreAndFeatureFlags(<PDPMetaData {...props} />, {
      initialState: {
        server: {
          product: {
            content: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              data: product
            }
          }
        }
      },
      featureFlags: {
        [FeatureFlag.SEO_ADD_NOINDEX_TO_ON_DEMAND_PRODUCTS]: ff,
        [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_YOTPO]: true
      }
    })

  it('should render the MetaData scripts and the Yotpo one if yotpoShouldRender is false', () => {
    const { container } = setup({ yotpoShouldRender: false })
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })
  it('should render the MetaData scripts and the Yotpo one if yotpoShouldRender is true', () => {
    const { container } = setup({ yotpoShouldRender: true })
    expect(container.querySelectorAll('script')).toHaveLength(3)
  })
  it('should render the AlternateLinks link tags', () => {
    const { container } = setup()
    expect(container.querySelectorAll('link')).toHaveLength(8)
  })
})
