import * as fs from 'fs';
import { day7 } from './day7';

test('Example 1', () => {
    const result = day7(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`);
    expect(result).toEqual([7, 19]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day7.txt');
    const result = day7(buffer.toString());

    expect(result).toEqual([1876, 2202]);
})
