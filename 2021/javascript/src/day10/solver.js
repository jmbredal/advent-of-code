import { readLines } from '../common.js';

const startingChars = ['(', '<', '[', '{'];
const closingChars = [')', '>', ']', '}'];
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
  const syntaxErrors = lines.map(l => findErrors(l));
  const sum = syntaxErrors.filter(x => x).map(char => points[char]).sum();
  return sum;
}

export function solve2(filename) {
  const lines = readLines(filename);
  const incompleteLines = lines.filter(l => !findErrors(l));
  const scores = incompleteLines.map(i => findScore(i)).sortNumerically();
  return scores[Math.floor(scores.length / 2)];
}

function findErrors(line) {
  const stack = [];

  for (const char of line) {
    if (startingChars.includes(char)) {
      stack.push(char);
    } else {
      const topOfStack = stack[stack.length - 1];
      if (isPair(topOfStack, char)) {
        // Found pair
        stack.pop();
      } else {
        // wrong char, return error
        return char;
      }
    }
  }

  // returns undefined if no errors or incomplete
}

function findScore(line) {
  const stack = [];

  for (const char of line) {
    if (startingChars.includes(char)) {
      stack.push(char);
    } else {
      // This must be a closing char
      const topOfStack = stack[stack.length - 1];
      if (isPair(topOfStack, char)) {
        stack.pop();
      }
    }
  }

  return calculateScore(stack);
}

function calculateScore(stack) {
  return stack.reverse().reduce((score, startingChar) => {
    const closingChar = getMatchingChar(startingChar);
    const charValue = incompletePoints[closingChar];
    score *= 5;
    score += charValue;
    return score;
  }, 0);
}

function isPair(char1, char2) {
  return startingChars.indexOf(char1) === closingChars.indexOf(char2);
}

function getMatchingChar(char) {
  return closingChars[startingChars.indexOf(char)];
}