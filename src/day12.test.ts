import * as fs from 'fs';
import { day12 } from './day12';

test('Example 1', () => {
    const result = day12(`
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`);
    expect(result).toEqual([31, 29]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day12.txt');
    const result = day12(buffer.toString());

    expect(result).toEqual([391, 386]);
});
