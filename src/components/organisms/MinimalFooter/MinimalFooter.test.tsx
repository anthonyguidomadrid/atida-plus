import { screen } from '@testing-library/react'
import {
  termsConditionsLinks,
  languages,
  copyright
} from './MinimalFooter.mock'

import { MinimalFooter } from '.'
import { MinimalFooterProps } from './MinimalFooter'
import { setupMatchMediaMock } from '~domains/breakpoints/hooks/useBreakpoint/'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { renderWithStore } from '~test-helpers'

const store = createStore(rootReducer, {})

describe(MinimalFooter, () => {
  const setup = (
    props: Partial<MinimalFooterProps> = {},
    isLargeFormat = true
  ) => {
    const { reset } = setupMatchMediaMock(isLargeFormat)
    const renderedComponent = renderWithStore(
      <Provider store={store}>
        <MinimalFooter
          languages={languages}
          termsConditionsLinks={termsConditionsLinks}
          copyright={copyright}
          withStepper={true}
          {...props}
        />
      </Provider>
    )
    reset()
    return renderedComponent
  }

  it('renders as an accessible element', () => {
    setup()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders MinimalFooter', () => {
    setup()
    expect(screen.getByTestId('MinimalFooter')).toBeInTheDocument()
  })

  // locale switchers
  describe('locale switchers component', () => {
    it('renders locale switchers component', () => {
      setup()
      expect(screen.getByTestId('localeSwitchersBlock')).toBeInTheDocument()
    })

    it("doesn't error if languages are not passed", () => {
      const { container } = setup({
        languages: undefined
      })
      expect(container).toBeInTheDocument()
    })
  })

  // terms and conditions links
  describe('terms and conditions links', () => {
    it("doesn't error if terms and conditions are not passed", () => {
      const { container } = setup({ termsConditionsLinks: undefined })
      expect(container).toBeInTheDocument()
    })
    it("doesn't error if terms and conditions links are not passed", () => {
      const { container } = setup({
        termsConditionsLinks: {
          ...termsConditionsLinks,
          items: undefined
        }
      })
      expect(container).toBeInTheDocument()
    })
    it('renders all terms and conditions links', () => {
      setup()
      termsConditionsLinks.items?.forEach(({ link: { url, label } = {} }) => {
        expect(screen.getByText(label as string)).toHaveAttribute('href', url)
      })
    })
  })

  // copyright
  describe('copyright', () => {
    it("doesn't error if copyright is not passed", () => {
      const { container } = setup({
        copyright: undefined
      })
      expect(container).toBeInTheDocument()
    })

    it('renders copyright text', () => {
      setup()
      expect(screen.getByText('© Atida').tagName).toBe('A')
      expect(screen.getByText('© Atida')).toHaveAttribute(
        'href',
        'https://atida.com/'
      )
    })
  })
})
