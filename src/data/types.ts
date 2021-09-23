import { DIFFICULTY, OPERATOR } from "@/data/constants";

export type Difficulty = typeof DIFFICULTY[keyof typeof DIFFICULTY];

export type Operator = typeof OPERATOR[keyof typeof OPERATOR];
