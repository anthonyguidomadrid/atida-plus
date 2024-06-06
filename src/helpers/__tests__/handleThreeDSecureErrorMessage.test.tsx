import {
  handleThreeDSecureErrorMessage,
  ThreeDSecureInfoStatus
} from '../handleThreeDSecureErrorMessage'

describe(handleThreeDSecureErrorMessage, () => {
  const ErrorMessageTryAnotherMethod =
    'checkout.three-d-secure-error.try-another-method'
  const ErrorMessageNoPasswordReceived =
    'checkout.three-d-secure-error.no-password-received'
  const ErrorMessageTryAgainOrTryAnotherMethod =
    'checkout.three-d-secure-error.try-again-or-try-another-method'
  const ErrorMessageChallengeRequired =
    'checkout.three-d-secure-error.challenge-required'
  const defaultErrorMessage = `checkout.generic-payment-error`

  it('Returns correct translation when passed with authenticate_error', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_error' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with authenticate_failed', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_failed' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageNoPasswordReceived)
  })

  it('Returns correct translation when passed with authenticate_frictionless_failed', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_frictionless_failed' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with authenticate_frictionless_failed', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_signature_verification_failed' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAgainOrTryAnotherMethod)
  })

  it('Returns correct translation when passed with authenticate_unable_to_authenticate', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_unable_to_authenticate' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAgainOrTryAnotherMethod)
  })

  it('Returns correct translation when passed with authenticate_rejected', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_rejected' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with authentication_unavailable', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authentication_unavailable' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAgainOrTryAnotherMethod)
  })

  it('Returns correct translation when passed with lookup_error', () => {
    expect(
      handleThreeDSecureErrorMessage('lookup_error' as ThreeDSecureInfoStatus)
    ).toEqual(ErrorMessageTryAgainOrTryAnotherMethod)
  })

  it('Returns correct translation when passed with lookup_error', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'lookup_not_enrolled' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with lookup_failed_acs_error', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'lookup_failed_acs_error' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with lookup_bypassed', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'lookup_bypassed' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with lookup_bypassed', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'lookup_enrolled' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAgainOrTryAnotherMethod)
  })

  it('Returns correct translation when passed with challenge_required', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'challenge_required' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageChallengeRequired)
  })

  it('Returns correct translation when passed with challenge_required', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'authenticate_failed_acs_error' as ThreeDSecureInfoStatus
      )
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with Error Processing PARes', () => {
    expect(
      handleThreeDSecureErrorMessage('1050' as ThreeDSecureInfoStatus)
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when passed with Error Threeds lookup validation error', () => {
    expect(
      handleThreeDSecureErrorMessage('422' as ThreeDSecureInfoStatus)
    ).toEqual(ErrorMessageTryAnotherMethod)
  })

  it('Returns correct translation when default', () => {
    expect(
      handleThreeDSecureErrorMessage(
        'checkout.generic-payment-error' as ThreeDSecureInfoStatus
      )
    ).toEqual(defaultErrorMessage)
  })
})
