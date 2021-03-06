import { readLines, getNeighbors, createMap, range } from '../common.js';

export function solve(filename) {
  const lines = readLines(filename);
  const valueMap = createMap(lines);
  const distanceMap = valueMap.map(line => {
    return Array.from(line).fill(999999999);
  })

  distanceMap[0][0] = 0;
  let coords = [createCell(0, 0, 0)];
  while (coords.length > 0) {
    step(coords, valueMap, distanceMap);
  }

  return distanceMap[distanceMap.length - 1][distanceMap[0].length - 1];
}

export function solve2(filename) {
  const lines = readLines(filename);
  const valueMap = createBigMap(createMap(lines));
  const distanceMap = valueMap.map(line => {
    return Array.from(line).fill(999999999);
  })

  distanceMap[0][0] = 0;
  let coords = [createCell(0, 0, 0)];
  while (coords.length > 0) {
    step(coords, valueMap, distanceMap);
  }

  return distanceMap[distanceMap.length - 1][distanceMap[0].length - 1];
}

function createCell(x, y, distance) {
  return { x, y, distance };
}

export function createBigMap(map) {
  const bigMap = duplicateHorizontally(map, 5);
  return duplicateVertically(bigMap, 5);
}

export function duplicateHorizontally(map, times) {
  return map.map(row => {
    return range(times).reduce((acc, curr) => {
      const duplicate = addToLine(row, curr);
      return acc.concat(duplicate);
    }, []);
  });
}

export function duplicateVertically(map, times) {
  return range(times - 1).reduce((acc, index) => {
    const duplicate = map.map(line => addToLine(line, index + 1));
    return acc.concat(duplicate);
  }, [...map]);
}

// Create new array with values incremented by value, max 9
function addToLine(numbers, value) {
  return numbers.map(n => {
    const newValue = n + value;
    return Math.floor(newValue / 10) > 0 ? (newValue % 10) + 1 : newValue;
  });
}

function step(unvisited, valueMap, distanceMap) {
  // Take (and remove) unvisited node with shortest distance
  const coord = unvisited.shift();

  // Update distance to each neighbor
  const neighbors = getNeighbors(coord.x, coord.y, valueMap);
  neighbors.forEach(n => {
    const [x, y] = n;
    const currentDistanceToNeighbor = valueMap[y][x];
    const updatedDistance = coord.distance + currentDistanceToNeighbor;
    if (updatedDistance < distanceMap[y][x]) {
      distanceMap[y][x] = updatedDistance;
      unvisited.push(createCell(x, y, updatedDistance));
    }
  })

  // Sort unvisited nodes by distance
  unvisited.sort((a, b) => a.distance - b.distance);
}
