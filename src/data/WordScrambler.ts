import { easeOutQuad, shuffleArray, wordVariants } from "@/helper/util";

export default class WordScrambler {
  constructor(word: string, length: number) {
    this._word = word;
    this.animationLength = length; //in ms
    this._startTime = 0;
    this.generateScrambles();
  }

  private _word = "";
  private _scrambles: string[] = [];
  private _isAnimationOver = false;
  animationLength = 1;
  private _startTime: number;
  private _animationFrame = 0;
  private _scrambleIndex = 0;
  private _scrableAlphabet = [
    "A",
    "B",
    "C",
    "Č",
    "Ć",
    "D",
    "Đ",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "Š",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ž",
    "a",
    "b",
    "c",
    "č",
    "ć",
    "d",
    "đ",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "š",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "ž",
    "Ă",
    "Â",
    "Ê",
    "Ô",
    "Ơ",
    "Ư",
    "ă",
    "â",
    "ê",
    "ô",
    "ơ",
    "ư",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "?",
    "!",
    "(",
    "%",
    ")",
    "[",
    "#",
    "]",
    "{",
    "@",
    "}",
    "/",
    "&",
    "<",
    "-",
    "+",
    "÷",
    "×",
    "=",
    "$",
    "€",
    "£",
    "¥",
    "¢",
    "*",
  ];

  get word(): string {
    return this._word;
  }

  set word(word: string) {
    this._word = word;
    this._scrambles = wordVariants(word);
  }

  get currentWord(): string {
    if (this._isAnimationOver) {
      return this._word;
    } else {
      return this._scrambles[this._scrambleIndex];
    }
  }

  get isAnimationOver(): boolean {
    return this._isAnimationOver;
  }

  start(): void {
    this._startTime = new Date().getTime();
    this._isAnimationOver = false;
    this.loop();
  }

  private loop() {
    const now = new Date().getTime();
    const distance = now - this._startTime;

    const factor = distance / this.animationLength;

    if (factor >= 1) {
      this._isAnimationOver = true;
    } else {
      const easedFactor = easeOutQuad(factor);
      this._scrambleIndex = Math.ceil(this._scrambles.length * easedFactor) - 1;
    }

    cancelAnimationFrame(this._animationFrame);
    if (!this._isAnimationOver) {
      this._animationFrame = requestAnimationFrame(() => this.loop());
    }
  }

  private generateScrambles(): void {
    const parts = this._word.length + 1;

    this._scrambles = Array.from({ length: parts }, (x, i) => {
      return Array.from({ length: this._word.length * 3 }, () => {
        return (
          this._word.slice(0, i) +
          shuffleArray(this._scrableAlphabet)
            .slice(0, this._word.length - i)
            .join("")
        );
      });
    }).flat();
  }
}
