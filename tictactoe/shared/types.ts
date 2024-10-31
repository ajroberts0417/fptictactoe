export type Cell = 'x' | 'o' | ''
export type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type Player = 'x' | 'o'
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell]

export type VictoryPattern = [CellIndex, CellIndex, CellIndex]

export type WinCondition = {
    playerWon: Player | null, // null if nobody won
    result: 'win' | 'tie' | null // null if you should continue play
}


export interface Game {
    // this is 9 cells
    currentPlayer: Player
    cells: Cell[]
    winCondition: WinCondition
}