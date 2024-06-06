const faker = require('faker')
const firstSku = faker.datatype.number(100000000, 900000000)
const secondSku = faker.datatype.number(100000000, 900000000)

export const productResults = {
  results: [
    {
      hits: [
        {
          store: 'PT',
          locale: 'pt_PT',
          sku: firstSku,
          name: `First Product ${faker.datatype.number()}`,
          price: { currency: 'EUR', cost: 500, sale: 1000, rrp: 1500 },
          attributes: {
            ean: '2100000024476',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'envelopes', label: 'Envelopes' },
            categories: {
              lvl0: ['vitamins_supplements'],
              lvl1: ['vitamins_supplements_multivitamins']
            },
            id_tax_set: 1,
            meta_title: 'meta title PT',
            sku_legacy: '95832',
            uk_hs_code: 330590,
            usage_notes:
              '<p>Dissolva ou contenha a saqueta em 250 ml de água, leia ou adicione à mistura antes de subtrair uma mistura homogênea.</p>',
            content_size: { unit: 'GRAM', amount: '32.0000' },
            gross_weight: { unit: 'KILOGRAM', amount: '0.0300' },
            meta_keyword: 'meta title PT',
            sku_supplier: '95832',
            vat_tax_class: { code: '6', label: '6' },
            url_slug_es_es: 'spiru-tein-cappuccino-natures-plus-sobre-32-g',
            url_slug_pt_pt:
              'cappuccino-spiru-tein-mais-naturezas-cerca-de-32-g',
            asset_image_list: [
              'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/webimage-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
              'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/webimage-EF13AA96-B822-4A24-A43886ADDE42244B.png',
              'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/webimage-849740B4-AED3-4463-97F9556A559E3BEE.png'
            ],
            description_long:
              '<p>First Product Description.</p><p> Fornece vitaminas, minerais, fibras, enzimas e Espirulina, que é um suplemento muito completo.</p><p> Fornece energia e vitalidade todos os dias.</p><p><br></p><p><br></p>',
            is_private_label: { code: 'no', label: 'Não' },
            lifecycle_status: { code: 'active', label: 'Active' },
            meta_description: 'meta description PT',
            description_short: '<p>First Product Description</p>',
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product High-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product Tile-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product Medium-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product Portrait-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product Landscape-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product Tile Retina-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/45C09EFE-2185-412B-B30A74B31977D9BE/Product Tile Thumbnail-1AAE6C4E-1F2F-40CF-9A4B1FB5DE064C46.png'
              },
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product High-EF13AA96-B822-4A24-A43886ADDE42244B.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product Tile-EF13AA96-B822-4A24-A43886ADDE42244B.png',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product Medium-EF13AA96-B822-4A24-A43886ADDE42244B.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product Portrait-EF13AA96-B822-4A24-A43886ADDE42244B.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product Landscape-EF13AA96-B822-4A24-A43886ADDE42244B.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product Tile Retina-EF13AA96-B822-4A24-A43886ADDE42244B.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/8BD88BEC-6FA1-4ACC-A06AD9634A104409/Product Tile Thumbnail-EF13AA96-B822-4A24-A43886ADDE42244B.png'
              },
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product High-849740B4-AED3-4463-97F9556A559E3BEE.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product Tile-849740B4-AED3-4463-97F9556A559E3BEE.png',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product Medium-849740B4-AED3-4463-97F9556A559E3BEE.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product Portrait-849740B4-AED3-4463-97F9556A559E3BEE.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product Landscape-849740B4-AED3-4463-97F9556A559E3BEE.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product Tile Retina-849740B4-AED3-4463-97F9556A559E3BEE.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FAFCE4DD-0CED-4D0D-88AD296F8775EDDC/Product Tile Thumbnail-849740B4-AED3-4463-97F9556A559E3BEE.png'
              }
            ]
          },
          enabled: true,
          created: new Date(faker.date.past()).toISOString(),
          updated: new Date(faker.date.future()).toISOString(),
          promos: [],
          has_promo: false,
          availability: { state: 'AVAILABLE', updated_at: 1626703936 },
          objectID: firstSku,
          _highlightResult: {
            name: {
              value: 'First product PT',
              matchLevel: 'none',
              matchedWords: []
            },
            attributes: {
              brand: {
                label: {
                  value: 'Atida',
                  matchLevel: 'none',
                  matchedWords: []
                }
              }
            }
          }
        },
        {
          store: 'PT',
          locale: 'pt_PT',
          sku: secondSku,
          name: `Second Product ${faker.datatype.number()}`,
          price: { currency: 'EUR', cost: 1000, sale: 2000, rrp: 1500 },
          attributes: {
            ean: '2100000024477',
            brand: { code: 'atida', label: 'Atida' },
            format: { code: 'envelopes', label: 'Envelopes' },
            categories: {
              lvl0: ['vitamins_supplements'],
              lvl1: ['vitamins_supplements_multivitamins']
            },
            id_tax_set: 1,
            asset_image_list: [
              'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/webimage-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
              'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/webimage-BF1A2808-EC7E-457F-9AA9AFE258C61858.png'
            ],
            meta_title: 'meta title PT',
            sku_legacy: '95832',
            uk_hs_code: 330590,
            usage_notes:
              '<p>Dissolva ou contenha a saqueta em 250 ml de água, leia ou adicione à mistura antes de subtrair uma mistura homogênea.</p>',
            content_size: { unit: 'GRAM', amount: '32.0000' },
            gross_weight: { unit: 'KILOGRAM', amount: '0.0300' },
            meta_keyword: 'meta title PT',
            sku_supplier: '95832',
            vat_tax_class: { code: '6', label: '6' },
            url_slug_es_es: 'spiru-tein-cappuccino-natures-plus-sobre-32-g',
            url_slug_pt_pt:
              'cappuccino-spiru-tein-mais-naturezas-cerca-de-32-g',
            image_derivatives: [
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product High-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product Tile-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product Medium-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product Portrait-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product Landscape-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product Tile Retina-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/1BED7CB9-9446-49B0-8759EBB091CB3C48/Product Tile Thumbnail-1B13D22B-C06D-4E00-ACDFAC556A91FD4A.png'
              },
              {
                dat_url:
                  'https://sandbox-atida.bynder.com/transform/db2e62c0-2c32-4e50-bee7-1a7a421323f1/ean_img_8833772266123_0',
                derivative_product_high:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product High-BF1A2808-EC7E-457F-9AA9AFE258C61858.png',
                derivative_product_tile:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product Tile-BF1A2808-EC7E-457F-9AA9AFE258C61858.png',
                derivative_product_medium:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product Medium-BF1A2808-EC7E-457F-9AA9AFE258C61858.png',
                derivative_product_portrait:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product Portrait-BF1A2808-EC7E-457F-9AA9AFE258C61858.png',
                derivative_product_landscape:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product Landscape-BF1A2808-EC7E-457F-9AA9AFE258C61858.png',
                derivative_product_tile_retina:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product Tile Retina-BF1A2808-EC7E-457F-9AA9AFE258C61858.png',
                derivative_product_tile_thumbnail:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/459D14B5-E5AF-4F5E-9372AB25F947A33D/Product Tile Thumbnail-BF1A2808-EC7E-457F-9AA9AFE258C61858.png'
              }
            ],
            description_long:
              '<p>Second Product Description.</p><p> Fornece vitaminas, minerais, fibras, enzimas e Espirulina, que é um suplemento muito completo.</p><p> Fornece energia e vitalidade todos os dias.</p><p><br></p><p><br></p>',
            is_private_label: { code: 'no', label: 'Não' },
            lifecycle_status: { code: 'active', label: 'Active' },
            meta_description: 'meta description PT',
            description_short: '<p>Second Product Description</p>'
          },
          enabled: true,
          created: new Date(faker.date.past()).toISOString(),
          updated: new Date(faker.date.future()).toISOString(),
          objectID: secondSku,
          promos: [],
          has_promo: false,
          availability: { state: 'AVAILABLE', updated_at: 1626703936 },
          _highlightResult: {
            name: {
              value: 'Second product PT',
              matchLevel: 'none',
              matchedWords: []
            },
            attributes: {
              brand: {
                label: {
                  value: 'Atida',
                  matchLevel: 'none',
                  matchedWords: []
                }
              }
            }
          }
        }
      ],
      hitsPerPage: 50,
      index: 'product-ecommerce-pt-pt_pt',
      nbHits: 52,
      nbPages: 2,
      page: 1,
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&hitsPerPage=15&filters=attributes.categories.lvl0%3A%20%22Medicines%22&page=1&facets=%5B%5D&tagFilters=',
      processingTimeMS: 1,
      query: '',
      exhaustiveNbHits: true
    }
  ]
}
