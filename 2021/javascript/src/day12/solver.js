import { readLines } from '../common.js';

export function solve(filename) {
    const lines = readLines(filename);
    const nodes = createNodes(lines);

    let counter = 0;
    return explore('start', nodes, {}, counter)
}

export function solve2(filename) {
    const lines = readLines(filename);
    const nodes = createNodes(lines);

    let counter = 0;
    const visited = Object.keys(nodes).reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
    }, {});
    return explore2('start', nodes, visited, counter, false)
}

function createNodes(lines) {
    const edges = lines.map(line => line.split('-'));
    return edges.reduce((nodes, edge) => {
        const [a, b] = edge;
        if (nodes[a]) {
            nodes[a].push(b)
        } else {
            nodes[a] = [b];
        }

        if (nodes[b]) {
            nodes[b].push(a)
        } else {
            nodes[b] = [a];
        }
        return nodes;
    }, {});
}

function explore(node, nodes, visited, counter) {
    visited[node] = true;

    if (node === 'end') {
        counter++;
    } else {
        for (const target of nodes[node]) {
            const isBig = target === target.toUpperCase();
            if (!visited[target] || isBig) {
                counter = explore(target, nodes, visited, counter);
            }
        }
    }

    visited[node] = false;
    return counter;
}

function explore2(node, nodes, visited, counter, hasVisitedSmallCaveTwice) {
    visited[node]++;

    const isSmallCave = node === node.toLowerCase();

    if (isSmallCave && !hasVisitedSmallCaveTwice && visited[node] === 2) {
        hasVisitedSmallCaveTwice = true;
    }

    if (node === 'end') {
        counter++;
    } else {
        for (const target of nodes[node]) {
            const isBig = target === target.toUpperCase();
            const isSmall = !isBig;
            
            if (target === 'start') { continue }

            const hasNotVisited = visited[target] < 1;
            const hasVisitedButIsFirstSmallCave = isSmall && !hasVisitedSmallCaveTwice && visited[target] === 1;
            const shouldExplore = isBig || hasNotVisited || hasVisitedButIsFirstSmallCave;

            if (shouldExplore) {
                counter = explore2(target, nodes, visited, counter, hasVisitedSmallCaveTwice);
            }
        }
    }

    visited[node]--;
    return counter;
}
