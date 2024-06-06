import { UserWithVerifiedResetToken } from '~domains/account'
import { LoginFormValues } from '../LoginForm'

export type LoginAndSignupFormProps = {
  loginNotificationType: string
  actualRedirect?: string
  showReducedForm: boolean
  user?: UserWithVerifiedResetToken
  wasError: boolean
  error?: string
  hasMifarmaBanner: boolean
  generalNotificationTitle: string
  generalNotificationContent: string
  handleLoginOnSubmit: (values: LoginFormValues) => void
  hasGuestCheckoutButton?: boolean
  handleGuestCheckoutOnClick: () => void
  basketLogin: boolean
}
