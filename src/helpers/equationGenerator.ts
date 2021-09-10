import { randomFromArray, randomIntInRange } from "@/helpers/util";
/*
 * EASY - simple equation with +,-,×
 * MEDIUM - equation with +,-,×,÷
 * HARD - equation can contain brackets
 */
export const EQUATION_DIFFICULTY = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
} as const;

export const OPERATOR = {
  SUBTRACT: "-",
  ADD: "+",
  MULTIPLY: "×",
  DEVIDE: "÷",
  SMALLER: "<",
  LARGER: ">",
  EQUAL: "=",
} as const;

export type EquationDifficulty =
  typeof EQUATION_DIFFICULTY[keyof typeof EQUATION_DIFFICULTY];
export type Operator = typeof OPERATOR[keyof typeof OPERATOR];

export function generateEquation(
  parts: number,
  difficulty: EquationDifficulty
) {
  switch (difficulty) {
    case EQUATION_DIFFICULTY.EASY:
      return generateSimpleEquation(parts, [
        OPERATOR.SUBTRACT,
        OPERATOR.ADD,
        OPERATOR.MULTIPLY,
      ]);
    case EQUATION_DIFFICULTY.MEDIUM:
      return generateSimpleEquation(parts, [
        OPERATOR.SUBTRACT,
        OPERATOR.ADD,
        OPERATOR.MULTIPLY,
        OPERATOR.DEVIDE,
      ]);
    case EQUATION_DIFFICULTY.HARD:
      return generateSimpleEquation(parts, [
        OPERATOR.SUBTRACT,
        OPERATOR.ADD,
        OPERATOR.MULTIPLY,
        OPERATOR.DEVIDE,
      ]);
  }
}

function generateSimpleEquation(parts: number, operators: Array<Operator>) {
  const operator = randomFromArray(operators);
  const a = randomIntInRange(1, 10);
  const b = randomIntInRange(1, 10);
  return `${a} ${operator} ${b}`;
}
