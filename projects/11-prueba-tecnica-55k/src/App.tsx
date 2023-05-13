import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import './App.css'
import Results from './components/Results'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import { SortBy, type User } from './types/types.d'

function App () {
  const { users, loading, error, nextPage, hasNextPage, refetch } = useUsers()

  const queryClient = useQueryClient()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterValue, setFilterValue] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSorted = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    await refetch()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  const filteredUsers = useMemo(() => {
    return typeof filterValue === 'string' && filterValue.length !== 0
      ? users.filter((user) => user.location.country.toLowerCase().includes(filterValue.toLowerCase()))
      : users
  }, [users, filterValue])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    // extensive option
    const extensiveSorting: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractByExtensiveSorting = extensiveSorting[sorting]
      return extractByExtensiveSorting(a).localeCompare(extractByExtensiveSorting(b))
    })
  }, [sorting, filteredUsers])

  const handleDelete = (email: string) => {
    queryClient.setQueryData(['users'], (prevData) => {
      if (prevData) {
        const updateData = prevData.pages.map((page) => {
          return {
            ...page,
            users: page.users.filter(user => user.email !== email)
          }
        })

        return {
          pageParams: prevData.pageParams,
          pages: updateData
        }
      }

      return prevData
    })
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <Results />
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSorted}>
          {sorting === SortBy.COUNTRY ? 'Cancelar filtro' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Reset users</button>
        <input type='text' placeholder='Filtrar por país' onChange={handleChange} />
      </header>
      <main>
        {users.length > 0 && <UsersList changeSort={handleChangeSort} deleteUser={handleDelete} users={sortedUsers} showColors={showColors} />}

        {loading && <strong>Cargando...</strong>}

        {error && <strong>Hubo un error</strong>}

        {!loading && !error && users.length === 0 && <strong>No hay usuarios</strong>}

        {!loading && !error && hasNextPage === true && <button onClick={() => nextPage()}>Cargar más usuarios</button>}

        {!loading && !error && hasNextPage === false && <strong>No hay más usuarios</strong>}
      </main>
    </>
  )
}

export default App
