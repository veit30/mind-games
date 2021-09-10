export function wordVariants(word: string): Array<string> {
  const final = [];
  let current = "";

  const possibilities = 2 ** word.length;

  for (let i = 0; i < possibilities; i++) {
    current = "";
    for (let c = 0; c < word.length; c++) {
      const a = 2 ** (c + 1);
      const b = a + i;
      const d = b % a;
      const f = d * 2 >= a;

      current += f ? word[c] : word[c].toUpperCase();
    }
    final.push(current);
  }
  return final;
}

export function roundDecimal(num: number, decimals: number): number {
  const quotient = 10 ** decimals;
  return Math.round((num + Number.EPSILON) * quotient) / quotient;
}

export function randomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFromArray(arr: Array<unknown>): unknown {
  return arr[Math.floor(Math.random() * arr.length)];
}
