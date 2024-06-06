export const get = jest.fn()
export const set = jest.fn()
export const remove = jest.fn()

export const defaultStorageMechanism = jest.fn().mockImplementation(() => ({
  get,
  set,
  remove
}))

export const cookieStorageMechanism = jest.fn().mockImplementation(() => ({
  get,
  set,
  remove
}))
