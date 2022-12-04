import * as fs from 'fs';
import { day5 } from './day5';

test('Example', () => {
    const result = day5(`
X
`);
    expect(result).toEqual([2, 4]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day5.txt');
    const result = day5(buffer.toString());

    expect(result).toEqual([441, 861]);
})