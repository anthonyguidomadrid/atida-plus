import {
  UpdatedJWTAndRefreshTokens,
  CustomerCookie,
  CustomerToken,
  SprykerCustomerToken
} from './../types'
import { SprykerUpdatedJWTAndRefreshTokens } from '~domains/address'

export const validToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImI0ZTBiN2YxNWNiNGIwZmNlYjgxZTI5Yzg5OTc0NzIxZTJjYTQwODE2MTY5ZTI5ODU3ZGRhMDJlOWYxMTBjMGJmZjAxZjY3MzRlYzNkZTEwIiwiaWF0IjoiMTYyMDIyODgxOC4wNzg1NTAiLCJuYmYiOiIxNjIwMjI4ODE4LjA3ODU1NCIsImV4cCI6IjE2MjAyNTc2MTguMDYyNTE5Iiwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6XCJQVC0tMjM0OVwiLFwiaWRfY3VzdG9tZXJcIjoyNDU2LFwiZW1haWxcIjpcInJlYmVrYWguam9uZXMrd2l0aC1hZGRyZXNzQGludmlxYS5jb21cIixcImZhbWlseV9uYW1lXCI6XCJKb25lc1wiLFwiZ2l2ZW5fbmFtZVwiOlwiUmViZWthaFwifSIsInNjb3BlcyI6WyJjdXN0b21lciJdfQ.FgsyfFxwGMk_TNQ7FitQAFcdOgA167fdaJrx1v0G2UqfTCT-Ah4jHTzfvrL45FSYjMLZ88CxolyktZRU8TPE01PYC-3Ml56C6CKiiwrywaY79DL8mBJViU_jmatmoTXuR5Bhp5nBdkrJtMCh-FKj0tmJPsCCmEiEltCixtewjx5bmJP9nvHS5of3Idkn60m4F329LcQYbzSjFtPbaG7-I-KtbldANeJJMKDVyhYYBRKzNQLi37s0oDnMRPnnFGkZ4J376XApVHa3rFqaJlSnO5wPyMbfFE008zQ4cOjZ7LtUcW4RGBISYfGuPf6fvl5PuL3uesx8mR8Y9V8bp1fsmg'

export const partiallyValidToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTY1MzkzNDAuNTE3Nn0.4eYvMb9xJBCo3teg70X1jyXwliVHViQsFSUUiRvLuoE'

export const guestToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjE0NmUyMmM5ZjgxNjJkMGQ3ZjJkOTFlYjJkNDc1NWUyMzc2OWM1ZDkxYzFjODAxODQzNWZkYTZhYmEyNGEyNTdmZjJkNjBkMjRlMWEwNGEyIiwiaWF0IjoxNjQ2OTA3NTUyLjg4ODM4OSwibmJmIjoxNjQ2OTA3NTUyLjg4ODYsImV4cCI6MTY0NjkzNjM1Mi44NjUyNjIsInN1YiI6IntcImN1c3RvbWVyX3JlZmVyZW5jZVwiOlwiYW5vbnltb3VzOjg4MmI0OGM0LWEwNWItMTFlYy1iZjUyLTY2NjcxOGE5YTQxNlwiLFwiaWRfY3VzdG9tZXJcIjpudWxsLFwiZW1haWxcIjpudWxsLFwiZmFtaWx5X25hbWVcIjpudWxsLFwiZ2l2ZW5fbmFtZVwiOm51bGwsXCJoYXNfcHJldmlvdXNfc3VjY2Vzc2Z1bF9vcmRlclwiOm51bGx9Iiwic2NvcGVzIjpbImFub255bW91cyJdfQ.ysyddBURaFvxksz_rYWv6qrLs3kGZir3_mMI9ssGvVq196SV0NvATP7SpIZWwCgkxoGvV-7aaT_-YN9gsrw4M_6nH_cdfEoIQnlRDftQADMLs6wwyMMnPIPcs3UVdebJykWKAcREg8J1YCU1vzEhRCjJiFJDbIo6kIxc54w05K8xSRh8-ZCOxMdfkancAsuFSaYYQ9y54M2C2DbmDtfhVw5JHXUqHgSelUpWdFh_bRDFG7w3_k6JklqglDZEPI4JDsyplZ6mx7Z4BAzPqaz4o1hw2VJaAkW-O0rnkRTkv0V0wZIpSwsppAhovKEfxJqSy7zpG7OvWEw8kgwCWzM1_g'

