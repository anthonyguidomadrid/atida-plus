import { createReduxStore, useCreateReduxStore } from '../store'

describe(createReduxStore, () => {
  it('returns an object', () => {
    expect(typeof createReduxStore()).toEqual('object')
  })
})

describe(useCreateReduxStore, () => {
  it('returns an object', () => {
    expect(typeof createReduxStore()).toEqual('object')
  })
})
