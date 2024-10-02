- ^ data that makes up the "truth" about reality from the perspective of the program
- making sure state is accurate and fault-tolerant and easy to correct
- ^ attributes of anti-fragile programs.

- Notes on STATE and ACTIONS and CALCULATINS
- MOVES (technically) ARE PURE FUNCTIONS with GAME STATE input and NEW GAME STATE output
- moves are a transformation from state N to state N+1
- moves are a way to "calculate" the next state, given some action
- moves are not responsible for actually TAKING that action or actually CHANGING the state.
- what are side effects?
  - console.log

- what are calculations (pure functions) vs actions (side effects, impure functions)?
- ACTIONS:
  - 1. Date.now() -- current timestamp Date.now() Date.now()
  - ^ any function where the output changes based on WHEN or WHERE it is called is a side effect
  - console.log('hello') console.log('hello')
  - emailUser(msg) -> includes the createEmailStructure(msg)
  - 2. any modification of state is a side effect -- any database function, adding to DB