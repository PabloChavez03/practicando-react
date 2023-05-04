import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import userReducer, { rollbackUser, UserWithId } from './users/slice';

const persistanceMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  window.localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previuousState = store.getState()


  next(action)

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previuousState.users.find((user: UserWithId) => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`,{
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          toast.success(`User ${userToRemove.name} deleted successfully`)
        }

        throw new Error('Error al eliminar el usuario')
      })
      .catch((error) => {
        toast.error(`Error deleting ${userIdToRemove}`)

        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(error)
        console.error('Error')
      })
  }
}

export const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: [persistanceMiddleware, syncWithDatabaseMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch