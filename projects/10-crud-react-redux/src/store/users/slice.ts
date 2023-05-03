import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: '1',
    name: "Peter Doe",
    email: "peterdoe@gmail.com",
    github: "peterdoe"
  },
  {
    id: '2',
    name: "John Doe",
    email: "johndoe@gmail.com",
    github: "johndoe"
  },
  {
    id: '3',
    name: "Carl Doe",
    email: "carldoe@gmail.com",
    github: "carldoe"
  }
]

export type UserId  = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistanceState = window.localStorage.getItem('__redux__state__')
  if (persistanceState) {
    return JSON.parse(persistanceState).users
  }

  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload

      return state.filter(user => user.id !== id)
    },
  }
})

export default usersSlice.reducer

export const { deleteUserById } = usersSlice.actions