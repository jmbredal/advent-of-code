import { readLines, getNeighbors, createMap } from '../common.js';

// const solution = solve('input');
// console.log(solution);

function createCell(x, y, distance) {
  return { x, y, distance };
}

export function solve(filename) {
  const lines = readLines(filename);
  const valueMap = createMap(lines);
  const distanceMap = lines.map(line => {
    return Array.from(line).fill(999999999);
  })

  distanceMap[0][0] = 0;
  let coords = [createCell(0, 0, 0)];
  while (coords.length > 0) {
    step(coords, valueMap, distanceMap);
  }

  return distanceMap[distanceMap.length - 1][distanceMap[0].length - 1];
}

export function solve2() {

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
