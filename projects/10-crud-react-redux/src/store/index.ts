import { configureStore } from "@reduxjs/toolkit";
import userReducer from './users/slice';

const persistanceMiddleware = (store) => (next) => (action) => {
  next(action)
  window.localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

export const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: [persistanceMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch