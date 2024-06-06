export type RewardTypes = 'basic' | 'advanced'
export type RewardProps = {
  dataTestId?: string
  title: string
  content: string
  value: number
  cta?: string
  openGift?: boolean
  claimed: boolean
  type: RewardTypes
  isLoading?: boolean
  onClick?: () => void
}
