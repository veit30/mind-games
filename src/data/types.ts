import { DIFFICULTY, OPERATOR, GAME_STATE } from "@/data/constants";
import Task from "@/data/Task";
import type { Solution } from "@/data/Task";

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY];

export type Operator = typeof OPERATOR[keyof typeof OPERATOR];

export type ActionButtonOptions = {
  name: string;
  alternative: string;
  code?: string;
  label: string;
  clickEvent: string;
  isFullSize: boolean;
  hasExtraBorder?: boolean;
  hasFlyOut?: boolean;
  flyOutTrigger?: number;
};

export interface FlyOutActionButtonOptions extends ActionButtonOptions {
  flyOutTrigger: number;
}

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

export function isFlyOutActionButtonOptions(
  item: ActionButtonOptions | FlyOutActionButtonOptions
): item is FlyOutActionButtonOptions {
  return (item as FlyOutActionButtonOptions).flyOutTrigger !== undefined;
}
