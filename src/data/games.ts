type GameCategory = "Math" | "Memory" | "Brain" | "Speed" | "Endurance";
type Game = {
  name: string;
  component: string;
  description: string;
  route: string;
  category: GameCategory;
};
const games: Game[] = [
  {
    name: "Speed Solver",
    component: "SpeedSolver",
    description: "Solve as many task as possible whithin 60 seconds.",
    route: "speed-solver",
    category: "Math",
  },
  {
    name: "Chain Solver",
    component: "ChainSolver",
    description: "Solve a large task that is build up step by step.",
    route: "chain-solver",
    category: "Math",
  },
  {
    name: "Sum It Up",
    component: "SumItUp",
    description: "Add up the numbers in the squares.",
    route: "sum-it-up",
    category: "Math",
  },
  {
    name: "Memory Matrix",
    component: "MemoryMatrix",
    description: "Memorise the pattern.",
    route: "memory-matrix",
    category: "Memory",
  },
  {
    name: "Count Up",
    component: "CountUp",
    description: "Count from 1 to ...",
    route: "count-up",
    category: "Brain",
  },
  {
    name: "Count Down",
    component: "CountDown",
    description: "Count down the numbers in the right order.",
    route: "count-down",
    category: "Brain",
  },
  {
    name: "Pick The Operator",
    component: "PickTheOperator",
    description: "Pick the right operator for a given equation.",
    route: "pick-the-operator",
    category: "Math",
  },
  {
    name: "Memory",
    component: "Memory",
    description: "Just the usual memory",
    route: "memory",
    category: "Memory",
  },
  //nextGame
];

type RelativeGamePointThreshold = {
  type: "relative";
  max: number;
  thresholds: number[];
};

type AbsoluteGamePointThreshold = { type: "absolute"; thresholds: number[] };

type GamePointThreshold =
  | RelativeGamePointThreshold
  | AbsoluteGamePointThreshold;

//TODO: needs rework when game options are implemented
export const gamesPointThresholds: { [key: string]: GamePointThreshold } = {
  SpeedSolver: {
    type: "absolute",
    thresholds: [0, 25, 40, 60],
  },
  ChainSolver: {
    type: "absolute",
    thresholds: [4, 8, 12, 15],
  },
  SumItUp: {
    type: "absolute",
    thresholds: [4, 8, 12, 15],
  },
  MemoryMatrix: {
    type: "absolute",
    thresholds: [3, 7, 11, 16],
  },
  CountUp: {
    type: "absolute",
    thresholds: [0, 20, 45, 55],
  },
  CountDown: {
    type: "absolute",
    thresholds: [0, 25, 48, 60],
  },
  PickTheOperator: {
    type: "absolute",
    thresholds: [0, 20, 40, 50],
  },
};

export default games;
