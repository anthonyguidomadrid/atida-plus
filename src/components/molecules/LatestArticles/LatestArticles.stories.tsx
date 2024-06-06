import { LatestArticles, LatestArticlesProps } from './index'

export default {
  component: LatestArticles,
  title: 'molecules/LatestArticles',
  args: {
    articles: [
      {
        title: 'Caffeinated eye contours: everything you need to know',
        text:
          'Have you heard of caffeinated eye contours? Eliminating annoying dark circles and bags is one of the objectives. Have you heard of caffeinated eye contours? Eliminating annoying dark circles and bags is one of the objectives',
        category: {
          label: 'Face',
          color: 'beauty'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      },
      {
        title: 'Tips to avoid irritation from diaper rash',
        text: `Babies' skin is very soft, delicate and above all, sensitive. In fact, "diaper rash" is very common, which is an irritation. Babies' skin is very soft, delicate and above all, sensitive. In fact, "diaper rash" is very common, which is an irritation.`,
        category: {
          label: 'Baby skin care',
          color: 'baby-and-kids'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      },
      {
        title: 'Does vitamin d help reduce complications?',
        text:
          'The mouth is one of the most common entry routes for microorganisms and, without good oral health. The mouth is one of the most common entry routes for microorganisms and, without good oral health.',
        category: {
          label: 'Dental & oral care',
          color: 'personal-care'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      },
      {
        title: 'Does vitamin d help reduce complications?',
        text:
          'The mouth is one of the most common entry routes for microorganisms and, without good oral health. The mouth is one of the most common entry routes for microorganisms and, without good oral health.',
        category: {
          label: 'Dental & oral care',
          color: 'personal-care'
        },
        image:
          'https://images.unsplash.com/photo-1583334529937-bc4761d2cdad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
        url: '/'
      }
    ]
  }
}

export const Basic = (args: LatestArticlesProps): JSX.Element => (
  <LatestArticles {...args} />
)
