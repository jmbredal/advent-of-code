import { readLines } from './common.js';

['day01', 'day02'].forEach((day) => {
  import(`./${day}/solver.js`).then((obj) => {
    const { solve, solve2 } = obj;
    const data = readLines(`./src/${day}/input.txt`);
    const testdata = readLines(`./src/${day}/testdata`);
    console.log(`${day} test 1:`, solve(testdata));
    console.log(`${day} test 2:`, solve2(testdata));
    console.log(`${day} solution 1:`, solve(data));
    console.log(`${day} solution 2:`, solve2(data));
    console.log('------------------------');
  });
});

