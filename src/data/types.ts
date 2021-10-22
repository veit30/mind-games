import { DIFFICULTY, OPERATOR, GAME_STATE } from "@/data/constants";

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY];

export type Operator = typeof OPERATOR[keyof typeof OPERATOR];

export type ActionButtonOptions = {
  name: string;
  alternative: string;
  code?: string;
  label: string;
  clickEvent: {
    event: string;
    value?: unknown;
  };
  isFullSize: boolean;
  hasExtraBorder?: boolean;
  hasFlyOut?: boolean;
  actionCounter?: number;
};

export interface FlyOutActionButtonOptions extends ActionButtonOptions {
  actionCounter: number;
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

export type GameInfo = { id: number; info: string; value: boolean };

export function isFlyOutActionButtonOptions(
  item: ActionButtonOptions | FlyOutActionButtonOptions
): item is FlyOutActionButtonOptions {
  return (item as FlyOutActionButtonOptions).hasFlyOut !== undefined;
}

export type ScoreElement = {
  id: number;
  info: string;
  value: number;
};
