import * as fs from 'fs';
import { day12 } from './day12';

test('Example 1', () => {
    const result = day12(`

`);
    expect(result).toEqual([10605, 2713310158]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day12.txt');
    const result = day12(buffer.toString());

    expect(result).toEqual([54752, 0]);
});
