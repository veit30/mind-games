import { multiplyArray, shuffleArray } from "@/helper/util";
import GameMatrix, { GameMatrixItem } from "./GameMatrix";

export default class Memory extends GameMatrix {
  constructor(items?: GameMatrixItem[]) {
    super(items);
  }

  private _alphabet = "🐶🐱🐭🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐴🦄🦋🦂🦀🐙🦍🐞🐣";

  generateItems(width: number, height: number): void {
    if ((width * height) % 2 !== 0) {
      this._items = [];
    }
    this._width = width;
    this._height = height;

    const shuffledAlphabet = shuffleArray([...this._alphabet]);
    let array = Array.from(
      { length: (this._width * this._height) / 2 },
      (x, i) => {
        return new GameMatrixItem(shuffledAlphabet[i], i, true);
      }
    );
    array = multiplyArray(array, 2);
    this._items = shuffleArray(array);
  }
}
