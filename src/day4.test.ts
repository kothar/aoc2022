import * as fs from 'fs';
import { day4 } from './day4';

test('Example', () => {
    const result = day4(`
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`);
    expect(result).toEqual([2, 4]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day4.txt');
    const result = day4(buffer.toString());

    expect(result).toEqual([441, 861]);
})