import { SHIPMENT_STATUSES } from '~config/constants/shipment-status'
import { InfoLabelEnum } from '~domains/product'
import { OrderHistorySortedDates } from '../types'

export const orderHistoryWithMixedStatuses: OrderHistorySortedDates[] = [
  {
    date: '1 de octubre de 2021',
    unFormattedDate: '01-10-2021',
    orderHistory: [
      {
        type: 'orders',
        id: 'PT--8788',
        links: {
          self:
            'http://glue-es-spryker.dev.atida.com/orders/PT--8724?page[limit]=5&page[offset]=0&sort=-created_at'
        },
        attributes: {
          items: [
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '1 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '2 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '3 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '4 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '5 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '6 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '7 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '8 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '9 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            },
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: '10 - Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            }
          ],
          createdAt: '2021-10-01 07:46:50.891361',
          currencyIsoCode: 'EUR',
          priceMode: 'GROSS_MODE',
          totals: {
            expenseTotal: 399,
            discountTotal: 0,
            taxTotal: 225,
            subtotal: 860,
            grandTotal: 1259,
            canceledTotal: 0,
            remunerationTotal: 0,
            surchargeTotal: 0,
            shippingTotal: 0
          },
          status: [
            {
              name: 'exported',
              displayName: 'oms.state.exported'
            }
          ],
          shipments: [
            {
              shipmentStatus: null,
              estimatedDeliveryDate: null,
              trackingLink: null,
              maxDeliveryDays: 3,
              minDeliveryDays: 1,
              erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
              erpTrackingUrl: 'some-tracking-url',
              erpTrackingReference: 'some-tracking-url'
            }
          ],
          productDiscounts: [],
          calculatedDiscounts: []
        },
        maxProductsIndex: 7
      },
      {
        type: 'orders',
        id: 'PT--8724',
        links: {
          self:
            'http://glue-es-spryker.dev.atida.com/orders/PT--8724?page[limit]=5&page[offset]=0&sort=-created_at'
        },
        attributes: {
          items: [
            {
              quantity: 1,
              sku: '989525552742',
              unitGrossPrice: 860,
              sumGrossPrice: 860,
              isPromo: false,
              metadata: {
                id: '989525552742',
                name: 'Sebamed Desodorante Fresh Roll-On 50 ml',
                enabled: true,
                gtin: '4103040120168',
                url: '/sebamed-desodorante-fresh-roll-on-50-ml',
                alternativeUrls: {
                  'pt-pt': 'desodorizante-roll-on-sebamed-50-ml',
                  'es-es': 'sebamed-desodorante-fresh-roll-on-50-ml'
                },
                categories: {
                  lvl2: ['skin_body_care_deodorant'],
                  lvl0: ['personal_care'],
                  lvl1: ['personal_care_skin_body_care']
                },
                brand: {
                  code: 'sebamed',
                  label: 'Sebamed'
                },
                format: {
                  code: 'roll_on',
                  label: 'Roll-on'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Medium-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Retina-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product High-AC51038B-CC34-45A7-BBD612E71AB16772.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/BBDD9287-0104-4ED4-AA93872172A77B19/Product Tile Thumbnail-AC51038B-CC34-45A7-BBD612E71AB16772.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product High-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/73105296-93C0-4AE7-B5A4107BA5697713/Product Tile Thumbnail-7F58D5FA-7248-4D8B-BEFDF54AA70DD660.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product High-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/44187DF8-5B2C-4285-8AABE72224B14ED7/Product Tile Thumbnail-B9B40D5B-DEBE-4394-A0E0EDFB25F2430B.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product High-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/A45EA2B2-271A-4228-AA7F0FC96E65DA95/Product Tile Thumbnail-8DE18DDF-CA9E-42A4-98B29EDCEAAC0F69.png'
                  }
                ],
                description:
                  "''Sebamed Desodorante Fresh Roll-On 50 ml\n\nDesodorante indicado para evitar el mal olor, ya que previene la degradación bacteriana del sudor.\n\nBENEFICIOS\n\n- El pH ácido impide la proliferación incontrolada de microorganismos causantes de irritaciones y alergias.\n\n- Prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones.\n\n- No obstruye las glándulas sudoríparas.\n\n- Protege la barrera natural de la piel.\n\n- pH 5.5\n\n- Aroma fresco y agradable.\n\n- Sin conservantes ni aditivos colorantes.",
                shortDescription:
                  'Desodorante indicado para la prevención del mal olor corporal en pieles sensibles e intolerantes y con irritaciones. ¡Adiós al mal olor!\n\n- Formato roll-on.',
                metaTitle:
                  'Comprar: Sebamed Desodorante Fresh Roll-On 50 ml | Mifarma.es',
                metaDescription:
                  'Házte con Sebamed Desodorante Fresh Roll-On 50 ml al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplicar después de la ducha sobre piel limpia y seca.',
                price: {
                  currency: 'EUR',
                  value: 872
                },
                rrp: {
                  value: 1065,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-18%'
                  }
                ]
              },
              id: '989525552742'
            }
          ],
          createdAt: '2021-10-01 07:46:50.891361',
          currencyIsoCode: 'EUR',
          priceMode: 'GROSS_MODE',
          totals: {
            expenseTotal: 399,
            discountTotal: 0,
            taxTotal: 225,
            subtotal: 860,
            grandTotal: 1259,
            canceledTotal: 0,
            remunerationTotal: 0,
            surchargeTotal: 0,
            shippingTotal: 0
          },
          status: [
            {
              name: 'exported',
              displayName: 'oms.state.exported'
            }
          ],
          shipments: [
            {
              shipmentStatus: null,
              estimatedDeliveryDate: null,
              trackingLink: null,
              maxDeliveryDays: 3,
              minDeliveryDays: 1,
              erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
              erpTrackingUrl: 'some-tracking-url',
              erpTrackingReference: 'some-tracking-url'
            }
          ],
          productDiscounts: [],
          calculatedDiscounts: []
        },
        maxProductsIndex: 7
      },
      {
        type: 'orders',
        id: 'PT--8723',
        links: {
          self:
            'http://glue-es-spryker.dev.atida.com/orders/PT--8723?page[limit]=5&page[offset]=0&sort=-created_at'
        },
        attributes: {
          items: [
            {
              quantity: 1,
              sku: '846502351931',
              unitGrossPrice: 942,
              sumGrossPrice: 942,
              isPromo: false,
              metadata: {
                id: '846502351931',
                name: 'Bioderma Atoderm Crema 500ml con Dispensador',
                enabled: true,
                gtin: '3401399373466',
                url: '/bioderma-atoderm-crema-500ml-con-dispensador',
                alternativeUrls: {
                  'pt-pt': 'bioderma-atoderm-creme-com-doseador-500ml',
                  'es-es': 'bioderma-atoderm-crema-500ml-con-dispensador'
                },
                categories: {
                  lvl2: ['body_altered_skin', 'body_hydration'],
                  lvl0: ['beauty', 'beauty'],
                  lvl1: ['beauty_body', 'beauty_body']
                },
                brand: {
                  code: 'bioderma',
                  label: 'Bioderma'
                },
                format: {
                  code: 'cream',
                  label: 'Crema'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile Thumbnail-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Medium-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product High-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile Retina-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product High-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile Thumbnail-A1DBAB42-6A9B-4F59-93594D0DD0118946.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/52761913-7700-410A-9EE440CCEFE7D70D/Product High-9D7BB545-B774-4468-A4C3F750ED1D75D6.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/52761913-7700-410A-9EE440CCEFE7D70D/Product Tile Thumbnail-9D7BB545-B774-4468-A4C3F750ED1D75D6.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/33D366C0-7B0C-43B9-9CCBF86D8EE43A15/Product High-7BC5623E-A0B2-4560-BDE4BA2814A0EDC1.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/33D366C0-7B0C-43B9-9CCBF86D8EE43A15/Product Tile Thumbnail-7BC5623E-A0B2-4560-BDE4BA2814A0EDC1.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/AD8BD793-ACB7-455F-A9D1989BB23E6C04/Product High-31D957B2-5DA8-4EAB-9CCD5F09684174E5.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/AD8BD793-ACB7-455F-A9D1989BB23E6C04/Product Tile Thumbnail-31D957B2-5DA8-4EAB-9CCD5F09684174E5.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/53BDB6DF-121C-485F-A9E7DE082AE9258C/Product High-844C8B53-BEC4-48CA-86702EC1ADFFD06F.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/53BDB6DF-121C-485F-A9E7DE082AE9258C/Product Tile Thumbnail-844C8B53-BEC4-48CA-86702EC1ADFFD06F.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FDBFC443-63F9-4B1C-BF3B240609447D46/Product High-83A8BEA3-9307-4B96-B7461F88E22BA8E6.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FDBFC443-63F9-4B1C-BF3B240609447D46/Product Tile Thumbnail-83A8BEA3-9307-4B96-B7461F88E22BA8E6.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product Tile Thumbnail-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png'
                  }
                ],
                description:
                  "''Bioderma Atoderm Crema 500ml con Dispensador\n\nCuidado complementario para el cuerpo: Hidrata y restablece el confort cutáneo.\n\nIndicada para pieles con psoriasis.\n\nCuidado barrera diario reengrasante, reestructurante e hidratante.\n\nFrena la penetración de agentes irritantes favorecida por los estados de sequedad crónica.\n\nCuidado intensivo diario de protección, reengrasante e hidratante.\n\nGracias a sus activos reengransantes y reestructurantes, Atoderm Crema refuerza la estructura de la barrera cutánea y, de este modo, frena la penetración de agentes irritantes.\n\nEnriquecida con agentes humectantes y antideshidratantes, Atoderm Crema fija el agua en las capas superiores de la epidermis y evita su evaporación.\n\nIndicada para usar en rostro y cuerpo de lactantes, niños y adultos.\n\nLa piel perfectamente hidratada, más resistente, recobra suavidad y flexibilidad.\n\nFórmula sin perfume.\n\nFrasco con bomba dosificadora 500 ml.",
                shortDescription:
                  'Cuidado complementario para el cuerpo que hidrata y restablece el confort cutáneo. Indicada para pieles con psoriasis.',
                metaTitle:
                  'Comprar: Bioderma Atoderm Crema 500ml con Dispensador | Mifarma.es',
                metaDescription:
                  'Házte con Bioderma Atoderm Crema 500ml con Dispensador al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplique Atoderm Crema 1 ó 2 veces al día sobre la piel después de haberla limpiado con Atoderm Gel Douceur y seque delicadamente.',
                price: {
                  currency: 'EUR',
                  value: 986
                },
                rrp: {
                  value: 1495,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-34%'
                  }
                ]
              },
              id: '846502351931'
            }
          ],
          createdAt: '2021-10-01 07:41:49.623969',
          currencyIsoCode: 'EUR',
          priceMode: 'GROSS_MODE',
          totals: {
            expenseTotal: 399,
            discountTotal: 0,
            taxTotal: 240,
            subtotal: 942,
            grandTotal: 1341,
            canceledTotal: 0,
            remunerationTotal: 0,
            surchargeTotal: 0
          },
          status: [
            {
              name: 'pending',
              displayName: 'oms.state.pending'
            }
          ],
          shipments: [
            {
              shipmentStatus: null,
              estimatedDeliveryDate: null,
              trackingLink: null,
              maxDeliveryDays: 3,
              minDeliveryDays: 1,
              erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
              erpTrackingUrl: 'some-tracking-url',
              erpTrackingReference: 'some-tracking-url'
            }
          ],
          productDiscounts: [],
          calculatedDiscounts: []
        },
        maxProductsIndex: 7
      }
    ]
  }
]

