const day = process.argv[2];

import(`./${day}/solver.js`).then((obj) => {
  const { solve, solve2 } = obj;
  console.log('------------------------');
  console.log(`${day} test 1:`, solve(`./src/${day}/testdata`));
  console.log(`${day} test 2:`, solve2(`./src/${day}/testdata`));
  console.log(`${day} solution 1:`, solve(`./src/${day}/input`));
  console.log(`${day} solution 2:`, solve2(`./src/${day}/input`));
  console.log('------------------------');
});
