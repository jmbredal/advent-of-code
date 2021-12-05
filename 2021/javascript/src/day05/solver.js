import { readLines } from '../common.js';

// solve2('./testdata');
solve2('./input');

function solve(filename) {
    const data = readLines(filename);
    const coords = data.map((line) => getCoordinates(line));
    // filter out diagonal lines
    const notDiagonal = coords.filter(c => {
        // [ 6, 4 ], [ 2, 0 ]
        const [to, from] = c;
        return from[0] === to[0] || from[1] === to[1];
    });

    let map = createMap(notDiagonal);
    markHorizontal(notDiagonal, map);
    markVertical(notDiagonal, map);

    console.log(findOverlap(map));
}

function solve2(filename) {
    const data = readLines(filename);
    const coords = data.map((line) => getCoordinates(line));
    // filter out diagonal lines
    const notDiagonal = coords.filter(c => {
        // [ 6, 4 ], [ 2, 0 ]
        const [to, from] = c;
        return from[0] === to[0] || from[1] === to[1];
    });
    
    const diagonal = coords.filter(c => {
        // [ 6, 4 ], [ 2, 0 ]
        const [to, from] = c;
        return from[0] !== to[0] && from[1] !== to[1];
    });
    

    let map = createMap(notDiagonal);
    markHorizontal(notDiagonal, map);
    markVertical(notDiagonal, map);
    markDiagonal(diagonal, map);

    console.log(findOverlap(map));

}

function createMap(data) {
    const [maxX, maxY] = findMax(data);
    const map = [];
    for (let x = 0; x <= maxX; x++) {
        map.push(Array(maxX + 1).fill(0));
    }
    return map;
}

function findMax(points) {
    const [xValues, yValues] = points.reduce((acc, p) => {
        const [from, to] = p;
        const [fromX, fromY] = from;
        const [toX, toY] = to;
        acc[0].push(fromX, toX);
        acc[1].push(fromY, toY);
        return acc;
    }, [[], []]);

    const maxX = Math.max(...xValues);
    const maxY = Math.max(...yValues);
    return [maxX, maxY];
}

function getCoordinates(line) {
    // '0,9 -> 5,9'
    const [from, to] = line.split(' -> ');
    const [fromX, fromY] = from.split(',').map(x => +x);
    const [toX, toY] = to.split(',').map(x => +x);

    return [[fromX, fromY], [toX, toY]];
}

function markHorizontal(points, map) {
    const horizontal = points.filter((p) => {
        const [from, to] = p;
        return from[1] === to[1];
    }).map((p) => {
        // make sure from is lowest
        const [from, to] = p;
        return from[0] > to[0] ? [to, from] : p;
    });

    horizontal.forEach(p => {
        const [from, to] = p;
        const y = from[1];
        for (let x = from[0]; x <= to[0]; x++) {
            map[y][x]++;
        }
    });

    return map;
}

function markVertical(points, map) {
    const vertical = points.filter((p) => {
        const [from, to] = p;
        return from[0] === to[0];
    }).map(p => {
        const [from, to] = p;
        return from[1] > to[1] ? [to, from] : p;
    });

    vertical.forEach(p => {
        const [from, to] = p;
        const x = from[0];
        for (let y = from[1]; y <= to[1]; y++) {
            map[y][x]++;
        }
    });

    return map;
}

function markDiagonal(_points, map) {
    const points = _points.map(p => {
        const [from, to] = p;
        return from[0] > to[0] ? [to, from] : p;
    });

    points.forEach((p) => {
        const [from, to] = p;
        if (from[1] < to[1]) {
            // mark downwards
            let y = from[1];
            for (let x = from[0]; x <= to[0]; x++) {
                map[y][x]++;
                y++;
            }
        } else {
            // mark upwards
            let y = from[1];
            for (let x = from[0]; x <= to[0]; x++) {
                map[y][x]++;
                y--;
            }
        }
    });
    return map;
}

function findOverlap(map) {
    return map.reduce((count, row) => {
        count += row.filter(c => c > 1).length;
        return count;
    }, 0);
}
