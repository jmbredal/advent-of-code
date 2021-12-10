import fs from 'fs';

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b);
}

Array.prototype.sortNumerically = function() {
  return this.sort((a, b) => a - b);
}

export function readLines(filename, removeEmptyLines=true) {
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