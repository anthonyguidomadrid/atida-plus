import { SeoContent, SeoContentProps } from './index'

export default {
  component: SeoContent,
  title: 'atoms/SeoContent',
  args: {
    header:
      "Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars",
    children: (
      <>
        <p>
          Meh. All I want is to be a monkey of moderate intelligence who wears a
          suit… that's why I'm transferring to business school! I can explain.
          <strong> It's very valuable. </strong>
          No argument here. This is the worst kind of discrimination: the kid
          against me! Who are those horrible orange men? Are you crazy? I can't
          swallow that. We need rest. The spirit is willing, but the flesh is
          spongy and bruised. You don't know how to do any of those. Quite
          possible. We live long and are celebrated boomers. For example, if you
          killed your grandfather, you'd cease to exist! I had more, but you go
          ahead. Guess again.
        </p>
        <p>
          Okay, it's 500 dollars, you have no choice of carrier, the battery
          can't hold the charge and the reception isn't very… you know. And from
          now on you're all named Bender Jr. Tell them I hate them. We're also
          Santa Claus!
        </p>
      </>
    )
  }
}

export const Basic = (args: SeoContentProps): JSX.Element => (
  <SeoContent {...args} />
)
