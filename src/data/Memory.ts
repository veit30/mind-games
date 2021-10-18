import { multiplyArray, shuffleArray } from "@/helper/util";
import GameMatrix, { GameMatrixItem } from "./GameMatrix";

export default class Memory extends GameMatrix {
  constructor(items?: GameMatrixItem[]) {
    super(items);
  }
  //TODO: introduce different alphabets (to be unlockable)
  private _alphabet = "🐶🐱🐭🦊🐻🐼🐨🐷🐸🐵🐴🦄🦋🦂🦀🐙🦍🐞🐣";

  generateItems(width: number, height: number, isClickable?: boolean): void {
    if ((width * height) % 2 !== 0) {
      this._items = [];
    }
    this._width = width;
    this._height = height;

    const shuffledAlphabet = shuffleArray([...this._alphabet]);
    const array = Array.from(
      { length: (this._width * this._height) / 2 },
      (x, i) => {
        return shuffledAlphabet[i];
      }
    );
    this._items = shuffleArray(
      multiplyArray(array, 2).map((item, i) => {
        return new GameMatrixItem(item, i, isClickable || false);
      })
    );
  }

  hide(isClickable?: boolean): void {
    this._items = this._items.map((item) => {
      item.isClickable = isClickable || false;
      item.isValueHidden = true;
      return item;
    });
  }

  makeClickable(exceptions: number[]): void {
    this._items = this._items.map((i) => {
      if (exceptions.indexOf(i.id) < 0) {
        i.isClickable = true;
      }
      return i;
    });
  }
}
