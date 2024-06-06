type Categories = Record<string, string | string[] | undefined>

export const getCategoriesPath = (
  categoriesObject: Categories | undefined
): string | undefined => {
  if (!categoriesObject) return
  const orderedCategoriesObject = Object.keys(categoriesObject)
    .sort((a, b) => Number(a.substring(3)) - Number(b.substring(3)))
    .reduce((obj: Categories, key) => {
      obj[key] = categoriesObject[key]?.[0]
      return obj
    }, {})
  const categoriesPath = Object.values(orderedCategoriesObject).join('/')
  return categoriesPath
}
