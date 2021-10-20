export default class NumberCountAnimation {
  constructor(from: number, to: number, time: number) {
    this._from = from;
    this._to = to;
    this.time = time; //in ms
  }

  private _from = 0;
  private _to = 0;
  time = 0;

  set from(from: number) {
    this._from = from;
  }

  set to(to: number) {
    this._to = to;
  }

  start(): void {
    console.log("todo");
  }

  private loop(): void {
    const now = new Date().getTime();
    console.log(now);
  }
}
