export function wordVariants(word: string): Array<string> {
  const final = [];
  let current = "";

  const possibilities = 2 ** word.length;

  for (let i = 0; i < possibilities; i++) {
    current = "";
    for (let c = 0; c < word.length; c++) {
      const val = possibilities % (c + 2);

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
