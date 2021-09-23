import Task from "@/data/Task";
import { DIFFICULTY } from "@/data/constants";
import { Difficulty } from "@/data/types";

export default class Equation extends Task {
  constructor() {
    super();
    this.new();
  }

  private _equation: Array<string> = [];
  protected _difficulty: Difficulty = DIFFICULTY.EASY;

  set difficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  get(): string {
    return this._equation.join(" ");
  }

  new(): void {
    this.setOperatorByDifficulty();
  }
}
