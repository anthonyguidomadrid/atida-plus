import { clearAndSetTimeout } from '../clearAndSetTimeout'

describe(clearAndSetTimeout, () => {
  jest.spyOn(global, 'clearTimeout')
  jest.spyOn(global, 'setTimeout')
  it('does not clear the timeout and sets a new one', async () => {
    await clearAndSetTimeout(500, 'animationId')
    expect(clearTimeout).toHaveBeenCalledTimes(0)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)
  })

  it('clears the timeout if it already exists and sets a new one', async () => {
    await clearAndSetTimeout(500, 'animationId')
    expect(clearTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)
  })
})
