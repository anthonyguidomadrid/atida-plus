import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser'
import { Element } from 'domhandler/lib/node'
import createDOMPurify from 'dompurify'
import type { DOMPurifyI } from 'dompurify'
import { HTMLAttributes } from 'react'
import { Link, LinkProps } from '~components/atoms/Link'
import { logger } from './logger'

export type AdditionalProps = {
  h2: HTMLAttributes<HTMLParagraphElement>
  p: HTMLAttributes<HTMLParagraphElement>
  a: LinkProps
  ul: HTMLAttributes<HTMLUListElement>
  li: HTMLAttributes<HTMLLIElement>
  ol: HTMLAttributes<HTMLOListElement>
  br: HTMLAttributes<HTMLBRElement>
}

const createOptions = (
  additionalProps: Partial<AdditionalProps>,
  stripLinks: boolean
) => {
  const options: HTMLReactParserOptions = {
    replace: node => {
      try {
        if (node instanceof Element) {
          if (node.type !== 'tag' || !node.children || !node.name) {
            return undefined
          }

          if (node.name === 'br') {
            const props = additionalProps?.br ?? {}
            return <br {...props} />
          }

          if (node.name === 'h2') {
            const props = additionalProps?.h2 ?? {}
            return <h2 {...props}>{domToReact(node.children, options)}</h2>
          }

          if (node.name === 'p') {
            if (node.children.length < 1) return <p className="h-2"></p> // show empty lines when they are present in content
            const props = additionalProps?.p ?? {}
            return <p {...props}>{domToReact(node.children, options)}</p>
          }

          if (node.name === 'ul') {
            const props = additionalProps?.ul ?? {}
            return <ul {...props}>{domToReact(node.children, options)}</ul>
          }

          if (node.name === 'li') {
            const props = additionalProps?.li ?? {}
            return <li {...props}>{domToReact(node.children, options)}</li>
          }

          if (node.name === 'ol') {
            const props = additionalProps?.ol ?? {}
            return <ol {...props}>{domToReact(node.children, options)}</ol>
          }

          if (node.name === 'a') {
            if (stripLinks) {
              return <span>{domToReact(node.children, options)}</span>
            }

            const props = additionalProps?.a ?? {}
            return (
              <Link {...props} {...node.attribs} className="break-all">
                {domToReact(node.children, options)}
              </Link>
            )
          }

          if (node.name === 'div') {
            return <div>{domToReact(node.children, options)}</div>
          }
        }
      } catch {
        logger.error('error parsing DOM Node')
        return <span />
      }

      return undefined
    }
  }

  return options
}

const getWindow = (): Window => {
  if (typeof window === 'undefined') {
    const { JSDOM } = require('jsdom') // eslint-disable-line
    return new JSDOM('<!DOCTYPE html>').window
  }

  return window
}

let DOMPurify: DOMPurifyI | undefined

export const parseHtml = (
  html: string | undefined,
  additionalProps: Partial<AdditionalProps> = {},
  stripLinks = false
): JSX.Element | JSX.Element[] => {
  DOMPurify = DOMPurify || createDOMPurify(getWindow())
  // @ts-ignore
  return parse(
    DOMPurify.sanitize(html ?? ''),
    createOptions(additionalProps, stripLinks)
  )
}
