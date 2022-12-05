import * as fs from 'fs';
import { day5 } from './day5';
import { day6 } from './day6';

test('Example', () => {
    const result = day6(`
`);
    expect(result).toEqual(['CMZ', 'MCD']);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day6.txt');
    const result = day6(buffer.toString());

    expect(result).toEqual(['VRWBSFZWM', 'RBTWJWMCF']);
})