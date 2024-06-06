import { SocialLoginAndSignUp, SocialLoginAndSignUpProps } from './index'

export default {
  component: SocialLoginAndSignUp,
  title: 'atoms/SocialLoginAndSignUp',
  args: {
    label: 'I am a label',
    isFaceBookEnabled: true,
    isGoogleEnabled: true,
    isAppleEnabled: true,
    handleOnclick: () => {
      return
    }
  }
}

export const Basic = (args: SocialLoginAndSignUpProps): JSX.Element => (
  <SocialLoginAndSignUp {...args} />
)
