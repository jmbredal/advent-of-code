import assert from 'assert';
import { findSlopes, getCandidates, findNeighbours } from './solver.js';

const lines = [
  '2199943210',
  '3987894921',
  '9856789892',
  '8767896789',
  '9899965678',
];

const map = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

describe('day 09', () => {
  it('basic map lookup', () => {
    assert.equal(map[0][0], 2);
  });

  describe('findNeighbours', () => {
    it('should find neighbors in a corner', () => {
      const n = findNeighbours(0, 0, map);

      assert.equal(JSON.stringify(n), JSON.stringify([[1, 0], [0, 1]]));
    })

    it('should find neighbors in the middle', () => {
      const n = findNeighbours(1, 1, map);

      assert.equal(JSON.stringify(n), JSON.stringify([[0, 1], [2, 1], [1, 0], [1, 2]]));
    })
  })

  describe('getCandidates', () => {
    it('should remove peaks', () => {
      const toVisit = getCandidates([[0, 0], [0, 2], [1, 1]], map, 0, 1);
      assert.equal(toVisit.length, 0);
    })

    it('should remove lower slopes', () => {
      const toVisit = getCandidates([[0, 1], [1, 0]], map, 0, 0);
      assert.equal(JSON.stringify(toVisit), JSON.stringify([[0, 1]]));
    });

    it('should do both', () => {
      const toVisit = getCandidates(findNeighbours(0, 1, map), map, 1, 0);
      assert.equal(JSON.stringify(toVisit), JSON.stringify([[0, 0]]));
    })
  })


  describe('findSlopes', () => {
    it('should find small basin', () => {
      const slopes = findSlopes(map, 1, 0);

      assert.equal(slopes.length, 3);
      assert.equal(JSON.stringify(slopes[1]), JSON.stringify([0, 0]));
      assert.equal(JSON.stringify(slopes[2]), JSON.stringify([0, 1]));
    })

    it('findSlopes coord 9,0 = 9', () => {
      const slopes = findSlopes(map, 9, 0);
      assert.equal(slopes.length, 9);
    })

    it('findSlopes coord 2,2 = 14', () => {
      const slopes = findSlopes(map, 2, 2);
      assert.equal(slopes.length, 14);
    })

    it('findSlopes coord 6,4 = 9', () => {
      const slopes = findSlopes(map, 6, 4);
      assert.equal(slopes.length, 9);
    })
  })

});