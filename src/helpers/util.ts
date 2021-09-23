export function wordVariants(word: string): Array<string> {
  const final = [];
  let current = "";

  const possibilities = 2 ** word.length;

  for (let i = 0; i < possibilities; i++) {
    current = "";
    for (let c = 0; c < word.length; c++) {
      const a = 2 ** (c + 1);
      const f = ((a + i) % a) * 2 >= a;

      current += f ? word[c] : word[c].toUpperCase();
    }
    final.push(current);
  }
  return final;
}

/**
 * Rounds a number to decimals.
 * @param {number} num Initial number.
 * @param {number} decimals The amount of decimals the number will be rounded to.
 */
export function roundDecimal(num: number, decimals: number): number {
  const quotient = 10 ** decimals;
  return Math.round((num + Number.EPSILON) * quotient) / quotient;
}

/**
 * Returns random int between two numbers.
 * @param {number} min The minimum number.
 * @param {number} max The maximum number.
 * @param {number} exclude A number that will not be returned.
 */
export function randomIntInRange(
  min: number,
  max: number,
  exclude = NaN
): number {
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  while (rand === exclude) {
    rand = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return rand;
}

/**
 * Returns random item from generic array.
 * @param {Array} arr items An array containing the items.
 */
export function randomFromArray<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} arr items An array containing the items.
 */
export function shuffleArray<T>(arr: Array<T>): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
