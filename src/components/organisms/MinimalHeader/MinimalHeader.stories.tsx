import { MinimalHeader } from '.'
import { Stepper } from '~components/molecules/Stepper'

export default {
  component: MinimalHeader,
  title: 'organisms/MinimalHeader',
  parameters: { layout: 'fullscreen' }
}

export const withContentFromDesign = (): JSX.Element => <MinimalHeader />

export const withStepper = (): JSX.Element => (
  <MinimalHeader
    stepper={
      <Stepper
        activeStep={1}
        reachedStep={2}
        guestStep={0}
        reachedGuestStep={0}
        setActiveStep={() => null}
        setGuestStep={() => null}
        data-testid="CheckoutStepper"
      />
    }
  />
)