export const orderHistoryOnlyPending: OrderHistorySortedDates[] = [
  {
    date: '1 de octubre de 2021',
    unFormattedDate: '01-10-2021',
    orderHistory: [
      {
        type: 'orders',
        id: 'PT--8723',
        links: {
          self:
            'http://glue-es-spryker.dev.atida.com/orders/PT--8723?page[limit]=5&page[offset]=0&sort=-created_at'
        },
        attributes: {
          items: [
            {
              quantity: 1,
              sku: '846502351931',
              unitGrossPrice: 942,
              sumGrossPrice: 942,
              isPromo: false,
              metadata: {
                id: '846502351931',
                name: 'Bioderma Atoderm Crema 500ml con Dispensador',
                enabled: true,
                gtin: '3401399373466',
                url: '/bioderma-atoderm-crema-500ml-con-dispensador',
                alternativeUrls: {
                  'pt-pt': 'bioderma-atoderm-creme-com-doseador-500ml',
                  'es-es': 'bioderma-atoderm-crema-500ml-con-dispensador'
                },
                categories: {
                  lvl2: ['body_altered_skin', 'body_hydration'],
                  lvl0: ['beauty', 'beauty'],
                  lvl1: ['beauty_body', 'beauty_body']
                },
                brand: {
                  code: 'bioderma',
                  label: 'Bioderma'
                },
                format: {
                  code: 'cream',
                  label: 'Crema'
                },
                thumbnailImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile Thumbnail-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                mediumImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Medium-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                largeImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product High-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                productTileImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                productTileRetinaImage:
                  'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile Retina-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                images: [
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product High-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product High-A1DBAB42-6A9B-4F59-93594D0DD0118946.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/16514DAD-F55D-47E3-A8C4A2602475DA38/Product Tile Thumbnail-A1DBAB42-6A9B-4F59-93594D0DD0118946.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/52761913-7700-410A-9EE440CCEFE7D70D/Product High-9D7BB545-B774-4468-A4C3F750ED1D75D6.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/52761913-7700-410A-9EE440CCEFE7D70D/Product High-9D7BB545-B774-4468-A4C3F750ED1D75D6.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/52761913-7700-410A-9EE440CCEFE7D70D/Product Tile Thumbnail-9D7BB545-B774-4468-A4C3F750ED1D75D6.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/33D366C0-7B0C-43B9-9CCBF86D8EE43A15/Product High-7BC5623E-A0B2-4560-BDE4BA2814A0EDC1.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/33D366C0-7B0C-43B9-9CCBF86D8EE43A15/Product High-7BC5623E-A0B2-4560-BDE4BA2814A0EDC1.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/33D366C0-7B0C-43B9-9CCBF86D8EE43A15/Product Tile Thumbnail-7BC5623E-A0B2-4560-BDE4BA2814A0EDC1.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/AD8BD793-ACB7-455F-A9D1989BB23E6C04/Product High-31D957B2-5DA8-4EAB-9CCD5F09684174E5.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/AD8BD793-ACB7-455F-A9D1989BB23E6C04/Product High-31D957B2-5DA8-4EAB-9CCD5F09684174E5.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/AD8BD793-ACB7-455F-A9D1989BB23E6C04/Product Tile Thumbnail-31D957B2-5DA8-4EAB-9CCD5F09684174E5.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/53BDB6DF-121C-485F-A9E7DE082AE9258C/Product High-844C8B53-BEC4-48CA-86702EC1ADFFD06F.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/53BDB6DF-121C-485F-A9E7DE082AE9258C/Product High-844C8B53-BEC4-48CA-86702EC1ADFFD06F.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/53BDB6DF-121C-485F-A9E7DE082AE9258C/Product Tile Thumbnail-844C8B53-BEC4-48CA-86702EC1ADFFD06F.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FDBFC443-63F9-4B1C-BF3B240609447D46/Product High-83A8BEA3-9307-4B96-B7461F88E22BA8E6.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FDBFC443-63F9-4B1C-BF3B240609447D46/Product High-83A8BEA3-9307-4B96-B7461F88E22BA8E6.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/FDBFC443-63F9-4B1C-BF3B240609447D46/Product Tile Thumbnail-83A8BEA3-9307-4B96-B7461F88E22BA8E6.png'
                  },
                  {
                    productDatImage:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productHigh:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product High-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png',
                    productTileThumbnail:
                      'https://d2csxpduxe849s.cloudfront.net/media/69D4BCE3-4708-4510-997B0D467684538A/74DD1FC8-17E2-410F-9BFE1AC507E7AF17/Product Tile Thumbnail-BD3486C8-DD9F-4F8E-BAE01EDC2FC8FC94.png'
                  }
                ],
                description:
                  "''Bioderma Atoderm Crema 500ml con Dispensador\n\nCuidado complementario para el cuerpo: Hidrata y restablece el confort cutáneo.\n\nIndicada para pieles con psoriasis.\n\nCuidado barrera diario reengrasante, reestructurante e hidratante.\n\nFrena la penetración de agentes irritantes favorecida por los estados de sequedad crónica.\n\nCuidado intensivo diario de protección, reengrasante e hidratante.\n\nGracias a sus activos reengransantes y reestructurantes, Atoderm Crema refuerza la estructura de la barrera cutánea y, de este modo, frena la penetración de agentes irritantes.\n\nEnriquecida con agentes humectantes y antideshidratantes, Atoderm Crema fija el agua en las capas superiores de la epidermis y evita su evaporación.\n\nIndicada para usar en rostro y cuerpo de lactantes, niños y adultos.\n\nLa piel perfectamente hidratada, más resistente, recobra suavidad y flexibilidad.\n\nFórmula sin perfume.\n\nFrasco con bomba dosificadora 500 ml.",
                shortDescription:
                  'Cuidado complementario para el cuerpo que hidrata y restablece el confort cutáneo. Indicada para pieles con psoriasis.',
                metaTitle:
                  'Comprar: Bioderma Atoderm Crema 500ml con Dispensador | Mifarma.es',
                metaDescription:
                  'Házte con Bioderma Atoderm Crema 500ml con Dispensador al mejor precio, marcas originales y en 24 horas en la farmacia online MiFarma.es',
                usageNotes:
                  'Aplique Atoderm Crema 1 ó 2 veces al día sobre la piel después de haberla limpiado con Atoderm Gel Douceur y seque delicadamente.',
                price: {
                  currency: 'EUR',
                  value: 986
                },
                rrp: {
                  value: 1495,
                  currency: 'EUR'
                },
                availability: 'AVAILABLE',
                labels: [
                  {
                    type: InfoLabelEnum.Promotion,
                    label: 'campaign-promo.gift-product.iliana.gift.code'
                  },
                  {
                    type: InfoLabelEnum.Discount,
                    label: '-34%'
                  }
                ]
              },
              id: '846502351931'
            }
          ],
          createdAt: '2021-10-01 07:41:49.623969',
          currencyIsoCode: 'EUR',
          priceMode: 'GROSS_MODE',
          totals: {
            expenseTotal: 399,
            discountTotal: 0,
            taxTotal: 240,
            subtotal: 942,
            grandTotal: 1341,
            canceledTotal: 0,
            remunerationTotal: 0,
            surchargeTotal: 0
          },
          status: [
            {
              name: 'pending',
              displayName: 'oms.state.pending'
            }
          ],
          shipments: [
            {
              shipmentStatus: null,
              estimatedDeliveryDate: null,
              trackingLink: null,
              maxDeliveryDays: 3,
              minDeliveryDays: 1,
              erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
              erpTrackingUrl: 'some-tracking-url',
              erpTrackingReference: 'some-tracking-url'
            }
          ],
          productDiscounts: [],
          calculatedDiscounts: []
        },
        maxProductsIndex: 7
      }
    ]
  }
]

