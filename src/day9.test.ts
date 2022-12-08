import * as fs from 'fs';
import { day9 } from './day9';

test('Example 1', () => {
    const result = day9(`
`);
    expect(result).toEqual([21, 8]);
});

test('Puzzle input', () => {
    const buffer = fs.readFileSync('src/day9.txt');
    const result = day9(buffer.toString());

    expect(result).toEqual([1851, 6999588]);
})
