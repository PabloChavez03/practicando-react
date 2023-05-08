import { SortBy, type User } from '../types/types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSort: (sort: SortBy) => void
}

export function UsersList ({ changeSort, deleteUser, users, showColors }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th style={{ cursor: 'pointer' }} onClick={() => { changeSort(SortBy.NAME) }}>Nombre</th>
          <th style={{ cursor: 'pointer' }} onClick={() => { changeSort(SortBy.LAST) }}>Apellido</th>
          <th style={{ cursor: 'pointer' }} onClick={() => { changeSort(SortBy.COUNTRY) }}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'
            return (
              <tr key={index} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => { deleteUser(user.email) }}>Borrar</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
