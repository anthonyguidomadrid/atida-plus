import { BLOCKS } from '@contentful/rich-text-types'
import type { DeepPartial } from '@reduxjs/toolkit'
import type { Asset } from 'contentful'
import {
  ContentfulCategory,
  ContentfulColor,
  ContentfulIcon,
  ContentfulLink
} from '../normalizers'
import { ContentfulMenu, Menu } from '../normalizers/menu'
import { ContentfulMenuItem } from '../normalizers/menu-item'

export const contentfulMenu: DeepPartial<ContentfulMenu> = {
  fields: {
    title: 'Some title',
    id: 'some id',
    items: [
      {
        fields: {
          id: 'Medicine',
          link: {
            fields: {
              title: 'Medicines',
              slug: '/medicines',
              pageType: 'Category',
              referencedContent: {
                fields: {
                  title: 'Medicines',
                  level: 0,
                  id: 'medicines',
                  color: {
                    fields: {
                      ref: 'category-beauty'
                    }
                  } as ContentfulColor,
                  image: {
                    fields: {
                      title: 'Beauty Category Image',
                      description: '',
                      file: {
                        url:
                          '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
                        fileName: 'category-header-sample.png',
                        contentType: 'image/png'
                      }
                    }
                  } as Asset
                }
              } as ContentfulCategory
            }
          },
          submenu: {
            fields: {
              id: '',
              title: 'Medicine Submenu',
              items: [
                {
                  fields: {
                    id: 'Diabetes',
                    link: {
                      fields: {
                        title: 'Diabetes',
                        slug: 'medicines/diabetes',
                        pageType: 'Category',
                        referencedContent: {
                          fields: {
                            title: 'Diabetes',
                            level: 1,
                            id: 'medicines_diabetes',
                            color: {
                              fields: {
                                ref: 'primary-caribbean-green-light'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                {
                  fields: {
                    id: 'Alergies',
                    link: {
                      fields: {
                        title: 'Allergy & Hay fever',
                        slug: 'medicines/allergy',
                        pageType: 'Category',
                        referencedContent: {
                          fields: {
                            title: 'Allergy',
                            level: 1,
                            id: 'medicines_allergy',
                            color: {
                              fields: {
                                ref: 'primary-caribbean-green-light'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                {
                  fields: {
                    id: 'Digestion',
                    link: {
                      fields: {
                        title: 'Digestion',
                        slug: 'medicines/digestion',
                        pageType: 'Category',
                        referencedContent: {
                          fields: {
                            title: 'Digestion',
                            level: 1,
                            id: 'medicines_digestion',
                            color: {
                              fields: {
                                ref: 'category-beauty'
                              }
                            },
                            image: {
                              fields: {
                                description: '',
                                title: 'Beauty Category Image',
                                file: {
                                  url:
                                    '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
                                  fileName: 'category-header-sample.png',
                                  contentType: 'image/png'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      } as ContentfulMenuItem,
      {
        fields: {
          id: 'Homeopathy and natural products',
          link: {
            fields: {
              label: '',
              url: '/a-different-url'
            }
          } as ContentfulLink
        }
      } as ContentfulMenuItem,
      {
        fields: {
          id: 'Terms and Conditions',
          link: ({
            fields: {
              label: 'Terms & Conditions',
              url: '/terms',
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
              icon: {
                fields: {
                  ref: 'PaymentSepa'
                }
              } as ContentfulIcon
            }
          } as unknown) as ContentfulLink
        }
      } as ContentfulMenuItem
    ]
  }
}

export const normalizedMenu: Menu = {
  title: 'Some title',
  id: 'some id',
  items: [
    {
      id: 'Medicine',
      link: {
        label: 'Medicines',
        url: '/medicines',
        category: {
          level: 0,
          id: 'medicines',
          color: 'category-beauty',
          image: {
            description: '',
            title: 'Beauty Category Image',
            url:
              '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
            type: 'image/png'
          }
        }
      },
      submenu: {
        id: '',
        title: 'Medicine Submenu',
        items: [
          {
            id: 'Diabetes',
            link: {
              label: 'Diabetes',
              url: '/medicines/diabetes',
              category: {
                level: 1,
                id: 'medicines_diabetes',
                color: 'primary-caribbean-green-light'
              }
            }
          },
          {
            id: 'Alergies',
            link: {
              label: 'Allergy & Hay fever',
              url: '/medicines/allergy',
              category: {
                level: 1,
                id: 'medicines_allergy',
                color: 'primary-caribbean-green-light'
              }
            }
          },
          {
            id: 'Digestion',
            link: {
              label: 'Digestion',
              url: '/medicines/digestion',
              category: {
                level: 1,
                id: 'medicines_digestion',
                color: 'category-beauty',
                image: {
                  description: '',
                  title: 'Beauty Category Image',
                  type: 'image/png',
                  url:
                    '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
                }
              }
            }
          }
        ]
      }
    },
    {
      id: 'Homeopathy and natural products',
      link: {
        content: '',
        label: '',
        url: '/a-different-url'
      }
    },
    {
      id: 'Terms and Conditions',
      link: {
        label: 'Terms & Conditions',
        url: '/terms',
        icon: 'PaymentSepa',
        content: '<p>Including billing and pre-payment</p>'
      }
    }
  ]
}

export const headerNavigationLeft: Menu = {
  title: 'Header Navigation Left',
  items: [
    {
      id: 'Products',
      link: {
        label: 'Products',
        url: '',
        icon: ''
      },
      submenu: normalizedMenu
    },
    {
      id: 'Promotions',
      link: {
        label: 'Promotions',
        url: '/promotions',
        icon: 'Percentage'
      }
    },
    {
      id: 'Brands',
      link: {
        label: 'Brands',
        url: '/brands',
        icon: 'Shop'
      }
    }
  ],
  id: 'header-navigation-left'
}

export const headerNavigationRight: Menu = {
  title: 'Header Navigation Right',
  items: [
    {
      id: 'Blog',
      link: {
        label: 'Blog',
        url: '/blog',
        icon: 'NavAdvice24'
      }
    },
    {
      id: 'FAQ',
      link: {
        label: 'FAQ',
        url: '/faq',
        icon: ''
      }
    },
    {
      id: 'Contact Us Header',
      link: {
        label: 'Contact',
        url: '/contact',
        icon: 'Telephone24'
      }
    }
  ],
  id: 'header-navigation-right'
}
