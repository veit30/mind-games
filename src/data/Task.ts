import { DIFFICULTY, OPERATOR } from "@/data/constants";
import { Difficulty, Operator } from "@/data/types";
import { evaluate } from "mathjs";
import {
  randomFromArray,
  randomIntInRange,
  shuffleArray,
} from "@/helpers/util";

type TaskSegment = string | number;
export type Solution = { value: number; isValid: boolean };

export default class Task {
  constructor() {
    this.new();
  }

  private _task: Array<TaskSegment> = [];
  protected _difficulty: Difficulty = DIFFICULTY.EASY;
  protected _operators: Array<Operator> = [];
  private _taskLength = 2;

  set difficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  get(): string {
    return this.buildTask(this._task).replace("*", "×").replace("/", "÷");
  }

  get solution(): number {
    return evaluate(this.buildTask(this._task));
  }

  private buildTask(task: TaskSegment[]): string {
    return task.join(" ");
  }

  getPossibleSolutions(amount: number): Array<Solution> {
    const solutions: Solution[] = Array.from({ length: amount - 1 }, () => {
      const fakeTask = this._task.slice();
      const modifyIndex = randomIntInRange(1, this._taskLength);
      let numberIndex = 0;
      for (let i = 0; i < fakeTask.length; i++) {
        if (typeof fakeTask[i] === "number") {
          numberIndex++;
          if (numberIndex === modifyIndex) {
            (fakeTask[i] as number) += randomIntInRange(-2, 2, 0);
            break;
          }
        }
      }
      const fakeSolution = evaluate(this.buildTask(fakeTask));
      return { value: fakeSolution, isValid: false };
    });
    solutions.push({ value: this.solution, isValid: true });
    return shuffleArray(solutions);
  }

  protected setOperatorByDifficulty(): void {
    switch (this._difficulty) {
      case DIFFICULTY.EASY:
        this._operators = [OPERATOR.SUBTRACT, OPERATOR.ADD, OPERATOR.MULTIPLY];
        break;
      case DIFFICULTY.MEDIUM:
        this._operators = [
          OPERATOR.SUBTRACT,
          OPERATOR.ADD,
          OPERATOR.MULTIPLY,
          OPERATOR.DEVIDE,
        ];
        break;
      case DIFFICULTY.HARD:
        this._operators = [
          OPERATOR.SUBTRACT,
          OPERATOR.ADD,
          OPERATOR.MULTIPLY,
          OPERATOR.DEVIDE,
        ];
        break;
    }
  }

  private generateTask() {
    const taskSegments = this._taskLength * 2 - 1;
    for (let i = 0; i < taskSegments; i++) {
      this._task.push(
        i % 2 === 0 ? randomIntInRange(1, 10) : randomFromArray(this._operators)
      );
    }
  }

  new(): void {
    this._task = [];
    this.setOperatorByDifficulty();
    this.generateTask();
  }
}
