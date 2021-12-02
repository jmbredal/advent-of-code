export function solve(data) {
  const position = data.reduce((acc, curr) => {
    const [action, value] = curr.split(' ');

    switch (action) {
      case 'forward':
        acc.pos += +value;
        break;
      case 'up':
        acc.depth -= +value;
        break;
      case 'down':
        acc.depth += +value;
        break;
    }
    return acc;
  }, { pos: 0, depth: 0 });

  return position.pos * position.depth;
}

export function solve2(data) {
  const position = data.reduce((acc, curr) => {
    const [action, value] = curr.split(' ');

    switch (action) {
      case 'forward':
        acc.pos += +value;
        acc.depth += (acc.aim * +value);
        break;
      case 'up':
        acc.aim -= +value;
        break;
      case 'down':
        acc.aim += +value;
        break;
    }
    return acc;
  }, { pos: 0, depth: 0, aim:0 });

  return position.pos * position.depth;
}