type GameCategory = "Math" | "Memory" | "Brain" | "Speed" | "Endurance";
export type Game = {
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
    description: "Count from 1 to 49",
    route: "count-up",
    category: "Brain",
  },
  {
    name: "Count Down",
    component: "CountDown",
    description: "Count down from 49 to 1.",
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
    description: "Just the usual memory.",
    route: "memory",
    category: "Memory",
  },
  //nextGame
  {
    name: "Test",
    component: "Test",
    description: "testing...",
    route: "test",
    category: "Brain",
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
};

export function getScoreThresholds(name: string): number[] {
  return gamesScoreThresholds[name];
}

export default games;
