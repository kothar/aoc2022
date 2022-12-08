import * as fs from 'fs';
import { day8 } from './day8';

test('Example 1', () => {
    const result = day8(`
30373
25512
65332
33549
35390
`);
    expect(result).toEqual([21, 8]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day8.txt');
    const result = day8(buffer.toString());

    expect(result).toEqual([1851, 574080]);
})
