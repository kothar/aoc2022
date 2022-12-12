import * as fs from 'fs';
import { day13 } from './day13';

test('Example 1', () => {
    const result = day13(`

`);
    expect(result).toEqual([31, 29]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day13.txt');
    const result = day13(buffer.toString());

    expect(result).toEqual([391, 386]);
});
