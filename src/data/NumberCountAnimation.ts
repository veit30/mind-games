import { easeOutQuad } from "@/helper/util";

export default class NumberCountAnimation {
  constructor(from: number, to: number, time: number) {
    this.from = from;
    this.to = to;
    this.time = time; //in ms
    this._startTime = 0;
  }

  from = 0;
  to = 0;
  private _current = 0;
  private _animationFrame = 0;
  private _startTime: number;
  private _isAnimationOver = true;
  time = 0;

  get current(): number {
    return this._current;
  }

  start(): void {
    this._startTime = new Date().getTime();
    this._isAnimationOver = false;
    this.loop();
  }

  private loop(): void {
    const now = new Date().getTime();
    const distance = now - this._startTime;
    const factor = distance / this.time;

    if (factor >= 1) {
      this._isAnimationOver = true;
      this._current = this.to;
    } else {
      const easedFactor = easeOutQuad(factor);
      const range = this.to - this.from;
      this._current = this.from + Math.ceil(easedFactor * range);
    }

    cancelAnimationFrame(this._animationFrame);
    if (!this._isAnimationOver) {
      this._animationFrame = requestAnimationFrame(() => this.loop());
    }
  }
}
