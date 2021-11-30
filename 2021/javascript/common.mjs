import fs from 'fs';

export function readLines(filename, removeEmptyLines=true) {
  const lines = fs.readFileSync(filename).toString().split('\r\n');
  return removeEmptyLines ? lines.filter(x => x) : lines;
}
