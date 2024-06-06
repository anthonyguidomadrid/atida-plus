import { screen } from '@testing-library/react'
import { containerOfContentBlocks } from './ContainerOfContentBlocks.mock'
import {
  ContainerOfContentBlocks,
  ContainerOfContentBlocksProps
} from './ContainerOfContentBlocks'
import { renderWithStore } from '~test-helpers'

describe(ContainerOfContentBlocks, () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  const setup = (props: Partial<ContainerOfContentBlocksProps> = {}) =>
    renderWithStore(
      //@ts-ignore
      <ContainerOfContentBlocks {...containerOfContentBlocks} {...props} />
    )

  it('renders marketing teaser as <MarketingTeaser/>', () => {
    setup()
    expect(screen.getAllByTestId('marketingTeaser')).toHaveLength(2)
  })

  it('renders promotion teaser as <PromotionTeaser/>', () => {
    setup()
    expect(screen.getByTestId('PromotionTeaser')).toBeInTheDocument()
  })

  describe('when title should be displayed', () => {
    it('renders with a title element', () => {
      setup({ displayTitle: true })
      expect(
        screen.getByRole('heading', {
          name: 'Home page container of content blocks'
        })
      ).toBeInTheDocument()
    })
  })
})
