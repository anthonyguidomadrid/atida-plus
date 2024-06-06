import {
  convertURL,
  getLastPathFromURL,
  prependURLWithSlash
} from '../convertURL'

describe(convertURL, () => {
  const localES = 'es-es'
  const localPT = 'pt-pt'
  const URL = '/pt-pt/vitamins-supplements/vitamins-baby-and-children'
  it('removes the local url when the local is different than the url one', () => {
    expect(convertURL(URL, localES)).toEqual(
      'pt-pt-vitamins-supplements-vitamins-baby-and-children'
    )
  })
  it('keep the local url when the local is the same than the url one', () => {
    expect(convertURL(URL, localPT)).toEqual(
      '/pt-pt/vitamins-supplements-vitamins-baby-and-children'
    )
  })
})

describe(prependURLWithSlash, () => {
  it('prepends the url with a / if there isnt one already', () => {
    const URL = 'vitamins-supplements/vitamins-baby-and-children'
    expect(prependURLWithSlash(URL)).toEqual(
      '/vitamins-supplements/vitamins-baby-and-children'
    )
  })
  it('keeps the same URL if it starts with a /', () => {
    const URL = '/vitamins-supplements/vitamins-baby-and-children'
    expect(prependURLWithSlash(URL)).toEqual(
      '/vitamins-supplements/vitamins-baby-and-children'
    )
  })
  it('keeps the same URL if it starts with http (for external or absolute URLs)', () => {
    const URL = 'https://youtube.com/'
    expect(prependURLWithSlash(URL)).toEqual('https://youtube.com/')
  })
  it('returns undefined if no URL is provided', () => {
    const URL = undefined
    expect(prependURLWithSlash(URL)).toEqual(undefined)
  })
  it('returns root URL if empty URL is sent', () => {
    const URL = ''
    expect(prependURLWithSlash(URL)).toEqual('/')
  })
})

describe(getLastPathFromURL, () => {
  it('returns the last path from an url', () => {
    const URL = 'http://localhost:3000/pt-pt/checkout'
    expect(getLastPathFromURL(URL)).toEqual('checkout')
  })
})
