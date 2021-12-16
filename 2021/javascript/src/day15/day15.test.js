import assert from 'assert';
import { duplicateHorizontally, duplicateVertically, createBigMap } from './solver.js';
import { readLines, createMap } from '../common.js';

const map = createMap(readLines('src/day15/testdata'));

describe('duplicateHorizontally', () => {
    it('first line should match', () => {
        const duplicate = duplicateHorizontally(map, 5);
        assert.equal('11637517422274862853338597396444961841755517295286', duplicate[0].join(''));
    });

    it('last line should match', () => {
        const duplicate = duplicateHorizontally(map, 5);
        assert.equal('23119445813422155692453326671356443778246755488935', duplicate[9].join(''));
    });
});

describe('duplicateVertically', () => {
    it('last line should match', () => {
        const duplicate = duplicateVertically(map, 5);
        assert.equal('6755488935', duplicate[49].join(''));
    });
});

describe('createBigMap', () => {
    it('first line should match', () => {
        const bigMap = createBigMap(map);
        assert.equal('11637517422274862853338597396444961841755517295286', bigMap[0].join(''));
    });

    it('last line should match', () => {
        const bigMap = createBigMap(map);
        assert.equal('67554889357866599146897761125791887223681299833479', bigMap[49].join(''));
    });

    it('height should be 50', () => {
        const bigMap = createBigMap(map);
        assert.equal(50, bigMap.length);
    });

    it('width should be 50', () => {
        const bigMap = createBigMap(map);
        assert.equal(50, bigMap[0].length);
    });
});
