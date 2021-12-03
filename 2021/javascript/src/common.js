import fs from 'fs';

export function readLines(filename, removeEmptyLines=true) {
  const file = fs.readFileSync(filename).toString();
  const splitChar = getLineBreakChar(file);
  const lines = file.split(splitChar);
  return removeEmptyLines ? lines.filter(x => x) : lines;
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