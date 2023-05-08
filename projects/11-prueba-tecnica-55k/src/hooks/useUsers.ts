import { useEffect, useRef, useState } from 'react'
import { type User } from '../types/types.d'

export function useUsers () {
  const [users, setUsers] = useState<User[]>([])

  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setUsers(json.results)
        originalUsers.current = json.results
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return {
    users,
    originalUsers,
    setUsers
  }
}
