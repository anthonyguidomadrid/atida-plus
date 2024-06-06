/**
 * @jest-environment node
 */
import { fetchMenuItemCollection } from '~domains/menu/services/fetch-menu-item-collection'
import axios from 'axios'
import { menuResponseMock } from '~domains/page/__mocks__/contentfulCategoryContent'

describe(fetchMenuItemCollection, () => {
  it('creates a client and passes the locale and menu title to the request', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({})

    await fetchMenuItemCollection('pt-PT', 'testTitle')
    expect(axios.post).toHaveBeenCalledWith('', {
      query: expect.any(String),
      variables: { locale: 'pt-PT', menuTitle: 'testTitle' }
    })
  })

  it('returns a normalized response', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue(menuResponseMock)

    const response = await fetchMenuItemCollection('pt-PT', 'testTitle')
    expect(axios.post).toHaveBeenCalled()
    expect(response).toMatchSnapshot()
  })
})
