import * as fs from 'fs';
import { day14 } from './day14';

test('Example 1', () => {
    const result = day14(`

`);
    expect(result).toEqual([13, 140]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day14.txt');
    const result = day14(buffer.toString());

    expect(result).toEqual([5882, 24948]);
});
