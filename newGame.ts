

// i am making tictactoe -- what is tictactoe

type Cell = 'x' | 'o' | ''

type Game = {
    board: [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]
}

// game state
const game: Game = {
    board: ['x', 'o', 'x', '', '', '', '', '', ''] // 9
}

// moves
// end condition