import { readLines, range, zip } from '../common.js';

// console.log(solve('testdata'));
// console.log(solve('input'));

export function solve(filename) {
    const lines = readLines(filename);
    let player1Pos = +lines[0].split(' ').reverse()[0];
    let player2Pos = +lines[1].split(' ').reverse()[0];

    const [player1Points, player2Points, rolls] = simulate1(player1Pos, player2Pos);
    // console.log('Player1: ', player1Points);
    // console.log('Player2: ', player2Points);
    // console.log('Rolls', rolls);

    const winnerPoints = player1Points > player2Points ? player2Points : player1Points;
    return winnerPoints * rolls;
}

function simulate1(player1Pos, player2Pos) {
    const die = dice();

    let player1Points = 0;
    let player2Points = 0;
    while (true) {
        let sumOfRolls = range(3).map(n => roll(die)).sum();

        player1Pos = (player1Pos + sumOfRolls - 1) % 10 + 1;
        player1Points += player1Pos;

        if (player1Points >= 1000) {
            break;
        }
        
        sumOfRolls = range(3).map(n => roll(die)).sum();
        player2Pos = (player2Pos + sumOfRolls - 1) % 10 + 1;
        player2Points += player2Pos;

        if (player2Points >= 1000) {
            break;
        }
    }

    const rolls = roll(die) - 1;

    return [player1Points, player2Points, rolls];
}

export function solve2(filename) {
    const lines = readLines(filename);
    let player1Pos = +lines[0].split(' ').reverse()[0];
    let player2Pos = +lines[1].split(' ').reverse()[0];


    const [player1Points, player2Points, rolls] = simulate1(player1Pos, player2Pos);
    // console.log('Player1: ', player1Points);
    // console.log('Player2: ', player2Points);
    // console.log('Rolls', rolls);

    const winnerPoints = player1Points > player2Points ? player2Points : player1Points;
    return winnerPoints * rolls;

}

function simulate2(game) {
    const sums = [3, 4, 5, 6, 7, 8, 9];
    const frequencies = [1, 3, 6, 7, 6, 3, 1];
    const [p1Points, p1Pos, p2Points, p2Pos] = [0, 0, 0, 0];
    const outComes = zip(sums, frequencies);

    for (var outCome of outComes) {
        const [sum, frequency] = outCome;
        
    }
}

function play(game, player) {
    const {p1Points, p1Pos, p2Points, p2Pos} = game;

    const player1Pos = (player1Pos + sumOfRolls - 1) % 10 + 1;
    p1Points += player1Pos;
}

function roll(generator) {
    return generator.next().value;
}

function* dice() {
    let index = 0;
    while (true) {
        index++;
        yield index;
    }
}