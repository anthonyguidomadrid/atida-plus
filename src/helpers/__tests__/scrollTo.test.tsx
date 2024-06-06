import { render, screen } from '@testing-library/react'
import { setupMatchMediaMock } from '~domains/breakpoints'

import { scrollToElement } from '~helpers/scrollTo'

describe(scrollToElement, () => {
  const scrollIntoViewMock = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
  render(
    <div className="h-full felx flex-row">
      <div className="h-60" />
      <div data-testid="testDiv" />
    </div>
  )
  const element = screen.getByTestId('testDiv')
  it('scrolls to the element - auto', () => {
    setupMatchMediaMock(true)
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
    scrollToElement(element, 'center')
    expect(scrollIntoViewMock).toHaveBeenCalled()
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center'
    })
  })
  it('scrolls to the element - smooth', () => {
    setupMatchMediaMock(false)
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
    scrollToElement(element, 'center')
    expect(scrollIntoViewMock).toHaveBeenCalled()
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'center'
    })
  })
  it('doesnt scroll when there is no element', () => {
    setupMatchMediaMock(false)
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
    scrollToElement(null, 'center')
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })
})
