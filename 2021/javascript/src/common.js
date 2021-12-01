import fs from 'fs';

export function readLines(filename, removeEmptyLines=true) {
  const lines = fs.readFileSync(filename).toString().split('\n');
  return removeEmptyLines ? lines.filter(x => x) : lines;
}
