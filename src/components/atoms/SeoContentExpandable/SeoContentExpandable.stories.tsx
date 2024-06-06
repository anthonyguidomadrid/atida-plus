import { SeoContentExpandable, SeoContentExpandableProps } from './index'

export default {
  component: SeoContentExpandable,
  title: 'atoms/SeoContentExpandable',
  args: {
    children: (
      <>
        <p>
          I desire 150 words of truth. And remember, don't do anything that
          affects anything, unless it turns out you were supposed to, in which
          case, for the love of better you, don't do it! Good news, everyone by
          the way! There's a report on TV on the novelty seal. I've taught the
          toaster to feel love and I didn't ask for a completely reasonable
          excuse. Bring me the forms I need to fill out to have her taken away.
          I love this planet, I've got wealth, fame, and access to the depths of
          sleaze that those things bring. I've got to find a way to escape the
          horrible ravages of youth though. Suddenly, I'm going to the bathroom
          like clockwork, every three hours. And those nice folks at Social
          Security stopped sending me my checks and bills.
        </p>
        <p>
          We can't compete with my Mom. Her company is big and famous. Checking
          all the water in this area: there's an escaped fish. Saving the world
          with meals on wheels. The way I see it, every life is a pile of good
          things and bad things. The good things don't always soften the bad
          things; but vice-versa the bad things don't necessarily spoil the good
          things and make them unimportant. I am the first of my species, and I
          know how that weighs on the heart so don't lie to me. Did I mention we
          have comfy chairs?
        </p>
      </>
    )
  }
}

export const Basic = (args: SeoContentExpandableProps): JSX.Element => (
  <SeoContentExpandable {...args} />
)
