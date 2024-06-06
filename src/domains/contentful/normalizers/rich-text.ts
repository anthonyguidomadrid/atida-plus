import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import {
  Block,
  Document,
  INLINES,
  Inline,
  Text
} from '@contentful/rich-text-types'

const pageLinkOptions = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node: Block | Inline) => {
      return `<a alt="${node?.data?.target?.fields?.title}" href="${
        node?.data?.target?.fields?.slug
      }" >${(node?.content?.[0] as Text)?.value}</a>`
    }
  }
} as {
  renderNode: { [k: string]: { (node: Block | Inline): string } }
}

// TODO: need to figure out what should happen when content is falsy
export const normalizeRichText = (content?: Document): string => {
  return documentToHtmlString(content as Document, pageLinkOptions)
}
