import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import { TURNS, initialBoard, initialTurn, initialWinner } from './constants'
import Square from './components/Square'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import WinnerModal from './components/WinnerModal'
import Turns from './components/Turns'
import { resetGameToStorage, saveGameToStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : initialBoard
  })
  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage || initialTurn
  })
  // null cuando no hay ganador y false cuando hay un empate
  const [winner, setWinner] = useState(initialWinner)

  function updateSquare (index) {
    // no actualiza cuando la posición ya está ocupada o hay un ganador
    if (board[index] || winner) return

    // cuando se da click se setea el tablero con el turno
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambia de turno
    const newTurn = turn === TURNS.O ? TURNS.X : TURNS.O
    setTurn(newTurn)
    saveGameToStorage({ turn: newTurn, board: newBoard })

    // check winner
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  function resetGame () {
    setBoard(initialBoard)
    setTurn(initialTurn)
    setWinner(initialWinner)
    resetGameToStorage()
  }

  return (
    <main className='board'>
      <h1>Ta - Te - Ti</h1>
      <button onClick={resetGame} className='reset'>
        Restart
      </button>
      <section className='game'>
        {board.map((square, index) => (
          <Square updateSquare={updateSquare} key={index} index={index}>
            {square}
          </Square>
        ))}
      </section>

      <Turns turn={turn} />

      {winner !== null && <WinnerModal winner={winner} resetGame={resetGame} />}
    </main>
  )
}

export default App
