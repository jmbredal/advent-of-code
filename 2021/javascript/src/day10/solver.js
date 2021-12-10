import { readLines } from '../common.js';

const startingChars = ['(', '<', '[', '{'];
const endingChars = [')', '>', ']', '}'];
const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const incompletePoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export function solve(filename) {
  const lines = readLines(filename);
  const syntaxErrors = lines.map(l => parse(l));
  const sum = syntaxErrors.filter(x => x).map(char => points[char]).sum();
  return sum;
}

export function solve2(filename) {
  const lines = readLines(filename);
  const incomplete = lines.filter(l => !parse(l));
  const scores = incomplete.map(i => findScore(i));
  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

function parse(line) {
  const chars = line.split('');
  const stack = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (startingChars.includes(char)) {
      stack.push(char);
    }

    if (endingChars.includes(char)) {
      if (isPair(stack[stack.length - 1], char)) {
        // Found pair
        stack.pop();
      } else {
        // wrong char
        return char;
      }
    }
  }
}
function findScore(line) {
  const chars = line.split('');
  const stack = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (startingChars.includes(char)) {
      stack.push(char);
    }

    if (endingChars.includes(char)) {
      if (isPair(stack[stack.length - 1], char)) {
        // Found pair
        stack.pop();
      }
    }
  }

  const score = stack.reverse().reduce((acc, curr) => {
    const char = getPair(curr);
    const value = incompletePoints[char];
    acc *= 5;
    acc += value;
    return acc;
  }, 0)

  return score;
}

function isPair(char1, char2) {
  return startingChars.indexOf(char1) === endingChars.indexOf(char2);
}

function getPair(char) {
  return endingChars[startingChars.indexOf(char)];
}