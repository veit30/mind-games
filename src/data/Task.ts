import { OPERATOR, OPERATOR_COLLECTION } from "@/data/constants";
import { Operator } from "@/data/types";
import { evaluate } from "mathjs";
import { randomFromArray, randomIntInRange, shuffleArray } from "@/helper/util";

export default class Task {
  constructor(
    length = 2,
    options?: {
      isStepped?: boolean;
      numberRange?: number;
      operators?: Operator[];
    }
  ) {
    this._taskLength = length > 1 ? length : 2;
    if (options) {
      this._numberRange = options.numberRange || 10;
      this._operators = options.operators || OPERATOR_COLLECTION.AVERAGE;
    }
    this.new();
  }

  protected _task = "";
  protected _operators: Operator[] = OPERATOR_COLLECTION.AVERAGE;
  private _taskLength: number;
  private _numberRange = 10;

  toString(): string {
    return this._task.replace("*", "×").replace("/", "÷");
  }

  get solution(): number {
    return evaluate(this._task);
  }

  get length(): number {
    return this._taskLength;
  }

  set length(length: number) {
    this._taskLength = length;
  }

  get operators(): Operator[] {
    return this._operators;
  }

  get steps(): string[] {
    return this._task.split(" ");
  }

  get taskSteps(): string[] {
    const steps = [];
    let taskStep = "";
    for (const segment of this._task.split(" ")) {
      taskStep += `${segment}`;
      if (parseInt(segment)) {
        steps.push(taskStep);
        taskStep = "";
      }
    }
    return steps;
  }

  get segmentsWithSign(): string[] {
    return this.taskSteps.map((seg) => {
      if (seg.startsWith("+") || seg.startsWith("*") || seg.startsWith("/")) {
        return seg.slice(1);
      }
      return seg;
    });
  }

  get fakeSolution(): number {
    const splitted = this._task.split(" ");
    const randomNumIdx = shuffleArray(
      splitted
        .map((ts, i) => {
          if (parseInt(ts)) {
            return i;
          }
          return -1;
        })
        .filter((idx) => {
          return idx >= 0;
        })
    )[0];
    let num = parseInt(splitted[randomNumIdx]);
    const newNum = (num += randomIntInRange(-2, 2, 0));
    splitted[randomNumIdx] = `${newNum}`;
    return Math.floor(evaluate(splitted.join("")));
  }

  new(length?: number): void {
    this._taskLength = length || this._taskLength;
    const firstNumber = randomIntInRange(1, this._numberRange) + "";
    this._task = Array.from({ length: this._taskLength - 1 }, () => {
      return randomFromArray(this._operators);
    }).reduce((task: string, op: Operator) => {
      const b = randomIntInRange(1, this._numberRange);
      if ((OPERATOR_COLLECTION.BASIC as string[]).includes(op)) {
        return `${task} ${op} ${b}`;
      } else if (op === OPERATOR.DEVIDE) {
        const solution = evaluate(`( ${task} ) * ${b}`);
        return task.indexOf(" ") >= 0
          ? `${solution} / ( ${task} )`
          : `${solution} / ${task}`;
      } else {
        return task.indexOf(" ") >= 0 ? `( ${task} ) * ${b}` : `${task} * ${b}`;
      }
    }, firstNumber);
  }
}
