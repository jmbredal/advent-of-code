import { readLines } from '../common.js';

// solve('testdata');

export function solve(filename) {
    const lines = readLines(filename);
    
    let map = createMap(lines);
    let counter = 0;
    for (let count = 0; count < 100; count++) {
        map = increaseAllEnergyLevels(map);
        let flashingCells = [getFlashingCells(map)];
        while (flashingCells.length > 0) {
            flashingCells = getFlashingCells(map);
            counter += flashingCells.length;
            flashAll(flashingCells, map);
        }
    }

    return counter;
}

export function solve2(filename) {
    const lines = readLines(filename);
    
    let map = createMap(lines);
    for (let count = 0; count < 1000; count++) {
        map = increaseAllEnergyLevels(map);
        let flashingCells = [getFlashingCells(map)];
        while (flashingCells.length > 0) {
            flashingCells = getFlashingCells(map);
            flashAll(flashingCells, map);
        }
        if (isAllFlashing(map)) {
            return count + 1;
        }
    }
}

function isAllFlashing(map) {
    return map.filter(row => {
        return row.filter(cell => cell != 0).length;
    }).length === 0;
}

function compare(map1, map2) {
    for (let index = 0; index < map1.length; index++) {
        const row = map1[index];
        const row1 = JSON.stringify(row);
        const row2 = JSON.stringify(map2[index]);
        if (row1 !== row2) {
            console.log(`line ${index} does not match`, row1, row2);
            break;
        }
    }
}

function createMap(lines) {
    return lines.map(line => line.split('').map(Number));
}

function increaseAllEnergyLevels(map) {
    return map.map(row => row.map(p => p + 1));
}

function increaseEnergyLevel(cells, map) {
    cells.forEach(cell => {
        const [x, y] = cell;
        map[y][x]++;
    });
}

function getFlashingCells(map) {
    const flashingCells = [];
    for (let y = 0; y < map.length; y++) {
        const row = map[y];
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            if (cell > 9) {
                flashingCells.push([x, y]);
            }
        }
    }
    return flashingCells;
}

function flashAll(flashingCells, map) {
    flashingCells.forEach(cell => flashCell(cell, map));
}

function flashCell(cell, map) {
    const [x, y] = cell;
    const neighbors = findNeighborPoints(x, y, map);
    const hasNotFlashed = neighbors.filter(cell => {
        const [cellX, cellY] = cell;
        return map[cellY][cellX] !== 0;
    });
    map[y][x] = 0;
    increaseEnergyLevel(hasNotFlashed, map);
}

function findNeighborPoints(x, y, map) {
    const neighbours = [];
    const height = map.length;
    const width = map[0].length;

    // top left
    if (x > 0 && y > 0) {
        neighbours.push([x - 1, y - 1]);
    }

    // above
    if (y > 0) {
        neighbours.push([x, y - 1]);
    }

    // top right
    if (x < width - 1 && y > 0) {
        neighbours.push([x + 1, y - 1]);
    }

    // left
    if (x > 0) {
        neighbours.push([x - 1, y]);
    }

    // right 
    if (x < width - 1) {
        neighbours.push([x + 1, y]);
    }

    // below left
    if (x > 0 && y < height - 1) {
        neighbours.push([x - 1, y + 1]);
    }

    // below
    if (y < height - 1) {
        neighbours.push([x, y + 1]);
    }

    // below right
    if (x < width - 1 && y < height - 1) {
        neighbours.push([x + 1, y + 1]);
    }

    return neighbours;
}
