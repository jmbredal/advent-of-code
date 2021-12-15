import { readLines } from '../common.js';

export function solve(filename) {
  const [startTemplate, rules] = parse(filename);
  let pairs = findStartPairs(startTemplate);
  const counterMap = findStartCounter(startTemplate);

  for (let i = 0; i < 10; i++) {
    pairs = updatePairs(pairs, rules, counterMap);
  }

  return findDifference(counterMap)
}

export function solve2(filename) {
  const [startTemplate, rules] = parse(filename);
  let pairs = findStartPairs(startTemplate);
  const counterMap = findStartCounter(startTemplate);

  for (let i = 0; i < 40; i++) {
    pairs = updatePairs(pairs, rules, counterMap);
  }

  return findDifference(counterMap)
}

function parse(filename) {
  const lines = readLines(filename);
  const template = lines.shift();

  const rules = lines.reduce((rules, line) => {
    const [key, value] = line.split(' -> ');
    rules[key] = value;
    return rules;
  }, {});

  return [template, rules]
}

function findStartCounter(template) {
  return template.split('').reduce((mapping, char) => {
    updateDict(mapping, char, 1);
    return mapping;
  }, {});
}

function findStartPairs(template) {
  const a = template.slice(0, template.length - 1).split('');
  const b = template.slice(1, template.length).split('');
  const pairs = a.map((char, index) => char + b[index]);
  return pairs.reduce((pairs, pair) => {
    updateDict(pairs, pair, 1)
    return pairs;
  }, {});
}

function updatePairs(pairMap, rules, counterMap) {
  const newPairMap = {};
  for (const [pair, value] of Object.entries(pairMap)) {
    const char = rules[pair];
    updateDict(counterMap, char, value);
    
    const [pair1, pair2] = createPairs(pair, rules);
    updateDict(newPairMap, pair1, value);
    updateDict(newPairMap, pair2, value);
  }

  return newPairMap;
}

function createPairs(key, rules) {
  const char = rules[key];
  const pair1 = key[0] + char;
  const pair2 = char + key[1];
  return [pair1, pair2];
}

function updateDict(dict, key, value) {
  if (key in dict) { 
    dict[key] += value;
  } else { 
    dict[key] = value;
  }
}

function findDifference(map) {
  const sorted = Object.values(map).sortNumerically();
  return sorted[sorted.length - 1] - sorted[0];
}