export const tokenWithoutEmailAndFamilyName =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImI0ZTBiN2YxNWNiNGIwZmNlYjgxZTI5Yzg5OTc0NzIxZTJjYTQwODE2MTY5ZTI5ODU3ZGRhMDJlOWYxMTBjMGJmZjAxZjY3MzRlYzNkZTEwIiwiaWF0IjoiMTYyMDIyODgxOC4wNzg1NTAiLCJuYmYiOiIxNjIwMjI4ODE4LjA3ODU1NCIsImV4cCI6IjI2MjAyNTc2MTguMDYyNTE5Iiwic3ViIjoie1wiY3VzdG9tZXJfcmVmZXJlbmNlXCI6XCJQVC0tMjM0OVwiLFwiaWRfY3VzdG9tZXJcIjoyNDU2LFwiZ2l2ZW5fbmFtZVwiOlwiUmViZWthaFwifSIsInNjb3BlcyI6WyJjdXN0b21lciJdfQ.xL8DbEKc2pivLglHe3ZWVa1fv4ii14LcNeKBuYvZFD0Idp3KaX2Pj7GlHOXdr5m-KUxaXfH4UBEtTR2mZ9IgXobv40hPesfEzU9BaVotNlaMjaldd-8jBYwMdg_E9eQzNOS1-vJ-YMH-VfahFPdDOdjRHWbKziZhJORfygZlT93b1V05oOhvSNfgT_1PSeM3PIiQgbGbcCflxySm_cZ79qlKxtqo6NdHphpUIosXEQmqGTvzXZ_ekbmnX76BDf1S6jC-NtgqSNSXfFiS66msdI-ENLNxiEt004ZdyLE-sgAljtUg6fihXVAbFMz-PaAV5sD_fQ5ivHIXR0G51cCP6w'

export const refreshToken =
  'def5020034a464d21a6f36ed56d7e36e6742f537da9aa0a4d0e889f72d0c61fa9e334a62b51c94ebd668bde583e3fe5108a0c3cb76edd44fc55382ff04a9d5ae50bd14d3bfe02f7ff31e518be8e4f08f34afef937ff8bfcd9cb57b29c15b3c4eda703cdd63e9a262409b64500c846ded122d9cf296bedd069985c39e1d75fb5d85ddc66709dc948d4ea1c9486767e093f33b6cdb531536cddbf3ff1d6e6c51e302bd7042d6679835821ad700cfab022da6b101e9ef8d4781ff575803ea770e6dd633d3b643440cb2b5a01a32041bd04357dda75f7909646405864415015779b23cc467c98608e6846269299df3411dbe9ed5d06c103b2a7734846083ff6abf3fd22f8ea2c12bba2f7b61e89cd99449b0e0a361512543d56178c08064e573060c2640e67de0c85fafdf77c3e7911da963341ebe42a3fcbbfbddf55c57a97903f09d79b44e3148cfd1f8bd0b907865423fd961875c476151ca76408ffa04717d12bc79858fa364df00939896b07a1a68ee3a3da45da6128648aec2ab2bddd1921214e1491dc2ad29a3a6f70184646fe776bb78700a8c312375c87f8eaacbb1cc36c55f3d9d0db49b07b2061024bcab7bf3588e067ea761fc73c93ab708965f857a3e747d65a425ed94c5c66d06b49b3f12328563fea4aebb0e1db1e5870fe8fde0abd09c235b4c3af9ae50c63207eefb2f5800fa01b7230d712689506a6ae622fcc299ef3e0573'

