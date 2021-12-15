import { readLines } from '../common.js';

export function solve(filename) {
  const data = readLines(filename).map(Number);

  return data.reduce((acc, curr, index) => {
    if (index === 0) return acc;

    if (curr > data[index - 1]) acc++;
    return acc;
  }, 0);
}

export function solve2(filename) {
  const data = readLines(filename).map(Number);

  let counter = 0;
  for (let i=3; i <= data.length - 1; i++) {
    const start = i - 3;
    const previousSum = data.slice(start, i).reduce((a, c) => a + c);
    const currentSum = data.slice(start + 1 , i + 1).reduce((a, c) => a + c);
    if (currentSum > previousSum) counter++;
  }
  return counter;
}
