import { toggleElementOverflow } from '~helpers/toggleElementOverflow'

describe(toggleElementOverflow, () => {
  const element: HTMLDivElement = document.createElement('div')

  it('sets overflow to hidden', () => {
    element.setAttribute('style', 'overflow: visible')

    toggleElementOverflow(false, element)
    expect(element).toHaveStyle({ overflow: 'hidden' })
  })

  it('sets overflow to visible', () => {
    element.setAttribute('style', 'overflow: hidden')

    toggleElementOverflow(true, element)
    expect(element).toHaveStyle({ overflow: 'visible' })
  })
})
