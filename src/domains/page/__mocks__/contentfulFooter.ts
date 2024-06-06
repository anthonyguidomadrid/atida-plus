import type { DeepPartial } from '@reduxjs/toolkit'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { ContentfulFooter, Footer } from '../types'
import {
  ContentfulIcon,
  ContentfulLink,
  ContentfulMenu
} from '~domains/contentful'

export const contentfulFooter: {
  items: { fields: DeepPartial<ContentfulFooter> }[]
} = {
  items: [
    {
      fields: {
        importantLinks: ({
          fields: {
            id: '',
            title: 'Page Footer Important Links English',
            items: [
              {
                fields: {
                  id: '',
                  link: ({
                    fields: {
                      label: 'some label',
                      url: '/some-url'
                    }
                  } as unknown) as ContentfulLink
                }
              },
              {
                fields: {
                  id: '',
                  link: {
                    fields: {
                      label: 'another label',
                      url: '/another-url'
                    }
                  }
                }
              }
            ]
          }
        } as unknown) as ContentfulMenu,
        serviceContactLinks: ({
          fields: {
            id: '',
            title: 'Service & Contact',
            items: [
              {
                fields: {
                  id: '',
                  link: ({
                    fields: {
                      label: 'Chat with our experts',
                      url: '/chat',
                      icon: {
                        fields: {
                          ref: 'NavAdvice24'
                        }
                      } as ContentfulIcon,
                      content: {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Mo - Fr 9:00 - 18:00',
                                nodeType: 'text'
                              }
                            ],
                            nodeType: BLOCKS.PARAGRAPH
                          }
                        ],
                        nodeType: BLOCKS.DOCUMENT
                      }
                    }
                  } as unknown) as ContentfulLink
                }
              },
              {
                fields: {
                  id: '',
                  link: {
                    fields: {
                      label: 'Call us 0049 1234 56 78',
                      url: '/call-us',
                      icon: {
                        fields: {
                          ref: 'Telephone24'
                        }
                      },
                      content: {
                        data: {},
                        content: [
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Free of charge',
                                nodeType: 'text'
                              }
                            ],
                            nodeType: BLOCKS.PARAGRAPH
                          },
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Mo - Fr 9:00 - 18:00',
                                nodeType: 'text'
                              }
                            ],
                            nodeType: BLOCKS.PARAGRAPH
                          },
                          {
                            data: {},
                            content: [
                              {
                                data: {},
                                marks: [],
                                value: 'Sa 9:00 - 13:00',
                                nodeType: 'text'
                              }
                            ],
                            nodeType: BLOCKS.PARAGRAPH
                          }
                        ],
                        nodeType: BLOCKS.DOCUMENT
                      }
                    }
                  }
                }
              },
              {
                fields: {
                  id: '',
                  link: {
                    fields: {
                      label: 'Let us call you back',
                      url: '/call-you',
                      icon: {
                        fields: {
                          ref: 'Return24'
                        }
                      }
                    }
                  }
                }
              },
              {
                fields: {
                  id: '',
                  link: {
                    fields: {
                      label: 'Mail us',
                      url: '/mail',
                      icon: {
                        fields: {
                          ref: 'Mail24'
                        }
                      }
                    }
                  }
                }
              }
            ]
          }
        } as unknown) as ContentfulMenu,
        termsConditionsLinks: ({
          fields: {
            id: '',
            title: 'Terms and Conditions Links',
            items: [
              {
                fields: {
                  id: '',
                  link: ({
                    fields: {
                      label: 'some label',
                      url: '/some-url'
                    }
                  } as unknown) as ContentfulLink
                }
              },
              {
                fields: {
                  id: '',
                  link: {
                    fields: {
                      label: 'another label',
                      url: '/another-url'
                    }
                  }
                }
              }
            ]
          }
        } as unknown) as ContentfulMenu,
        providerBlocks: [
          {
            fields: {
              title: 'Secure payment',
              content: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Including billing and pre-payment',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: BLOCKS.PARAGRAPH
                  }
                ],
                nodeType: BLOCKS.DOCUMENT
              },
              icons: [
                {
                  fields: {
                    ref: 'PaymentSepa'
                  }
                },
                {
                  fields: {
                    ref: 'PaymentVisa'
                  }
                },
                {
                  fields: {
                    ref: 'PaymentMastercard'
                  }
                },
                {
                  fields: {
                    ref: 'PaymentPaypal'
                  }
                },
                {
                  fields: {
                    ref: 'PaymentAmazon'
                  }
                },
                {
                  fields: {
                    ref: 'PaymentSofort'
                  }
                }
              ]
            }
          },
          {
            fields: {
              title: 'Fast delivery',
              content: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          'Delivery within 2 days - same day delivery in Berlin',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: BLOCKS.PARAGRAPH
                  }
                ],
                nodeType: BLOCKS.DOCUMENT
              },
              icons: [
                {
                  fields: {
                    ref: 'DeliveryDhl'
                  }
                },
                {
                  fields: {
                    ref: 'DeliveryHermes'
                  }
                }
              ]
            }
          },
          {
            fields: {
              title: 'Trusted shop',
              content: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value:
                          'We only offer secure and trusted payment methods',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: BLOCKS.PARAGRAPH
                  }
                ],
                nodeType: BLOCKS.DOCUMENT
              },
              icons: [
                {
                  fields: {
                    ref: 'QualityETrustedShops'
                  }
                }
              ]
            }
          }
        ],
        copyright: {
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: '',
                  nodeType: 'text'
                },
                {
                  data: {
                    uri: 'https://atida.com/'
                  },
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: '© Atida',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: INLINES.HYPERLINK
                },
                {
                  data: {},
                  marks: [],
                  value: '',
                  nodeType: 'text'
                }
              ],
              nodeType: BLOCKS.PARAGRAPH
            }
          ],
          nodeType: BLOCKS.DOCUMENT
        },
        socialMediaLinks: {
          fields: {
            title: 'Stay connected',
            links: [
              {
                fields: {
                  label: 'Facebook',
                  url: 'https://www.facebook.com/AtidaPT',
                  icon: {
                    fields: {
                      ref: 'Facebook'
                    }
                  } as ContentfulIcon
                }
              }
            ]
          }
        }
      }
    }
  ]
}

