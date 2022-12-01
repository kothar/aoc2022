import * as fs from 'fs';
import { day2 } from './day2';

test('Day 2 example', () => {
    const result = day2(`
example
`);
    expect(result).toEqual([0, 0]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day2.txt');
    const result = day2(buffer.toString());

    expect(result).toEqual([0, 0]);
})