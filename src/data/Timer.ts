export default class Timer {
  private _value = 0;
  private _startTime = 0;
  private _currentTime = 0;
  private _timer = 0;

  start(): void {
    this._startTime = new Date().getTime();
    this.loop();
  }

  private loop(): void {
    this._currentTime = new Date().getTime();
    this._value = this._currentTime - this._startTime;

    this._timer = requestAnimationFrame(() => this.loop());
  }

  stop(): void {
    cancelAnimationFrame(this._timer);
    this._timer = NaN;
  }

  get value(): number {
    return this._value;
  }

  get seconds(): number {
    return Math.floor((this._value % (1000 * 60)) / 1000);
  }

  get time(): string {
    const min = Math.floor(this.seconds / 60);
    const sec = this.seconds % 60;
    return min > 0 ? `${min}:${sec}` : `${sec}`;
  }
}
