import { SprykerVerifyResetPasswordToken } from '../types'

export const verifyToken: SprykerVerifyResetPasswordToken = {
  data: {
    type: 'customer-verify-token',
    id: 'some-token',
    attributes: {
      firstName: 'some-name',
      lastName: 'some-last-name',
      email: 'some-email',
      gender: null,
      dateOfBirth: null,
      salutation: 'some-salutation',
      createdAt: 'some-date',
      updatedAt: 'some-other-date',
      emailNotification: false
    }
  }
}
