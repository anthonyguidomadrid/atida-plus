import { screen, render } from '@testing-library/react'

import { ConditionalLink, ConditionalLinkProps } from '.'
import { ReactNode } from 'react'

describe(ConditionalLink, () => {
  const testText = 'Some test content'
  const setup = (props: Partial<ConditionalLinkProps> = {}) =>
    render(
      <ConditionalLink {...props}>
        <div>{testText}</div>
      </ConditionalLink>
    )

  jest.mock('next/link', () => ({ children }: { children: ReactNode }) =>
    children
  )

  it('renders the children wrapped in a link component when it receives a URL', async () => {
    setup({ url: '/test-url' })

    expect(await screen.findByText(testText)).toBeInTheDocument()
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/test-url')
  })

  it('renders only the children when it receives no URL', async () => {
    setup()

    expect(await screen.findByText(testText)).toBeInTheDocument()
    expect(await screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
