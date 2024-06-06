import { loader, contentfulLoader, bynderLoader } from '../loaders'

const contentfulSrc =
  'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png'
const bynderSrc =
  'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml'

describe(loader, () => {
  it('selects the correct loader', () => {
    const result = loader('contentful', 'jpg', contentfulSrc, 100, 100)
    expect(result).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=jpg&q=100'
    )

    const bynderResult = loader('bynder', 'jpg', bynderSrc, 100, 100)
    expect(bynderResult).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpg&io=transform:extend,width:100'
    )
  })
})

describe(contentfulLoader, () => {
  it('creates the correct url for every format', () => {
    const result = contentfulLoader(contentfulSrc, 'jpg', 100, 100)
    expect(result).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=jpg&q=100'
    )

    const result2 = contentfulLoader(contentfulSrc, 'avif', 100, 100)
    expect(result2).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=avif&q=100'
    )

    const result3 = contentfulLoader(contentfulSrc, 'webp', 100, 100)
    expect(result3).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=webp&q=100'
    )
  })

  it('creates the correct url for different compression rates', () => {
    const result = contentfulLoader(contentfulSrc, 'jpg', 100, 100)
    expect(result).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=jpg&q=100'
    )

    const result2 = contentfulLoader(contentfulSrc, 'jpg', 50, 100)
    expect(result2).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=jpg&q=50'
    )
  })

  it('creates the correct url for different widths', () => {
    const result = contentfulLoader(contentfulSrc, 'jpg', 100, 300)
    expect(result).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?&fm=jpg&q=100'
    )
  })

  it('creates the correct url when the height is fixed', () => {
    const result = contentfulLoader(contentfulSrc, 'jpg', 100, 300, 50, true)
    expect(result).toEqual(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?h=50&fm=jpg&q=100'
    )
  })
})

describe(bynderLoader, () => {
  it('creates the correct url for every format', () => {
    const result = bynderLoader(bynderSrc, 'jpg', 100, 100)
    expect(result).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpg&io=transform:extend,width:100'
    )

    const result2 = bynderLoader(bynderSrc, 'avif', 100, 100)
    expect(result2).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=avif&quality=100&io=transform:extend,width:100'
    )

    const result3 = bynderLoader(bynderSrc, 'webp', 100, 100)
    expect(result3).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=webp&quality=100&io=transform:extend,width:100'
    )
  })

  it('creates the correct url for different compression rates', () => {
    const result = bynderLoader(bynderSrc, 'webp', 100, 100)
    expect(result).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=webp&quality=100&io=transform:extend,width:100'
    )

    const result2 = bynderLoader(bynderSrc, 'avif', 50, 100)
    expect(result2).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=avif&quality=50&io=transform:extend,width:100'
    )
  })

  it('creates the correct url for different widths', () => {
    const result = bynderLoader(bynderSrc, 'jpg', 100, 300)
    expect(result).toEqual(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpg&io=transform:extend,width:300'
    )
  })
})
