/**
 * @jest-environment node
 */
import { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { parseHtml } from '../parseHtml'

const html =
  '<h1>Some title</h1><p>Some paragraph text</p><ul><li>A list item</li></ul><h3>Another title</h3>'

const htmlWithLink =
  '<h1>Some title><p>Some paragraph text <a href="/">oh no a link!</a></p>'

const htmlWithBr = '<p>This is<br/> two line sentence</p>'

describe(parseHtml, () => {
  describe('server environment', () => {
    describe('parses the html to react components', () => {
      it('parses the h1 to react component', () => {
        const rendered = renderToString(
          parseHtml(html, { p: { className: 'paragraph' } }) as ReactElement
        ).replace(/ data\-reactroot=""/gi, '')
        expect(rendered).toEqual(
          expect.stringMatching(
            /.*<p class="paragraph[a-z-0-9]*">Some paragraph text<\/p>.*/
          )
        )
      })

      it('parses the br to react component', () => {
        const rendered = renderToString(
          parseHtml(htmlWithBr, {
            br: { className: 'sm:hidden' }
          }) as ReactElement
        ).replace(/ data\-reactroot=""/gi, '')
        expect(rendered).toEqual(
          expect.stringMatching(/.*<br class="sm:hidden"\/>.*/)
        )
      })
    })

    it('leaves other HTML untouched', () => {
      const rendered = renderToString(
        parseHtml(html, { p: { className: 'paragraph' } }) as ReactElement
      ).replace(/ data\-reactroot=""/gi, '')
      expect(rendered).toEqual(
        expect.stringMatching(/.*<ul><li>A list item<\/li><\/ul>.*/)
      )
    })

    it('can remove link tags', () => {
      const rendered = renderToString(
        parseHtml(htmlWithLink, undefined, true) as ReactElement
      ).replace(/ data\-reactroot=""/gi, '')
      expect(rendered).toEqual(
        expect.stringMatching(/.*<span>oh no a link!<\/span>.*/)
      )
    })
  })
})
