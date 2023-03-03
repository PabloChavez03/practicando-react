import { CART_ACTIONS } from '../constants/actionsTypes'

export const initialCartState = JSON.parse(window.localStorage.getItem('cart')) || []

export const reducerCart = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { id } = payload
      const productCartIndex = state.findIndex((item) => item.id === id)

      if (productCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productCartIndex].quantity += 1
        return newState
      }

      return [
        ...state,
        {
          ...payload,
          quantity: 1
        }
      ]
    }
    case CART_ACTIONS.REMOVE_TO_CART: {
      const { id } = payload
      return state.filter((item) => item.id !== id)
    }
    case CART_ACTIONS.CLEAR_CART: {
      return []
    }
  }
  return state
}
