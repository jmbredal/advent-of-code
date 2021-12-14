import { readLines } from '../common.js';

solve('input')

export function solve(filename) {
  const [startTemplate, rules] = parse(filename);

  let template = startTemplate;
  for (let index = 0; index < 10; index++) {
    const pairs = createPairs(template);
    let newTemplate = pairs.reduce((acc, pair) => {
      acc.push(update(pair, rules));
      return acc;
    }, []).join('');
    newTemplate = newTemplate + template[template.length - 1];
    template = newTemplate;
  }

  const mapping = template.split('').reduce((mapping, char) => {
    if (mapping[char]) {
      mapping[char]++;
    } else {
      mapping[char] = 1;
    }
    return mapping;
  }, {});

  const sorted = Object.entries(mapping).sort((a, b) => a[1] - b[1]);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  console.log(max[1] - min[1]);
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

function createPairs(template) {
  const pairs = [];
  for (let index = 0; index < template.length - 1; index++) {
    pairs.push(template.slice(index, index + 2));
  }
  return pairs;
}

function update(pair, rules) {
  const [a, b] = pair.split('');
  return [a, rules[pair]].join('');
}