export const orderHistoryWithoutItems: OrderHistorySortedDates[] = [
  {
    date: '1 de octubre de 2021',
    unFormattedDate: '01-10-2021',
    orderHistory: [
      {
        type: 'orders',
        id: 'PT--8723',
        links: {
          self:
            'http://glue-es-spryker.dev.atida.com/orders/PT--8723?page[limit]=5&page[offset]=0&sort=-created_at'
        },
        attributes: {
          items: [],
          createdAt: '2021-02-24T10:07:27+00:00',
          currencyIsoCode: 'EUR',
          priceMode: 'GROSS_MODE',
          totals: {
            expenseTotal: 399,
            discountTotal: 0,
            taxTotal: 240,
            subtotal: 942,
            grandTotal: 1341,
            canceledTotal: 0,
            remunerationTotal: 0,
            surchargeTotal: 0
          },
          status: [
            {
              name: 'pending',
              displayName: 'oms.state.pending'
            }
          ],
          shipments: [
            {
              shipmentStatus: null,
              estimatedDeliveryDate: null,
              trackingLink: null,
              maxDeliveryDays: 3,
              minDeliveryDays: 1,
              erpShipmentStatus: 'in_progres' as typeof SHIPMENT_STATUSES[number],
              erpTrackingUrl: 'some-tracking-url',
              erpTrackingReference: 'some-tracking-url'
            }
          ],
          productDiscounts: [],
          calculatedDiscounts: []
        },
        maxProductsIndex: 7
      }
    ]
  }
]
