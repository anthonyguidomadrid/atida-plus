import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'

export const socialLoginGooglePayload = {
  code: 'some-code',
  serviceType: 'Google' as SocialLoginAndSignUpServiceTypes,
  redirectUri: 'somehost.com/SomeRedirectUri'
}

export const socialLoginApplePayload = {
  code: 'some-code',
  serviceType: 'Apple' as SocialLoginAndSignUpServiceTypes,
  redirectUri: 'somehost.com/SomeRedirectUri'
}

export const socialLoginFacebookPayload = {
  code: 'some-code',
  serviceType: 'Facebook' as SocialLoginAndSignUpServiceTypes,
  redirectUri: 'somehost.com/SomeRedirectUri'
}
