import { readLines } from '../common.js';

export function solve(filename) {
    const area = getArea(readLines(filename)[0]);

    const maxX = area[1] + 1;
    const minY = area[2] - 1;

    let maxHeight = -1000;
    for (let x = 1; x < maxX; x++) {
        for (let y = minY; y < 1000; y++) {
            const result = runSim(x, y, area);
            if (result && result > maxHeight) {
                maxHeight = result;
            }
        }
    }

    return maxHeight;
}

export function solve2(filename) {
    const area = getArea(readLines(filename)[0]);

    const maxX = area[1] + 1;
    const minY = area[2] - 1;

    let counter = 0;
    for (let x = 1; x < maxX; x++) {
        for (let y = minY; y < 300; y++) {
            const result = runSim(x, y, area);
            if (result !== undefined) {
                counter++;
            }
        }
    }

    return counter;
}

function getArea(input) {
    return input.match(/-?\d+/g).map(Number);
}

function isInArea(x, y, area) {
    const [x1, x2, y1, y2] = area;
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function step(parameters) {
    parameters.x += parameters.velocityX;
    parameters.y += parameters.velocityY;
    parameters.velocityX = parameters.velocityX > 0 ? parameters.velocityX - 1 : 0;
    parameters.velocityY = parameters.velocityY -= 1;
}

function runSim(velocityX, velocityY, area) {
    const parameters = {
        x: 0, y: 0, velocityX, velocityY
    };
    let hp = -100;
    while (parameters.x <= area[1] && parameters.y >= area[2]) {
        step(parameters);
        hp = parameters.y > hp ? parameters.y : hp;
        if (isInArea(parameters.x, parameters.y, area)) {
            return hp;
        }
    }
}