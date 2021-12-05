import { readLines } from '../common.js';

// solve2('./testdata');
solve1('./input');
solve2('./input');

function solve1(filename) {
    const data = readLines(filename);
    const coords = data.map((line) => getCoordinates(line));
    // filter out diagonal lines
    const notDiagonal = coords.filter(c => {
        // [ 6, 4 ], [ 2, 0 ]
        const [to, from] = c;
        return from[0] === to[0] || from[1] === to[1];
    });

    const horizontalPoints = getHorizontalPoints(notDiagonal);
    const verticalPoints = getVerticalPoints(notDiagonal);
    const pointsToMark = horizontalPoints.concat(verticalPoints);
    const map = createMap(coords, pointsToMark);

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
    
    const horizontalPoints = getHorizontalPoints(notDiagonal);
    const verticalPoints = getVerticalPoints(notDiagonal);
    const diagonalPoints = getDiagonalPoints(diagonal);
    const pointsToMark = horizontalPoints.concat(verticalPoints, diagonalPoints);
    const map = createMap(coords, pointsToMark);

    console.log(findOverlap(map));

}

function createMap(allPoints, pointsToMark) {
    const [maxX, maxY] = findMax(allPoints);
    const map = [];
    for (let y = 0; y <= maxY; y++) {
        map.push(Array(maxX + 1).fill(0));
    }

    pointsToMark.forEach((p) => {
        const [x, y] = p;
        map[y][x]++;
    });
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

function getHorizontalPoints(points, map) {
    const horizontal = points.filter((p) => {
        const [from, to] = p;
        return from[1] === to[1];
    }).map((p) => {
        // make sure from is lowest
        const [from, to] = p;
        return from[0] > to[0] ? [to, from] : p;
    });

    return horizontal.reduce((points, point) => {
        const [from, to] = point;
        const y = from[1];
        for (let x = from[0]; x <= to[0]; x++) {
            points.push([x, y]);
        }
        return points;
    }, []);
}

function getVerticalPoints(points) {
    const vertical = points.filter((p) => {
        const [from, to] = p;
        return from[0] === to[0];
    }).map(p => {
        const [from, to] = p;
        return from[1] > to[1] ? [to, from] : p;
    });

    return vertical.reduce((points, point) => {
        const [from, to] = point;
        const x = from[0];
        for (let y = from[1]; y <= to[1]; y++) {
            points.push([x, y]);
        }
        return points;
    }, []);
}

function getDiagonalPoints(diagonalPoints) {
    const points = diagonalPoints.map(p => {
        const [from, to] = p;
        return from[0] > to[0] ? [to, from] : p;
    });

    return points.reduce((points, point) => {
        const [from, to] = point;
        if (from[1] < to[1]) {
            // mark downwards
            let y = from[1];
            for (let x = from[0]; x <= to[0]; x++) {
                points.push([x, y]);
                y++;
            }
        } else {
            // mark upwards
            let y = from[1];
            for (let x = from[0]; x <= to[0]; x++) {
                points.push([x, y]);
                y--;
            }
        }
        return points;
    }, []);
}

function findOverlap(map) {
    return map.reduce((count, row) => {
        count += row.filter(c => c > 1).length;
        return count;
    }, 0);
}
