import {
  algoliaProduct,
  algoliaProductPartial
} from '~domains/product/__mocks__/product'

export const results = {
  results: [
    {
      hits: [algoliaProduct],
      nbHits: 1,
      page: 0,
      nbPages: 1,
      hitsPerPage: 30,
      exhaustiveNbHits: true,
      query: '',
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&hitsPerPage=30&facets=%5B%5D&tagFilters=',
      index: 'product-ecommerce-pt-pt_pt',
      processingTimeMS: 4
    }
  ]
}

export const resultsMultipleProducts = {
  results: [
    {
      hits: [algoliaProduct, algoliaProductPartial],
      nbHits: 2,
      page: 0,
      nbPages: 1,
      hitsPerPage: 30,
      exhaustiveNbHits: true,
      query: '',
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&hitsPerPage=30&facets=%5B%5D&tagFilters=',
      index: 'product-ecommerce-pt-pt_pt',
      processingTimeMS: 4
    }
  ]
}

export const searchResultsMultipleProducts = {
  results: [
    {
      hits: [algoliaProduct, algoliaProductPartial],
      nbHits: 2,
      page: 0,
      nbPages: 1,
      hitsPerPage: 30,
      exhaustiveNbHits: true,
      query: 'some',
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&hitsPerPage=30&facets=%5B%5D&tagFilters=',
      index: 'product-ecommerce-pt-pt_pt',
      processingTimeMS: 4
    }
  ]
}

