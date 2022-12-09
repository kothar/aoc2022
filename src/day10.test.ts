import * as fs from 'fs';
import { day10 } from './day10';

test('Example 1', () => {
    const result = day10(`
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`);
    expect(result).toEqual([13, 1]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day10.txt');
    const result = day10(buffer.toString());

    expect(result).toEqual([6503, 2724]);
})
