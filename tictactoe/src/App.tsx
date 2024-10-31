import { useEffect } from 'react'
import './App.css'
// import { useGameSocket } from './useGameSocket';
import { CellIndex, Game } from '../shared/types';
import { socket } from './socket';
// import axios from 'axios'

const game = {
  cells: Array(9).fill(''),
  currentPlayer: 'x',
  winCondition: {
    result: 'none',
    playerWon: null,
  },
}

socket.connect()

socket.onAny((msg) => {
  console.log("received a message", msg)
})

function App() {
  // const { game, makeMove } = useGameSocket();
  // whenever this state updates ^, re-render this whole component with the NEW state values

  function makeMove(index: CellIndex) {
    console.log("making move client", index)
    socket.emit('move', index)
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected on client side')

      socket.on('game', (gameState: Game) => {
        console.log('gameState', gameState)
      })
    })

    return () => {
      socket.off("connect")
    }
  }, [])

  // useEffect(() => {
  //   const winCondition = game.winCondition
  //   if (winCondition.result === 'win') {
  //     alert(`Player ${winCondition.playerWon} wins!`);
  //   } else if (winCondition.result === 'tie') {
  //     alert("It's a tie!");
  //   }
  // }, [])

  return (
    <>
      <div>currentPlayer: {game.currentPlayer}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', width: '300px', height: '300px' }}>
        {game.cells.map((cell, index) => {
          return (
            <div onClick={() => makeMove(index as CellIndex)} key={index} style={{ border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
              {cell}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
