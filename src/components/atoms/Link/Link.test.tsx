import { render, screen } from '@testing-library/react'
import NextLink from 'next/link'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { Link } from '.'

describe('Link', () => {
  it('renders link with content and attributes', () => {
    render(
      <Link href="/some-link" target="_blank">
        Some Link
      </Link>
    )
    expect(screen.getByText('Some Link').tagName).toBe('A')
    expect(screen.getByText('Some Link')).toHaveAttribute('href', '/some-link')
    expect(screen.getByText('Some Link')).toHaveAttribute('target', '_blank')
  })

  describe('with icon', () => {
    it('renders the icon before the content by default', () => {
      render(
        <Link href="/some-link" icon={<ChevronLeft />}>
          Some Link
        </Link>
      )
      expect(screen.getByText('Some Link').firstChild?.nodeName).toBe('svg')
    })

    it('renders the icon after the content when iconPosition is "after"', () => {
      render(
        <Link href="/some-link" icon={<ChevronLeft />} iconPosition="after">
          Some Link
        </Link>
      )
      expect(screen.getByText('Some Link').lastChild?.nodeName).toBe('svg')
    })
  })

  describe('with next/link', () => {
    it('allows href to be passed from next/link', () => {
      render(
        <NextLink href="/some-link" passHref>
          <Link>Some Link</Link>
        </NextLink>
      )
      expect(screen.getByText('Some Link')).toHaveAttribute(
        'href',
        '/some-link'
      )
    })
  })

  describe('with redirect prop', () => {
    it('attaches the redirect to the href link', () => {
      render(
        <Link href="/some-link" extraParams="/some-redirect">
          Some Link
        </Link>
      )
      expect(screen.getByText('Some Link')).toHaveAttribute(
        'href',
        '/some-link/some-redirect'
      )
    })
  })
})
