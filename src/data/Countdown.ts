export default class Countdown {
  constructor(len = 0) {
    this._countdownLength = len;
  }

  private _currentValue = 0;
  private _countdownLength = 0;
  private _timer = 0;
  private _startTime = 0;
  private _exactValue = 0;
  private _isOver = false;

  get value(): number {
    return this._currentValue;
  }

  get exactValue(): number {
    return this._exactValue;
  }

  get isOver(): boolean {
    return this._isOver;
  }

  get max(): number {
    return this._countdownLength;
  }

  start(): void {
    this._isOver = false;
    this._startTime = new Date().getTime();

    this.loop();
  }

  private loop() {
    const now = new Date().getTime();
    const distance = now - this._startTime;

    const exact = distance / 1000;
    const seconds = Math.floor(exact);

    this._currentValue = this._countdownLength - seconds;
    this._exactValue = this._countdownLength - exact;

    if (this._exactValue <= 0.01) {
      this._isOver = true;
      this.reset();
    }
    cancelAnimationFrame(this._timer);
    if (!this._isOver) {
      this._timer = requestAnimationFrame(() => this.loop());
    }
  }

  reset(): void {
    cancelAnimationFrame(this._timer);
    this._timer = NaN;
    this._currentValue = 0;
    this._startTime = 0;
    this._exactValue = 0;
  }

  get isRunning(): boolean {
    return !this._isOver && this._currentValue !== 0;
  }

  set length(len: number) {
    this._countdownLength = len;
    this.reset();
  }

  get length(): number {
    return this._countdownLength;
  }
}
