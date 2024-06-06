import { updateUrlOnProductClick } from '~helpers/updateUrlOnProductClick'
import { routerMock } from '../../__mocks__/routerMock'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn()
}))

describe(updateUrlOnProductClick, () => {
  it('updates the url with the correct page number as query', () => {
    updateUrlOnProductClick(routerMock, '12345', 2)

    expect(routerMock.replace).toHaveBeenCalledWith(
      { pathname: undefined, query: { page: '2' } },
      undefined,
      { shallow: true }
    )
  })
})
