module.exports = async function (migration) {
  const marketingTeaser = migration.editContentType('marketingTeaser')
  marketingTeaser.changeFieldId('isSponsoredContent', 'sponsored')
  marketingTeaser.changeFieldId('labelText', 'text')
  marketingTeaser.changeFieldId('labelColor', 'color')
  marketingTeaser.changeFieldId('isFullWidthImage', 'fullWidth')
  marketingTeaser.changeFieldId('backgroundColor', 'bgColor')
  marketingTeaser.changeFieldId('hasButton', 'button')
  marketingTeaser.changeFieldId('teaserSlug', 'slug')

  const staticRecommendationBlock = migration.editContentType(
    'staticRecommendationBlock'
  )
  staticRecommendationBlock.changeFieldId('shouldDisplayTitle', 'showTitle')
  staticRecommendationBlock.changeFieldId('listOfSkus', 'skuList')
  staticRecommendationBlock.changeFieldId('viewType', 'view')

  const exponeaRecommendation = migration.editContentType(
    'exponeaRecommendation'
  )
  exponeaRecommendation.changeFieldId('recommendationId', 'id')
  exponeaRecommendation.changeFieldId('isProductSlider', 'isSlider')
  exponeaRecommendation.changeFieldId('itemsQuantity', 'quantity')

  const contentBlockWithImage = migration.editContentType(
    'contentBlockWithImage'
  )
  contentBlockWithImage.changeFieldId('isSponsoredContent', 'sponsored')
  contentBlockWithImage.changeFieldId('imageOnTheLeft', 'imageLeft')
  contentBlockWithImage.changeFieldId('backgroundColor', 'bgColor')
  contentBlockWithImage.changeFieldId('titleTypography', 'typography')
  contentBlockWithImage.changeFieldId(
    'textAlignmentForMobile',
    'txtAlignMobile'
  )
  contentBlockWithImage.changeFieldId('showDescription', 'showDesc')
  contentBlockWithImage.changeFieldId('buttonVariant', 'btnType')
  contentBlockWithImage.changeFieldId('buttonWidthForMobile', 'btnWidthMobile')
  contentBlockWithImage.changeFieldId('buttonPositionForTablet', 'btnPosTablet')

  const seo = migration.editContentType('seo')
  seo.changeFieldId('canonicalLink', 'link')

  const containerOfContentBlocks = migration.editContentType(
    'containerOfContentBlocks'
  )
  containerOfContentBlocks.changeFieldId('displayTitleOnFrontEnd', 'showTitle')
  containerOfContentBlocks.changeFieldId('hasSmallMargin', 'hasMargin')
  containerOfContentBlocks.changeFieldId('contentBlocks', 'content')

  const promotion = migration.editContentType('promotion')
  promotion.changeFieldId('isSponsoredContent', 'sponsored')
}
