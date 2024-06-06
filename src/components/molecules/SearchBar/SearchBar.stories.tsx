import { SearchBar } from '.'

export default {
  component: SearchBar,
  title: 'molecules/SearchBar',
  parameters: { layout: 'fullscreen' }
}

export const basic = (): JSX.Element => <SearchBar />
