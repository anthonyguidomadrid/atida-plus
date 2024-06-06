import { render, screen } from '@testing-library/react'
import { TranslationInfoLabel } from '~domains/contentful/normalizers/translationInfoLabel'
import { CampaignLabel } from '.'

const labels: TranslationInfoLabel[] = [
  {
    key: '0',
    translation: 'Zero',
    textColor: 'primary-white',
    backgroundColor: 'secondary-portland-orange'
  },
  {
    key: '1',
    translation: 'First',
    textColor: 'primary-oxford-blue',
    backgroundColor: 'primary-caribbean-green-light',
    icon: 'Gift'
  },
  {
    key: '2',
    translation: 'Second',
    textColor: 'primary-oxford-blue',
    backgroundColor: 'primary-caribbean-green-light',
    icon: 'Gift'
  },
  {
    key: '3',
    translation: 'Third',
    textColor: 'primary-oxford-blue',
    backgroundColor: 'primary-caribbean-green-light'
  },
  {
    key: '4',
    translation: 'Fourth',
    textColor: 'primary-oxford-blue',
    backgroundColor: 'primary-caribbean-green-light',
    icon: 'Gift'
  }
]

describe(CampaignLabel, () => {
  it('renders the correct colour classes', () => {
    render(
      <>
        {labels.map(l => (
          <CampaignLabel label={l} key={l.key} />
        ))}
      </>
    )
    expect(screen.getByText('Zero').parentElement).toHaveClass(
      'bg-secondary-portland-orange text-primary-white'
    )
    expect(screen.getByText('First').parentElement).toHaveClass(
      'bg-primary-caribbean-green-light text-primary-oxford-blue'
    )
  })

  it('renders the correct icons', () => {
    render(
      <>
        {labels.map(l => (
          <CampaignLabel label={l} key={l.key} />
        ))}
      </>
    )
    //Icons render as a div with this test id, see jest.setup.ts
    expect(screen.getAllByTestId('dynamic component').length).toBe(3)
  })
})
