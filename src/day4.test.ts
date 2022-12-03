import * as fs from 'fs';
import { day4 } from './day4';

test('Example', () => {
    const result = day4(`
`);
    expect(result).toEqual([157, 70]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day4.txt');
    const result = day4(buffer.toString());

    expect(result).toEqual([8349, 2681]);
})