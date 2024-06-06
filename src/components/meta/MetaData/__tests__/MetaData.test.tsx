import { screen } from '@testing-library/react'
import { MetaData, MetaDataProps } from '../MetaData'
import { useRouter } from 'next/router'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'

describe(MetaData, () => {
  const defaultProps = {
    title: 'Test title',
    description: 'Test meta description',
    keywords: 'Test keywords',
    image: 'Test image URL',
    canonicalHref: 'passed-in-canonical-href',
    query: {
      p: 'p=3'
    }
  }

  const setup = (props: Partial<MetaDataProps> = {}, featureFlags = {}) =>
    renderWithStoreAndFeatureFlags(<MetaData {...props} />, {
      featureFlags
    })

  it('renders and does not break when no props are passed', () => {
    const { container } = setup()
    expect(container).toBeInTheDocument()
  })

  it('renders default meta data when no props are passed', () => {
    const { container } = setup()
    expect(screen.getByText('Atida Online Pharmacy')).toBeInTheDocument()
    expect(container.querySelector('[property="og:title"]')).toHaveAttribute(
      'content',
      'Atida Online Pharmacy'
    )
    expect(
      container.querySelector('[name="description"]')
    ).not.toBeInTheDocument()
    expect(container.querySelector('[name="keywords"]')).not.toBeInTheDocument()
    expect(
      container.querySelector('[property="og:description"]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[property="og:image"]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[name="facebook-domain-verification"]')
    ).toHaveAttribute('content', '76ly6tnbmndfxe8bpoikz61hz7xxpz')
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/en-gb'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/en-gb'
    )
  })

  it('renders props meta data', () => {
    const { container } = setup(defaultProps)
    expect(screen.getByText('Test title')).toBeInTheDocument()
    expect(container.querySelector('[property="og:title"]')).toHaveAttribute(
      'content',
      'Test title'
    )
    expect(container.querySelector('[name="description"]')).toHaveAttribute(
      'content',
      'Test meta description'
    )
    expect(container.querySelector('[name="keywords"]')).toHaveAttribute(
      'content',
      'Test keywords'
    )
    expect(
      container.querySelector('[property="og:description"]')
    ).toHaveAttribute('content', 'Test meta description')
    expect(container.querySelector('[property="og:image"]')).toHaveAttribute(
      'content',
      'Test image URL'
    )
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/en-gb/passed-in-canonical-href'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/en-gb/passed-in-canonical-href'
    )
  })

  it('renders correct canonical link from prop with prevailing slash', () => {
    const mockProps: MetaDataProps = { ...defaultProps }
    mockProps.canonicalHref = '/passed-in-canonical-href'
    const { container } = setup(mockProps)
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/en-gb/passed-in-canonical-href'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/en-gb/passed-in-canonical-href'
    )
  })

  it('does note render canonical link or meta opg:url', () => {
    const mockProps: MetaDataProps = defaultProps
    mockProps.hideCanonicalLink = true
    mockProps.renderMetaOgUrl = false
    const { container } = setup(mockProps)
    expect(container.querySelector('[rel="canonical"]')).not.toBeInTheDocument()
    expect(
      container.querySelector('[property="og:url"]')
    ).not.toBeInTheDocument()
  })

  it('renders correct canonical link for the home page', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt'
    )
  })

  it('renders correct canonical link for the home page', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/?testparam1=value1',
      locale: 'pt-pt'
    }))

    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt'
    )
  })

  it('renders correct canonical link without parameters for the home page when asPath starts with locale', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: 'pt-pt?testparam1=value1',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt'
    )
  })

  it('renders correct canonical link without parameters for the home page when asPath starts with /locale', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/pt-pt?testparam1=value1',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt'
    )
  })

  it('renders correct canonical link for page other than home', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/test',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt/test'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt/test'
    )
  })

  it('renders correct canonical link for nested page', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/test1/test2',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt/test1/test2'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt/test1/test2'
    )
  })

  it('renders correct canonical link for pages without parameters', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/test?param1=test1&param2=test2',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt/test'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt/test'
    )
  })

  it('renders correct canonical link without parameters', () => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/test1/test2?param1=test1&param2=test2',
      locale: 'pt-pt'
    }))
    const { container } = setup()
    expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
    expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
      'href',
      'somehost.com/pt-pt/test1/test2'
    )
    expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
    expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
      'content',
      'somehost.com/pt-pt/test1/test2'
    )
  })

  describe('indexing', () => {
    it('allows indexing by default', () => {
      const { container } = setup({ indexation: 'index' })
      expect(container.querySelector('[name="robots"]')).toHaveAttribute(
        'content',
        'index'
      )
      expect(container.querySelector('[name="googlebot"]')).toHaveAttribute(
        'content',
        'index'
      )
    })
    it('disables indexing when flag is off', () => {
      const { container } = setup(
        { indexation: 'index' },
        {
          [FeatureFlag.SEO_DISABLE_INDEXING]: true,
          [FeatureFlag.SEO_GET_NO_INDEX_AND_NO_FOLLOW_TAGS_FROM_CONTENTFUL]: false
        }
      )

      expect(container.querySelector('[name="robots"]')).toHaveAttribute(
        'content',
        'noindex'
      )
      expect(container.querySelector('[name="googlebot"]')).toHaveAttribute(
        'content',
        'noindex'
      )
    })

    it('sets index and follow if noIndex and noFollow are not passed as prop', () => {
      const { container } = setup(
        { indexation: 'index' },
        {
          [FeatureFlag.SEO_GET_NO_INDEX_AND_NO_FOLLOW_TAGS_FROM_CONTENTFUL]: true
        }
      )
      expect(container.querySelector('[name="robots"]')).toHaveAttribute(
        'content',
        'index, follow'
      )
      expect(container.querySelector('[name="googlebot"]')).toHaveAttribute(
        'content',
        'index, follow'
      )
    })

    it('sets noindex and nofollow when passed', () => {
      const { container } = setup(
        { noIndex: true, noFollow: true },
        {
          [FeatureFlag.SEO_GET_NO_INDEX_AND_NO_FOLLOW_TAGS_FROM_CONTENTFUL]: true
        }
      )
      expect(container.querySelector('[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, nofollow'
      )
      expect(container.querySelector('[name="googlebot"]')).toHaveAttribute(
        'content',
        'noindex, nofollow'
      )
    })

    it('overrides default canonicalHref with canonicalHrefOverride but does not override og:url', () => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: '/test1/test2',
        locale: 'pt-pt'
      }))
      const { container } = setup({ canonicalHrefOverride: 'bless-you' })
      expect(container.querySelector('[rel="canonical"]')).toBeInTheDocument()
      expect(container.querySelector('[rel="canonical"]')).toHaveAttribute(
        'href',
        'somehost.com/pt-pt/bless-you'
      )
      expect(container.querySelector('[property="og:url"]')).toBeInTheDocument()
      expect(container.querySelector('[property="og:url"]')).toHaveAttribute(
        'content',
        'somehost.com/pt-pt/test1/test2'
      )
    })
  })
})
