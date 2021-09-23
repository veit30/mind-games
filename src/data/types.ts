import { DIFFICULTY, OPERATOR } from "@/data/constants";

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY];

export type Operator = typeof OPERATOR[keyof typeof OPERATOR];

export type ActionButtonOptions = {
  name: string;
  alternative: string;
  label: string;
  clickEvent: string;
};
