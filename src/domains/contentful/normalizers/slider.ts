import type { Entry } from 'contentful'
import { CmsContentTypes } from '~config/content-types'
import { SliderFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '../helpers'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ContentfulHeroBanner, HeroBanner, normalizeHeroBanner } from '.'

export type Slider = {
  contentType: CmsContentTypes.SLIDER
  title: string
  contentBlocks: HeroBanner[]
}

export type ContentfulSlider = Entry<{
  name: string
  contentBlocks: ContentfulHeroBanner[]
}>

const normalizeSliderRest = (slider: ContentfulSlider): Slider =>
  removeUndefinedPropertiesFromObject({
    contentType: CmsContentTypes.SLIDER,
    title: slider?.fields?.name ?? '',
    contentBlocks: (slider?.fields?.contentBlocks?.length
      ? slider.fields.contentBlocks.map(normalizeHeroBanner)
      : []) as HeroBanner[]
  })

const normalizeHeroBannerGraphQL = (
  slider: SliderFragment
): Slider | undefined =>
  slider
    ? removeUndefinedPropertiesFromObject({
        contentType: CmsContentTypes.SLIDER as const,
        title: slider?.name ?? '',
        contentBlocks: slider?.contentBlocksCollection?.items
          ? (slider?.contentBlocksCollection?.items
              ?.filter(heroBanner => heroBanner !== null)
              ?.map(heroBanner =>
                heroBanner ? normalizeHeroBanner(heroBanner) : undefined
              ) as HeroBanner[])
          : []
      })
    : undefined

export const normalizeSlider = (
  slider: ContentfulSlider | SliderFragment
): Slider | undefined => {
  if (checkIfGraphQLResponse(slider)) {
    return normalizeHeroBannerGraphQL(slider)
  }

  return normalizeSliderRest(slider)
}