export const refreshedToken =
  'def502005599502570a8b278441ea9b9262ab50b607779235f014fd201e1596d1baaa9f72779bbace6d150c7611e4eb180228cc2d331bda01739d97ff6a1c2892f59ec34078a5a5e4012b4ef2d51af27ec3b221324ce4ffe675d9c603b67b5aeaa290867ee5deb2ffe4f31bbf822858afad7d1f6890bb00ea63fc68a89777c13e4f21ba4d12fc170fdd56bec42a9af3b8107a93db3a346d05c950c846fa17d4d1c7446034f375288b2d4cbafc1dca8eae0812398274a868d1023de1b8dfb19acae5edda97a2ec37396089d06852670a3d57d91afd6cbba97d23df1e7b58871773c95d97d726408113b65c78301891e8e41da6f75a1c8f9b2cceaecee6976f0f86a3b62971e2f52bd10dddcbddde76d7dfe9085e1760256e3e6ffdbe8b3967eee41c0a9be7ceda4fba4f3be8c74ba048efb09c69502e9eada06cd743cfb48c95184fb351dcebe751b736ffe434dd57c5535fe56f0a9b7c00de187b2f204f26902152c9e8a259158b0089f8a830cb927ab521857b988f3634b9c72fddcfd21d2a8afea1dd37aeabb4819bfbdb7dc5d0f03b247839516640a31955db02913baa0a5be5ecc8373f390b89d2114174dd65f8f4c50fcd2741d32df6fcdd4a7700b0ec96f961d4e708e48d52e078662ceff2984697ad9d2c59f8ec62a281cb21600c4334e4abf926f0cd6ecfb2eb56f6cfb9feaf495106d7c37dd05d7a445ee705f19ed03d23b63218'

export const sprykerToken: SprykerCustomerToken = {
  data: {
    type: 'access-tokens',
    attributes: {
      expiresIn: 423423,
      accessToken: validToken,
      refreshToken: 'some-refresh-token',
      messages: [{}],
      isNew: true
    }
  }
}

export const sprykerVerifiedToken: SprykerCustomerToken = {
  data: {
    type: 'access-tokens',
    attributes: {
      expiresIn: 423423,
      accessToken: validToken,
      refreshToken: 'some-refresh-token',
      messages: [{}],
      isNew: false,
      email: 'someEmail@email.com',
      firstName: 'name'
    }
  }
}

export const sprykerNonVerifiedToken: SprykerCustomerToken = {
  data: {
    type: 'social-access-tokens',
    attributes: {
      expires: 423423,
      accessToken: 'socialAccessToken',
      refreshToken: 'some-refresh-token',
      messages: [{}],
      isNew: false,
      email: 'someEmail@email.com',
      firstName: 'name'
    }
  }
}

export const token: CustomerToken = {
  accessToken: validToken,
  refreshToken: 'some-refresh-token',
  expiresIn: 423423,
  messages: [{}],
  social: {
    isNew: true,
    needsVerification: false
  }
}

export const nonVerifiedToken: CustomerToken = {
  accessToken: 'socialAccessToken',
  refreshToken: 'some-refresh-token',
  expiresIn: 423423,
  messages: [{}],
  social: {
    isNew: false,
    needsVerification: true,
    email: 'someEmail@email.com',
    firstName: 'name'
  }
}

export const verifiedToken: CustomerToken = {
  accessToken: validToken,
  refreshToken: 'some-refresh-token',
  expiresIn: 423423,
  messages: [{}],
  social: {
    isNew: false,
    needsVerification: false,
    email: 'someEmail@email.com',
    firstName: 'name'
  }
}

export const normalizedGuestToken: CustomerToken = {
  accessToken: guestToken,
  refreshToken: 'some-refresh-token',
  expiresIn: 1,
  messages: [{}],
  social: { needsVerification: false }
}

export const customerCookie: CustomerCookie = {
  'given-name': 'John',
  'has-previous-successful-order': false,
  ref: 'some-reference',
  last_used_payment_code: 'braintree_paypal'
}

export const sprykerGuestToken: SprykerCustomerToken = {
  data: {
    type: 'guest-tokens',
    attributes: {
      expiresIn: 1,
      accessToken: guestToken,
      refreshToken: 'some-refresh-token',
      messages: [{}]
    }
  }
}

export const sprykerRefreshTokenResponse: SprykerUpdatedJWTAndRefreshTokens = {
  data: {
    type: 'refresh-tokens',
    attributes: {
      tokenType: 'Bearer',
      expiresIn: 18000,
      accessToken: validToken,
      refreshToken: refreshedToken
    },
    links: {
      self: 'http://glue-pt-spryker.dev.atida.com/refresh-tokens'
    }
  }
}

export const refreshTokenResponse: UpdatedJWTAndRefreshTokens = {
  JWT: validToken,
  expiresIn: 18000,
  refreshToken: refreshedToken
}
