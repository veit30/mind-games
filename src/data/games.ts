export type GameCategory = "math" | "memory" | "brain" | "speed" | "endurance";
export type Game = {
  name: string;
  component: string;
  description: string;
  route: string;
  categories: GameCategory[];
  scoreType: "number" | "time";
};
const games: Game[] = [
  {
    name: "Speed Solver",
    component: "SpeedSolver",
    description: "Solve as many task as possible whithin 60 seconds.",
    route: "speed-solver",
    categories: ["math", "speed"],
    scoreType: "number",
  },
  {
    name: "Chain Solver",
    component: "ChainSolver",
    description: "Solve a large task that is build up step by step.",
    route: "chain-solver",
    categories: ["math"],
    scoreType: "number",
  },
  {
    name: "Sum It Up",
    component: "SumItUp",
    description: "Add up the numbers in the squares.",
    route: "sum-it-up",
    categories: ["math"],
    scoreType: "number",
  },
  {
    name: "Memory Matrix",
    component: "MemoryMatrix",
    description: "Memorise the pattern.",
    route: "memory-matrix",
    categories: ["memory"],
    scoreType: "number",
  },
  {
    name: "Count Up",
    component: "CountUp",
    description: "Count from 1 to 49",
    route: "count-up",
    categories: ["brain", "speed"],
    scoreType: "number",
  },
  {
    name: "Count Down",
    component: "CountDown",
    description: "Count down from 49 to 1.",
    route: "count-down",
    categories: ["brain", "speed"],
    scoreType: "number",
  },
  {
    name: "Pick The Operator",
    component: "PickTheOperator",
    description: "Pick the right operator for a given equation.",
    route: "pick-the-operator",
    categories: ["math"],
    scoreType: "number",
  },
  {
    name: "Memory",
    component: "Memory",
    description: "Just the usual memory.",
    route: "memory",
    categories: ["memory"],
    scoreType: "number",
  },
  {
    name: "Order Matters",
    component: "OrderMatters",
    description: "Memorize the right order!",
    route: "order-matters",
    categories: ["memory"],
    scoreType: "number",
  },
  {
    name: "Quick Stacker",
    component: "QuickStacker",
    description: "Stack the shown stack as quickly as possible.",
    route: "quick-stacker",
    categories: ["speed"],
    scoreType: "time",
  },
  {
    name: "Quick Tapper",
    component: "QuickTapper",
    description: "Tap when the right colors appears. Be quick.",
    route: "quick-tapper",
    categories: ["speed"],
    scoreType: "time",
  },
  //nextGame
  {
    name: "Test",
    component: "Test",
    description: "testing...",
    route: "test",
    categories: ["math", "memory", "brain", "speed", "endurance"],
    scoreType: "number",
  },
];

export function getGames(): Game[] {
  if (process.env.NODE_ENV !== "development") {
    return games.slice(0, -1);
  }
  return games;
}

export const gamesScoreThresholds: { [key: string]: number[] } = {
  SpeedSolver: [0, 25, 40, 60],
  ChainSolver: [0, 25, 35, 45],
  SumItUp: [4, 10, 17, 25],
  MemoryMatrix: [4, 10, 17, 25],
  CountUp: [0, 20, 40, 50],
  CountDown: [0, 23, 45, 55],
  PickTheOperator: [0, 20, 40, 50],
  Memory: [0, 5, 12, 15],
  OrderMatters: [2, 6, 12, 18],
};

const gameTimeThresholds: { [key: string]: number[] } = {
  QuickTapper: [1, 0.8, 0.4, 0.25],
  QuickStacker: [8, 5.5, 4, 2.5],
};

const gameTimeFailMessage: { [key: string]: string } = {
  QuickTapper: "Too early",
  QuickStacker: "Wrong color",
};

export function getScoreThresholds(name: string): number[] {
  return gamesScoreThresholds[name];
}

export function getTimeThresholds(name: string): number[] {
  return gameTimeThresholds[name];
}

export function getTimeFailMessage(name: string): string {
  return gameTimeFailMessage[name];
}

export default games;
