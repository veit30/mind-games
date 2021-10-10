import Color from "@/data/Color";
import { shuffleArray } from "@/helper/util";

export type GameMatrixItemValue = Color | string | number | boolean;

export class GameMatrixItem {
  constructor(value: GameMatrixItemValue, id: number, isClickable?: boolean) {
    this.value = value;
    this.id = id;
    this.isClickable = isClickable || false;
  }

  value: GameMatrixItemValue;
  id: number;
  isClickable: boolean;

  get type(): string {
    if (typeof this.value === "object") {
      return "color";
    }
    return typeof this.value;
  }

  get isActive(): boolean {
    return this.type === "boolean" && !!this.value;
  }
}

export default class GameMatrix {
  constructor(items?: GameMatrixItem[]) {
    this.items = items || [];
    if (items && items.length) {
      this._width = Math.ceil(Math.sqrt(this.items.length));
      this._height = Math.ceil(items.length / this._width);
    }
  }

  items: GameMatrixItem[] = [];
  _width = 0;
  _height = 0;

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get(id: number): GameMatrixItem | null {
    return (
      this.items.find((item) => {
        return item.id === id;
      }) ?? null
    );
  }

  addItem(item: GameMatrixItem): void {
    this.items.push(item);
  }

  compareTo(matrix: GameMatrix): boolean {
    for (let i = 0; i < matrix.items.length; i++) {
      if (matrix.items[i].value !== this.items[i].value) {
        return false;
      }
    }
    return true;
  }

  generateItems(
    width: number,
    height: number,
    defaultValue: GameMatrixItemValue = "",
    isClickable?: boolean
  ): void {
    const length = width * height;
    this._height = height;
    this._width = width;
    this.items = Array.from(
      { length: length },
      (x, i) => new GameMatrixItem(defaultValue, i, isClickable || false)
    );
  }

  shuffle(): void {
    this.items = shuffleArray(this.items);
  }

  //TODO: refactor for more usecases
  changeItemValue(amount: number, value: GameMatrixItemValue): void {
    this.items = this.items.map((item, idx) => {
      if (idx < amount) {
        item.value = value;
      }
      return item;
    });
  }
}
