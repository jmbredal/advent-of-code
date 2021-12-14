import { readLines } from '../common.js';

solve('testdata')

export function solve(filename) {
  const [startTemplate, rules] = parse(filename);

  const pairs = { 'NN': 1, 'NC': 1, 'CB': 1 };
  for (let index = 0; index < 2; index++) {
    updatePairs(pairs, rules);
  }

  console.log(pairs);


  // const mapping = template.split('').reduce((mapping, char) => {
  //   if (mapping[char]) {
  //     mapping[char]++;
  //   } else {
  //     mapping[char] = 1;
  //   }
  //   return mapping;
  // }, {});

  // const sorted = Object.entries(mapping).sort((a, b) => a[1] - b[1]);
  // const min = sorted[0];
  // const max = sorted[sorted.length - 1];
  // console.log(max[1] - min[1]);
}

export function solve2(filename) {
  const [template, rules] = parse(filename);
  console.log(template);
  console.log(rules);
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

function updatePairs(pairMap, rules) {
  console.log(pairMap);
  const newMap = {};
  for (const key in pairMap) {
    const newPair = key[0] + rules[key];
    if (newMap[newPair]) {
      newMap[newPair]++;
    } else {
      newMap[newPair] = 1;
    }
  }
  return newMap;
}

function* createPairs(template) {
  for (let index = 0; index < template.length - 1; index++) {
    yield template.slice(index, index + 2);
  }
}
