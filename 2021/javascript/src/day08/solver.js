import { readLines } from '../common.js';

export function solve(filename) {
  const easyDigitsLength = [2, 3, 4, 7];
  const lines = readLines(filename).map(line => line.split('|').map(part => part.trim()));
  const outputValues = lines.reduce((values, lineArray) => {
    const currentValues = lineArray[1].split(' ');
    return values.concat(currentValues);
  }, []);

  return outputValues.filter((value) => easyDigitsLength.includes(value.length)).length;
}

export function solve2(filename) {
  const lines = readLines(filename);
  const values = lines.map(getDigits);
  const sum = values.reduce((a, b) => a + b);
  return sum;
}

function getDigits(line) {
  const [patterns, values] = line.split('|').map(part => part.trim().split(' '));
  return findValue(patterns, values);
}

function findValue(patterns, values) {
  const mapping = findMapping(patterns);
  return +values.map(v => {
    const value = v.split('').sort().join('');
    return mapping.get(value)
  }).join('');
}

function findMapping(patterns) {
  const one = createSet(patterns.find(p => p.length === 2));
  const four = createSet(patterns.find(p => p.length === 4));
  const seven = createSet(patterns.find(p => p.length === 3));
  const eight = createSet(patterns.find(p => p.length === 7));

  // [0, 6, 9] = 6
  let sixes = patterns.filter(p => p.length === 6).map(createSet);

  const six = sixes.filter((x) => difference(one, x).size === 1)[0];
  sixes = sixes.filter(s => s != six);
  const nine = sixes.filter(s => difference(four, s).size === 0)[0];
  const zero = sixes.filter(s => s != nine)[0];

  // [2, 3, 5] = 5
  let fives = patterns.filter(p => p.length === 5).map(createSet);

  const three = fives.filter(x => difference(one, x).size === 0)[0];
  fives = fives.filter(d => d !== three);
  const five = fives.filter(f => difference(four, f).size === 1)[0];
  const two = fives.filter(f => f != five)[0];

  const mapping = new Map();
  mapping.set(getValue(zero), 0);
  mapping.set(getValue(one), 1);
  mapping.set(getValue(two), 2);
  mapping.set(getValue(three), 3);
  mapping.set(getValue(four), 4);
  mapping.set(getValue(five), 5);
  mapping.set(getValue(six), 6);
  mapping.set(getValue(seven), 7);
  mapping.set(getValue(eight), 8);
  mapping.set(getValue(nine), 9);

  return mapping;
}

function getValue(set) {
  return Array.from(set).sort().join('');
}

function createSet(pattern) {
  return new Set(pattern.split(''));
}

function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
      _difference.delete(elem)
  }
  return _difference
}