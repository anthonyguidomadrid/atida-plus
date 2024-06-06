import { GetServerSidePropsContext } from 'next'
import { getPageUrlSlug } from '../getPageUrlSlug'

describe(getPageUrlSlug, () => {
  const context = {
    query: {},
    resolvedUrl: '/login'
  } as GetServerSidePropsContext

  it('returns the slug for simple url without any parameters', () => {
    expect(getPageUrlSlug(context)).toEqual('login')
  })

  it('returns the slug for simple url with any parameters', () => {
    context.resolvedUrl = '/login/?redirect=account&redirect=address-book'
    context.query = {
      redirect: ['account', 'address-book']
    }

    expect(getPageUrlSlug(context)).toEqual('login')
  })

  it('returns the slug for simple url with redirect data', () => {
    context.query = {
      redirect: ['account', 'address-book']
    }

    expect(getPageUrlSlug(context)).toEqual('login')
  })

  it('returns the slug with structured url', () => {
    context.resolvedUrl = '/account/details'

    expect(getPageUrlSlug(context)).toEqual('account/details')
  })

  it('returns the correct slug after successful payment', () => {
    context.resolvedUrl = '/confirmation/ES--14485?orderId=ES--14485'
    expect(getPageUrlSlug(context)).toEqual('confirmation')
  })

  it('returns the correct slug after unsuccessful payment', () => {
    context.resolvedUrl = '/unsuccessful/ES--14485?orderId=ES--14485'
    expect(getPageUrlSlug(context)).toEqual('unsuccessful')
  })

  it('returns nothing if the resolvedUrl is empty', () => {
    context.resolvedUrl = ''

    expect(getPageUrlSlug(context)).toEqual('')
  })
})
