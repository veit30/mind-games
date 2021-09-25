export const DIFFICULTY = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
} as const;

export const OPERATOR = {
  SUBTRACT: "-",
  ADD: "+",
  MULTIPLY: "*",
  DEVIDE: "/",
  SMALLER: "<",
  LARGER: ">",
  EQUAL: "=",
} as const;

export const GAME_STATE = {
  PENDING: 1,
  DONE: 2,
  UNDECIDED: 3,
  ERROR: 4,
} as const;
