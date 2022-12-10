import * as fs from 'fs';
import { day11 } from './day11';

test('Example 1', () => {
    const result = day11(`

`);
    expect(result).toEqual([0, 0]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day11.txt');
    const result = day11(buffer.toString());

    expect(result).toEqual([12880, 0]);
});
