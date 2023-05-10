import { useRef } from 'react'
import { type User } from '../types/types.d'

import { useInfiniteQuery } from '@tanstack/react-query'

const fetchUsers = ({ pageParam = 1 }: { pageParam?: number }) => {
  // arreglar tanstack query, no funciona el data
  return fetch(
    `https://randomuser.me/api?results=10&seed=pablito&page=${pageParam}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Error fetching data')
    })
    .then((json) => {
      const nextCursor = Number(json.info.page)

      return {
        users: json.results,
        nextCursor
      }
    })
    .catch(() => {
      throw new Error('Error connecting to API')
    })
}

export function useUsers () {
  const originalUsers = useRef<User[]>([])

  const { isLoading, isError, data, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ users: User[], nextCursor: number }>(
      ['users'],
      fetchUsers,
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    )

  console.log(data)

  return {
    users,
    originalUsers,
    loading: isLoading,
    error: isError,
    currentPage,
    // setUsers,
    setCurrentPage
  }
}
