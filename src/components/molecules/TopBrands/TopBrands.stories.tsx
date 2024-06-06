import { brandTiles } from './TopBrands.mock'
import { TopBrands, TopBrandsProps } from '.'

export default {
  component: TopBrands,
  title: 'molecules/TopBrands',
  parameters: { layout: 'fullscreen' },
  args: {
    ...brandTiles
  }
}

export const withContentFromDesign = (args: TopBrandsProps): JSX.Element => (
  <TopBrands {...args} />
)
