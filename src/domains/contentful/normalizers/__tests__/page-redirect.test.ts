import { normalizePageRedirect } from '../page-redirect'
import {
  contentfulPageRedirect,
  contentfulPageRedirectNormalized
} from '~domains/page/__mocks__/contentfulPageRedirect'

describe(normalizePageRedirect, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizePageRedirect(
      // @ts-ignore
      contentfulPageRedirect.items[0]
    )
    expect(normalizedData).toEqual(contentfulPageRedirectNormalized)
  })

  it('does not error if passed empy object', () => {
    // @ts-ignore
    const normalizedData = normalizePageRedirect({})
    expect(normalizedData).toEqual({ isLink: false })
  })
})
