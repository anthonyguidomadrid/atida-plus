import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Slider, SliderProps } from '.'

export default {
  component: Slider,
  title: 'molecules/Slider',
  parameters: { layout: 'fullscreen' }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (args: SliderProps): JSX.Element => (
  <Provider store={store}>
    <Slider {...args}>
      <div className="flex w-full h-26 justify-center items-center bg-primary-caribbean-green">
        Slide 1
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-champagne-pink">
        Slide 2
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-portland-orange">
        Slide 3
      </div>
    </Slider>
  </Provider>
)

export const withTwoSlidesPerView = (args: SliderProps): JSX.Element => (
  <Provider store={store}>
    <Slider {...args}>
      <div className="flex w-full h-26 justify-center items-center bg-primary-caribbean-green">
        Slide 1
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-champagne-pink">
        Slide 2
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-portland-orange">
        Slide 3
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-primary-caribbean-green">
        Slide 4
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-champagne-pink">
        Slide 5
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-portland-orange">
        Slide 6
      </div>
    </Slider>
  </Provider>
)

export const withThreeSlidesPerView = (args: SliderProps): JSX.Element => (
  <Provider store={store}>
    <Slider {...args}>
      <div className="flex w-full h-26 justify-center items-center bg-primary-caribbean-green">
        Slide 1
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-champagne-pink">
        Slide 2
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-portland-orange">
        Slide 3
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-primary-caribbean-green">
        Slide 4
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-champagne-pink">
        Slide 5
      </div>
      <div className="flex w-full h-26 justify-center items-center bg-secondary-portland-orange">
        Slide 6
      </div>
    </Slider>
  </Provider>
)

withTwoSlidesPerView.args = {
  withTwoSlidesPerView: 2
}

withThreeSlidesPerView.args = {
  withTwoSlidesPerView: 3
}
