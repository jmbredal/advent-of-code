import { readLines } from '../common.js';

// solve('testdata');
// solve('input');

export function solve(filename) {
  const lines = readLines(filename);
  const lowPoints = findLowPoints(lines);
  const riskLevels = lowPoints.map(p => +p + 1);
  const sum = riskLevels.reduce((a, b) => a + b);
  return sum;
}

export function solve2() {
  return 'Not implemented'
}

function findLowPoints(lines) {
  return lines
    .map((line, lineNumber) => findLowpointsOnLine(line, lineNumber, lines))
    .reduce((acc, curr) => acc.concat(curr), []);  // concat arrays
}

function findLowpointsOnLine(line, lineNumber, lines) {
  const numbers = line.split('').map(Number);
  return numbers.filter((number, index) => {
    const neighbours = [];

    if (index > 0) {
      neighbours.push(numbers[index - 1]);
    }

    if (index < numbers.length - 1) {
      neighbours.push(numbers[index + 1]);
    }

    if (lineNumber > 0) {
      neighbours.push(+lines[lineNumber - 1][index]);
    }

    if (lineNumber < lines.length - 1) {
      neighbours.push(+lines[lineNumber + 1][index]);
    }
    const isLowest = neighbours.filter((n) => +n <= number).length === 0;
    return isLowest;
  });
}