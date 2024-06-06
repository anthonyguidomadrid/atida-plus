import { useState } from 'react'
import useInView from 'react-cool-inview'

export const useYotpoWidget = () => {
  const [yotpoShouldRender, setYotpoShouldRender] = useState<boolean>(false)
  const { observe: reviewsRef } = useInView({
    threshold: 1,
    onEnter: ({ unobserve }) => {
      unobserve()
      !yotpoShouldRender && setYotpoShouldRender(true)
    }
  })
  return {
    yotpoShouldRender,
    reviewsRef
  }
}
