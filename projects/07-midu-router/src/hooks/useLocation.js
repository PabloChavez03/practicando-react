import { useState, useEffect } from 'react'
import { EVENTS } from '../constants'

export function useLocation () {
  const [currentLocation, setCurrentLocation] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentLocation(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
      console.log('remove event')
    }
  }, [])

  return { currentLocation }
}
