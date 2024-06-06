import { AccordionPanel, AccordionPanelProps } from '.'
import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/NavBasket.svg'

export default {
  component: AccordionPanel,
  title: 'atoms/AccordionPanel',
  args: {
    heading: 'Some accordion panel',
    open: false,
    children: (
      <p>
        Cheesecake tootsie roll candy. Pie powder macaroon cookie. Chupa chups
        lollipop wafer. Gingerbread halvah icing chocolate cake. Liquorice
        sesame snaps wafer jelly-o macaroon pie. Marshmallow cake lollipop
        danish liquorice cake dragée candy cotton candy. Croissant cotton candy
        bear claw liquorice fruitcake lollipop. Cheesecake powder sugar plum
        marzipan marzipan.
      </p>
    )
  }
}

export const closedByDefault = (args: AccordionPanelProps): JSX.Element => (
  <AccordionPanel {...args} />
)

export const openByDefault = (args: AccordionPanelProps): JSX.Element => (
  <AccordionPanel {...args} />
)
openByDefault.args = {
  open: true
}

export const withIcon = (args: AccordionPanelProps): JSX.Element => (
  <AccordionPanel {...args} />
)
withIcon.args = {
  icon: <NavBasket className="icon-24" />
}
