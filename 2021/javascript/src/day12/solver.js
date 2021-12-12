import { readLines } from '../common.js';

export function solve(filename) {
    const lines = readLines(filename);
    const nodes = createNodes(lines);

    let counter = [0];
    explore('start', nodes, {}, counter)
    return counter[0];
}

export function solve2(filename) {
    const lines = readLines(filename);
    const nodes = createNodes(lines);

    let counter = [0];
    const visited = Object.keys(nodes).reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
    }, {});
    explore2('start', nodes, visited, counter, false)
    return counter[0];
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
        counter[0]++;
    } else {
        for (const target of nodes[node]) {
            const isBig = target === target.toUpperCase();
            if (!visited[target] || isBig) {
                explore(target, nodes, visited, counter);
            }
        }
    }

    visited[node] = false;
}

function explore2(node, nodes, visited, counter, hasVisitedSmallCaveTwice) {
    visited[node]++;

    const isSmallCave = node === node.toLowerCase();

    if (isSmallCave && !hasVisitedSmallCaveTwice && visited[node] === 2) {
        hasVisitedSmallCaveTwice = true;
    }

    if (node === 'end') {
        counter[0]++;
    } else {
        for (const target of nodes[node]) {
            const isBig = target === target.toUpperCase();
            const isSmall = !isBig;
            
            if (target === 'start') { continue }

            const hasNotVisited = visited[target] < 1;
            const hasVisitedButIsFirstSmallCave = isSmall && !hasVisitedSmallCaveTwice && visited[target] < 2;
            const shouldExplore = isBig || hasNotVisited || hasVisitedButIsFirstSmallCave;

            if (shouldExplore) {
                explore2(target, nodes, visited, counter, hasVisitedSmallCaveTwice);
            }
        }
    }

    visited[node]--;
}
