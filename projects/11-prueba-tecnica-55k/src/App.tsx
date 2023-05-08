import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [showSorted, setShowSorted] = useState(false)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSorted = () => {
    setShowSorted(!showSorted)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const sortedUsers = showSorted
    ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : users

  const handleDelete = (email: string) => {
    const filteredUsers = sortedUsers.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

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
  return (
    <>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSorted}>
          {showSorted ? 'Cancelar filtro' : 'Ordenar por país'}
        </button>
        <button onClick={handleReset}>Reset users</button>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </>
  )
}

export default App
