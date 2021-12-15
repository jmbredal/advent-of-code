import fs from 'fs';

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b);
}

Array.prototype.sortNumerically = function () {
  return this.sort((a, b) => a - b);
}

export function range(x) {
  return [...Array(x).keys()];
}

export function readLines(filename, removeEmptyLines = true) {
  const file = fs.readFileSync(filename).toString();
  const splitChar = getLineBreakChar(file);
  const lines = file.split(splitChar);
  return removeEmptyLines ? lines.filter(x => x) : lines;
}

export function splitFileLinebreak(filename) {
  const file = fs.readFileSync(filename).toString();
  const splitChar = getLineBreakChar(file);
  return file.split(/\r?\n\r?\n/);
}

function getLineBreakChar(string) {
  const indexOfLF = string.indexOf('\n', 1);  // No need to check first-character

  if (indexOfLF === -1) {
    if (string.indexOf('\r') !== -1) return '\r';

    return '\n';
  }

  if (string[indexOfLF - 1] === '\r') return '\r\n';

  return '\n';
}

// Given a map of arrays of arrays, find neighbors for the given x,y coord
export function getNeighbors(x, y, map, includeDiagonal = false) {
  const neighbours = [];
  const height = map.length;
  const width = map[0].length;

  if (y > 0) { neighbours.push([x, y - 1]); } // above
  if (x > 0) { neighbours.push([x - 1, y]); } // left
  if (x < width - 1) { neighbours.push([x + 1, y]); } // right
  if (y < height - 1) { neighbours.push([x, y + 1]); } // below

  if (includeDiagonal) {
    if (x > 0 && y > 0) { neighbours.push([x - 1, y - 1]); } // top left
    if (x < width - 1 && y > 0) { neighbours.push([x + 1, y - 1]); } // top right
    if (x > 0 && y < height - 1) { neighbours.push([x - 1, y + 1]); } // below left
    if (x < width - 1 && y < height - 1) { neighbours.push([x + 1, y + 1]); } // below right
  }

  return neighbours;
}

// create a map with values given a list of strings
// expecting the values to be numbers
export function createMap(lines) {
  return lines.map(line => line.split('').map(Number));
}
