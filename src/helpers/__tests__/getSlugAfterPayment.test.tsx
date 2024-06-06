import { getPageUrlSlug } from '../getPageUrlSlug'
import { GetServerSidePropsContext } from 'next'

describe(getPageUrlSlug, () => {
  const context = {
    query: {},
    resolvedUrl: '/confirmation/ES--14485?orderId=ES--14485'
  } as GetServerSidePropsContext

  it('returns the correct slug after payment', () => {
    expect(getPageUrlSlug(context)).toEqual('confirmation')
  })
})
