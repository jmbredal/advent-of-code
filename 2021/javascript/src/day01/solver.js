import { readLines } from '../common.js';

const data = readLines(`src/day01/data`).map(x => +x);
const solution = solve(data);
console.log(`Solution day 01:`, solution);

export function solve(data) {
  const combinations = data.reduce((acc, curr, index, arr) => {
    const pairs = arr.slice(index + 1).map(x => [curr, x]);
    return acc.concat(pairs);
  }, []);

  const [a, b] = combinations.filter(c => {
    const [a, b] = c;
    return a + b == 2020;
  })[0];

  return a * b;
}
