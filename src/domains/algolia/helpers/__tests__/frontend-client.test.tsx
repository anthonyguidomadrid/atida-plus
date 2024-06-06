import { createAlgoliaFrontendClient } from '../frontend-client'

describe(createAlgoliaFrontendClient, () => {
  it('returns an object when this funcion is called', () => {
    expect(typeof createAlgoliaFrontendClient()).toEqual('object')
  })
  it('returns the appId as a property of the object', () => {
    expect(createAlgoliaFrontendClient().appId).toEqual('someAppId')
  })
})
