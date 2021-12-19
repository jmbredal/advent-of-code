import { readLines } from '../common.js';

let addLeft = 0;
let addRight = 0;

// solve('testdata');

export function solve(filename) {
    const lines = readLines(filename);

    // lines.reduce((acc, curr) => {
    //     acc.push(curr);
    //     explode(acc);
    //     return acc;
    // }, []);
  }

export function explode(list, _depth=0) {
    // [[[[[9,8],1],2],3],4]
    if (Number.isInteger(list)) return list;

    const [_a, _b] = list;
    console.log(_depth, ':', _a, _b);

    // explode some thing
    if (_depth >= 4) {
        console.log('should explode');
        addLeft = _a;
        addRight = _b;
        return;
    }

    const depth = _depth + 1;

    let a = explode(_a, depth);
    let b = explode(_b, depth);

    if (Number.isInteger(a) && addLeft > 0) {
        a += addLeft;
        addLeft = 0;
    }

    if (Number.isInteger(b) && addRight > 0) {
        b += addRight;
        addRight = 0;
    }

    // a exploded
    //    a   b     
    // [[9,8],1] -> [0,9]
    if (!a) {
        a = 0;
    }

    // b exploded
    //  a   b
    // [4,[3,2] -> [7,0]
    if (!b) {
        b = 0;
    }
    

    console.log('returning', a, b);
    return [a, b];
}

export function solve2(filename) {
  
}

