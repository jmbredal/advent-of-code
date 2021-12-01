import assert from 'assert';
import { solve, solve2 } from './solver.js';
import { readLines } from '../common.js';

const testdata = readLines('src/day01/testdata').map(d => +d);

describe('day 01', () => {
  it('tests should run', () => {
    assert.equal(1, 1);
  });

  it('should solve task 1', () => {
    const solution = solve(testdata);
    assert.equal(solution, 7);
  })

  it('should solve task 2', () => {
    const solution = solve2(testdata);
    assert.equal(solution, 5);
  })
});