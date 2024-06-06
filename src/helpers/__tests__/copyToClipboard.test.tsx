import { copyToClipboard } from '../copyToClipboard'

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn()
  }
})

describe(copyToClipboard, () => {
  const setState = jest.fn()
  it('copies text into clipboard', () => {
    copyToClipboard('World peace', setState)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('World peace')
    expect(setState).toHaveBeenCalledWith('World peace')
  })
  it('copies text into clipboard', () => {
    copyToClipboard(undefined, setState)
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
  })
})
