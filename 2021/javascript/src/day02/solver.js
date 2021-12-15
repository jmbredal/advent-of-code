import { readLines } from '../common.js';

export function solve(filename) {
  const data = readLines(filename);

  const position = data.reduce((position, line) => {
    let [action, value] = line.split(' ');
    value = +value;

    switch (action) {
      case 'forward':
        position.horizontal += value;
        break;
      case 'up':
        position.depth -= value;
        break;
      case 'down':
        position.depth += value;
        break;
    }
    return position;
  }, { horizontal: 0, depth: 0 });

  return position.horizontal * position.depth;
}

export function solve2(filename) {
  const data = readLines(filename);
  const position = data.reduce((position, line) => {
    let [action, value] = line.split(' ');
    value = +value;

    switch (action) {
      case 'forward':
        position.horizontal += value;
        position.depth += (position.aim * value);
        break;
      case 'up':
        position.aim -= value;
        break;
      case 'down':
        position.aim += value;
        break;
    }
    return position;
  }, { horizontal: 0, depth: 0, aim: 0 });

  return position.horizontal * position.depth;
}