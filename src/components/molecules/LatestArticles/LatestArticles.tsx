import type { FunctionComponent } from 'react'
import React from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type LatestArticlesProps = {
  articles: {
    title: string
    text: string
    category: { label: string; color: string }
    image: string
    url: string
  }[]
}

export const LatestArticles: FunctionComponent<LatestArticlesProps> = ({
  articles
}) => {
  const { t } = useTranslation()
  const articlesToDisplay = articles && articles.slice(0, 3)
  return (
    <div className="mx-2 mt-6 sm:mt-10 sm:mx-5 md:mx-8">
      <p className="text-lg font-normal mb-3 lg:text-2xl">
        {t('confirmation.latest')}
      </p>
      <div
        data-testid="LatestArticles"
        className="grid grid-cols-1 gap-2 md:grid-cols-3 sm:gap-3 md:gap-4"
      >
        {articlesToDisplay &&
          articlesToDisplay
            .slice(0, 3)
            .map(({ title, text, category, image, url }, id: number) => {
              return (
                <article key={id}>
                  <NextLink href={url} passHref prefetch={false}>
                    <a
                      data-testid={`article-${title}`}
                      className="no-underline items-start hover:text-primary-oxford-blue md:grid md:grid-cols-1 md:relative"
                    >
                      <div
                        className="bg-cover bg-no-repeat bg-center mr-2 md:mr-0 w-17 h-12 sm:w-28.5 sm:h-19 md:w-full md:h-26 lg:h-29"
                        style={{
                          backgroundImage: `url(${image}`
                        }}
                      ></div>
                      <div className="w-22 sm:w-52 md:w-full">
                        <p
                          className={classNames(
                            `bg-category-${category.color}`,
                            'text-sm',
                            'inline-block',
                            'px-1.5',
                            'py-0.5',
                            'mb-1.5',
                            'md:m-1.5',
                            'md:absolute',
                            'md:top-0'
                          )}
                        >
                          {category.label}
                        </p>
                        <h3 className="text-base line-clamp-2 sm:text-lg md:pt-1.5 lg:text-3xl">
                          {title}
                        </h3>
                        <p className="hidden text-sm pt-1 sm:block sm:line-clamp-1 md:line-clamp-2">
                          {text}
                        </p>
                      </div>
                    </a>
                  </NextLink>
                </article>
              )
            })}
      </div>
    </div>
  )
}
