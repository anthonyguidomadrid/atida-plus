import { getSessionChannelName } from '../get-session-channel-name'

describe(getSessionChannelName, () => {
  it('returns a correctly formatted MultiChannel price name', () => {
    expect(getSessionChannelName()).toEqual('session_channel')
  })
})
