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

export const OPERATOR_COLLECTION = {
  ADD: [OPERATOR.ADD],
  SUBTRACT: [OPERATOR.SUBTRACT],
  MULTIPLY: [OPERATOR.MULTIPLY],
  DEVIDE: [OPERATOR.DEVIDE],
  BASIC: [OPERATOR.ADD, OPERATOR.SUBTRACT],
  AVERAGE: [OPERATOR.ADD, OPERATOR.SUBTRACT, OPERATOR.MULTIPLY],
  FULL: [OPERATOR.ADD, OPERATOR.SUBTRACT, OPERATOR.MULTIPLY, OPERATOR.DEVIDE],
};

export const colors = [
  "blue",
  "red",
  "orange",
  "yellow",
  "green",
  "violet",
  "white",
];

export const operatorMapper = (s: string | number): string => {
  if (s === "*") {
    return "×";
  } else if (s === "/") {
    return "÷";
  } else {
    return s + "";
  }
};

export const ICONS = {
  PLAY: "play",
  COLOR_SWITCH: "color-switch",
  CHEVRON_LEFT: "chevron-left",
  HELP: "help",
  RESTART: "restart",
  CLOSE: "close",
} as const;
