import { splitFileLinebreak } from '../common.js';

export function solve(filename) {
    const data = splitFileLinebreak(filename);
    const bingoNumbers = data.shift().split(',');
    return runGame(bingoNumbers, createBoards(data));
}

export function solve2(filename) {
    const data = splitFileLinebreak(filename);
    const bingoNumbers = data.shift().split(',');
    return runGame2(bingoNumbers, createBoards(data));
}

function createBoards(data) {
    return data.map((d) => {
        const boardLines = d.split(/\r?\n/);
        return createBoard(boardLines);
    });
}

function runGame(bingoNumbers, boards) {
    for (let i = 0; i < bingoNumbers.length; i++) {
        const bingoNumber = bingoNumbers[i];
        updateBoards(boards, bingoNumber);
        const winnerBoards = findWinners(boards);
        
        if (winnerBoards.length > 0) {
            return calculateScore(bingoNumber, winnerBoards[0]);
        }
    }
}

function runGame2(bingoNumbers, _boards) {
    let boards = [..._boards];
    let lastWinners = [];
    let lastNumber = 0;
    for (let i = 0; i < bingoNumbers.length; i++) {
        const bingoNumber = bingoNumbers[i];
        updateBoards(boards, bingoNumber);

        const winners = findWinners(boards);
        if (winners.length > 0) {
            lastNumber = bingoNumber;
            lastWinners = [...winners];
        }
        boards = findInPlay(boards);
    }

    return calculateScore(lastNumber, lastWinners[0]);
}

function updateBoards(boards, bingoNumber) {
    boards.forEach(board => {
        board.map(row => {
            const index = row.findIndex((n) => bingoNumber === n);
            if (index >= 0) {
                row[index] = 'x';
            }
        });
    });
}

function findWinners(boards) {
    return boards.filter(curr => {
        const rows = checkRows(curr)
        const columns = checkColumns(curr);
        return rows.length > 0 || columns.length > 0
    });
}

function findInPlay(boards) {
    return boards.filter(curr => {
        const rows = checkRows(curr)
        const columns = checkColumns(curr);
        return rows.length === 0 && columns.length === 0
    });
}

function checkRows(b) {
    return b.filter(row => row.join('') === 'xxxxx');
}

function checkColumns(b) {
    const columns = b.reduce((columns, row) => {
        for (let i = 0; i < row.length; i++) {
            if (columns[i]) {
                columns[i].push(row[i]);
            } else {
                columns[i] = [row[i]];
            }
        }
        return columns;
    }, []);

    return checkRows(columns);
}

function createBoard(boardLines) {
    return boardLines.map(l => {
        return l.trim().split(/\s+/);
    });
}

function calculateScore(calledNumber, board) {
    const boardSum = board.reduce((acc, row) => {
        acc += row.filter(r => r != 'x').map(n => +n).reduce((a, b) => a + b, 0);
        return acc;
    }, 0);

    return calledNumber * boardSum;
}

