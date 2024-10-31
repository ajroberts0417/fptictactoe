
import { Game, CellIndex, Board, WinCondition, Player, VictoryPattern } from './shared/types'

// modify these game lobbies over time and sync the data to the clients using web sockets or polling

export const initialGameState: Game = {
    currentPlayer: 'x', // game starts as x
    cells: ['', '', '', '', '', '', '', '', ''],
    winCondition: { playerWon: null, result: null }
}

// [1, 2, 3]
// [4. 5. 6]
// [7, 8, 9]

const victoryPatterns: VictoryPattern[] = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal from top-left to bottom-right
    [2, 4, 6]  // diagonal from top-right to bottom-left
]

// state machine:
// continue play
// draw
// player x win
// player y win

export const getWinCondition = (board: Board): WinCondition => {
    // 1. Check for victory patterns
    for (const pattern of victoryPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                playerWon: board[a] as Player,
                result: 'win'
            };
        }
    }

    // Check if all cells are full (tie)
    if (board.every(cell => cell !== '')) {
        return {
            playerWon: null,
            result: 'tie'
        };
    }

    // Game should continue
    return {
        playerWon: null,
        result: null
    };
};


export function move(game: Game, position: CellIndex): Game {
    // Check if the position is already filled
    if (game.cells[position] !== '') {
        // If the position is filled, return the game state unchanged
        return game;
    }

    // If the position is empty, proceed with the move
    const cells: Board = [...game.cells] as Board
    cells[position] = game.currentPlayer

    const winCondition = getWinCondition(cells)
    const currentPlayer = game.currentPlayer === 'x' ? 'o' : 'x'

    return {
        winCondition,
        currentPlayer,
        cells,
    }
}