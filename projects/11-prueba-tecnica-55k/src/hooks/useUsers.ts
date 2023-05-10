import { useEffect, useRef, useState } from 'react'
import { type User } from '../types/types.d'

export function useUsers () {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch('https://randomuser.me/api?results=10')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        setError(true)
      })
      .then((json) => {
        setUsers(json.results)
        originalUsers.current = json.results
      })
      .catch((err) => {
        console.log(err)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    users,
    originalUsers,
    setUsers,
    loading,
    error
  }
}
