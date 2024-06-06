import { render, screen } from '@testing-library/react'
import { parseHtml } from '~helpers'

const html =
  '<h1>Some title</h1><p>Some paragraph text</p><ul><li>A list item</li></ul><h3>Another title</h3>'

const htmlWithLink =
  '<h1>Some title><p>Some paragraph text <a href="/">oh no a link!</a></p>'

const htmlWithBr = '<p>This is<br/> two line sentence</p>'

describe(parseHtml, () => {
  describe('in browser environment', () => {
    it('renders our paragraph component for paragraph tags', () => {
      render(<div>{parseHtml(html, { p: { className: 'paragraph' } })}</div>)
      expect(screen.getByText('Some paragraph text')).toBeInTheDocument()
      expect(screen.getByText('Some paragraph text').tagName).toBe('P')
      expect(
        screen.getByText('Some paragraph text').classList.contains('paragraph')
      ).toBe(true)
    })

    it('leaves other html untouched', () => {
      render(<div>{parseHtml(html, { p: { className: 'paragraph' } })}</div>)
      expect(screen.getByText('A list item')).toBeInTheDocument()
      expect(screen.getByText('A list item').tagName).toBe('LI')
      expect(screen.getByText('A list item').classList).toHaveLength(0)
    })

    it('can strip link tags', () => {
      render(<div>{parseHtml(htmlWithLink, undefined, true)}</div>)
      expect(screen.getByText('oh no a link!').tagName).toBe('SPAN')
      expect(screen.getByText('oh no a link!')).not.toHaveAttribute('href')
    })

    it('renders br tag', () => {
      render(<div>{parseHtml(htmlWithBr, { p: { title: 'paragraph' } })}</div>)
      expect(screen.getByTitle('paragraph')).toBeInTheDocument()
      expect(screen.getByTitle('paragraph')).toContainHTML('br')
    })
  })
})
