export function saveInLocalStorage (state) {
  window.localStorage.setItem('cart', JSON.stringify(state))
  return state
}
