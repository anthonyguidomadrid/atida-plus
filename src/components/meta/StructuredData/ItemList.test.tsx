import { render } from '@testing-library/react'
import { ItemList } from './ItemList'
import { AlgoliaProduct } from '~domains/product'

const products = ([
  {
    name: 'Acofarderm 750ml Aveia Gel',
    locale: 'pt_PT',
    attributes: {
      url_slug_es_es: 'gel-de-avena-acofarderm-750ml',
      url_slug_pt_pt: 'acofarderm-750ml-aveia-gel',
      image_derivatives: [
        {
          dat_url:
            'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
          derivative_product_high:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product High-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_tile:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Tile-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_medium:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Medium-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_portrait:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Portrait-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_landscape:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Landscape-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_tile_retina:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Tile Retina-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_tile_thumbnail:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Tile Thumbnail-DE24A253-CA2D-4995-B8970C54A47CE976.png'
        }
      ]
    }
  },
  {
    name: 'Acofarderm 750ml Aveia Gel 2',
    locale: 'pt_PT',
    attributes: {
      url_slug_es_es: 'gel-de-avena-acofarderm-750ml',
      url_slug_pt_pt: 'acofarderm-750ml-aveia-gel',
      image_derivatives: [
        {
          dat_url:
            'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
          derivative_product_high:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product High-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_tile:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Tile-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_medium:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Medium-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_portrait:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Portrait-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_landscape:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Landscape-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_tile_retina:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Tile Retina-DE24A253-CA2D-4995-B8970C54A47CE976.png',
          derivative_product_tile_thumbnail:
            'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/87FDB322-A09D-454C-BFABDBF8DC49DA0F/Product Tile Thumbnail-DE24A253-CA2D-4995-B8970C54A47CE976.png'
        }
      ]
    }
  }
] as unknown) as AlgoliaProduct[]

describe(ItemList, () => {
  it('renders scripts', () => {
    const { container } = render(<ItemList products={products} />)
    expect(container.querySelectorAll('script')).toHaveLength(1)
    expect(
      container.querySelector('[data-testid="structured-data"]')
    ).toBeInTheDocument()
  })
})
