import assert from 'assert';
import { explode } from './solver.js';

describe('day 18', () => {
    describe('explode', () => {
        it('test1', () => {
            const r = explode([[[[[9, 8], 1], 2], 3], 4]);
            assert.equal(JSON.stringify(r), '[[[[0,9],2],3],4]');
        })
        it('test2', () => {
            const r = explode([7, [6, [5, [4, [3, 2]]]]]);
            assert.equal(JSON.stringify(r), '[7,[6,[5,[7,0]]]]');
        })
        it('test3', () => {
            const r = explode([[6, [5, [4, [3, 2]]]], 1]);
            assert.equal(JSON.stringify(r), '[[6,[5,[7,0]]],3]');
        })
        it('test4', () => {
            const r = explode([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]]);
            assert.equal(JSON.stringify(r), '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
        })
        it('test5', () => {
            const r = explode([[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]]);
            assert.equal(JSON.stringify(r), '[[3,[2,[8,0]]],[9,[5,[7,0]]]]');
        })
    })
});
