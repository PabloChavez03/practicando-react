import { useUsers } from '../hooks/useUsers'

const Results = () => {
  const { users } = useUsers()
  return (
    <div>Cantidad de usuarios: {users.length === 0 ? 0 : users.length}</div>
  )
}

export default Results
