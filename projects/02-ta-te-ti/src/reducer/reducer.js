import { initialBoard, initialTurn, initialWinner, TURNS } from '../constants'
import { saveGameToStorage } from '../logic/storage'
import { checkWinnerFrom, checkEndGame } from '../logic/board'
import confetti from 'canvas-confetti'

const initialApp = {
  board: window.localStorage.getItem('board')
    ? JSON.parse(window.localStorage.getItem('board'))
    : initialBoard,
  turn: window.localStorage.getItem('turn') ? window.localStorage.getItem('turn') : initialTurn,
  winner: initialWinner
}

export function reducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case 'UPDATE_SQUARE': {
      if (state.board[payload] || state.winner) return

      // cuando se da click se setea el tablero con el turno
      const newBoard = [...state.board]
      newBoard[payload] = state.turn

      // cambia de turno
      const newTurn = state.turn === TURNS.O ? TURNS.X : TURNS.O
      saveGameToStorage({ turn: newTurn, board: newBoard })

      // check winner
      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner) {
        confetti()
      } else if (checkEndGame(newBoard)) {
        return false
      }

      return {
        board: newBoard,
        turn: newTurn,
        winner: newWinner
      }
    }
  }
}
