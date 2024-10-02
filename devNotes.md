### I want to build a game engine for tictactoe?
what does a board game engine actually need?
- game state (entire state of the game)
- moves (all the valid ways to change the game state) which should be pure functions
  - player moves
  - ai moves
  - "game" moves
- some way to know when the game is done (endConditions)
