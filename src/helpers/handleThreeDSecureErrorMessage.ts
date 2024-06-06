export enum ThreeDSecureInfoStatus {
  AUTHENTICATE_ERROR = 'authenticate_error',
  AUTHENTICATION_FAILED = 'authenticate_failed',
  AUTHENTICATE_FRICTIONLESS_FAILED = 'authenticate_frictionless_failed',
  AUTHENTICATE_SIGNATURE_VERIFICATION_FAILED = 'authenticate_signature_verification_failed',
  AUTHENTICATE_UNABLE_TO_AUTHENTICATE = 'authenticate_unable_to_authenticate',
  AUTHENTICATE_REJECTED = 'authenticate_rejected',
  AUTHENTICATION_UNAVAILABLE = 'authentication_unavailable',
  LOOKUP_ERROR = 'lookup_error',
  LOOKUP_NOT_ENROLLED = 'lookup_not_enrolled',
  LOOKUP_FAILED_ACS_ERROR = 'lookup_failed_acs_error',
  LOOKUP_BYPASSED = 'lookup_bypassed',
  LOOKUP_ENROLLED = 'lookup_enrolled',
  CHALLENGE_REQUIRED = 'challenge_required',
  AUTHENTICATE_FAILED_ACS_ERROR = 'authenticate_failed_acs_error',
  ERROR_PROCESSING_PARES = '1050',
  ERROR_THREEDS_LOOKUP_VALIDATION_ERROR = '422'
}

export const handleThreeDSecureErrorMessage = (
  error: ThreeDSecureInfoStatus
): string => {
  switch (error) {
    case ThreeDSecureInfoStatus.AUTHENTICATE_ERROR:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.AUTHENTICATION_FAILED:
      return 'checkout.three-d-secure-error.no-password-received'

    case ThreeDSecureInfoStatus.AUTHENTICATE_FRICTIONLESS_FAILED:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.AUTHENTICATE_SIGNATURE_VERIFICATION_FAILED:
      return 'checkout.three-d-secure-error.try-again-or-try-another-method'

    case ThreeDSecureInfoStatus.AUTHENTICATE_UNABLE_TO_AUTHENTICATE:
      return 'checkout.three-d-secure-error.try-again-or-try-another-method'

    case ThreeDSecureInfoStatus.AUTHENTICATE_REJECTED:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.AUTHENTICATION_UNAVAILABLE:
      return 'checkout.three-d-secure-error.try-again-or-try-another-method'

    case ThreeDSecureInfoStatus.LOOKUP_ERROR:
      return 'checkout.three-d-secure-error.try-again-or-try-another-method'

    case ThreeDSecureInfoStatus.LOOKUP_NOT_ENROLLED:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.LOOKUP_FAILED_ACS_ERROR:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.LOOKUP_BYPASSED:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.LOOKUP_ENROLLED:
      return 'checkout.three-d-secure-error.try-again-or-try-another-method'

    case ThreeDSecureInfoStatus.CHALLENGE_REQUIRED:
      return 'checkout.three-d-secure-error.challenge-required'

    case ThreeDSecureInfoStatus.AUTHENTICATE_FAILED_ACS_ERROR:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.ERROR_PROCESSING_PARES:
      return 'checkout.three-d-secure-error.try-another-method'

    case ThreeDSecureInfoStatus.ERROR_THREEDS_LOOKUP_VALIDATION_ERROR:
      return 'checkout.three-d-secure-error.try-another-method'

    default:
      return `checkout.generic-payment-error`
  }
}
