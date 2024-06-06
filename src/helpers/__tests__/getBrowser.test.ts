import { getBrowser } from './../getBrowser'

describe(getBrowser, () => {
  it('detect safari', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15',
      writable: true
    })

    expect(getBrowser()).toEqual('Safari 15')
  })

  it('detect Firefox', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
      writable: true
    })

    expect(getBrowser()).toEqual('Firefox 47')
  })

  it('detect Chrome', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      writable: true
    })

    expect(getBrowser()).toEqual('Chrome 104')
  })

  it('detect IE', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      writable: true
    })

    expect(getBrowser()).toEqual('IE 11')
  })

  it('detect Edge', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.9600',
      writable: true
    })

    expect(getBrowser()).toEqual('Edge 12')
  })
})
