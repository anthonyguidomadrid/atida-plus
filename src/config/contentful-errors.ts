export const contentfulErrorToStatusCode = {
  BadRequest: 400,
  InvalidQuery: 400,
  AccessTokenInvalid: 400,
  AccessDenied: 403,
  NotFound: 404,
  UnknownField: 422,
  InvalidEntry: 422,
  RateLimitExceeded: 429,
  ServerError: 500,
  Hibernated: 502
} as const
