import * as fs from 'fs';
import { day14 } from './day14';

test('Example 1', () => {
    const result = day14(`
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`);
    expect(result).toEqual([24, 93]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day14.txt');
    const result = day14(buffer.toString());

    expect(result).toEqual([655, 26484]);
});
