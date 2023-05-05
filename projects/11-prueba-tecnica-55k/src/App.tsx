import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setUsers(json.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </>
  )
}

export default App
