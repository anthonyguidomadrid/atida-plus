import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'

export const socialVerifyGooglePayload = {
  password: 'P@ssword',
  accessToken: 'some accesToken',
  refreshToken: 'some refreshToken',
  expiresIn: 1,
  redirectUri: 'someRedirectUri',
  serviceType: 'Google' as SocialLoginAndSignUpServiceTypes
}

export const socialVerifyApplePayload = {
  password: 'P@ssword',
  accessToken: 'some accesToken',
  refreshToken: 'some refreshToken',
  expiresIn: 1,
  redirectUri: 'someRedirectUri',
  serviceType: 'Apple' as SocialLoginAndSignUpServiceTypes
}

export const socialVerifyFacebookPayload = {
  password: 'P@ssword',
  accessToken: 'some accesToken',
  refreshToken: 'some refreshToken',
  expiresIn: 1,
  redirectUri: 'someRedirectUri',
  serviceType: 'Facebook' as SocialLoginAndSignUpServiceTypes
}
