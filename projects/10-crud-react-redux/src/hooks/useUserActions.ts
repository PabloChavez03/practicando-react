import { User, UserId, addUser, deleteUserById } from "../store/users/slice"
import { useAppDispatch } from "./store"


export function useUserActions () {
  const dispatch = useAppDispatch()

  const addNewUser = (user: User) => {
    dispatch(addUser(user))
  }

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id))
	}

  return {
    removeUser,
    addNewUser
  }

}