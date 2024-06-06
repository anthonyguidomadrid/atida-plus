import { useRouter } from 'next/router'

export const useSearchTermFromUrl = (): string | undefined => {
  const { query } = useRouter()
  return query?.search?.toString()
}
