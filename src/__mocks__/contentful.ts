export const getEntries = jest.fn().mockResolvedValue({})

export const createClient = jest.fn().mockImplementation(() => ({
  getEntries
}))
