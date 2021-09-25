# Games

Documentation for every game.

## Speed Solver

### Game Flow

1. `restart()`
  - increases restart counter
  - resets game countdown
  - resets results and solutions
  - resets game over flag
  - triggers `nextTask()`
  - triggers pregame countdown in `GameWrapper`
2. `startGameCountdown()`
  - starts game countdown
3. `nextTask()`
  - generates a new task and two possible solutions
4. `commitSolution()`
  - adds a committed solution to the results
  - triggers `nextTask()`
5. `endGame()`
  - triggered when the game countdown reaches 0
  - sets game over flag

#### Watched
##### `gameCountdown`
- triggers `endGame()` when countdown is over

### Points

- for a right answer: **+1**
- for a wrong answer: **-1**
- max points: **depends on solved tasks**
- min points: **depends on faulty solved tasks**

## Chain Solver

### Game Flow

A **game phase** represents a task. A **game steps** represents a part of the task as well as a part of a **game phase**.

1. `restart()`
  - increases restart counter
  - resets game timer
  - resets index for game phases and steps
  - triggers `resetGamePhases()`
  - triggers `resetGameSteps()`
  - resets game over flag
  - triggers pregame countdown in `GameWrapper`
2. `startGameTimer()`
  - starts game timer
3. `nextStep()`
  - increments the game step index
    - this will show the next part of the task
4. `commitSolution()`
  - increments phase index
  - resets step index
  - triggers `resetGameSteps()`
5. `resetGameSteps()`
  - generates a new task
  - labels the actions buttons for the solutions
  - creates new game steps from the task
6. `endGame()`
  - triggered when the last game phase is done
  - stops game timer
  - sets game over flag

### Points

- correctly solved game phase: **+1**
- when more than **6** game phases solved correctly:
  - `game time < 75 seconds`: **+5**
  - `game time < 85 seconds && game time >= 75 seconds`: **+4**
  - `game time < 95 seconds && game time >= 85 seconds`: **+3**
  - `game time < 105 seconds && game time >= 95 seconds`: **+2**
  - `game time < 115 seconds && game time >= 105 seconds`: **+1**
- max points: **+15**
- min points: **0**
