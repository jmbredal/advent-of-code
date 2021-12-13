import { readLines } from '../common.js';

export function solve(filename) {
    const lines = readLines(filename);
    const coordStrings = lines.filter(line => !isNaN(parseInt(line[0])));
    const folds = lines.filter(line => isNaN(parseInt(line[0])));
    const coords = coordStrings.map(c => c.split(',').map(Number));

    const [direction, value] = folds[0].split(' ').reverse()[0].split('=');
    const foldedCoords = fold(direction, value, coords);
    return new Set(foldedCoords.map(c => JSON.stringify(c))).size;
}

export function solve2(filename) {
    const lines = readLines(filename);
    const coordStrings = lines.filter(line => !isNaN(parseInt(line[0])));
    const folds = lines.filter(line => isNaN(parseInt(line[0])));
    let coords = coordStrings.map(c => c.split(',').map(Number));

    for (const f of folds) {
        const [direction, value] = f.split(' ').reverse()[0].split('=');
        coords = fold(direction, value, coords);
    }
    printCoords(coords);

    return 'Look above';
}

function fold(direction, value, coords) {
    const max = value * 2;

    if (direction === 'y') {
        const topCoords = coords.filter(c => c[1] < value);
        const bottomCoords = coords.filter(c => c[1] > value).map(c => {
            const newY = max - c[1];
            return [c[0], newY];
        });

        return topCoords.concat(bottomCoords);
    }

    if (direction === 'x') {
        const leftCoords = coords.filter(c => c[0] < value);
        const rightCoords = coords.filter(c => c[0] > value).map(c => {
            const newX = Math.abs(-max + c[0]);
            return [newX, c[1]];
        });

        return leftCoords.concat(rightCoords);
    }
}

function printCoords(coords) {
    const maxX = Math.max(...coords.map(c => c[0]));
    const maxY = Math.max(...coords.map(c => c[1]));

    const map = [];
    for (let y = 0; y <= maxY; y++) {
        const row = Array(maxX + 1).fill(' ');
        map.push(row);
    }

    for (const coord of coords) {
        const [x, y] = coord;
        map[y][x] = '#';
    }

    for (const row of map) {
        console.log(row.join(''));
    }
}