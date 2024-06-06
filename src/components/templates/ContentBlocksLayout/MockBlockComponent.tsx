import { FunctionComponent } from 'react'
import classNames from 'classnames'

export type MockContentBlock = {
  contentType: 'MockType'
  height: number
  backgroundColor: string
}

/**
 * Dummy component used for visualizing how the ContentBlocksLayout component works (storybook)
 * @param height - of the div that represents a content block
 * @param backgroundColor - makes it easier to distinguish between blocks
 */
export const MockBlockComponent: FunctionComponent<MockContentBlock> = ({
  height,
  backgroundColor
}) => (
  <div
    className={classNames(`h-${height}`, 'w-full', `bg-${backgroundColor}`)}
  />
)
