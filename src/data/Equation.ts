import { OPERATOR, operatorMapper, OPERATOR_COLLECTION } from "./constants";
import Task from "@/data/Task";
import { Operator } from "./types";
import { shuffleArray } from "@/helper/util";

export default class Equation extends Task {
  constructor() {
    super();
    this.new();
  }

  private _equation: Array<string | number> = [];

  toString(): string {
    return this._equation.map(operatorMapper).join(" ");
  }

  getWithoutOperator(hiddenOperatorIndex: number): string {
    let operatorCount = 0;
    const fakeEquation = this._equation.map((ts) => {
      if (
        typeof ts === "string" &&
        (OPERATOR_COLLECTION.FULL as string[]).includes(ts)
      ) {
        if (operatorCount === hiddenOperatorIndex) {
          operatorCount += 1;
          return "_";
        }
      }
      return ts;
    });
    return fakeEquation.join(" ");
  }

  get usedOperators(): Operator[] {
    return this._equation.filter((ts) => {
      return (
        typeof ts === "string" &&
        (OPERATOR_COLLECTION.FULL as string[]).includes(ts)
      );
    }) as Operator[];
  }

  getPossibleOperators(hiddenOperatorIndex: number): string[] {
    const operators = this.usedOperators;
    const shuffledOperators = shuffleArray(this._operators);
    const extraOperators = shuffledOperators.filter((op) => {
      return op !== operators[hiddenOperatorIndex];
    });
    return shuffleArray([
      operators[hiddenOperatorIndex],
      extraOperators[0],
    ]).map(operatorMapper);
  }

  getWithReplacedOperator(
    operator: string,
    hiddenOperatorIndex: number
  ): string {
    return this.getWithoutOperator(hiddenOperatorIndex).replace("_", operator);
  }

  hasOperatorAtIndex(op: string, hiddenOperatorIndex: number): boolean {
    const operators = this.usedOperators;
    return operatorMapper(operators[hiddenOperatorIndex]) === op;
  }

  new(): void {
    super.new();
    this._equation = [...this.steps];
    this._equation.push(OPERATOR.EQUAL);
    this._equation.push(this.solution);
  }
}
