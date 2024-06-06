import { getImageSizes, getSourceSet } from '../helpers'

const contentfulSrc =
  'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png'
const bynderSrc =
  'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml'

describe(getImageSizes, () => {
  it('[getImageSizes] returns an empty string when no width is passed in', () => {
    const result = getImageSizes('contentful')
    expect(result).toBe('')
  })

  it('[getImageSizes] for contentful sources, it returns a single width when only one is passed in', () => {
    const result = getImageSizes('contentful', { xs: 300 })
    expect(result).toBe('300px')
  })

  it('[getImageSizes] for bynder sources, it returns a single width per pixel ratio when only one is passed in', () => {
    const result = getImageSizes('bynder', { xs: 300 })
    expect(result).toBe(
      '(max-width: 375px) 300px, (max-width: 562.5px) 450px, 300px'
    )
  })

  it('[getImageSizes] for bynder sources, it returns the correct set of sizes per pixel ratio', () => {
    const result = getImageSizes('bynder', { xs: 300, sm: 200, md: 400 })
    expect(result).toBe(
      '(max-width: 375px) 300px, (max-width: 768px) 200px, (max-width: 1024px) 400px, (max-width: 562.5px) 450px, (max-width: 1152px) 300px, (max-width: 1536px) 600px, 300px'
    )
  })

  it('[getImageSizes] for contentful sources, it returns the correct set of sizes', () => {
    const result = getImageSizes('contentful', { xs: 300, sm: 400, md: 500 })
    expect(result).toBe(
      '(max-width: 375px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, 300px'
    )
  })
})

describe(getSourceSet, () => {
  it('[getSourceSet] for contentful images, returns the right sourcesets for a single width', () => {
    const result = getSourceSet(contentfulSrc, 'jpeg', 'contentful', 100, {
      xs: 300
    })

    expect(result).toBe(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?w=300&fm=jpeg&q=100'
    )
  })

  it('[getSourceSet] for contentful images, returns the right sourcesets for a multiple widths', () => {
    const result = getSourceSet(contentfulSrc, 'jpeg', 'contentful', 100, {
      xs: 300,
      md: 400
    })

    expect(result).toBe(
      'https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?w=300&fm=jpeg&q=100 300w,https://images.ctfassets.net/7g2w796onies/2EPARcIb9TNbrAHBWMaYlu/5f8a1b93fb6f23a90835cb3cf9c62240/home-s23-ES.png?w=400&fm=jpeg&q=100 400w'
    )
  })

  it('[getSourceSet] for bynder images, returns the right sourcesets for a single width', () => {
    const result = getSourceSet(bynderSrc, 'jpeg', 'bynder', 100, {
      xs: 300
    })

    expect(result).toBe(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpeg&quality=100&io=transform:extend,width:300 300w, https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpeg&quality=100&io=transform:extend,width:450 450w'
    )
  })

  it('[getSourceSet] for bynder images, returns the right sourcesets for a multiple widths', () => {
    const result = getSourceSet(bynderSrc, 'jpeg', 'bynder', 100, {
      xs: 300,
      md: 400
    })

    expect(result).toBe(
      'https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpeg&quality=100&io=transform:extend,width:300 300w,https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpeg&quality=100&io=transform:extend,width:400 400w, https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpeg&quality=100&io=transform:extend,width:450 450w,https://assets.atida.com/transform/1b278864-b266-44b9-bbfb-cad2d2e4d503/Mineral-89-Vichy-50ml?format=jpeg&quality=100&io=transform:extend,width:600 600w'
    )
  })
})
