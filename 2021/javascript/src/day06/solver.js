import { readLines } from '../common.js';

export function solve(filename, days=80) {
  const fishes = readLines(filename)[0].split(',').map(Number);

  let solution = Array(8 + 1).fill(0);

  fishes.forEach(n => {
    solution[n]++;
  });

  for (let i = 0; i < days; i++) {
    solution = iterate(solution);
  }

  return solution.reduce((a, b) => a + b);
}

export function solve2(filename) {
  return solve(filename, 256)
}

function iterate(numbers) {
  const zero = numbers[0];

  for (let i = 0; i <= 7; i++) {
    numbers[i] = numbers[i + 1];
  }

  numbers[6] += zero;
  numbers[8] = zero;

  return numbers;
}
