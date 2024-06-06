import { Accordion, AccordionProps } from '.'
import { ReactComponent as NavBasket } from '~assets/svg/navigation-24px/NavBasket.svg'
import { AccordionPanel } from '~components/atoms/AccordionPanel'

export default {
  component: Accordion,
  title: 'molecules/Accordion',
  argTypes: {
    defaultActivePanel: {
      description: 'Only affects controlled accordions.'
    }
  }
}

const panels = [
  <AccordionPanel
    key="1"
    heading="Accordion Panel 1"
    icon={<NavBasket className="icon-24" />}
  >
    <p>
      Cheesecake tootsie roll candy. Pie powder macaroon cookie. Chupa chups
      lollipop wafer. Gingerbread halvah icing chocolate cake. Liquorice sesame
      snaps wafer jelly-o macaroon pie. Marshmallow cake lollipop danish
      liquorice cake dragée candy cotton candy. Croissant cotton candy bear claw
      liquorice fruitcake lollipop. Cheesecake powder sugar plum marzipan
      marzipan.
    </p>
  </AccordionPanel>,

  <AccordionPanel
    key="2"
    heading="Accordion Panel 2"
    icon={<div className="icon-24" />}
  >
    <p>
      Cheesecake tootsie roll candy. Pie powder macaroon cookie. Chupa chups
      lollipop wafer. Gingerbread halvah icing chocolate cake. Liquorice sesame
      snaps wafer jelly-o macaroon pie. Marshmallow cake lollipop danish
      liquorice cake dragée candy cotton candy. Croissant cotton candy bear claw
      liquorice fruitcake lollipop. Cheesecake powder sugar plum marzipan
      marzipan.
    </p>
  </AccordionPanel>,

  <AccordionPanel
    key="3"
    heading="Accordion Panel 3"
    icon={<NavBasket className="icon-24" />}
  >
    <p>
      Cheesecake tootsie roll candy. Pie powder macaroon cookie. Chupa chups
      lollipop wafer. Gingerbread halvah icing chocolate cake. Liquorice sesame
      snaps wafer jelly-o macaroon pie. Marshmallow cake lollipop danish
      liquorice cake dragée candy cotton candy. Croissant cotton candy bear claw
      liquorice fruitcake lollipop. Cheesecake powder sugar plum marzipan
      marzipan.
    </p>
  </AccordionPanel>
]

export const uncontrolled = (args: AccordionProps): JSX.Element => (
  <Accordion {...args}>{panels}</Accordion>
)

export const controlled = (args: AccordionProps): JSX.Element => (
  <Accordion {...args}>{panels}</Accordion>
)
controlled.args = { controlled: true }

export const withDefaultActivePanel = (args: AccordionProps): JSX.Element => (
  <Accordion {...args}>{panels}</Accordion>
)
withDefaultActivePanel.args = { controlled: true, defaultActivePanel: 1 }
