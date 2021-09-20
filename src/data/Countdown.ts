export default class Countdown {
  constructor(len = 0) {
    this._countdownLength = len;
  }

  private _currentValue = 0;
  private _countdownLength = 0;
  private _interval = 0;
  private _startTime = 0;
  private _exactValue = 0;
  private _isOver = false;

  get value() {
    return this._currentValue;
  }

  get exactValue() {
    return this._exactValue;
  }

  get isOver() {
    return this._isOver;
  }

  start() {
    this._isOver = false;
    this._startTime = new Date().getTime();

    this._interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - this._startTime;

      const exact = (distance % (1000 * 60)) / 1000;
      const seconds = Math.floor(exact);

      this._currentValue = this._countdownLength - seconds;
      this._exactValue = this._countdownLength - exact;

      if (this._exactValue <= 1) {
        this._isOver = true;
        this.reset();
      }
    }, 100);
  }

  reset() {
    clearInterval(this._interval);
    this._currentValue = 0;
    this._startTime = 0;
    this._exactValue = 0;
  }

  set length(len: number) {
    this._countdownLength = len;
  }

  get length() {
    return this._countdownLength;
  }
}
