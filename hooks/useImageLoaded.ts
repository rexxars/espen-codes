import {useEffect, useRef, useState} from 'react'

export function useImageLoaded(src: string) {
  const [loaded, setLoaded] = useState(false)

  const imgRef = useRef(typeof window !== 'undefined' && document.createElement('img'))
  const img = imgRef.current

  useEffect(() => {
    if (!img || !src) {
      return
    }

    img.onload = () => setLoaded(true)
    img.src = src
  }, [img, src])

  return loaded
}
