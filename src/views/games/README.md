# Games

Documentation for every game.

## Speed Solver

### Game Flow

1. `restart()`
  - resets countdowns
  - resets results and solutions
  - resets game over flag
  - triggers `nextTask()`
  - starts pre game countdown (3s)
    - start game countdown after
2. `nextTask()`
  - generates a new task and two possible solutions
3. `commitSolution()`
  - adds a committed solution to the results
  - triggers `nextTask()`
4. `endGame()`
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
  - resets game timer
  - resets index for game phases and steps
  - triggers `resetGamePhases()`
  - triggers `resetGameSteps()`
  - resets game over flag
  - starts pre game countdown (3s)
    - start game timer after
2. `nextStep()`
  - increments the game step index
    - this will show the next part of the task
3. `commitSolution()`
  - increments phase index
  - resets step index
  - triggers `resetGameSteps()`
4. `resetGameSteps()`
  - generates a new task
  - labels the actions buttons for the solutions
  - creates new game steps from the task
5. `endGame()`
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