export const contentfulFooterNormalized: { footer: Footer } = {
  footer: ({
    copyright: '<p><a href="https://atida.com/">© Atida</a></p>',
    importantLinks: {
      id: '',
      title: 'Page Footer Important Links English',
      items: [
        {
          id: '',
          link: {
            content: '',
            label: 'some label',
            url: '/some-url'
          }
        },
        {
          id: '',
          link: {
            content: '',
            label: 'another label',
            url: '/another-url'
          }
        }
      ]
    },
    providerBlocks: [
      {
        title: 'Secure payment',
        content: '<p>Including billing and pre-payment</p>',
        icons: [
          'PaymentSepa',
          'PaymentVisa',
          'PaymentMastercard',
          'PaymentPaypal',
          'PaymentAmazon',
          'PaymentSofort'
        ]
      },
      {
        title: 'Fast delivery',
        content: '<p>Delivery within 2 days - same day delivery in Berlin</p>',
        icons: ['DeliveryDhl', 'DeliveryHermes']
      },
      {
        title: 'Trusted shop',
        content: '<p>We only offer secure and trusted payment methods</p>',
        icons: ['QualityETrustedShops']
      }
    ],
    serviceContactLinks: {
      id: '',
      title: 'Service & Contact',
      items: [
        {
          id: '',
          link: {
            label: 'Chat with our experts',
            url: '/chat',
            icon: 'NavAdvice24',
            content: '<p>Mo - Fr 9:00 - 18:00</p>'
          }
        },
        {
          id: '',
          link: {
            label: 'Call us 0049 1234 56 78',
            url: '/call-us',
            icon: 'Telephone24',
            content:
              '<p>Free of charge</p><p>Mo - Fr 9:00 - 18:00</p><p>Sa 9:00 - 13:00</p>'
          }
        },
        {
          id: '',
          link: {
            label: 'Let us call you back',
            url: '/call-you',
            icon: 'Return24',
            content: ''
          }
        },
        {
          id: '',
          link: {
            label: 'Mail us',
            url: '/mail',
            icon: 'Mail24',
            content: ''
          }
        }
      ]
    },
    termsConditionsLinks: {
      id: '',
      title: 'Terms and Conditions Links',
      items: [
        {
          id: '',
          link: {
            content: '',
            label: 'some label',
            url: '/some-url'
          }
        },
        {
          id: '',
          link: {
            content: '',
            label: 'another label',
            url: '/another-url'
          }
        }
      ]
    },
    newsletterBlockTitle: '',
    newsletterSellingPoints: [],
    socialMediaLinks: [
      {
        title: 'Stay connected',
        content: '',
        links: [
          {
            label: 'Facebook',
            url: 'https://www.facebook.com/AtidaPT',
            icon: 'Facebook',
            content: ''
          }
        ]
      }
    ]
  } as unknown) as Footer
}
