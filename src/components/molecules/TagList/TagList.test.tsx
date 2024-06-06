import { render, screen } from '@testing-library/react'
import { TagList, TagListProps } from './TagList'
import { Tag } from '~components/atoms/Tag'
import { setupMatchMediaMock } from '~domains/breakpoints'

describe('TagList', () => {
  const defaultProps = {
    children: [
      <Tag key="#nav-item-1" href="#nav-item-1">
        Nav Item 1
      </Tag>,
      <Tag key="#nav-item-2" href="#nav-item-2">
        Nav Item 2
      </Tag>,
      <Tag key="#nav-item-3" href="#nav-item-3" isSelected>
        Nav Item 3
      </Tag>,
      <Tag key="#nav-item-4" href="#nav-item-4">
        Nav Item 4
      </Tag>,
      <Tag key="#nav-item-5" href="#nav-item-5">
        Nav Item 5
      </Tag>,
      <Tag key="#nav-item-6" href="#nav-item-6">
        Nav Item 6
      </Tag>,
      <Tag key="#nav-item-7" href="#nav-item-7">
        Nav Item 7
      </Tag>,
      <Tag key="#nav-item-8" href="#nav-item-8">
        Nav Item 8
      </Tag>,
      <Tag key="#nav-item-9" href="#nav-item-9">
        Nav Item 9
      </Tag>,
      <Tag key="#nav-item-10" href="#nav-item-10">
        Nav Item 10
      </Tag>
    ]
  }
  const setup = (props: Partial<TagListProps> = {}, isLargerScreen = false) => {
    const { reset } = setupMatchMediaMock(isLargerScreen)
    const result = render(<TagList {...defaultProps} {...props} />)
    reset()
    return result
  }

  it('renders each tag', () => {
    setup()
    for (let i = 1; i <= 10; i++) {
      expect(
        screen.getByRole('link', { name: `Nav Item ${i}` })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: `Nav Item ${i}` }).parentElement
      ).not.toHaveClass('invisible')
    }
  })

  it('does not render invalid elements', () => {
    setup({ children: [...defaultProps.children, "this isn't right"] })
    expect(screen.queryByText(/this isn't right/)).not.toBeInTheDocument()
  })

  describe('on xs screens', () => {
    it('forces tags onto a single line', () => {
      setup()
      expect(screen.getByRole('list')).toHaveClass('flex-nowrap')
      expect(screen.getByRole('list')).not.toHaveClass('flex-wrap')
    })
  })

  describe('on larger screens', () => {
    it('is not a scrollable container', () => {
      setup({}, true)
      expect(screen.getByRole('list')).toHaveClass('flex-wrap')
    })
  })
})
