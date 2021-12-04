import { readLines } from './common.js';

['day04'].forEach((day) => {
  import(`./${day}/solver.js`).then((obj) => {
    const { solve, solve2 } = obj;
    console.log(`${day} test 1:`, solve(`./src/${day}/testdata`));
    console.log(`${day} test 2:`, solve2(`./src/${day}/testdata`));
    console.log(`${day} solution 1:`, solve(`./src/${day}/input.txt`));
    console.log(`${day} solution 2:`, solve2(`./src/${day}/input.txt`));
    console.log('------------------------');
  });
});

