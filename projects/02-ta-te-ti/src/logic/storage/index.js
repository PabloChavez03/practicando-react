export function saveGameToStorage ({ turn, board }) {
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export function resetGameToStorage () {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
