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
  constructor(length = 2, isStepped = false, numberRange?: number) {
    this._taskLength = length > 0 ? length : 2;
    this._isStepped = isStepped;
    this._numberRange = numberRange || 10;
    this.new();
  }

  private _task: Array<TaskSegment> = [];
  protected _difficulty: Difficulty = DIFFICULTY.EASY;
  protected _operators: Array<Operator> = [];
  private _taskLength: number;
  private _isStepped: boolean;
  private _numberRange = 10;

  set difficulty(difficulty: Difficulty) {
    this._difficulty = difficulty;
  }

  set isStepped(isStepped: boolean) {
    this._isStepped = isStepped;
  }

  get(): string {
    return this.buildTask().replace("*", "×").replace("/", "÷");
  }

  get solution(): number {
    return evaluate(this.buildTask());
  }

  get taskSteps(): string[] {
    const steps = [];
    let taskStep = "";
    for (const segment of this._task) {
      if (segment === "*") {
        taskStep += "×";
      } else if (segment === "/") {
        taskStep += "÷";
      } else {
        taskStep += `${segment}`;
      }
      if (typeof segment === "number") {
        steps.push(taskStep);
        taskStep = "";
      }
    }
    return steps;
  }

  buildTask(taskSegments?: TaskSegment[]): string {
    const task: TaskSegment[] = taskSegments || this._task;

    if (!this._isStepped) {
      return task.join(" ");
    }

    let subtask = "";
    let counter = 0;
    for (const segment of task) {
      if (segment === "*") {
        counter = 3;
        subtask = `(${subtask})`;
      } else if (counter === 1) {
        subtask = `(${subtask})`;
      }
      subtask += " " + segment;
      counter = counter === 0 ? counter : counter - 1;
    }
    return subtask;
  }

  getPossibleSolutions(amount: number): Array<Solution> {
    // TODO: rewrite for more than 2 solutions
    let solutions: Solution[] = [];
    if (this._isStepped) {
      solutions = Array.from({ length: amount - 1 }, () => {
        const fakeTask = this._task.slice();
        let fakeSolution = evaluate(this.buildTask(fakeTask));
        fakeSolution += randomIntInRange(-10, 10, 0);
        return { value: fakeSolution, isValid: false };
      });
    } else {
      solutions = Array.from({ length: amount - 1 }, () => {
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
    }
    solutions.push({ value: this.solution, isValid: true });
    return shuffleArray(solutions);
  }

  protected setOperatorByDifficulty(): void {
    // ignore difficulty when stepped
    if (this._isStepped) {
      this._operators = [OPERATOR.SUBTRACT, OPERATOR.ADD];
      return;
    }

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
        i % 2 === 0
          ? randomIntInRange(1, this._numberRange)
          : randomFromArray(this._operators)
      );
    }
  }

  new(length?: number): void {
    console.log(324234);

    this._taskLength = length || this._taskLength;
    this._task = [];
    this.setOperatorByDifficulty();
    this.generateTask();
  }
}
