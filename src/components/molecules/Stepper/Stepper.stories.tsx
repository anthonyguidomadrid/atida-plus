import { Stepper, StepperProps } from '.'

export default {
  component: Stepper,
  title: 'molecules/Stepper',
  parameters: { layout: 'fullscreen' },
  argTypes: {
    setActiveStep: { action: 'setActiveStep' },
    activeStep: {
      control: {
        type: 'inline-radio',
        options: [0, 1, 2]
      }
    }
  },
  args: { activeStep: 0 }
}

export const withContentFromDesign = (args: StepperProps): JSX.Element => (
  <Stepper {...args} />
)
