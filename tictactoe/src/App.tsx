import { MouseEventHandler, useEffect, useState } from 'react'
import './App.css'
import { move } from './game'
import type { CellIndex, Game } from './game'
// import axios from 'axios'


// const move = async (game: Game, position: CellIndex): Promise<Game> => {
//   const res = await axios.get('/move', { data: { game, position } })
//   const newGame: Game = res.data
//   return newGame
// }


const initialGameState: Game = {
  currentPlayer: 'x', // game starts as x
  cells: ['', '', '', '', '', '', '', '', ''],
  winCondition: { playerWon: null, result: null }
}

function App() {
  const [game, setGame] = useState(initialGameState)
  // whenever this state updates ^, re-render this whole component with the NEW state values

  useEffect(() => {
    const winCondition = game.winCondition
    if (winCondition.result === 'win') {
      alert(`Player ${winCondition.playerWon} wins!`);
      setGame(initialGameState);
    } else if (winCondition.result === 'tie') {
      alert("It's a tie!");
      setGame(initialGameState);
    }
  }, [game])

  function onCellSelect(position: CellIndex): MouseEventHandler {
    return () => {
      const newGame = move(game, position)
      setGame(newGame)
    }
  }

  return (
    <>
      <div>currentPlayer: {game.currentPlayer}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', width: '300px', height: '300px' }}>
        {game.cells.map((cell, index) => {
          const onClickHandler = onCellSelect(index as CellIndex)
          return (
            <div onClick={onClickHandler} key={index} style={{ border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
              {cell}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
