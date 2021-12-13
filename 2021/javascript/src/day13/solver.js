import { readLines } from '../common.js';

export function solve(filename) {
    const lines = readLines(filename);
    const coordStrings = lines.filter(line => !isNaN(parseInt(line[0])));
    const folds = lines.filter(line => isNaN(parseInt(line[0])));
    const coords = coordStrings.map(c => c.split(',').map(Number));
    const foldedCoords = fold(folds[0], coords);
    return new Set(foldedCoords.map(c => JSON.stringify(c))).size;
}

export function solve2(filename) {
    const lines = readLines(filename);
    const coordStrings = lines.filter(line => !isNaN(parseInt(line[0])));
    const folds = lines.filter(line => isNaN(parseInt(line[0])));
    const startingCoords = coordStrings.map(c => c.split(',').map(Number));
    const result = folds.reduce((coords, instruction) => fold(instruction, coords), startingCoords);
    printCoords(result);

    return 'Look above';
}

function foldY(line, coords) {
    const max = line * 2;
    const topCoords = coords.filter(c => c[1] < line);
    const bottomCoords = coords.filter(c => c[1] > line).map(c => {
        const newY = max - c[1];
        return [c[0], newY];
    });
    return topCoords.concat(bottomCoords);
}

function foldX(line, coords) {
    const max = line * 2;
    const leftCoords = coords.filter(c => c[0] < line);
    const rightCoords = coords.filter(c => c[0] > line).map(c => {
        const newX = Math.abs(-max + c[0]);
        return [newX, c[1]];
    });

    return leftCoords.concat(rightCoords);
}

function fold(foldInstruction, coords) {
    const [direction, value] = foldInstruction.split(' ').reverse()[0].split('=');
    const folder = {
        'y': foldY,
        'x': foldX,
    }
    return folder[direction](value, coords);
}

function printCoords(coords) {
    const maxX = Math.max(...coords.map(c => c[0]));
    const maxY = Math.max(...coords.map(c => c[1]));

    Array(maxY + 1).fill()
        .map((_, index) => {
            const markers = coords.filter(c => c[1] === index).map(c => c[0]);
            return Array(maxX + 1).fill().map((_, index) => markers.includes(index) ? '#' : ' ').join('');
        })
        .forEach(line => console.log(line));
}