/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { setNewPassword } from '../set-new-password'

describe(setNewPassword, () => {
  it('creates the client & passes the locale to the spryker request', async () => {
    await setNewPassword('en-gb', {
      restorePasswordKey: 'someRestoreKey',
      password: 'somePassword',
      confirmPassword: 'somePassword'
    })
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk'
      }
    })

    expect(axios.patch).toHaveBeenCalledWith(
      `/customer-restore-password/someRestoreKey`,
      {
        data: {
          type: 'customer-restore-password',
          id: 'someRestoreKey',
          attributes: {
            restorePasswordKey: 'someRestoreKey',
            password: 'somePassword',
            confirmPassword: 'somePassword'
          }
        }
      }
    )
  })

  it('returns an empty response', async () => {
    const setNewPasswordResponse = await setNewPassword('en-gb', {
      restorePasswordKey: 'someRestoreKey',
      password: 'somePassword',
      confirmPassword: 'somePassword'
    })
    expect(setNewPasswordResponse).toBe(undefined)
  })
})
