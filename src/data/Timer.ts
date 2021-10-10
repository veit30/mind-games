export default class Timer {
  private _value = 0;
  private _startTime = 0;
  private _currentTime = 0;
  private _timer = 0;
  private _isStopped = true;

  start(): void {
    this._startTime = new Date().getTime();
    this._isStopped = false;
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
    this._isStopped = true;
  }

  reset(): void {
    this.stop();
    this._value = 0;
    this._startTime = 0;
    this._currentTime = 0;
  }

  get value(): number {
    return this._value;
  }

  get seconds(): number {
    return Math.floor(this._value / 1000);
  }

  get time(): string {
    const min = Math.floor(this.seconds / 60);
    const sec = this.seconds % 60;
    return min > 0 ? (sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`) : `${sec}`;
  }

  get minutes(): number {
    return Math.floor(this.seconds / 60);
  }

  get isStopped(): boolean {
    return this._isStopped;
  }
}
