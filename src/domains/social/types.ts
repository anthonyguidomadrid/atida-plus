import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'
import { CustomerToken } from '~domains/account'

export type SocialLoginPayload = {
  code: string
  serviceType: SocialLoginAndSignUpServiceTypes
  firstName?: string
  lastName?: string
  redirectUri?: string
}

export type SocialVerifyPayload = {
  password: string
  accessToken: string
  refreshToken?: string
  expiresIn: number
  redirectUri: string
  serviceType: SocialLoginAndSignUpServiceTypes
}

export type SocialLoginResponse =
  | (CustomerToken & {
      redirectUri: string
      serviceType: SocialLoginAndSignUpServiceTypes
    })
  | undefined
