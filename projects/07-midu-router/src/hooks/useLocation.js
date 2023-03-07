import { useState, useEffect } from 'react'
import { EVENTS } from '../constants'
import { getCurrentPath } from '../utils'

export function useLocation () {
  const [currentLocation, setCurrentLocation] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentLocation(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  return { currentLocation }
}
