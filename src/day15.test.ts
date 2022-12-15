import * as fs from 'fs';
import { day15 } from './day15';

test('Example 1', () => {
    const result = day15(`

`);
    expect(result).toEqual([24, 93]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day15.txt');
    const result = day15(buffer.toString());

    expect(result).toEqual([655, 24948]);
});
