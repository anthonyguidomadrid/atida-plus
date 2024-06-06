import { ComponentPropsWithoutRef, FunctionComponent } from 'react'

import { TranslationInfoLabel } from '~domains/contentful/normalizers/translationInfoLabel'
import { mapIconReferenceToIconComponent } from '~domains/contentful'
import { useSelector } from 'react-redux'
import { selectCampaignLabels } from '~domains/page'

export type Props = ComponentPropsWithoutRef<'span'> & {
  label: TranslationInfoLabel
}

export const CampaignLabel: FunctionComponent<Props> = ({
  label,
  ...props
}) => {
  const Icon = mapIconReferenceToIconComponent(label?.icon)
  return (
    <div
      className={`px-0.75 py-0.25 text-${label.textColor} bg-${label.backgroundColor}`}
      {...props}
    >
      {label.icon && <Icon className="h-2 inline-block mr-1" />}
      <span className="text-xs font-normal">{label.translation}</span>
    </div>
  )
}

export const CampaignLabelWrapper: FunctionComponent<{ id?: string }> = ({
  id
}) => {
  const campaignLabels = useSelector(selectCampaignLabels)
  const label = campaignLabels?.find(l => l.key === id)
  if (!id || !label) return null

  return <CampaignLabel label={label} />
}
