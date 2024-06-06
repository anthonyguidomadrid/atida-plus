import { render, screen } from '@testing-library/react'
import { Accordion, AccordionProps } from './Accordion'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import userEvent from '@testing-library/user-event'

describe(Accordion, () => {
  const setup = (props: Partial<AccordionProps> = {}) =>
    render(
      <Accordion {...props}>
        <AccordionPanel heading="Accordion Panel 1">
          <p>Some content related to panel 1.</p>
        </AccordionPanel>
        <AccordionPanel heading="Accordion Panel 2">
          <p>Some content related to panel 2.</p>
        </AccordionPanel>
        <AccordionPanel heading="Accordion Panel 3">
          <p>Some content related to panel 3.</p>
        </AccordionPanel>
        Some text that probably shouldn't be here
      </Accordion>
    )

  it('should render all panel titles', () => {
    setup()
    expect(screen.getByText('Accordion Panel 1')).toBeInTheDocument()
    expect(screen.getByText('Accordion Panel 2')).toBeInTheDocument()
    expect(screen.getByText('Accordion Panel 3')).toBeInTheDocument()
  })

  it('should render all panel contents', () => {
    setup()
    expect(
      screen.getByText('Some content related to panel 1.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Some content related to panel 2.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Some content related to panel 3.')
    ).toBeInTheDocument()
  })

  it('should render any "invalid" elements plainly', () => {
    setup()
    expect(screen.getByText(/Some text that probably/)).toBeInTheDocument()
  })

  it('should hide all panels initially', () => {
    setup()
    expect(
      screen.getByText('Some content related to panel 1.')
    ).not.toBeVisible()
    expect(
      screen.getByText('Some content related to panel 2.')
    ).not.toBeVisible()
    expect(
      screen.getByText('Some content related to panel 3.')
    ).not.toBeVisible()
  })

  it('should reveal the selected panel when title is clicked', () => {
    setup()
    expect(
      screen.getByText('Some content related to panel 3.')
    ).not.toBeVisible()
    userEvent.click(screen.getByText('Accordion Panel 3'))
    expect(screen.getByText('Some content related to panel 3.')).toBeVisible()
  })

  describe('controlled accordion', () => {
    it('should reveal default active panel initially', () => {
      setup({ defaultActivePanel: 1, controlled: true })
      expect(
        screen.getByText('Some content related to panel 1.')
      ).not.toBeVisible()
      expect(screen.getByText('Some content related to panel 2.')).toBeVisible()
      expect(
        screen.getByText('Some content related to panel 3.')
      ).not.toBeVisible()
    })

    it('should hide the selected panel if it is already open', () => {
      setup({ controlled: true })
      expect(
        screen.getByText('Some content related to panel 3.')
      ).not.toBeVisible()
      userEvent.click(screen.getByText('Accordion Panel 3'))
      expect(screen.getByText('Some content related to panel 3.')).toBeVisible()
      userEvent.click(screen.getByText('Accordion Panel 3'))
      expect(
        screen.getByText('Some content related to panel 3.')
      ).not.toBeVisible()
    })

    it('should only allow one panel to be visible at a time', () => {
      setup({ controlled: true, defaultActivePanel: 1 })
      expect(screen.getByText('Some content related to panel 2.')).toBeVisible()
      expect(
        screen.getByText('Some content related to panel 1.')
      ).not.toBeVisible()
      userEvent.click(screen.getByText('Accordion Panel 1'))
      expect(
        screen.getByText('Some content related to panel 2.')
      ).not.toBeVisible()
      expect(screen.getByText('Some content related to panel 1.')).toBeVisible()
    })
  })
})
