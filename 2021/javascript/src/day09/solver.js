import { readLines } from '../common.js';

export function solve(filename) {
  const lines = readLines(filename);
  const map = createMap(lines);
  const lowPoints = findLowPoints(map);
  const lowPointValues = findLowPointValues(lowPoints, map);
  const riskLevels = lowPointValues.map(p => +p + 1);
  const sum = riskLevels.reduce((a, b) => a + b);
  return sum;
}

export function solve2(filename) {
  const lines = readLines(filename);
  const map = createMap(lines);
  const lowPoints = findLowPoints(map);
  const basins = findBasinSizes(lowPoints, map);

  // find the three largest
  const product = basins.sort((x, y) => y - x).slice(0, 3).reduce((a, b) => a * b);
  return product
}

function createMap(lines) {
  return lines.map((line) => line.split('').map(Number));
}

function findLowPointValues(lowPoints, map) {
  return lowPoints.map(point => {
    const [x, y] = point;
    return map[y][x];
  });
}

function findLowPoints(map) {
  return map.reduce((result, row, rowNumber) => {
    const lowestPointsInRow = findLowestPointsInRow(row, rowNumber, map);
    return result.concat(lowestPointsInRow);
  }, []);
}

function findLowestPointsInRow(row, rowNumber, map) {
  return row.reduce((acc, pointValue, index) => {
    if (isLowestPoint(index, rowNumber, map)) {
      acc.push([index, rowNumber]);
    }
    return acc;
  }, []);
}

function isLowestPoint(x, y, map) {
  const neighbors = findNeighbours(x, y, map);
  const pointValue = map[y][x];
  return neighbors.filter(n => {
    const [nX, nY] = n;
    return map[nY][nX] <= pointValue;
  }).length === 0;
}

export function findNeighbours(x, y, map) {
  const neighbours = [];
  const height = map.length;
  const width = map[0].length;

  if (x > 0) {
    neighbours.push([x - 1, y]);
  }

  if (x < width - 1) {
    neighbours.push([x + 1, y]);
  }

  if (y > 0) {
    neighbours.push([x, y - 1]);
  }

  if (y < height - 1) {
    neighbours.push([x, y + 1]);
  }

  return neighbours;
}

function findBasinSizes(lowPoints, map) {
  return lowPoints.map((point) => {
    const [x, y] = point;
    return findBasinSize(map, x, y);
  })
}

function findBasinSize(map, x, y) {
  return findSlopes(map, x, y).length;
}

// Recursive function for climbing a slope
export function findSlopes(map, x, y) {
  const neighbours = findNeighbours(x, y, map);
  const toVisit = getCandidates(neighbours, map, x, y);

  let visitedPoints = [[x, y]];
  toVisit.map(s => {
    const [x, y] = s;
    const vt = findSlopes(map, x, y);
    visitedPoints = visitedPoints.concat(vt);
  });

  return removeDuplicates(visitedPoints);
}

function removeDuplicates(points) {
  const hash = [];
  return points.reduce((acc, curr) => {
    const point = JSON.stringify(curr);
    if (!hash.includes(point)) {
      hash.push(point);
      acc.push(curr);
    }
    return acc;
  }, []);
}

export function getCandidates(neighbours, map, x, y) {
  // Remove neighbours that are tops (value == 9) and that are lower
  return neighbours
    .filter(n => {
      const [nX, nY] = n;
      const isPeak = map[nY][nX] === 9
      const isTaller = map[nY][nX] > map[y][x];
      return isTaller && !isPeak;
    });
}