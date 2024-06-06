import { BannerLink, BannerLinkProps } from '.'

export default {
  component: BannerLink,
  title: 'atoms/BannerLink',
  args: {
    href: 'mock-url'
  }
}

export const basic = (args: BannerLinkProps): JSX.Element => (
  <BannerLink {...args}>
    <div>
      Test div has href and the cursor turns into a pointer. Remove the href and
      the cursor goes back to normal
    </div>
  </BannerLink>
)
