import { render } from '@testing-library/react'

import { BannerLink, BannerLinkProps } from '.'

describe(BannerLink, () => {
  const initialProps = {
    href: 'test-url'
  }
  const setup = (props: BannerLinkProps = initialProps) =>
    render(
      <BannerLink {...props}>
        <div data-testid="testDiv">
          I'm yolo hashtaging the shit out of this test component
        </div>
      </BannerLink>
    )

  it('renders the children without wrapping them in next link', async () => {
    const { findByTestId } = setup({ href: undefined })
    const bannerLink = await findByTestId('bannerLink')
    const child = await findByTestId('testDiv')

    expect(bannerLink).not.toHaveClass('cursor-pointer')
    expect(bannerLink).not.toHaveAttribute('role', 'button')
    expect(child.getAttribute('href')).toBe(null)
  })

  it('renders the children with wrapping them in next link', async () => {
    const { findByTestId } = setup()
    const bannerLink = await findByTestId('bannerLink')
    const child = await findByTestId('testDiv')

    expect(bannerLink).toHaveClass('cursor-pointer')
    expect(bannerLink).toHaveAttribute('role', 'button')
    expect(child.getAttribute('href')).toBe('/test-url')
  })
})
