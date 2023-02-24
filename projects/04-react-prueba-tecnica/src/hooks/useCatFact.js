import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState('')

  function refreshFact () {
    return getRandomFact().then(res => setFact(res))
  }
  useEffect(() => refreshFact, [])

  return { fact, refreshFact }
}
