import { MinimalNavigableHeader } from '.'
import { ReactComponent as Back } from '~assets/svg/navigation-24px/Back.svg'
import { Button } from '~components/atoms/Button'

export default {
  component: MinimalNavigableHeader,
  title: 'organisms/MinimalNavigableHeader',
  parameters: { layout: 'fullscreen' }
}

export const withContentFromDesign = (): JSX.Element => (
  <MinimalNavigableHeader
    button={
      <Button
        variant="back"
        icon={<Back role="presentation" className="icon-24" />}
        data-testid="headerBackButton"
      />
    }
  />
)
