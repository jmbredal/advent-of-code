import { readLines } from './common.js';

['day01'].forEach((day) => {
  import(`./${day}/solver.js`).then((obj) => {
    const { solve, solve2 } = obj;
    const data = readLines(`./src/${day}/input.txt`);
    console.log(`${day} solution 1:`, solve(data));
    console.log(`${day} solution 2:`, solve2(data));
  });
});

