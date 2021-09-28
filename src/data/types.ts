import { DIFFICULTY, OPERATOR, GAME_STATE } from "@/data/constants";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY];

export type Operator = typeof OPERATOR[keyof typeof OPERATOR];

export type ActionButtonOptions = {
  name: string;
  alternative: string;
  label: string;
  clickEvent: string;
  isFullSize: boolean;
  hasExtraBorder?: boolean;
};

export type GameStep = {
  state: GameState;
  name: string;
};

export type GameState = typeof GAME_STATE[keyof typeof GAME_STATE];

export type MetaData = {
  title: string;
  metaTags: Array<{ name?: string; content: string; property?: string }>;
};

export type TaskResult = { task: Task; solution: Solution };

export type SquareItem = { key: string; value: string | number | boolean };
