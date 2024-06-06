export const get = jest.fn()

export const mget = jest.fn()

export const Client = jest.fn().mockImplementation(() => ({
  get,
  mget,
  on: jest.fn()
}))
