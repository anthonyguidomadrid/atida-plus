import { createStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { rootReducer } from '~domains/redux'
import { Gallery, GalleryProps } from '../Gallery'
import { images, videos } from './Gallery.mock'

const store = createStore(rootReducer, {})

describe(Gallery, () => {
  const defaultProps = {
    images,
    videos,
    productName: 'Awesome product'
  } as const

  const setup = (props: Partial<GalleryProps> = {}, isMiddleFormat = true) => {
    const { reset } = setupMatchMediaMock(isMiddleFormat)
    render(
      <Provider store={store}>
        <Gallery {...defaultProps} {...props} />
      </Provider>
    )

    reset()
  }

  it('Renders the component', () => {
    setup()
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
  })

  it('Renders the image slides', () => {
    setup()
    expect(screen.getAllByTestId('product-image-slide')).toHaveLength(
      images.length
    )
  })

  it('Renders the image thumbnail slides', () => {
    setup()
    expect(screen.getAllByTestId('thumbnails-image-slide')).toHaveLength(
      images.length
    )
  })

  it('Renders the video slides', () => {
    setup()
    expect(screen.getAllByTestId('product-video-slide')).toHaveLength(
      videos.length
    )
  })

  it('Renders the video thumbnail slides', () => {
    setup()
    expect(screen.getAllByTestId('thumbnails-video-slide')).toHaveLength(
      videos.length
    )
  })

  it('does not crash if no images are provided', () => {
    setup({ images: [] })
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
  })

  it('does not crash if no videos are provided', () => {
    setup({ videos: [] })
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
  })

  it('does not crash if neither images nor videos are provided', () => {
    setup({ images: [], videos: [] })
    expect(screen.getByTestId('gallery')).toBeInTheDocument()
  })
})
