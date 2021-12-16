import assert from 'assert';
import { zip } from './common.js';

describe('common zip function', () => {
    it('should return values combined', () => {
        const zipped = zip([1, 2], [3, 4]);
        assert.equal(JSON.stringify(zipped), JSON.stringify([[1, 3], [2, 4]]));
    });
});

