import { useState, useEffect } from 'react'
import { IMAGE_PREFIX_CAT_URL } from '../constants/index.cjs'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (fact) {
      const singleWord = fact.split(' ')[0]
      fetch(`https://cataas.com/cat/says/${singleWord}?json=true`)
        .then((res) => res.json())
        .then((data) => {
          const { url } = data
          setImageUrl(url)
        })
    }
  }, [fact])

  return { imageUrl: `${IMAGE_PREFIX_CAT_URL}${imageUrl}` }
}
