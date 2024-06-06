export const expertSignature = {
  experts: [
    {
      categories: { id: 'beauty', title: 'Beauty' },
      image: {
        __typename: 'Asset' as const,
        title: 'some image title',
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131'
      },
      name: 'some name',
      jobTitle: 'some job title',
      jobDescription: 'some job description'
    }
  ]
}

export const expertSignatureContentfulResponse = {
  data: {
    data: {
      expertSignatureCollection: {
        items: [
          {
            categories: {
              id: 'beauty',
              title: 'Beauty'
            },
            image: {
              __typename: 'Asset' as const,
              title: 'some image title',
              url:
                'https://images.unsplash.com/photo-1518791841217-8f162f1e1131'
            },
            name: 'some name',
            jobTitle: 'some job title',
            jobDescription: 'some job description'
          }
        ]
      }
    }
  }
}

export const expertSignatureContentfulResponseUndefined = {
  data: {
    data: {
      expertSignatureCollection: {
        items: undefined
      }
    }
  }
}

export const expertSignatureCategoryIdContentfulResponseUndefined = {
  data: {
    data: {
      expertSignatureCollection: {
        items: [
          {
            categories: undefined
          }
        ]
      }
    }
  }
}
