import { useInfiniteQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { fetchUsers } from '../services/fetchUsers'
import { type User } from '../types/types.d'

export function useUsers () {
  const originalUsers = useRef<User[]>([])

  const { isLoading, isError, data, fetchNextPage, refetch, hasNextPage } =
    useInfiniteQuery<{ nextCursor?: number, users: User[] }>(
      ['users'],
      fetchUsers,
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 3
      }
    )

  console.log(data)
  return {
    users: data?.pages?.flatMap(page => page.users) ?? [],
    originalUsers,
    loading: isLoading,
    error: isError,
    hasNextPage,
    nextPage: fetchNextPage,
    refetch
  }
}
