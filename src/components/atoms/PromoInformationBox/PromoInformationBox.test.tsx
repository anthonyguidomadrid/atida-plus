import { render } from '@testing-library/react'

import { PromoInformationBox, PromoInformationBoxProps } from '.'

describe(PromoInformationBox, () => {
  const initialProps = {
    promoInformation: 'Testing the explanation text',
    hasGift: false
  }
  const setup = (props: PromoInformationBoxProps = initialProps) =>
    render(<PromoInformationBox {...props} />)

  it('displays the text on orange background when it has no gift', async () => {
    const { findByText, findByTestId } = setup()
    const elem = await findByTestId('promoExplanationBox')

    expect(await findByText('Testing the explanation text')).toBeInTheDocument()
    expect(elem.className).toContain('bg-secondary-champagne-pink')
  })

  it('displays the text on pink background when it has a gift', async () => {
    const { findByTestId } = setup({
      ...initialProps,
      hasGift: true
    })
    const elem = await findByTestId('promoExplanationBox')

    expect(elem.className).toContain('bg-secondary-light-pink')
  })
})
