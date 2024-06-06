import { useRouter } from 'next/router'
import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  MutableRefObject
} from 'react'
import { useTranslation } from 'react-i18next'
import { Subcategory } from '~domains/contentful/normalizers/products-menu-submenu'

export type CategoryListCategory = {
  id?: string
  title?: string
  subcategories?: Subcategory[]
  url?: string
}

export type MinimalCategoryListProps = {
  category?: CategoryListCategory
  categories: CategoryListCategory[]
  dropdownRef?: MutableRefObject<HTMLUListElement | null>
  testId?: string
}

export const MinimalCategoryList: FunctionComponent<
  ComponentPropsWithoutRef<'ul'> & MinimalCategoryListProps
> = ({ category, categories, dropdownRef, testId = 'root', ...props }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <ul
      className="sr-only"
      ref={dropdownRef}
      data-testid={`categoryList_${testId}`}
      {...props}
    >
      {categories?.length > 0 && (
        <>
          {!!category && (
            <li>
              <a href={`/${locale}${category?.url}`}>
                {t('shared.all-products')} {category.title}
              </a>
            </li>
          )}
          {categories.map(category => {
            return (
              <li key={category.id}>
                <a href={`/${locale}${category?.url}`}>{category.title}</a>

                {category.subcategories && category.subcategories.length > 0 && (
                  <div data-submenu-wrapper>
                    <MinimalCategoryList
                      category={category}
                      categories={category.subcategories}
                      testId={category.id}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </>
      )}
    </ul>
  )
}
