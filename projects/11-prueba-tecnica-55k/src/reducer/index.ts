import { useMemo } from 'react'
import { type User } from '../types/types.d'

export const reducer = (state: User[], action: any) => {
  const { type, payload } = action

  if (type === 'FILTER_BY_COUNTRY') {
    const filteredUsers = useMemo(() => {
      return typeof payload === 'string' && payload.length !== 0
        ? state.filter((user) => user.location.country.toLowerCase().includes(payload.toLowerCase()))
        : state
    }, [state, payload])

    return filteredUsers
  }
  return state
}
