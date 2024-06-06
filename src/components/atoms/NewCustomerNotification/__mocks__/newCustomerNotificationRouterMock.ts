import { NextRouter } from 'next/router'

export const newCustomerNotificationRouterMock: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/login',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined), // This one fixed it for me
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false
}
