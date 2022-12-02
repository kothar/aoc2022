import * as fs from 'fs';
import { day2 } from './day2';

test('Day 2 example', () => {
    const result = day2(`
A Y
B X
C Z
`);
    expect(result).toEqual([15, 12]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day2.txt');
    const result = day2(buffer.toString());

    expect(result).toEqual([11449, 13187]);
})