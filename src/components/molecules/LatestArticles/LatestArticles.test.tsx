import { render, screen } from '@testing-library/react'
import { LatestArticles, LatestArticlesProps } from '.'

describe(LatestArticles, () => {
  const defaultProps = {
    articles: [
      {
        title: 'Caffeinated eye contours: everything you need to know',
        text:
          'Have you heard of caffeinated eye contours? Eliminating annoying dark circles and bags is one of the objectives. Have you heard of caffeinated eye contours? Eliminating annoying dark circles and bags is one of the objectives',
        category: {
          label: 'Face',
          color: 'beauty'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      },
      {
        title: 'Tips to avoid irritation from diaper rash',
        text: `Babies' skin is very soft, delicate and above all, sensitive. In fact, "diaper rash" is very common, which is an irritation. Babies' skin is very soft, delicate and above all, sensitive. In fact, "diaper rash" is very common, which is an irritation.`,
        category: {
          label: 'Baby skin care',
          color: 'baby-and-kids'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      },
      {
        title: 'Does vitamin d help reduce complications?',
        text:
          'The mouth is one of the most common entry routes for microorganisms and, without good oral health. The mouth is one of the most common entry routes for microorganisms and, without good oral health.',
        category: {
          label: 'Dental & oral care',
          color: 'personal-care'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      },
      {
        title: 'Does vitamin d help reduce complications?',
        text:
          'The mouth is one of the most common entry routes for microorganisms and, without good oral health. The mouth is one of the most common entry routes for microorganisms and, without good oral health.',
        category: {
          label: 'Dental & oral care',
          color: 'personal-care'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      }
    ]
  }

  const setup = (props: Partial<LatestArticlesProps> = {}) =>
    render(<LatestArticles {...defaultProps} {...props} />)

  it('renders LatestArticles component', () => {
    setup()
    expect(screen.getByTestId('LatestArticles')).toBeInTheDocument()
  })

  it('does not crash if articles are not passed', () => {
    const { container } = setup({ articles: undefined })
    expect(container).toBeInTheDocument()
  })

  it('renders the only three articles', () => {
    setup()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('renders the article as a link', () => {
    setup()
    const allLinks = screen.getAllByRole('link')
    allLinks.map(link => expect(link).toHaveAttribute('href', '/'))
  })

  it('renders article title', () => {
    setup()
    expect(
      screen.getByText('Caffeinated eye contours: everything you need to know')
    ).toBeInTheDocument()
  })

  it('renders article text', () => {
    setup()
    expect(
      screen.getByText(
        'Have you heard of caffeinated eye contours? Eliminating annoying dark circles and bags is one of the objectives. Have you heard of caffeinated eye contours? Eliminating annoying dark circles and bags is one of the objectives'
      )
    ).toBeInTheDocument()
  })
})
