import * as fs from 'fs';
import { day8 } from './day8';

test('Example 1', () => {
    const result = day8(`

`);
    expect(result).toEqual([95437, 24933642]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day8.txt');
    const result = day8(buffer.toString());

    expect(result).toEqual([1642503, 6999588]);
})