export const resultSatateWithProducts = {
  results: [
    {
      hits: [
        {
          store: 'PT',
          locale: 'pt_PT',
          sku: '50-61-17-378',
          name:
            'Saco de lavagem com leite solar sensível Apivita FPS50 + após o sol',
          availability: { state: '', updated_at: '' },
          price: {
            currency: 'EUR',
            sale: 1529,
            cost: 1529,
            rrp: 1835
          },
          attributes: {
            ean: '5201279080655',
            brand: {
              code: 'apivita',
              label: 'Apivita'
            },
            id_tax_set: 1,
            usage_notes:
              'Creme Facial Pele Sensível Apivita Suncare com FPS50 50 ml: Aplicar o protetor minutos antes da exposição ao sol. Reaplicar com freqüência.\n\nApivita After Sun Cream Gel Rosto e Corpo Figo e Aloe 100ml: Aplicar em quantidade suficiente para limpar a pele do rosto e corpo após cada exposição solar.',
            description_long:
              'Saco de lavagem com sensível leite solar Apivita FPS50 + após o sol\n\nEsta linda bolsa de higiene consiste em:\n\nCreme facial Apivita Suncare Sensitive Skin SPF50 50 ml\n\nEste protetor solar Apivita foi especialmente desenvolvido para evitar ou aparecer problemas relacionados à exposição prolongada ao sol.\n\nEspecialmente indicado para proteger a pele do rosto.\n\nCom proteção FPS 50 muito alta.\n\nCom filtros UVA / UVB.\n\nPrevine e retarda ou fotoen reforço solar.\n\nApivita Creme Pós-Sol Gel para Rosto e Corpo Figo e Aloe 100ml\n\nDepois do sol com uma textura gel-creme que hidrata e refresca o rosto e corpo após cada exposição ao sol.\n\nFormulado com extrato de própolis patenteado, lavanda marinha, óleo de amêndoa orgânico, extrato de figo, extrato de pepino e água de chá verde, este tratamento é ideal para ser usado como hidratação corporal durante todo ou no verão.\n\nSeu delicioso aroma de verão e sua textura leve e fria farão de sua aplicação um ritual de beleza e cuidado com a pele.\n\n96% de ingredientes naturais.\n\nOferece proteção antioxidante, além de proteção contra fotoenvolvimento e radicais livres, ao mesmo tempo que fortalece a formulação de colágeno e elastina.\n\nSemi-alcalinos, parabenos ou silicones.\n\nO modelo da sacola higiênica será enviado conforme disponibilidade.',
            meta_description: 'Compre After-Sun na farmácia online',
            description_short:
              'Bela bolsa de higiene Apivita com leite solar facial para peles sensíveis e um PRESENTE após o sol. Especialmente indicado para proteger a pele do rosto.'
          },
          enabled: true,
          updated: '2021-04-29T14:16:00+00:00',
          promos: [
            'Jason new rule!',
            '20% from total of the order',
            'Jason 10% off update1'
          ],
          objectID: '50-61-17-378',
          _highlightResult: {
            name: {
              value:
                'Saco de lavagem com leite solar sensível Apivita FPS50 + após o sol',
              matchLevel: 'none',
              matchedWords: []
            },
            attributes: {
              brand: {
                label: {
                  value: 'Apivita',
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
          sku: '765974080762',
          availability: { state: '', updated_at: '' },
          name: 'Avene Cold Cream Dermopan sol 0g',
          price: {
            currency: 'EUR',
            sale: 533,
            cost: 533,
            rrp: 700
          },
          attributes: {
            ean: '3282779254892',
            brand: {
              code: 'avene',
              label: 'Avene'
            },
            id_tax_set: 1,
            meta_title:
              'Comprar: Avene Cold Cream Dermopan sobregraso 100g | MiFarma.pt',
            content_size: {
              unit: 'GRAM',
              amount: 100
            },
            meta_keyword: 'Avene Cold Cream Dermopan sol 0g',
            url_slug_es_es: 'avene-cold-cream-dermopan-sobregraso-100g',
            description_long:
              '<p><b>Avene Cold Cream Dermopan sol 0 gramas</b></p><p> 0 Panlimpas de ervas</p><div id="toc"><h2> Resumo da UE</h2><ul><li class="toclevel-1"> <a href="#w_ventajas"><span class="tocnumber">1</span> <span class="toctext">vantagens</span></a></li><li class="toclevel-1"> <a href="#w_propiedades"><span class="tocnumber">2</span> <span class="toctext">propriedades</span></a></li><li class="toclevel-1"> <a href="#w_composicioacuten"><span class="tocnumber">3</span> <span class="toctext">composição</span></a></li><li class="toclevel-1"> <a href="#w_indicaciones"><span class="tocnumber">4</span> <span class="toctext">direções</span></a></li><li class="toclevel-1"> <a href="#w_consejos-de-uso"><span class="tocnumber">5</span> <span class="toctext">dicas para usar</span></a></li><li class="toclevel-1"> <a href="#w_evaluaciones-cliacutenicas"><span class="tocnumber">6</span> <span class="toctext">avaliações clínicas</span></a></li></ul></div><h3 id="w_ventajas"> Vantagens</h3><p> Especialmente cremoso e levemente perfumado, nosso <b>Dermopan apresenta um creme frio que</b> <b>limpa</b> ou seca suavemente na casca e seca muda, assim como ao ritmo de uma película protetora e muda BOM Gostei.</p><p> Formulado para peles sensíveis, como um filme respeitoso ou hidrolipídico, também previne a tensão e a segurança da pele.</p><p> Por fim, respeito o cabelo ou o pH fisiológico que garante uma tolerância muito boa.</p><p><p> <b>Novo! Espuma muito rápida, mais abundante e cremosa como a Nova Formula fazer sun Dermopan Creme.</b></p><p> <b>Ainda mais Mesmer para compartilhar!</b></p><p><p> Produto não comedogênico e hipoalergênico.</p><p><h3 id="w_propiedades"> Propriedades</h3><ol><li> <b>Protetor e nutritivo:<br></b> Graças à sua riqueza nascida do excesso de peso.</li><li> <b>Anti-irritante e calmante:<br> Graças à abundância de água termal de Avène.</b></li></ol><h3 id="w_composicioacuten"> Composição:</h3><ul><li> <b>Água Termal Avène: calmante, dessensibilizante.</b></li><li> Creme de frutas e ativos nutricionais: nutrem como as cascas utilizadas.</li><li> Limpe bem para evitar tensão.</li></ul><h3 id="w_indicaciones"> Indicações</h3><p> O Creme Dermopan apresenta e cuida da higiene diária que seca a pele e seca a todos: bebês, crianças e adultos.<br><br> Fórmula SUA nova e indicada para higiene facial, corporal e íntima.</p><h3 id="w_consejos-de-uso"> Dicas de uso</h3><p> Ou Dom de Dermopan para creme utilizado na limpeza diária do rosto e do corpo.</p><h3 id="w_evaluaciones-cliacutenicas"> Avaliações Clínicas</h3><p> Fórmula nova fazer sol Dermopan testado frio ânus foi em creme para uma pele sensível, seca, muito seca.</p><ol><li><p> <b>Estudos de tolerância:</b></p><p><p> -Controlado dermatológico, oftalmológico e ginecológico.<br> -em 90 usuários de 3 meses a 70 anos com peeling sensível e reativo.<br> Aproximadamente: 21 dias.<br> <b>Não mencionei nenhuma reação UO aldair de desconforto.</b></p><p><p> Verifique dermatológico - OVR.<br> Em 30 usuários, de 3 meses a anos, cascas como óleo e reagentes.<br> Aproximadamente: 21 dias.<br> <b>Manutenção do pH da casca.</b></p></li></ol><ol><li><p> Uma vez <b>que você</b> Uma <b>Propriedades</b> resultados <b>estéticos e Eficiência</b> TAMBÉM COM Muito were avaliadas crescida:</p><p><br> -Limpe para descascar delicadamente: 97%.<br> -Simples com facilidade: 0%.<br> -Quantidade de espuma satisfatória: 94%.<br> -Bom perfume: 91%.<br> -A flexibilidade e / ou bem - seja enxuto: 94%</p></li></ol>',
            meta_description:
              'Avene Cold Cream Dermopan sol 0 gramas 0 Panlimpas de ervas Resumo da UE 1 vantagens',
            description_short:
              '<p><b>Avene Cold Cream Dermopan</b> é <b>:</b> Pancleaner.</p><p> Casco seco</p>'
          },
          enabled: true,
          updated: '2021-05-17T16:31:58+00:00',
          promos: ['Jason 10% off update1'],
          objectID: '765974080762',
          _highlightResult: {
            name: {
              value:
                'Avene Cold <ais-highlight-0000000000>Cream</ais-highlight-0000000000> Dermopan sol 0g',
              matchLevel: 'partial',
              fullyHighlighted: false,
              matchedWords: ['cream']
            },
            attributes: {
              brand: {
                label: {
                  value: 'Avene',
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
          sku: 'NOSUCO',
          availability: { state: '', updated_at: '' },
          name: 'Solar Stick SPF50 + Capa de Camada BB Suntique 21Gr',
          price: {
            currency: 'EUR',
            sale: 2065,
            cost: 2065,
            rrp: 2200
          },
          attributes: {
            ean: '8809084085680',
            brand: {
              code: 'suntique',
              label: 'Suntique'
            },
            id_tax_set: 1,
            usage_notes:
              '<p>Aplicar 15 minutos antes da exposição ao sol e aplicar novamente a cada 3 horas.</p>',
            url_slug_es_es: 'stick-solar-spf50-i-m-cover-bb-suntique-21gr',
            url_slug_pt_pt: 'solar-stick-spf50-capa-de-camada-bb-suntique-21gr',
            description_long:
              '<p>Este <b>protetor solar SPF50 +</b> que funciona como um BB cream e primer. Vista levemente com casca para cobrir perfeitamente manchas e pequenas imperfeições.</p><p> Unifique ou beba enquanto hidrata e amacia a pele, graças à sua fórmula com extrato de brilho asiático.</p><p> Matifique o rosto para evitar o aparecimento de brilho ao longo do dia.</p><p> Adequado para todos os <b>tipos de lutas</b> .</p>',
            description_short:
              '<p>Creme BB em bastão com FPS50 +, ideal para unificar ou tirar a pele e protegê-la do sol, prevenindo ou pré-cozendo.</p>'
          },
          enabled: true,
          updated: '2021-05-17T16:30:22+00:00',
          promos: ['Jason 10% off update1'],
          objectID: 'NOSUCO',
          _highlightResult: {
            name: {
              value:
                'Solar Stick SPF50 + Capa de Camada BB <ais-highlight-0000000000>Sun</ais-highlight-0000000000>tique 21Gr',
              matchLevel: 'partial',
              fullyHighlighted: false,
              matchedWords: ['sun']
            },
            attributes: {
              brand: {
                label: {
                  value:
                    '<ais-highlight-0000000000>Sun</ais-highlight-0000000000>tique',
                  matchLevel: 'partial',
                  fullyHighlighted: false,
                  matchedWords: ['sun']
                }
              }
            }
          }
        },
        {
          store: 'PT',
          locale: 'pt_PT',
          sku: 'LL10109A240',
          availability: { state: '', updated_at: '' },
          name:
            'Fluido protetor de cor antienvelhecimento Lierac Sunissime FPS30 40ml',
          price: {
            currency: 'EUR',
            sale: 1853,
            cost: 1853,
            rrp: 2990
          },
          attributes: {
            ean: '3508240006457',
            brand: {
              code: 'lierac',
              label: 'Lierac'
            },
            id_tax_set: 1,
            usage_notes:
              'Antes da exposição ao sol, aplicar além do creme de dia em todo o rosto e decote. Não deixa riscos ou marcas. Repita a aplicação a cada duas horas em caso de exposição solar direta.',
            description_long:
              'Lierac Sunissime SPF30 40ml Fluido protetor de corrosão anti-incrustante\n\nEste BB Cream com FPS30 ajuda a unificar ou tirar a pele, dando-lhe luminosidade e um belo efeito.\n\nContém ácido hialurônico que hidrata a pele e ajuda a preencher como linhas de expressão e rugas.\n\nTambém exerce uma poderosa ação antioxidante, prevenindo ou envenenando a pele pelos fios de cabelo de radicais livres.\n\nAjuda a obter um bronzeado bonito e uniforme com manchas escuras.\n\nSeus pigmentos dourados são adequados para todas as toneladas.\n\nSunissime, anteriormente Sunific, é a nova gama solar de Lierac. Fotoprotetores que combinam princípios ativos antienvelhecimento, protetores e reparadores exclusivos para dois danos solares.',
            meta_description: 'Compre maquiagem em farmácia online',
            description_short:
              'Protetor solar com cor e FPS 30, ideal para unificar o tom da tez e mostrar um belo tom dourado. Contém ácido hialurônico que hidrata a pele e ajuda a preencher as linhas de expressão e rugas.'
          },
          enabled: true,
          updated: '2021-04-29T14:15:51+00:00',
          promos: ['Jason 10% off update1'],
          objectID: 'LL10109A240',
          _highlightResult: {
            name: {
              value:
                'Fluido protetor de cor antienvelhecimento Lierac <ais-highlight-0000000000>Sun</ais-highlight-0000000000>issime FPS30 40ml',
              matchLevel: 'partial',
              fullyHighlighted: false,
              matchedWords: ['sun']
            },
            attributes: {
              brand: {
                label: {
                  value: 'Lierac',
                  matchLevel: 'none',
                  matchedWords: []
                }
              }
            }
          }
        }
      ],
      nbHits: 4,
      page: 0,
      nbPages: 1,
      hitsPerPage: 15,
      exhaustiveNbHits: true,
      query: 'cream sun',
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&hitsPerPage=15&filters=&query=cream%20sun&page=0&facets=%5B%5D&tagFilters=',
      index: 'product-ecommerce-pt-pt_pt',
      processingTimeMS: 1
    }
  ]
}

export const resultSatateWithNoProducts = {
  results: [
    {
      hits: [],
      nbHits: 0,
      page: 0,
      nbPages: 0,
      hitsPerPage: 15,
      exhaustiveNbHits: true,
      query: 'creamtyutyu',
      params:
        'highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&hitsPerPage=15&filters=&query=creamtyutyu&page=0&facets=%5B%5D&tagFilters=',
      index: 'product-ecommerce-pt-pt_pt',
      processingTimeMS: 2
    }
  ]
}
