import assert from 'assert';
import { solve } from './solver.js';
import { readLines } from '../common.js';

const testdata = readLines('src/day01/testdata').map(d => +d);

describe('day 01', () => {
  it('tests should run', () => {
    assert.equal(1, 1);
  });

  it('should find correct product', () => {
    const solution = solve(testdata);
    assert.equal(solution, 514579);
  })
});