import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { useUsers } from './hooks/useUsers'
import { SortBy, type User } from './types/types.d'

function App () {
  const { users, originalUsers, setUsers } = useUsers()
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

  const handleReset = () => {
    setUsers(originalUsers.current)
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
    const filteredUsers = sortedUsers.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSorted}>
          {sorting === SortBy.COUNTRY ? 'Cancelar filtro' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Reset users</button>
        <input type='text' placeholder='Filtrar por país' onChange={handleChange} />
      </header>
      <main>
        <UsersList changeSort={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </>
  )
}

export default App
