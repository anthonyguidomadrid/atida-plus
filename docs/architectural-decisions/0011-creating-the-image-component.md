# 11. Creating the 'Image' component

Date: 2022-01-19

## Status

Accepted

## Context

Now we are introducing the `<picture>` and `<source />` tags in our components instead of just using `<img />` to improve the performance of the site, trying to serve our images with an AVIF or WEBP formats first. If the user browser does not support these formats and tags, `<picture>` and `<source />` will be ignored and just `<img />` will be rendered with a JPEG format.

## Decision

In order to have a consistent use of these tags all across our codebase, we created a new 'Image' component. By default this will lazy load the image (you can change this just passing the property `loading="eager"`) and will use different image dimensions depending on the breakpoint (using the new `useImageDimensions` custom hook), fetching the image to Contentful with a more accurate width for that specific screen size. This will avoid fetching unnecesarily large images, saving bandwidth on mobile and improving the overall performance of the site.

You can specify the image dimensions (with 'width' and 'height' props) for each specific breakpoint (XS, SM, MD and LG), and also edit the compression rate for the different formats (AVIF, WEBP and JPEG) thanks to the LaunchDarkly feature flags that are implemented (this will be global all across the site):

- To allow the AVIF compression and edit its rate, use the `image.allow-avif-compression` feature flag
- To allow the WEBP compression and edit its rate, use the `image.allow-webp-compression` feature flag
- To allow the JPEG compression and edit its rate, use the `image.allow-jpeg-compression` feature flag

## Consequences

The team will need to be aware to use this new component in order to improve the performance in other parts of the site, and to make our use of images across the site more consistent.
